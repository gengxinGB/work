<template>
    <div class="leaseorder">
       <div class="header"> <i class="mui-icon mui-icon-back" @click="bank"></i> <h4>确认订单</h4> </div>
         <div class="middle">
           <div class="addressbigbox">
                <div class="top">
                    <span @click="insend">服装配送</span>
                    <span>到店自取</span>
                </div>
         <div class="addressbox" >
          <div class="msginfo">
           
          <p class="addressmsg">
              {{orderLeaseInfo.supplierAddress}}
          </p>
           <div class="usermsg">
               <div class="left">
              <h4 class="timetitle">自取时间</h4>
              <p class="time">
               {{orderLeaseInfo.receiverTime.split(" ")[1]}}
                <i class="mui-icon mui-icon-arrowright" @click="selecttime()"></i>
              </p>
              <p class="selestxiexi">
                <input type="checkbox" class="check_box tui-checkbox" v-model="checkAll" />
                <span class="xieyiword">
                  同意并接受
                  <a href="javascript:;">《到店自取协议》</a>
                </span>
              </p>
            </div>
            <div class="right">
              <p class="teletename">预留号码</p>
              <input type="text"  class="phone" v-model="orderLeaseInfo.receiverPhone" readonly>
              <!-- <i class="mui-icon mui-icon-compose"></i> -->
              <!-- <p class="phone">{{item.supMap.supplierPhone}}</p> -->
            </div>
           </div>
          </div>
         
         </div>
          
          <div class="leasetimebox">
              <h4 class="timetitle">租借时间</h4>
              <div class="timenum">
                  <span class="left"> <span class="smsize">起租</span>  8月25日</span>
                  <span class="smmiddle smsize">4天</span>
                  <span><span class="smsize">归还</span> 8月29日</span>
              </div>
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
       
            <div class="tijiao">
                <span class="big"> <span class="small">合计:</span> {{orderLeaseInfo.rentTotalPrice}}元</span> <span class="btn" @click="inpay">提交订单</span>
            </div>
            
        </div>
        
       </div>
     
       
  <mt-popup
          v-model="popupVisible"
            position="bottom">
     <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>    

     <span class="surebtn" @click="sureedittime">确定</span>
</mt-popup> 

    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            popupVisible:false,
            orderLeaseInfo:'',
            receiverInfo:'',
            defuteaddressshow:true,
            checkAll:true,
            timestr:'',
            productId:'',
        slots: [
         {
          flex: 1,
          values: ['今天'],
          className: 'slot1',
          textAlign: 'right'
        }, {
          divider: true,
          content: '',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['05:30','06:00','06:30','07:00','07:30','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00'],
          className: 'slot3',
          textAlign: 'left'
        },
      
      ],
        }
    },
    created() {
        this.getorderinfo()
           var tarr=[]
   for(var i=0;i<this.slots[2].values.length;i++){
      tarr.push(this.slots[2].values[i]+":00")
   }
   console.log(tarr)
   var date=new Date;
 var h = date.getHours()+1;
 h= h>10?h:'0'+h
 var m = date.getMinutes();
 m=m>10?m:'0'+m
 var s = date.getSeconds();
 s=s>10?s:'0'+s
 var strtimes=h+":"+m+":"+s
 console.log(strtimes)
console.log(strtimes)
var bigarr=[]
var smarr=[]
for(var i=0;i<tarr.length;i++){
  if(tarr[i]>strtimes){
     bigarr.push(tarr[i])
  }else{
     smarr.push(tarr[i])
    
  }

}
this.slots[2].values=bigarr
    },
    methods: {
        getorderinfo:function(){
            var customerAddrId=this.$route.query.customerAddrId
            // console.log(orderLeaseId)
            var data={
                customerAddrId:customerAddrId,
                shippingType:0
            }
             this.axios.post('cusOrderLease/getOrderLeaseInfo',this.qs.stringify(data)).then(response=>{
                 console.log(response)
                if(response.status==200&&response.data.success==true){
                    //  this.leaseordermsg=response.data.data
                     this.orderLeaseInfo=response.data.data.orderLeaseInfo
                     this.receiverInfo=response.data.data.receiverInfo
                     this.productId=response.data.data.orderLeaseInfo.productId
                    //  console.log(this.receiverInfo.length)
                    // console.log(this.receiverInfo)
                     if(this.receiverInfo==null){
                         this.defuteaddressshow=false
                     }
                }

             })
        },
         // 监听时间的变化
         onValuesChange(picker, values) {
              var date=new Date;
                var y = date.getFullYear()
                var m = date.getMonth() + 1
                m = m < 10 ? '0' + m : m
                var d = date.getDate()
                d = d < 10 ? ('0' + d) : d
              //  console.log(picker)
              console.log(values[0])    
                this.timestr=y+'-'+m+'-'+d+' '+values[1]
              this.edittime=values[1]
              console.log(this.edittime)
             console.log(this.timestr)
         },
         sureedittime:function(){
             this.orderLeaseInfo.receiverTime=this.timestr
             
             this.popupVisible=false
         },
        // 点击弹出选择时间组件
        selecttime:function(){
            this.popupVisible=true
        },
        bank:function(){
             this.$router.go(-1)
            // this.$router.push({path:'/lease/leasegoodsinfo',query:{productId:this.productId}})
        },
        // 点击进去支付页面
        inpay:function(){
            MessageBox('提示', '提交成功，跳转到支付页面');
        },
        // 点击修改地址也面
        eadtaddress:function(){
            this.$router.push({path:'/editaddress'})
        },
        // 点击进入服装配送
        insend:function(){
            this.$router.push({path:'/lease/leaseorder'})
        }
    },
}
</script>
<style lang="scss" scoped>
    .leaseorder{
        p{
            margin: 0;
        }
         .mint-popup-bottom{
            width: 100%;
            min-height: 300px;
            background-color: #FFB6B1;
            // text-align: center;
            .surebtn{
                position: absolute;
                padding: 9px 65px;
                background-color: white;
                // margin: auto;
                border-radius: 20px;
                // margin-top: 20px;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%)
            }
        }
     .tui-checkbox:checked {
    margin-top: 2px;
    background: #1673ff;
    border: solid 1px #1673ff;
  }
  .tui-checkbox {
    width: 15px;
    height: 15px;
    background-color: #ffffff;
    border: solid 1px #939393;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
    margin-top: 2px;
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
    content: "";
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
        padding-top: 45px;
        padding-bottom: 47px;
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
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;

                .biaoshi{
                     position: absolute;
                   width: 180px;
                   height: 10px;
                   background-color: #ffffff;
                   top: -10px;
                   right: 0;
                //    z-index: 999;
                   border-top-left-radius: 8px;
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
         display: flex;
          margin-top: 4px;
          margin-bottom: 10px;
          .left {
            .timetitle {
              font-size: 12px;
              font-weight: 500;
              color: rgba(95, 95, 95, 1);
            }
            .time {
              font-size: 14px;
              font-weight: 500;
              color: rgba(60, 60, 60, 1);
              i {
                font-size: 16px;
              }
            }
            .selestxiexi {
              .xieyiword {
                font-size: 10px;
                font-weight: 500;
                color: rgba(95, 95, 95, 1);
                a {
                  font-size: 10px;
                }
              }
            }
          }
          .right {
            border-left: 1px solid #ccc;
            padding-left: 10px;
            .teletename {
              font-size: 12px;
              font-weight: 500;
              color: rgba(95, 95, 95, 1);
            }
            .phone {
              border: none;
              font-size: 14px;
              font-weight: 500;
              color: rgba(95, 95, 95, 1);
              margin: 0;
              padding: 0;
            }
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