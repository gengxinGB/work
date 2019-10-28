<template>
    <div class="shopcarbox">
       <div class="header">
           <div class="heardertop">
               <span class="shopcar">购物车</span>
                <span class="room" @click="infittingroom">试衣间</span>
           </div>
           <p class="numgoods">{{nummsg}}件宝贝</p>
       </div>
      
       <div class="content">
           <div class="nogoods" v-if='nogoodsshow'>
               <span>空空如也，去逛逛把 >></span>
           </div>
            <div class="contentmsg" v-for="(item,index1) in msglist" :key="index1">
                 <div class="data_list">
                    <input type="checkbox" class="check_box tui-checkbox checkbox" @change="selectItem1(item)" v-model="item.checked">
                    <span class="storename">{{item.supplierName}}</span>
                    <span class="lingjuan">领券</span>
                  </div>
                  <div class="goodsmsg" v-for="(otem,index) in item.proMapList" :key="index">
                       <div class="data_list">
                         <input type="checkbox" class="check_box tui-checkbox" @change="selectItem2(item,otem)" v-model="otem.checked">
                       </div>
                       <div class="picbox">
                           <img :src="otem.picUrl" alt="">
                       </div>

                       <div class="wordmsg">
                            <p class="wordmore">{{otem.productName}}</p>
                            <p class="canshu" @click="getproductskulist(otem.productId,otem.cartId,index1,index)">规格：{{otem.productSpecs}} <i class="mui-icon mui-icon-arrowdown"></i> </p>
                            <div class="pricenum">
                                <span class="pricecolor">￥{{otem.price}}</span>
                                <div class="numbox">
                                  <!-- "-"按钮，点击可减小当前数值 -->
                                  <span class="leftbtn" type="button" @click="jian(index1,index,otem.cartId)">-</span>
                                  <input class="middleinput" type="text" v-model="otem.productAmount" readonly/>
                                  <!-- "+"按钮，点击可增大当前数值 -->
                                  <span class="rightbtn" type="button" @click="add(index1,index,otem.cartId)">+</span>
                                </div>
                            </div>
                       </div>
                  </div>

            </div>

              


       </div>
    <div class="footer">
         <div class="data_list">
             <label class="allxuan">
                <input type="checkbox" class="check_box tui-checkbox" @change="allselect" v-model="checkAll"> 全选
             </label>
         </div>
       <div class="right">
           <span class="delbox" @click="delshopcarmsg">删除</span>
           <span>合计：￥{{money}}</span>
           <span class="settlement" @click="jiesuan">结算</span>
       </div>
    </div>   
    
<mt-popup class="popupbox"
  v-model="popupVisible"
  position="bottom">
  <div class="goodsbox">
      <div class="headerbox">
          <i class="mui-icon mui-icon-close" @click="closebox"></i>
      </div>
      <div class="topmsg">
          <img :src="picurl" alt="">
          <div class="right">
              <h3>￥{{price}}</h3>
              <p>库存：{{skunum}}件</p>
              <p>已选：{{guige}}</p>
          </div>
      </div>
      <div class="guige">
          <h4>规格</h4>
          <ul class="guigebox">
              <li v-for="(item,index) in skumsg" :key="index" @click="edit(item,index)" :class="{active:index==active}">{{item.productSpecs}}</li>
          </ul>
      </div>
      <div class="footerbox">
          <span @click="surebtn">确定</span>
      </div>
  </div>
