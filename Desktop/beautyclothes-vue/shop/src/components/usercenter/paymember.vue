<template>
    <div class="paymemberbox">
       <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h3>充值会员</h3>
       </div>
       <div class="usermsg">
            <img :src="membermsg.headPic" alt="">
            <div class="right">
                <p class="topname">{{membermsg.customerName}}</p>
                <p class="membertime">您的会员还有{{endtime}}到期</p>
            </div>
       </div>
       <div class="content">
           <div class="viptime" :class="{active:0==active}" @click="change(0,mouth,mouthprice)">
               <p class="time" >包月</p>
               <p class="price"> <i>￥</i>{{mouth}}</p>
               <span class="nocolor">￥{{mouthprice}}</span>
           </div>
          <div class="viptime"  :class="{active:1==active}" @click="change(1,quarter,quarterprice)">
               <p class="time">包季</p>
               <p class="price"> <i>￥</i>{{quarter}}</p>
               <span class="nocolor">￥{{quarterprice}}</span>
           </div>
           <div class="viptime"  :class="{active:2==active}" @click="change(2,year,yearprice)">
               <p class="time">包年</p>
               <p class="price"> <i>￥</i>{{year}}</p>
              <span class="nocolor">￥{{yearprice}}</span>
           </div>

       </div>
       <div class="middle">
           <p class="msglist firstlist">
               <span>选择会员城市</span>
               <span>南京 <i class="mui-icon mui-icon-arrowright ancolor"></i> </span>
           </p>
           <p class="msglist">
               <span>会员红包</span>
               <span>领取 <i class="mui-icon mui-icon-arrowright ancolor"> </i> </span>
           </p>
       </div>

        <div class="footer">
           <div class="contentmsg">
           <p class="left">
               已优惠{{youhui}}元
           </p>
           <p class="right">
            <span class="hejiword">合计<i class="red">￥{{price}}</i></span>
            <span class="lijibtn" @click="openmembership">支付</span>
           </p>
           </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            active:0,
            mouth:20,
            quarter:50,
            year:200,
            price:20,
            days:31,
            value:[],
            // 获取充值页面的信息
            membermsg:{},
            // 优惠价格
            mouthprice:25,
            quarterprice:60,
            yearprice:240,
            youhui:5,
            // 到期时间
            endtime:0,
        }
    },
    created() {
        this.getmembermsg()
    },
    methods: {


        //时间戳转换方法    date:时间戳数字
 formatDate(date) {
  var date = new Date(date);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  return YY + MM + DD
},

// 将系统世间转化为yyyy-mm-dd
 time:function() {
     let nowDate = new Date()
     let year = nowDate.getFullYear()
     let month = nowDate.getMonth() + 1
     let day = nowDate.getDate()
     if (month < 10) month = '0' + month
     if (day < 10) day = '0' + day
     return year + '-' + month + '-' +day
 },

        bank:function(){
            this.$router.go(-1)
        },
        // 点击选择套餐
        change:function(i,num,price){
            this.active=i
            this.price=num
            console.log(num)
            console.log(price)
            this.youhui=price-num
            if(i==0){
                this.days=31
            }else if(i==1){
                this.days=93
            }else if(i==2){
                this.days=365
            }
            // console.log(this.days)
        },
        // 获取会员信息
               getmembermsg:function(){
             this.axios.get('cusPersonalCenter/myVIPCard').then(response=>{
                 console.log(response)
                 
                 if(response.data.success==true){
                     this.membermsg=response.data.data
                   this.endtime=this.DateMinus(this.time(),this.membermsg.memberEndDate)
                  console.log(this.DateMinus(this.time(),this.membermsg.memberEndDate))
                 }else if(response.data.success==false){
                     Toast({
                      message: response.data.errorMsg,
                      duration: 500
                    });
                 }
             })
        },
          DateMinus:function (date1,date2){//date1:小日期   date2:大日期
  　　var sdate = new Date(date1); 
  　　var now = new Date(date2); 
     console.log(sdate)
  　　var days = now.getTime() - sdate.getTime(); 
  　　var day = parseInt(days / (1000 * 60 * 60 * 24)); 
  　　return day; 
  },


        // 点击立即开通按钮之后的事件
        openmembership:function(){
            var data={
                days:this.days,
                money:this.price
            }
            console.log(this.days)
             this.axios.post('cusPersonalCenter/memberRecharge',this.qs.stringify(data)).then(response=>{
                 console.log(response)
                 if(response.data.success==true){
                      Toast({
                      message:"充值会员成功",
                      duration: 500
                    });
                     this.$router.go(-1)
                 }else if(response.data.success==false){
                      Toast({
                      message:response.data.errorMsg,
                      duration: 500
                    });
                 }
             })
        }
    },
}
</script>
<style lang="scss" scoped>
    .paymemberbox{
          background-color: #ffffff;
        padding-bottom: 10px;
        padding-top: 45px;
          .header{
            width: 100%;
            height: 45px;
            background-color: #4C4447;
            position: fixed;
            top: 0;
            z-index: 99;
            display: flex;
            // justify-content: space-between;
            i{
                line-height: 45px;
                color:rgba(255,255,255,1);
            }
            h3{
                text-align: center;
                width: 100%;
                line-height: 35px;
                font-size:18px;
                font-family:PingFangSC;
                font-weight:600;
                color:rgba(255,255,255,1);
            }

        }
        .usermsg{
            background-color: #4C4447;
            display: flex;
            padding: 28px 12px;
            img{
                width: 44px;
                height: 44px;
                border-radius: 44px;
            }
            .right{
                margin-left: 16px;
                p{
                    margin: 0;
                }
                .topname{
                    font-size:14px;
                    font-family:PingFangSC-Semibold,PingFangSC;
                    font-weight:600;
                    color:rgba(255,255,255,1);
                }
                .membertime{
                    font-size:12px;
                    font-family:PingFang-SC-Medium,PingFang-SC;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                }
            }
        }
        .content{
          
            display: flex;
            // width: 100%;
            margin: 10px;
            .viptime{
                background-color: #ffffff;
                width: 33.33%;
                margin-right: 36px;
                border: 1px solid #cccccc;
                text-align: center;
                 padding: 10px 10px 20px 10px;
                 min-width: 90px;
                // padding: 
                border-radius: 5px;
                .time{
                   font-size:16px;
                   font-family:PingFangSC-Semibold,PingFangSC;
                   font-weight:600;
                   color:rgba(76,68,71,1);
                }
                .price{
                    margin-top: 20px;
                    font-size:31px;
                    font-family:PingFangSC-Semibold,PingFangSC;
                    font-weight:600;
                    color:rgba(247,74,28,1);
                    i{
                        font-size:16px;
                        font-family:PingFang-SC-Medium,PingFang-SC;
                        font-weight:500;
                        color:rgba(247,74,28,1);
                        font-style: normal;
                    }
                }
                .nocolor{
                    font-size: 14px;
                    font-weight: 500;
                    color:rgba(181,181,181,1);
                    text-decoration: line-through;
                }
            }
            .active{
               border:1px solid rgba(255,228,182,1);
               background-color:rgba(255,245,231,1);
                .time{
                    color:#FF6E6E;
                }
                
            }
        }
        .middle{
            padding: 10px 20px;
            .msglist{
                display: flex;
                justify-content: space-between;
                span{
                    font-size:16px;
                    font-family:PingFangSC-Semibold,PingFangSC;
                    font-weight:600;
                    color:rgba(88,88,88,1);
                    .ancolor{
                        color: #D1D1D1;
                    }
                }
            }
            .firstlist{
                border-bottom: 1px solid #cccccc;
                padding: 10px 0;
            }
        }
        .footer{
            position: fixed;
            bottom: 5px;
            width: 100%;
            padding:0 14px;
           
            .contentmsg{
            width: 100%;
            height: 47px;
            display: flex;
            border-radius:24px;
            background-color: #4C4447;
            justify-content: space-between;
            line-height: 47px;
            padding: 0 20px 0 10px;
            }
            .left{
                font-size:12px;
                font-family:PingFang-SC-Medium,PingFang-SC;
                font-weight:500;
                color:rgba(255,255,255,1);
            }
            .right{
                margin: 0;
                .hejiword{
                    font-size:12px;
                    font-family:PingFang-SC-Medium,PingFang-SC;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    margin-right: 10px;
                    // line-height: 47px;
                    // vertical-align: middle;
                    .red{
                       vertical-align:bottom;
                        font-size:18px;
                        font-family:PingFangSC-Semibold,PingFangSC;
                        font-weight:600;
                        color:rgba(255,255,255,1);
                        font-style: normal;
                     }
                }
            }
          
            .lijibtn{
                // padding: 4px 16px;
                // background-color: #FFB7B7;
                display: inline-block;
                height: 47px;
                border-left: 1px solid #ffffff;
                padding-left: 35px;
                font-size:16px;
                font-family:PingFangSC-Semibold,PingFangSC;
                font-weight:600;
                color:rgba(255,255,255,1);
               
            }
        }
    }
</style>