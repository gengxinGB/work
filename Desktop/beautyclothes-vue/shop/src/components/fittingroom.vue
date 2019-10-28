<template>
    <div class="fittingroombox" id="fittingroombox">
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h3>试衣间</h3>
        </div>
        <div class="contentmsg">
            <ul class="imgbox">
                <li v-for="(item,index) in msglist" :key="index"
                class="circle"
                @click="ingoodsinfo(item.productId)"
                ><img
                 @touchstart="down($event,index)"
                @touchmove="move($event,index)" 
                @touchend="end($event,index,item.fittingRoomId)" 
                id="circlebox" 
                :src="item.productSkuPic" alt="">
                 <div class="bottombox">
                     <p>{{item.productName}}</p>
                     <p>{{item.productSpecs}}</p>
                 </div>
                </li>
                
            </ul>
        </div>
        <div class="footer" v-if="footerisshow">
            <i class="mui-icon mui-icon-trash"></i>
            <p class="worder"> 拖动到此处删除</p>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
          // 商品信息
          msglist:[],
        // 底部闪出去模块的显示与影藏
        footerisshow:false,
        positionX: 0,
        positionY: 0,
        innerHeight: 0,
        innerWidth: 0,
        // 获取元素在页面上最初的相对位置
        startleft:0,
        starttop:0,
        // 获取元素宽度以及高度
        divwidth:0,
        divheight:0,
        // 元素个数
        goodsnum:0,


        }
    },
    created() {
      this.getmsginfo()
    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },

        // 获取试衣间商品信息
        getmsginfo:function(){
          this.axios.get('cusFittingRoom/showFittingRoom').then(response=>{
              console.log(response)
              if(response.data.success==true){
                this.msglist=response.data.data
                this.goodsnum=this.msglist.length
              }
          })
        },
     
    //  点击进入商品详情
    ingoodsinfo:function(productId){
        this.$router.push({path:'home/goodsinfo',query:{productId:productId}})
    },

        // 拖拽图片开始
        dragstart:function(e){
             e.preventDefault()
            console.log(e)
        },
         /* 阻止移动端屏幕默认滑动 */
    default(e) {
      let divv = document.getElementById('fittingroombox');
      divv.addEventListener(
        'touchmove',
        function (e) {
          e.preventDefault();
        },
        { passive: false }
      );
    },

    getThisNode(e,topnum,leftnum) {
      // let odiv = document.getElementById('circlebox');
      // console.log(this.positionX, this.positionY);
      if (this.positionX <= 0) {
        this.positionX = 0;
      } else if (this.positionX >= this.innerWidth) {
        this.positionX = this.innerWidth;
      } else {
        this.positionX = this.positionX;
      }
      if (this.positionY <= 0) {
        this.positionY = 0;
      } else if (this.positionY >= this.innerHeight) {
        this.positionY = this.innerHeight;
      } else {
        this.positionY = this.positionY;
      }
    
      e.style.left = `${this.positionX-leftnum}px`;
      e.style.top = `${this.positionY-topnum}px`;
    },
    // 光标按下
    down:function(e,i) {
     
      this.default();
      this.innerHeight = e.view.innerHeight;
      this.innerWidth = e.view.innerWidth;
      console.log(e.path[1])

     console.log(e.path[1].getBoundingClientRect())
    //  获取元素最初的位置
    this.startleft=e.path[1].getBoundingClientRect().left
    this.starttop=e.path[1].getBoundingClientRect().top
    // 获取元素的高度和宽度
    this.divwidth=e.path[1].getBoundingClientRect().width
    this.divheight=e.path[1].getBoundingClientRect().height
    console.log(this.starttop)
    console.log(this.startleft)


      this.positionX = e.changedTouches[0].pageX;
      this.positionY = e.changedTouches[0].pageY;
    
      // console.log(e)
    },
    // 光标移动
    move(e,i) {
      this.footerisshow=true
        var topnum=this.starttop+this.divheight/2
       var leftnum=this.startleft+this.divwidth/2
      this.getThisNode(e.path[1],topnum,leftnum);
      this.default();
    //   console.log(this.starttop)
    //   console.log(this.divwidth)
    //   console.log(this.startleft)
    //  console.log(topnum)
    //   console.log(leftnum)
       e.path[1].style.zIndex=99
     
      this.positionX = e.changedTouches[0].pageX;
      this.positionY = e.changedTouches[0].pageY;
      this.getThisNode(e.path[1],topnum,leftnum);
      // console.log(e)
    },
    // 光标抬起
    end:function(e,i,fittingRoomId) {
      console.log(e)
      this.footerisshow=false
      console.log(e.path[1])
      console.log(i)
      console.log(this.goodsnum)
     e.path[1].style.zIndex=9
      if(i+1>3){
        if((i+1)%3==0){
           leftnum=(i+1)/3
        }else{
            var leftnum=(i+1)%3-1
        }
        
      }else{
        leftnum=i
      }
      if(i+1>3){
       if((i+1)%3==0){
         var topnum=(i+1)/3-1
       }else{
          topnum=parseInt((i+1)/3)
       }
      }else{
        topnum=0
      }
      // var leftnum=3%(i+1)
      console.log(leftnum)
           //  删除事件
        if(this.positionY<=667&&this.positionY>=518){
          // alert("删除")
          var data={
            fittingRoomId:fittingRoomId
          }
            this.axios.post('cusFittingRoom/deleteFittingRoomByOne',this.qs.stringify(data)).then(response=>{
              console.log(response)
              if(response.data.success==true){
                 MessageBox.alert('删除成功').then(action => {
                    this.getmsginfo()
               });
              }
             
              // return
            })
        }
      // console.log(topnum)
      console.log('end');
        console.log(this.positionX)
        console.log(this.positionY)
        e.path[1].style.left=this.startleft-this.divwidth*leftnum+'px'
        if(i+1>3){
          e.path[1].style.top=this.starttop-45-13-topnum*this.divheight-(topnum*5)+'px'
        }else{
        e.path[1].style.top=this.starttop-45-13-topnum*this.divheight+'px'

        }
         console.log(e.path[1].style.left)
         console.log(e.path[1].style.top)

   
    }
    },
}
</script>
<style lang="scss" scoped>
    .fittingroombox{
        padding-top: 45px;
        .header{
            width: 100%;
            height: 45px;
            position: fixed;
            top: 0;
            z-index: 99;
            display: flex;
            background-color: #FFB7B7;
          i{
            line-height: 45px;
             color:rgba(255,255,255,1);
            }
         h3{
            width: 100%;
            text-align: center;
            font-size:18px;
            font-weight:600;
            color:rgba(255,255,255,1);
            line-height: 35px;
        }
            
        }
        .contentmsg{
            .imgbox{
               box-sizing:border-box;
               margin-top: 13px;
               .circle{
                     position: relative;
                     z-index: 9;
               }
                li{
                  // position: relative;
                    box-sizing:border-box;
                     float: left;
                    width: 33%;
                    padding-left:8px;
                    margin-bottom: 5px;

                   
                    img{
                        width: 100%;
                        height: 115px;
                        border-radius:5px;
                        border:1px solid rgba(206,206,206,1);
                    }
                    .bottombox{
                        background-color: #ffffff;
                        P{
                            margin: 0;
                            padding: 0;
                            font-size:14px;
                            font-weight:500;
                            color:rgba(78,78,78,1);
                            text-align: center;
                        }
                    }
                }
            }
        }
        .footer{
          position: fixed;
          bottom: 0;
          width: 100%;
          background-color: #FFB7B7;
          height: 64px;
          text-align: center;
          padding-top: 8px;
          i{
            color: #FA6565;
          }
          p{
            color: #FA6565;
          }
        }
    
    }
</style>