</mt-popup>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            value:"",
            options:[],
            hehe:[],
            // 购物车页面数据
            msglist:[],
            nummsg:0,
            // 全选按钮的状态
            checkAll: false,
            money:0,
            // 弹出框的显示与影藏
            popupVisible:false,
            // 选择规格的信息
            skumsg:[],
            // 价格
            price:0,
            skunum:0,
            guige:'',
            picurl:'',
            // 高亮的数据
            active:-1,
            // 购物车id
            cartId:0,
            // skuid的信息
            skuId:0,
            // 产品规格
            productSpecs:'',

            // 选择框头部信息
            popusmsg:{},
            // 选中的所在信息
            nowindex:0,
            index:0,
            index1:0,
            // 是否有商品
            nogoodsshow:false
        }
    },
    created() {
        Indicator.open('加载中...');
        this.getshopcarmsg()
    },
    watch: {
        popupVisible(value){
            // console.log(1)
            console.log(value)
            this.skumsg=[]
             this.price=0,
            this.skunum=0,
            this.guige='',
            this.active=-1
        }
    },
    methods: {
        // 加减按钮的事件
        jian:function(index1,index,id){
            var num=this.msglist[index1].proMapList[index].productAmount
            if(num==1){
                num=1
            }else{
                num=num-1
            }
            var data={
                cartId:id,
                productAmount:num
            }
            this.axios.post('cusOrderCart/changeProductAmount',this.qs.stringify(data)).then(response=>{
                if(response.data.success==true){
                   this.msglist[index1].proMapList[index].productAmount=num
                    this.getprice()
                }
            })
            

        },
        add:function(index1,index,id){
            var num=this.msglist[index1].proMapList[index].productAmount
            num=num+1
            var data={
                cartId:id,
                productAmount:num
            }
            this.axios.post('cusOrderCart/changeProductAmount',this.qs.stringify(data)).then(response=>{
                 console.log(response)
                if(response.data.success==true){
                     this.msglist[index1].proMapList[index].productAmount=num
                    this.getprice()
                }else if(response.data.success==false&&response.data.errorMsg=="库存不足"){
                        Toast({
                          message: '库存不足',
                          duration: 500
                        });
                        num=num-1
                        this.msglist[index1].proMapList[index].productAmount=num
                        this.getprice()
                }

            })
           
        },

        // 点击进入试衣间
        infittingroom:function(){
            this.$router.push({path:'/fittingroom'})
        },
        // 获取总价的方法
         getprice:function(){
             var price=0
            
             for(var i=0;i<this.msglist.length;i++){
                 for(var k=0;k<this.msglist[i].proMapList.length;k++){
                     if(this.msglist[i].proMapList[k].checked==true){
                         price=this.msglist[i].proMapList[k].price*this.msglist[i].proMapList[k].productAmount+price
                         
                    }
                 }
             }
             this.money=price
         },

        // 点击关闭弹窗
        closebox:function(){
            this.popupVisible=false
        },

        // 点击删除按钮，删除购物车商品
        delshopcarmsg:function(){
            var cartIdList=""
            for(var i=0;i<this.msglist.length;i++){
                 for(var k=0;k<this.msglist[i].proMapList.length;k++){
                     if(this.msglist[i].proMapList[k].checked==true){
                        //  cartIdList.push(parseInt(this.msglist[i].proMapList[k].cartId))
                       cartIdList=this.msglist[i].proMapList[k].cartId+","+cartIdList

                     }
                 }
            }
            if(cartIdList==""){
                 Toast({
                   message: "请选择删除的商品",
                   duration: 500
                });
                return
            }
            cartIdList=cartIdList.substring(0,cartIdList.length-1)
            console.log(cartIdList)
            console.log(JSON.stringify(cartIdList))

            //  cartIdList=JSON.stringify(cartIdList)
            var data={
                cartIdListStr:cartIdList
            }
             this.axios.post('cusOrderCart/deleteCartByIdList',this.qs.stringify(data)).then(response=>{
                 console.log(response)
                 this.getshopcarmsg()
                 if(response.data.success==true){
                      Toast({
                       message: "删除成功",
                       duration: 500
                     });
                     
                 }else if(response.data.success==false){
                        Toast({
                      message: response.data.errorMsg,
                      duration: 500
                    });
                 }
             })
        },


        // 最里层的选择事件
        selectItem2:function(item1,otem){
            // console.log(typeof(otem.checked))
            console.log(item1)
            console.log(otem)
            let lengths=item1.proMapList.length

               let checkeds = item1.proMapList.filter(i => {
                    return i.checked == true;
                });
                 if (lengths == checkeds.length) {
                     item1.checked = true;
                 } else {
                     item1.checked = false;
                     this.checkAll=false
                 }

                var arr=[]
                    this.msglist.forEach(i=>{
                        console.log(i)
                        if(i.checked==true){
                            // this.checkAll=true
                            arr.push(true)
                        }
                    })
                    if(arr.length!=this.msglist.length){
                        this.checkAll=false
                    }else{
                        this.checkAll=true
                    }
                    this.getprice()

        },
        // 店铺层
            selectItem1:function(item1){
                  item1.proMapList.forEach(i => {
                        i.checked = item1.checked;
                    })
                    var arr=[]
                    this.msglist.forEach(i=>{
                        console.log(i)
                        if(i.checked==true){
                            // this.checkAll=true
                            arr.push(true)
                        }
                    })
                    if(arr.length!=this.msglist.length){
                        this.checkAll=false
                    }else{
                        this.checkAll=true
                    }
                     this.getprice()

            },

            // 全选按钮
            allselect:function(){
                 this.msglist.forEach(item => {
                        item.checked = this.checkAll;
                        item.proMapList.forEach(item => {
                        item.checked = this.checkAll;
                     });
                })
                 this.getprice()

            },
            // 修改产品参数按钮
            getproductskulist:function(id,cartId,index1,index){
                this.index=index
                this.index1=index1
                this.cartId=cartId
                this.popupVisible=true
                this.axios.get('cusOrderCart/getProductSkuListInCart?productId='+id).then(response=>{
                    console.log(response)
                    this.skumsg=response.data.data
                    for(var i=0;i<this.skumsg.length;i++){
                        this.picurl=this.skumsg[0].picUrl
                    }
                })
            },
            // 点击修改元素
            edit:function(item,i){
                this.skuId=item.id
                this.productSpecs=item.productSpecs
                this.nowindex=i
                // 点击高亮显示
                this.active=i
                console.log(item)
                this.price=item.productPrice
                this.skunum=item.skuStock
                this.guige=item.productSpecs
                this.picurl=item.picUrl
            },
            
            // 点击确认按钮修改元素
            surebtn:function(){
                    var data={
                        cartId:this.cartId,
                        skuId:this.skuId
                    }
                    if(this.skuId==0){
                        this.popupVisible=false
                        return
                    }
                  this.axios.post('cusOrderCart/updateProductSku',this.qs.stringify(data)).then(response=>{
                      console.log(response)
                      if(response.data.success==true){
                            // this.msglist[this.nowindex].productSpecs=this.productSpecs
                            console.log(this.index1)
                            console.log(this.index)
                            this.msglist[this.index1].proMapList[this.index].productSpecs=this.productSpecs
                            this.msglist[this.index1].proMapList[this.index].picUrl=this.picurl
                            this.msglist[this.index1].proMapList[this.index].price=this.price
                            console.log(this.msglist[this.index1].proMapList[this.index].productSpecs)
                            this.popupVisible=false
                             Toast({
                              message: "修改成功",
                              duration: 500
                            });
                      }
                  })
            },


        // 页面加载获取购物车的信息
        getshopcarmsg:function(){
            this.axios.get('cusOrderCart/queryCartByCus').then(response=>{
                this.$store.commit('stecoupon',"")
                // this.$store.commit('stecoupon',arr)
                console.log(response)
                if(response.data.success==false){
                        Toast({
                          message: response.data.errorMsg,
                          duration: 500
                        });
                        Indicator.close();
                        localStorage.removeItem("userName")
                        this.$router.push({path:'/login'})
                }else if(response.data.success==true){
                    if(JSON.stringify(response.data.data) == "{}"){
                        this.nogoodsshow=true
                         this.msglist=response.data.data.CartMapList
                          this.nummsg=0
                          this.checkAll=false
                        //   this.money()
                         Indicator.close();
                        return
                    }
                    Indicator.close();
                    this.nogoodsshow=false
                    this.nummsg=response.data.data.proNum
                    this.msglist=response.data.data.CartMapList
                    console.log(this.msglist)
                }
            })
        },


        // 结算按钮的事件
        jiesuan:function(){
            var arr=[]
            for(var i=0;i<this.msglist.length;i++){
                for(var k=0;k<this.msglist[i].proMapList.length;k++){
                      if(this.msglist[i].proMapList[k].checked==false){
                         
                    }else{
                        // arr.push(true)
                        // console.log(222222222)
                        arr.push(this.msglist[i].proMapList[k].cartId)
                    }
                }
            }
            console.log(arr)
            if(arr.length>=1){
                 this.$store.commit('setvalue',arr)
             this.$router.push({path:'/generateorder'})
            }else{
                 Toast({
                    message: "选择要结算的商品",
                    duration: 500
                 });
            }
            // console.log(this.hehe)
            // 
        }
    },
}
</script>
<style lang="scss" scoped>
    .shopcarbox{
        padding-bottom: 52px;
        // 弹出框样式
        .popupbox{
            width: 100%;
           
            .goodsbox{
                position: relative;
                padding: 0 5px 0 20px;
                 min-height:300px ;
                 margin-bottom: 40px;
                .headerbox{
                    text-align: right;
                    i{
                        margin-top: 4px;
                        margin-right: 4px;
                    }
                }
                .topmsg{
                    display: flex;
                    img{
                        width: 100px;
                        height: 100px;
                    }
                    .right{
                        margin-left: 16px;
                        h3{
                            color: #D42828;
                        }
                        p{
                            font-size: 16px;
                            color: #000;
                        }
                    }
                }
                .guige{
                    h4{
                        border-bottom: 1px solid #cccccc;
                        padding: 3px 0;
                    }
                    .guigebox{
                        display: flex;
                        flex-wrap: wrap;
                        li{
                            width: 25%;
                            border: 1px solid #cccccc;
                            margin: 6px;
                            text-align: center;
                            // padding: 2px 4px;
                            border-radius: 4px;
                        }
                        .active{
                            background-color: #FFB7B7;
                            color: #fff;
                        }
                    }
                }
                .footerbox{
                    position: fixed;
                    bottom: 0;
                    height: 40px;
                    line-height: 40px;
                    left: 50%;
                    transform: translateX(-50%);
                    span{
                        padding: 4px 16px;
                        background-color: #FFB6B1;
                        color: #fff;
                        border-radius: 4px;
                        font-size: 14px;
                    }
                }
            }
        }


         .tui-checkbox:checked {
                 background: #1673ff;
                 border: solid 1px #1673ff;
                 }
                .tui-checkbox {
                  width: 20px;
                  height: 20px;
                  background-color: #ffffff;
                  border: solid 1px #939393;
                  -webkit-border-radius: 50%;
                  border-radius: 50%;
                  font-size: 0.8rem;
                  margin: 0;
                  padding: 0;
                  position: relative;
                  display: inline-block;
                  vertical-align: top;
                  cursor: default;
                  -webkit-appearance: none;
                  -webkit-user-select: none;
                  user-select: none;
                 -webkit-transition: background-color ease 0.6s;
                 transition: background-color ease 0.6s;
                 }
                .tui-checkbox:checked::after {
                      content: '';
                      top: 0.1rem;
                      left: 0.09rem;
                      position: absolute;
                      background: transparent;
                      border: #fff solid 2px;
                      border-top: none;
                      border-right: none;
                      height: 0.12rem;
                      width: 0.25rem;
                      -moz-transform: rotate(-45deg);
                      -ms-transform: rotate(-45deg);
                      -webkit-transform: rotate(-45deg);
                      transform: rotate(-45deg);
                    }
          .header{
            width: 100%;
            height: 143px;
            background-color: #FFB7B7;
            padding: 10px 16px;
            .heardertop{
            display: flex;
             flex-direction: row;
             justify-content: space-between;
             .shopcar{
                 font-size:20px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(255,255,255,1);
             }
             .room{
                   padding: 3px 8px;
                   background-color: #FFD523;
                   border-radius: 10px;
                   font-size:12px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(255,255,255,1)
               }
            }
            .numgoods{
                font-size:14px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:20px;
            }
            
        }
        .content{
             margin: 0 17px;
             margin-top: -65px;
             .nogoods{
                 color: #fff;
             }
           
            .contentmsg{
                padding: 10px;
                border-radius: 10px;
                background-color: white;
                margin-bottom: 10px;
                .storename{
                    font-size:16px;
                    font-family:PingFangSC;
                    font-weight:600;
                    color:rgba(76,76,76,1)
                }
                .lingjuan{
                    float: right;
                    font-size:12px;
                    font-family:PingFang-SC;
                    font-weight:500;
                    color:rgba(76,76,76,1);
                }
               
            }
            .goodsmsg{
                display: flex;
                margin-top: 10px;
                .data_list{
                    margin-top: 20px;
                }
                .picbox{
                    // widows: 81px;
                    // height: 81px;
                     margin-left: 12px;
                    // width:81px;
                    // height:81px;
                     img{
                    // width: 100%;
                    // height: 100%;
                    border-radius: 10px;
                     width:81px;
                    height:81px;

                }
                }
               
                .wordmsg{
                    padding: 0 35px 0 12px;
                    width: 100%;
                    p{
                        margin: 0;
                        padding: 0;
                    }
                    .wordmore{
                        font-size:12px;
                        font-family:PingFang-SC;
                        font-weight:500;
                        color:rgba(76,76,76,1);
                        line-height:17px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    .canshu{
                        margin-top: 2px;
                        font-size: 10px;
                        background-color: #EDEDED;
                        white-space :nowrap; 
                        i{
                            font-size: 10px;
                        }
                    }
                    .pricenum{
                        display: flex;
                        justify-content: space-between;
                        margin-top: 6px;
                        .pricecolor{
                            color: #D42828;
                        }
                        .numbox {
                            position: relative;
                            height: 20px;
                            width: 60px;
                            .leftbtn{
                                width: 15px;
                                height: 22px;
                                border: 1px solid #cccccc;
                                 position: absolute;
                                 line-height: 20px;
                                 text-align: center;
                                left: 0;
                            }
                            .middleinput{
                                width: 100%;
                                height: 20px;
                                text-align: center;
                            }
                            .rightbtn{
                                width: 15px;
                                 height: 22px;
                                 border: 1px solid #cccccc;
                                 position: absolute;
                                 line-height: 20px;
                                 text-align: center;
                                 right: 0;
                                 top: 0;
                            } 
                        }
                    }
                }
            }
        }
        .footer{
            width: 100%;
            height: 52px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 14px 0px rgba(0,0,0,0.1);
            opacity:0.9671;
            position: fixed;
            bottom: 52px;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            // line-height: 50px;
            .data_list{
               margin-top: 20px; 
            }
            .right{
                text-align: right;
                line-height: 52px;
                .delbox{
                    // display: inline-block;
                    // width:52px;
                    // height:20px;
                    padding: 1px 10px;
                    border-radius:13px;
                    border-color: #E02626;
                    border:1px solid rgba(224,38,38,1);
                    font-size:14px;
                    color: #D42828;
                }
                .settlement{
                    padding:4px 14px;
                    background-color: #FFB7B7;
                    border: none;
                    border-radius: 13px;
                    color: #FFFFFF;
                    // font-size: 16px;
                }
            }
        }
    }
</style>