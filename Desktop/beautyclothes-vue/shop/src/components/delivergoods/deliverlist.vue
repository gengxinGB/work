<template>
    <div class="deliverbox">
        <div class="contentmsg" v-for="(item,index) in msglist" :key="index" >
            <p class="topword"> <span class="title">{{item.supplierName}}</span> 
            <span class="endtime" v-if="item.orderStatus==0?true:false">待付款 </span>
            <span class="endtime" v-if="item.orderStatus==1?true:false">买家已付款</span>
            <span class="endtime" v-if="item.orderStatus==2?true:false">买家已付款</span>
            <span class="endtime" v-if="item.orderStatus==3?true:false">退款中</span>
            </p>
            <div class="msgbox" v-for="(otem,index) in item.proMapList" :key="index">
            <img :src="otem.productPicUrl" alt="">
                <div class="middle">
                    <p class="ordertime">{{otem.productName}}</p>
                    <p class="cannshu">
                        规格：{{otem.productSku}}
                    </p>
                 </div>
                 <div class="left">
                    <p class="price">{{otem.isRent==1?"租赁价格￥"+otem.rentPrice:"￥"+otem.price}}</p>
                    <p class="number">x{{otem.productNum}}</p>
                 </div>
            </div>
            <div class="foots">
                <p class="numprice">配送方式：{{item.shippingType==0?"自提":item.shippingType==1?"骑手配送":"快递"}}</p>
                <p class="numprice">共{{item.orderProductNum}}件商品：合计{{item.paymentMoney}}.00</p>
                <p class="btns" v-if="item.orderStatus==0?true:false">
                    <span class="noneorder" @click="delorder(item.orderId)">取消订单</span>
                    <span class="pay">付款</span>
                </p>
                 <p class="btns" v-if="item.orderStatus==1?true:false">
                    <span>送达时间：{{item.receiveTime}}</span><br>
                    <span class="noneorder" @click="edittime(item.orderId)">修改时间</span>
                    <span class="pay">提醒发货</span>
                </p>
                 <p class="btns" v-if="item.orderStatus==2?true:false">
                    <span class="noneorder">查看物流</span>
                    <span class="pay">确认收货</span>
                </p>
                 <p class="btns" v-if="item.orderStatus==3?true:false">
                    <span class="noneorder">撤销申请</span>
                    <span class="pay">修改申请</span>
                </p>

            </div>
             <mt-popup
  v-model="popupVisible"
  position="bottom">
     <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>    

     <span class="surebtn" @click="sendedit">确定</span>
</mt-popup> 
        </div>
 
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            msglist:[],
            popupVisible:false,
             slots: [
        {
          flex: 1,
          values: ["今天", "明天", "后天"],
          className: "slot1",
          textAlign: "right"
        }, {
          divider: true,
          content: "",
          className: "slot2"
        }, {
          flex: 1,
          values: ["00:00","00:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30","06:00","06:30","07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","22:30","23:00","23:30","24:00"],
          className: "slot3",
          textAlign: "left"
        },
      
      ],

        timestr:"",
        orderId:""

        }
    },
    created() {
        this.getmsg()
    },
    watch: {
        $route(){
             this.getmsg()
        }
    },
    methods: {
        getmsg:function(){
            var orderStatus=this.$route.query.orderStatus
            console.log(orderStatus)
             this.axios.get("cusPersonalCenter/getOrderInDifferenceStatus?orderStatus="+orderStatus).then(response=>{
                 if(response.data.data==null){
                        Toast({
                          message: "暂无记录",
                          duration: 500
                        });
                 }    
                this.msglist=response.data.data
                     
                 
                 console.log(this.msglist)
             })
        },
        // 点击删除时间
        delorder:function(id){
                var data={
                    orderId:id
                }
             this.axios.post("cusPersonalCenter/deleteOrder",this.qs.stringify(data)).then(response=>{
                 console.log(response)
                 if(response.data.success==true){
                     Toast("删除成功")
                     this.getmsg()
                 }else if(response.data.success==false){
                     Toast("删除失败")
                 }
             })
        },
        edittime:function(id){
            this.popupVisible=true
            this.orderId=id
        },
        // 点击请求时间接口
        sendedit:function(){
            var data={
                orderId:this.orderId,
                receiveTime:this.timestr
            }
             this.axios.post("cusPersonalCenter/updateReceiveTimeById",this.qs.stringify(data)).then(response=>{
                 console.log(response)
                 if(response.data.success==true){
                     this.getmsg()
                     Toast("修改时间成功")
                     this.popupVisible=false;
                 }
             })

        },


         onValuesChange(picker, values) {
              var date=new Date;
                var y = date.getFullYear()
                var m = date.getMonth() + 1
                m = m < 10 ? "0" + m : m
                var d = date.getDate()
                d = d < 10 ? ("0" + d) : d
            //  console.log(picker)
             console.log(values[0])
             if(values[0]=="今天"){
                
                this.timestr=y+"-"+m+"-"+d+" "+values[1]+":00"
             }else if(values[0]=="明天"){
                this.timestr=y+"-"+m+"-"+(d+1)+" "+values[1]+":00"
             }else if(values[0]=="后天"){
                  this.timestr=y+"-"+m+"-"+(d+2)+" "+values[1]+":00"
             }
             console.log(this.timestr)
         }

    },
}
</script>
<style lang="scss" scoped>

    .deliverbox{
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
    
        p{
            margin: 0;
            padding: 0;
        }
        .contentmsg{
           background:rgba(255,255,255,1);
            border-radius:10px;
            border:1px solid rgba(221,221,221,1);
            margin: 10px;
            padding: 10px;
          .topword{
                display: flex;
               justify-content: space-between;
               .title{
                   font-size:14px;
                   font-weight:600;
                   color:rgba(31,31,31,0.87);
               }
               .endtime{
                   font-size:12px;
                   font-weight:500;
                    color:rgba(31,31,31,0.87);
               }
          }
        }
        .msgbox{
            display: flex;
            justify-content: space-between;
            margin-top: 4px;
            img{
                width: 100px;
                height: 100px;
                border-radius: 5px;
            }
            .middle{
                padding: 0 12px 0 5px;
                flex: 1;
                text-align: left;
                .ordertime{
                     display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    font-size:12px;
                    font-family:PingFang-SC;
                    font-weight:500;
                    color:rgba(76,76,76,1);
                    
                }
                .cannshu{
                    margin-top: 5px;
                    font-size:10px;
                    font-family:PingFang-SC;
                    font-weight:500;
                    color:rgba(167,167,167,1);
                }
            }
                .left{
                    .price{
                      text-align: center;
                      font-size:12px;
                      font-family:PingFangSC;
                      font-weight:600;
                      color:rgba(57,57,57,1);
                    }
                    .number{
                        text-align: center;
                        font-size:10px;
                        font-family:PingFang-SC;
                        font-weight:500;
                        color:rgba(167,167,167,1);
                    }
                }
          
        }
        .foots{
            flex: 1;
            text-align: right;
            .numprice{
                font-size:10px;
                font-family:PingFang-SC;
                font-weight:500;
                color:rgba(31,31,31,0.87);
            }
            .btns{
                
                .noneorder{
                    padding: 2px 8px;
                    border-radius:5px;
                    border:1px solid rgba(151,151,151,1);
                }
                .pay{
                      padding: 2px 8px;
                    border-radius:5px;
                    border:1px solid rgba(151,151,151,1);
                }
            }
        }
    }
</style>