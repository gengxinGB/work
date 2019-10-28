<template>
    <div class="leaseorder">
       <div class="header"> <i class="mui-icon mui-icon-back" @click="bank"></i> <h4>确认订单</h4> </div>
         <div class="middle">
           <div class="addressbigbox">
                <div class="top">
                    <span>服装配送</span>
                    <span @click="inyourself">到店自取</span>
                </div>
         <div class="addressbox" >
          <div class="msginfo" v-if="defuteaddressshow">
           
          <p class="addressmsg">
              {{receiverInfo.addressInfo}}
          </p>
           <p class="usermsg">
              <span class="name">{{receiverInfo.receiverName}}</span>
              <span class="phone">{{receiverInfo.receiverPhone}}</span>
           </p>
          </div>
          <div class="msginfo" v-if="!defuteaddressshow">
              <p><i class="mui-icon mui-icon-location"></i> 请选择收货地址</p>
          </div>
          <div class="sleect" >
              <i class="mui-icon mui-icon-arrowright" @click="eadtaddress"></i>
          </div>
         </div>
          
          <div class="leasetimebox">
              <h4 class="timetitle">租借时间</h4>
              <div class="timenum">
                  <span class="left"> <span class="smsize">起租</span>  {{starttime}}</span>
                  <span class="smmiddle smsize">{{orderLeaseInfo.rentDays}}天</span>
                  <span><span class="smsize">归还</span> {{endtime}}</span>
              </div>
          </div>
          <div class="sendmode">
                <h4 class="sendtitle">配送方式</h4>
                <span>xx转送</span>
          </div>
              <div class="biaoshi"></div>
           </div>
          

           <div class="goodsmsg">
            <div class="toptitle">
                <img :src="orderLeaseInfo.supplierLogoUrl" alt="">
                <span class="storename"> {{orderLeaseInfo.supplierName}}</span>
            </div>
            <div class="goodsinfo">
                <div class="goodsimg"> <img :src="orderLeaseInfo.productPicUrl" alt=""></div>
                <div class="goodsmsginfo">
                    <p class="productname">{{orderLeaseInfo.productName}}</p>
                    <p>
                        颜色尺寸：{{orderLeaseInfo.sku}}
                    </p>
                </div>
                 <div class="rightbox">
                    ￥{{orderLeaseInfo.rentPrice}}/天
                </div>
            </div>
            <div class="leasetimemoney">
                <div class="list">
                    <div class="left">
                        <p class="title">配送费</p>
                    </div>
                    <div class="right">
                        <p class="price">￥0</p>
                    </div>
                </div>
                
            </div>
            <div class="tijiao">
                <span class="big"> <span class="small">合计:</span> {{orderLeaseInfo.rentTotalPrice}}元</span> <span class="btn" @click="inpay">提交订单</span>
            </div>
            
        </div>
        
       </div>
     
       


    </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
    data() {
        return {
            orderLeaseInfo:"",
            receiverInfo:"",
            defuteaddressshow:true,
            // 产品id
            productId:"",
            // 开始时间
            starttime:"",
            endtime:""
        }
    },
    created() {
        this.getorderinfo()
    },
    methods: {
        getorderinfo:function(){
            var customerAddrId=this.$route.query.customerAddrId
            // console.log(orderLeaseId)
            var data={
                customerAddrId:customerAddrId,
                // shippingType:""
            }
             this.axios.post("cusOrderLease/getOrderLeaseInfo",this.qs.stringify(data)).then(response=>{
                 console.log(response)
                if(response.status==200&&response.data.success==true){
                    //  this.leaseordermsg=response.data.data
                     this.orderLeaseInfo=response.data.data.orderLeaseInfo
                     this.starttime=this.orderLeaseInfo.rentStartDate.split(" ")[0]
                     this.endtime=this.orderLeaseInfo.rentEndDate.split(" ")[0]
                     this.receiverInfo=response.data.data.receiverInfo
                    //  console.log(this.receiverInfo.length)
                    // console.log(this.receiverInfo)
                    this.productId=response.data.data.orderLeaseInfo.productId
                     if(this.receiverInfo==null){
                         this.defuteaddressshow=false
                     }
                }

             })
        },
        bank:function(){
             this.$router.go(-1)
            //  this.$router.push({path:"/lease/leasegoodsinfo",query:{productId:this.productId}})
        },
        // 点击进去支付页面
        inpay:function(){
            MessageBox("提示", "提交成功，跳转到支付页面");
        },
        // 点击修改地址也面
        eadtaddress:function(){
            this.$router.push({path:"/editaddress"})
        },
        // 点击进入到店自取页面
        inyourself:function(){
            this.$router.push({path:"/lease/leaseorderyourself"})
        }
    },
}
</script>
<style lang="scss" scoped>
    .leaseorder{
        padding-top: 45px;
        .header{
            height: 45px;
            width: 100%;
            position: fixed;
            top: 0;
            z-index: 10;
            background-color: #FFB7B7;
            display: flex;
            // justify-content: space-between;
            i{
              line-height: 45px;
              color: #ffffff;
            }
            h4{
                color: #ffffff;
                margin:auto;
            }
        }
        .middle{
             height: 114px;
            width: 100%;
            background-color: #FFB7B7;
            padding-top: 20px;
             margin-bottom: 50px;
            //  overflow: auto;
            .addressbigbox{
                margin: 0 12px;
                background-color: #ffffff;
                padding: 8px 16px;
                position: relative;
                .biaoshi{
                     position: absolute;
                   width: 180px;
                   height: 10px;
                   background-color: #ffffff;
                   top: -10px;
                   left: 0;
                //    z-index: 999;
                   border-top-right-radius: 8px;
                }
                .top{
                    width: 100%;
                    display: flex;
                    span{
                        // width: 50%;
                        flex: 1;
                        text-align: center;
                        font-size:16px;
                        font-weight:500;
                        color:rgba(77,77,77,1);
                    }
                }
            }
        }
        .addressbox{
                background-color: #ffffff;
                display: flex;
                margin-top: 16px;
                border-bottom: 1px solid #cccccc;
               
                .msginfo{
                    .usermsg{
                        .name{
                            font-size: 16px;
                            font-size:14px;
                            font-weight:500;
                            color:rgba(95,95,95,1);
                        }
                        .phone{
                            margin-left: 10px;
                            font-size:14px;
                            font-weight:500;
                            color:rgba(95,95,95,1);
                        }
                    }
                    .addressmsg{
                        font-size:18px;
                        font-weight:600;
                        color:rgba(95,95,95,1);
                    }
                }
                .sleect{
                    margin-left: auto;
                    width: 20px;
                    height: 20px;
                    background-color: #FFB7B7;
                    border-radius: 20px;
                    text-align: center;
                    line-height: 20px;
                    i{
                        font-size: 16px;
                        font-weight: 600;
                        color: #ffffff;
                    }
                }
               
        }
        .leasetimebox{
            margin-top: 8px;
            .timetitle{
                font-size:18px;
                font-weight:600;
                color:rgba(95,95,95,1);
            }
            .timenum{
                display: flex;
                justify-content: space-between;
                .smsize{
                    font-size:13px;
                    font-weight:500;
                    color:rgba(95,95,95,1);
                }
            }
         
        }
           .sendmode{
                margin-top: 10px;
                .sendtitle{
                    font-size:18px;
                    font-weight:600;
                    color:rgba(95,95,95,1);
                }
            }
        .goodsmsg{
            background-color: #ffffff;
            // margin: 6px 6px 0 6px;
            margin: 8px 12px;
            padding: 10px;
            border-radius: 8px;
            .toptitle{
                margin-bottom: 5px;
                .storename{
                    font-size:18px;
                    font-weight:600;
                    color:rgba(95,95,95,1);
                }
                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50px;
                    vertical-align: middle;
                }
            }
            .goodsinfo{
                width: 100%;
                display: flex;
                // flex-wrap: wrap;
                .goodsimg{
                    width: 80px;
                    height: 100px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 8px;
                    }
                }
                .goodsmsginfo{
                    flex: 1;
                    padding: 0 8px;
                    p{
                        word-break: break-all
                    }
                    .productname{
                       
                        font-size: 14px;
                        font-weight:600;
                        color:rgba(95,95,95,1);
                    }
                }
                .rightbox{
                    width: 80px;
                }
            }
            .leasetimemoney{
                border-top: 1px solid #cccccc;
                padding-top: 10px;
                p{
                    margin: 0;
                }
                margin-top: 8px;
                .list{
                    display: flex;
                    justify-content: space-between;
                    .left{
                        .title{
                            font-size:14px;
                            font-weight:500;
                            color:rgba(95,95,95,1);
                        }
                    }
                    .right{
                        .price{
                            font-size:16px;
                            font-weight:600;
                            color:rgba(95,95,95,1);
                        }
                    }
                }
            }
            .tijiao{
                position: fixed;
                bottom: 0;
                background-color: #FFB7B7;
                // margin-top: 25px;
                left: 50%;
                transform: translateX(-50%);
                border-radius:24px;
                height: 47px;
                width: 90%;
                display: flex;
                flex-flow:  row nowrap;
                justify-content: space-between;
                line-height: 47px;
                .btn{
                    // padding: 6px 16px;
                   font-size:16px;
                    font-weight:600;
                    color:rgba(255,255,255,1);
                    padding: 0 30px;
                    border-left: 2px solid #ffffff;
                }
                .big{
                     font-size:16px;
                    font-weight:600;
                    color:rgba(255,255,255,1);
                    padding-left: 20px;
                    .small{
                        font-size:12px;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                    }
                }
            }
        }
    }
</style>