<template>
    <div class="memberbox">
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h3>会员卡</h3>
       </div>

       <div class="membermsg">
           <img :src="membermsg.headPic" alt="">
           <div class="right">
               <p class="username">{{membermsg.customerName}}</p>
              <p class="time" v-if='membermsg.isMember==1?true:false'>到期时间：{{membermsg.memberStartDate}} — {{membermsg.memberEndDate}}</p>
              <p class="time" v-if='membermsg.isMember==0?true:false'>您当前还不是会员,是否<span class="chongzhi"  @click="paymember">充值</span></p>
           </div>
       </div>
       <div class="content">
           <img src="../../assets/newimg/vip.png" alt="">
           <span class="paybtn" @click="paymember">立即充值</span>
       </div>
       <!-- <div class="footer">
           <p v-if="">您暂时还不是会员哦。</p>
           <p>会员到期时间：2019.09.18  ~  2019.10.18</p>
       </div> -->
    </div>
</template>
<script>
import { Toast } from 'mint-ui';

export default {
    data() {
        return {
            ismember:true,
            membermsg:{}
        }
    },
    created() {
        this.getmembermsg()
    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
        // 点击进入充值页面
        paymember:function(){
            this.$router.push({path:"/paymember"})
        },
        getmembermsg:function(){
             this.axios.get('cusPersonalCenter/myVIPCard').then(response=>{
                 console.log(response)
                 if(response.data.success==true){
                     this.membermsg=response.data.data
                 }else if(response.data.success==false){
                     Toast({
                      message: response.data.errorMsg,
                      duration: 500
                    });
                 }
             })
        }
    },
}
</script>
<style lang="scss" scoped>
    .memberbox{
            padding-top: 45px;
            background-color: #ffffff;
            padding-bottom: 10px;
        .header{
            width: 100%;
            height: 45px;
            background-color: #FFB7B7;
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
        .membermsg{
             margin: 10px 14px;
             display: flex;
             p{
                 margin: 0;
                 margin: 2px 0;
             }
             img{
                 width: 50px;
                 height: 50px;
                 border-radius: 50px;
             }
             .right{
                 margin-left: 10px;
                 .username{
                     font-size: 16px;
                     color: #000;
                 }
                 .chongzhi{
                     color: blue;
                     font-size: 16px;
                 }
             }
        }
        .content{
            // width: 100%;
            height: 206px;
           
            margin: 10px 14px;
            position: relative;

            img{
                width: 100%;
                height: 100%;
            }
            .paybtn{
                position: absolute;
                padding: 1px 12px;
                background:linear-gradient(to left,#B98F6D,#DFCFC1);
                font-size: 12px;
                color: #ffffff;
                border-radius: 6px;
                bottom: 35px;
                left: 130px;
            }
        }
        // .footer{
        //       margin: 10px 14px;
        //       text-align: center;
        //       p{
        //           font-size: 16px;
        //           color: #000;
        //       }
        // }

     
    }
</style>