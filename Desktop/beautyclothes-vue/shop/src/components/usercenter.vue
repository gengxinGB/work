<template>
    <div class="userscontent">
     <div class="bigtobox">
          <div class="header">
         <div class="top"> <span> <img src="../assets/newimg/客服.png" alt=""></span> <span class="title">{{loginusermsg.customerName}}</span>  <span @click="insetup"> <img src="../assets/newimg/shezhi.png" alt=""></span></div>
        <div class="center">
            <div class="centertop">
            <span class="manysmpic zuji"> <img src="../assets/newimg/zuji (1).png" alt="" @click="infootprint">
                <p>足迹</p>
            </span>
              <img class="photo" :src="loginusermsg.headPic" alt="">
             <span class="manysmpic shoucang" @click="incollection">
                 <img src="../assets/newimg/shoucang_.png" alt="">
                 <p>收藏</p>
             </span>
            </div>
             <div class="footmsg">
                 <span @click="infans">
                     <p class="num">{{loginusermsg.fans}}</p>
                     <p>粉丝</p>
                 </span>
                 <span @click="infollow">
                     <p class="num">{{loginusermsg.concerns}}</p>
                     <p>关注</p>
                 </span>
             </div>
        </div>
      </div>

      <div class="middelmsg">
          <ul>
              <li @click="indelivergoods(0,keyword1)"> <img src="../assets/newimg/待付款.png" alt="">
                <p>{{keyword1}}</p>
               </li>
               <li  @click="indelivergoods(1,keyword2)"> <img src="../assets/newimg/待发货.png" alt="">
                <p>{{keyword2}}</p>
               </li>
               <li  @click="indelivergoods(2,keyword3)"> <img src="../assets/newimg/已发货.png" alt="">
                <p>{{keyword3}}</p>
               </li>
               <li  @click="indelivergoods(3,keyword4)"> <img src="../assets/newimg/退款售后.png" alt="">
                <p>{{keyword4}}</p>
               </li>
          </ul>
      </div>
     </div>

       <div class="usercenterlist">
         <p @click="inmyorder">
             <span >
                 <img src="../assets/newimg/订单.png" alt="">
                  我的订单
             </span>
             <i class="mui-icon mui-icon-forward"></i>
         </p>
          <p @click="inmembershipcard">
             <span>
                 <img src="../assets/newimg/会员卡.png" alt="">
                  会员卡
             </span>
             <i class="mui-icon mui-icon-forward"></i>
         </p>
          <p @click="incoupon">
             <span>
                 <img src="../assets/newimg/优惠券.png" alt="">
                  我的优惠券
             </span>
             <i class="mui-icon mui-icon-forward"></i>
         </p>
          <p @click="inmywallet">
             <span>
                 <img src="../assets/newimg/钱包.png" alt="">
                  我的钱包
             </span>
             <i class="mui-icon mui-icon-forward"></i>
         </p>
          <p @click="inaddress">
             <span>
                 <img src="../assets/newimg/地址.png" alt="">
                  我的地址
             </span>
             <i class="mui-icon mui-icon-forward"></i>
         </p>
           <!-- <p @click="inApplicationshop">
             <span>
                 <img src="../assets/newimg/店铺.png" alt="" >
                  申请店铺
             </span>
             <i class="mui-icon mui-icon-forward"></i>
         </p> -->
           <p>
             <span>
                 <img src="../assets/newimg/皮肤.png" alt="">
                  更换皮肤
             </span>
             <i class="mui-icon mui-icon-forward"></i>
         </p>
     </div>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginusermsg:{},
            // 付款集合的关键字
            keyword1:"待付款",
            keyword2:"待发货",
            keyword3:"已发货",
            keyword4:"退款/售后"
        }
    },
    created() {
        this.getusermsg()
    },
    methods: {
        
   

    // 页面加载获取用户信息
    getusermsg:function(){
        this.axios.get('cusPersonalCenter/showInPersonalCenter').then(response=>{
            console.log(response)
            this.loginusermsg=response.data.data
        })
    },
    // 点击进入收藏页面
    incollection:function(){
        this.$router.push('/collection')
    },
    //点击就如粉丝页面
    infans:function(){
        this.$router.push('/fans')
    },
    // 点击 进入收藏
    infollow:function(){
        this.$router.push('/follow')
    },
    // 点击进入足迹
    infootprint:function(){
        this.$router.push('/footprint')
    },
    // 点击进入待收款  待付款等页面
    indelivergoods:function(i,keyword){
        this.$router.push({path:'/delivergoods',query:{activeindex:i,keyword:keyword}})
    },

    //我的订单页面
    inmyorder:function(){
        this.$router.push({path:'/myorder'})
    } ,
    // 点击进入我的地址
    inaddress:function(){
        this.$router.push({path:'/myaddress'})
    },
    // 点击进入我的钱包页面
    inmywallet:function(){
        this.$router.push({path:'/mywallet'})
    },
    // 点击进去设置页面
    insetup:function(){
        this.$router.push({path:'/setup'})
    },
    // 点击进入会员卡页面
    inmembershipcard:function(){
        this.$router.push({path:'/membershipcard'})
    },
    // 点击进入优惠券页面
    incoupon:function(){
        this.$router.push({path:'/coupon'})
    }

    },


   
}
</script>
<style lang="scss" scoped>
.userscontent{
    .bigtobox{
       background-color: #FFFFFF;
    }
    
    .header{
       
        width: 100%;
        height: 253px;
        background: url("../assets/newimg/我的背景.png") no-repeat bottom;
         background-size: 100% 100%;
        padding: 10px 8px 0 8px;
        position: relative;
         background-color: #FFFFFF;
        .top{
            display: flex;
             align-items: center;
             justify-content: space-between;
             span{
                 img{
                     width: 28px;
                     height: 28px;
                 }
             }
             .title{
                 font-size: 18px;
                 color: #FFFFFF;
             }
        }
        .center{
            position: absolute;
            // width: 150px;
            // height: 150px;
           
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            .centertop{
                display: flex;
                text-align: center;
                .manysmpic{
                    // position: absolute;
                    // top: 50%;
                    margin-top: 38px;
                    white-space: nowrap;
                    p{
                        color: #FFFFFF;
                    }
                 img{
                    widows: 24px;
                    height: 24px;
                   
                }
            }
            .zuji{
                margin-right: 6px;
            }
            .shoucang{
                margin-left: 6px;
            }
            .photo{
                width: 115px;
                height: 115px;
                border-radius: 115px;
                //  vertical-align: middle;
            }
            }
            .footmsg{
                display: flex;
                width: 115px;
                margin: auto;
                justify-content: space-between;
                text-align: center;
                p{
                    margin: 0;
                    padding: 0;
                    font-size: 12px;
                    color: #FFFFFF;
                }
                .num{
                    font-size: 16px;
                }
            }
          
        }
    }
    .middelmsg{
        //  background-color: #FFFFFF;
        ul{
            display: flex;
            margin-top: 8px;
            li{
                width: 25%;
                // padding: 0 28px;
                 white-space: nowrap;
                text-align: center;
                p{
                    color: #565656;
                    font-size: 14px;
                }
                img{
                    width: 30px;
                    height: 25px;
                }
            }
        }
    }
    .usercenterlist{
        background-color: #FFFFFF;
        margin-top: 6px;
        font-size: 0;
        padding: 0 10px 0 6px;
        p{
            width: 100%;
            height: 40px;
            line-height: 40px;
            color: #565656;
            margin: 0;
            padding: 0;
            border-bottom: 1px solid #cccccc;
            img{
                width: 22px;
                height: 22px;
                vertical-align: middle;
            }
            i{
                line-height: 40px;
            }
            display: flex;
             justify-content: space-between;
        }
    }

}

</style>
