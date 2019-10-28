<template>
    <div class="couponbox">
        <div class="header">
             <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h3>我的优惠券</h3>
        </div>
        <div class="content">
            <div class="coupon" v-for="(item,index) in coupomsglist" :key="index">
                <div class="left">
                    <h4>{{item.supplierName}}</h4>
                    <h2>{{item.discountAmount}}元</h2>
                    <h3>满{{item.targetAmount}}减{{item.discountAmount}}</h3>
                     <p>{{item.startTime.split('T')[0]}} ~ {{item.endTime.split('T')[0]}}</p>
                </div>
                <div class="right">
                    <span @click="instore(item.supplierId)">立即使用</span>
                </div>
            </div>
       

        </div>
        
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            coupomsglist:[]
        }
    },
    created() {
        this.getcouponmsg()
    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
        // 获取优惠券信息
        getcouponmsg:function(){
            this.axios.get('cusPersonalCenter/myCoupons').then(response=>{
                console.log(response)
                if(response.data.data.length==0){
                    Toast({
                     message: '暂无优惠券',
                     duration: 500
                });
                return
                }
                if(response.data.success==true){
                    this.coupomsglist=response.data.data
                }
            })
        },
        instore:function(id){
            this.$router.push({path:'/storeindex',query:{supplierId:id}})
        }
    },
}
</script>
<style lang="scss" scoped>
    .couponbox{
          padding-top: 45px;
          background-color: #ffffff;
        //   height: 100%;
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
                line-height: 45px;
                font-size:18px;
                font-family:PingFangSC;
                font-weight:600;
                color:rgba(255,255,255,1);
            }

        }
        .content{
            margin-top: 10px;
            padding-bottom:10px; 
            .coupon{
                // padding-bottom: 10px;
              
                width:320px;
                height:142px;
                // background-color: #FFB7B7;
                background-image: url("../../assets/newimg/storejuan.png");
                background-size: 100% 100%;
                margin: auto;
                  margin-top: 10px;
                display: flex;
                justify-content: space-between;
                .left{
                    h4{
                        color: #ffffff;
                        margin-left: 18px;
                        margin-top: 15px;
                        font-size: 16px;
                    }
                    h2{
                        margin-left: 60px;
                        color: #ffffff;
                        font-size: 40px;
                        font-weight: 500;
                    }
                    h3{
                        margin-left: 60px;
                        color: #ffffff;
                        font-weight: 500;
                    }
                    p{
                        margin-left: 20px;
                        color: #ffffff;
                    }
                }
                .right{
                     margin-top: 60px;
                    span{
                        margin-right: 22px;
                       
                        padding: 4px 12px;
                        background-color: #FFB7B7;
                        font-size: 14px;
                        color: #ffffff;
                        border-radius: 6px;
                    }
                }
            }
        }
    }
</style>