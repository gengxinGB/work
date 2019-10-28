<template>
  <div class="pinlunbox">
      <div class="header">
          <i class="mui-icon mui-icon-back" @click="bank"></i>
          <h4>宝贝评价</h4>
      </div>
      <div class="msgbox" v-for="(item,index) in pinlunlist" :key="index" v-show="isshow">
          <div class="namemsg">
           <img :src="item.customerHeadPic" alt="">
            <div class="canshumsg">
                 <p class="usrename">{{item.loginName}}</p>  
                  <p><span>{{item.auditTime
                      }}</span>
                <span v-for="(smallitem,index) in item.productSpecs" :key="index">
                        {{smallitem}}
                </span>
                </p>
            </div>
          </div>
        
          <div class="pinluncontent">
              <p>{{item.content}}</p>
              <img v-for="imgs in item.commentPicList" :key="imgs.commentPicId"  :src="imgs.picUrl" v-preview="imgs.picUrl" alt="">
          </div>
         <p class="foots">
             <span>浏览100次</span>
             <span class="right">
                <img @click="isgreat(item.productCommentId,index)" src="../assets/newimg/点赞 (2).png" alt="" v-if="item.refreshGreatDTO.greatStatus==1?true:false">  
                <img @click="isgreat(item.productCommentId,index)" src="../assets/newimg/未点赞.png" alt="" v-if="item.refreshGreatDTO.greatStatus==0?true:false">
                <span class="greatnum">{{item.refreshGreatDTO.greatNum}}</span>   
             </span>
            
         </p>
      </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
   data(){
       return{
           productId:"",
          // 评论数据列表
          pinlunlist:[],
          //评论的产品参数
          pinlunguige:{},
          greatNum:'',
          nonepinlunlist:"暂无评论",
          //   无评论页面隐藏
          isshow:true
         
       }
   },
   created(){
     
   },
   mounted() {
    //    页面刷新点赞数
    // this.regoodslike()
     this.getpinlunmsg()   
   },
   methods:{

        // 点击返回页面
        bank:function(){
            this.$router.go(-1)
        },

        // 处理带T的时间函数
        dateFunction:function(time){
	   var zoneDate = new Date(time).toJSON();
	   var date = new Date(+new Date(zoneDate)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
	   return date
     },


       getpinlunmsg:function(){
        // 获取产品id
        console.log(this.$route.query.productId)
        //    this.axios.get('')
        this.productId=this.$route.query.productId
        this.axios.get('cusProInfo/getProCommentList?productId='+this.productId).then(response=>{
            console.log(response)
           if(response.data.success==false){
               Toast({
                  message: '用户未登录',
                  duration: 500
                });
              localStorage.removeItem("userName")
            this.$router.push({path:'/login'})
           }else if(response.data.success==true){
               this.pinlunlist=response.data.data
               for(var i=0;i<this.pinlunlist.length;i++){
                   this.pinlunlist[i].auditTime=this.dateFunction(this.pinlunlist[i].auditTime)
               }
           }
        })
       
       },
        // 点赞接口
     isgreat:function(productCommentId,i){
            // console.log(e.target)
           
        var data={
           productCommentId:productCommentId
         }
         this.axios.post('cusGreat/clickGreat',this.qs.stringify(data)).then(response=>{
           console.log(response)
           console.log(response.data.data)
           if(response.data.success==false){
               Toast({
                  message: '用户未登录',
                  duration: 500
              });
                localStorage.removeItem("userName")
                this.$router.push({path:'/login'})
           }else if(response.data.success==true){
               if(response.data.data.greatStatus==0){
                   this.pinlunlist[i].refreshGreatDTO.greatStatus=0
                   this.pinlunlist[i].refreshGreatDTO.greatNum=response.data.data.greatNum

               }else if(response.data.data.greatStatus==1){
                    this.pinlunlist[i].refreshGreatDTO.greatStatus=1
                      this.pinlunlist[i].refreshGreatDTO.greatNum=response.data.data.greatNum
               }
           }

        //     var date = new Date(+new Date(data.Data[0].CreateDate) + 836001000).toISOString().replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' ')
        //    console.log(date);
            // this.getpinlunmsg()
       })
       
   },
  //页面刷新获取点赞接口    
//    regoodslike:function(){
//        var data={
//            productId:this.productId
//        }
//        this.axios.post('http://192.168.101.5:8080/great/refreshGreat',this.qs.stringify(data)).then(response=>{
//            console.log(response)
//            console.log(response.data.data)
//            for(var i=0;i<response.data.data.length;i++){
//                if(response.data.data[i].greatStatus==0){
//                 //    $('.goodslike').style.color='#8f8f94'
//                 //    document.getElementsByClassName('goodslike').style.color='#8f8f94'
//                  this.$refs.color.style.color='green'
//                 console.log(this.$refs.goodslike)
//                }else if(response.data.data[i].greatStatus==1){
//                 this.$refs.color.style.color='red'
//                }
//            }
//        })
//    }
   },
 
   
}
</script>

<style lang="scss" scoped>
.pinlunbox{
    // padding: 10px 10px 0 10px;
    padding-top: 45px;
    .header{
        background-color: #FFB7B7;
        width: 100%;
        height: 45px;
        position: fixed;
        top: 0;
        z-index: 99;
        display: flex;
        i{
            line-height: 45px;
            color: #ffffff;
        }
        h4{
            margin: auto;
            color: #ffffff;
        }
    }
    .msgbox{
        background-color: white;
        padding: 10px;
        margin-bottom: 10px;
        .namemsg{
            display: flex;
            p{
                margin: 0;
                padding: 0;

            }
            img{
                width: 40px;
                height: 40px;
                vertical-align: middle;
                border-radius: 50px;
                margin-top: 3px;
                margin-left: 3px;

            }
            .canshumsg{
                margin-left: 10px;
                margin-top: 5px;
                .usrename{
                    font-size: 16px;
                    color: #666;
                    font-weight: 600;
                }
            }
        }
        .pinluncontent{
            margin-top: 10px;
            padding-left: 50px;
            p{
                color: black;
            }
            img{
                max-width: 100px;
                margin: 5px;
            }
        }
        .foots{
            padding-left: 50px;
            margin-top: 10px;
            .right{
                float: right;
                margin-right: 10px;
               img{
                   width: 19px;
                   height: 19px;
               }
              
            }
        }
    }
}
</style>
