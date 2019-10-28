<template>
  <div class="bigcontentmsg">
    <div class="header">
      <i class="mui-icon mui-icon-back" @click="bank"></i>
      <h3>提交订单</h3>
    </div>
    <div class="midel">
      <div class="msginfo">
        <div class="publictitle">
          <span @click="inshopyourselforder">骑手配送</span>
          <span>到店自取</span>
        </div>

        <div class="biaoshi"></div>
      </div>

     <div class="bigcontent">
        <div v-for="(item,index) in orderlist" :key="index" >
        <div class="titlemsg">
          <h3 class="storensme">{{item.supMap.supplierAddress}}</h3>
          <div class="storeimg">
            <img src="../../assets/img/fenleixqnv.jpg" alt />
            <img src="../../assets/img/fenleixqnv.jpg" alt />
          </div>
          <div class="footerbox">
            <div class="left">
              <h4 class="timetitle">自取时间</h4>
              <p class="time">
                {{item.supMap.receiveTime.split(" ")[1]}}
                <i class="mui-icon mui-icon-arrowright" @click="selecttime(item.supMap.supplierId,index)"></i>
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
              <input type="text" v-model="item.receiverPhone" class="phone" readonly>
              <!-- <i class="mui-icon mui-icon-compose"></i> -->
              <!-- <p class="phone">{{item.supMap.supplierPhone}}</p> -->
            </div>
          </div>
        </div>

        <div class="ordermsg" >
          <h4 class="storename">{{item.supMap.supplierName}}</h4>
          <div class="goodsmsglist" v-for="(otem,index) in item.supMap.proMapList" :key="index">
            <img :src="otem.picUrl" alt />
            <div class="right">
              <h4 class="goodsname">{{otem.prodcuctName}}</h4>
              <p class="guige">{{otem.productSpecs}}</p>
              <p class="price">￥{{otem.price}}</p>
              <p>x{{otem.productAmount}}</p>
            </div>
          </div>

          <p class="nowprice">
            <span class="priceword">实付</span>
            <span class="peicenum">¥{{item.supMoney}}</span>
          </p>
          <p class="nodifience">
            <span class="left">
              配送费
              <br />
              <i>已减8元配送费</i>
            </span>
            <span class="left teleft">
              <i class="textthore">￥8</i> ￥0
            </span>
          </p>
          <p class="nodifience">
            <span class="left">抵用券</span>
         <span class="right havejuan" v-if='item.isMember==1&&item.redUseStatus==0?true:false' @click="isredbag(item)"> 可使用会员红包 <i class="mui-icon mui-icon-arrowright"></i></span>
                        <span class="right havejuan" v-if='item.isMember==1&&item.redUseStatus==1?true:false' @click="nouseredbag(item)"> 已使用会员红包 <i class="mui-icon mui-icon-arrowright"></i></span>
                       
                        <span class="right" v-if='item.isMember==0?true:false'> 暂无可用，开通会员可享大红包 <i class="mui-icon mui-icon-arrowright"></i></span>
          </p>
          <p class="nodifience">
            <span class="left">商家代金券</span>
              <span @click="gg(item)" class="right havejuan" v-if='item.isUseCoupon==null?true:false'> 请选择优惠券 <i class="mui-icon mui-icon-arrowright" ></i></span>
            <span @click="gg(item)" class="right havejuan" v-if="item.isUseCoupon==1?true:false">
              满{{item.coupon.targetAmount}}减{{item.coupon.discountAmount}}
              <i class="mui-icon mui-icon-arrowright"></i>
            </span>
            <span class="right" v-if="item.isUseCoupon==0?true:false">
              暂无可用
              <i class="mui-icon mui-icon-arrowright"></i>
            </span>
          </p>
          <p class="nodifience">
            <span class="left">
              备注
              <input type="text" class="beizhutext" placeholder="有什么需要可以写在这里" v-model="beizhu.textmsg[item.supMap.supplierId]" />
            </span>
          </p>
        </div>
      </div>

     </div>
    </div>

    <div class="footer">
      <span class="left">已优惠{{discountprice}}元</span>
      <p class="right">
        <span class="hejiword">
          合计
          <i class="price">￥{{allprice}}</i>
        </span>
        <span class="submissionbtn" @click="submitorder">提交订单</span>
      </p>
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
import { Indicator } from "mint-ui";
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      value1: [],
      value: false,
      msginfo: {},
      orderlist: {},
      customerAddrId: "",
      arr1: [],
      arr: [],
      productId:"",
      idmsglist: [],
      popupVisible:false,
      // 到店自取协议
      checkAll: true,
      pickerVisible:false,
      discountprice:0,
      allprice:0,
      // 获取需要传递时间
      timestr:"",
      // 修改的时间
      edittime:'',
      // 点击获取修改时间的店铺id
      timesupplierId:'',
      redbanum:null,

      editindex:'',

      times:{
         timeobj:{

         }
      },
       // 备注的值
       beizhu:{
           textmsg:{}
       },
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

    };
  },
  created() {
    Indicator.open("加载中...");
    this.getmsg();
   console.log(this.slots[2].values)
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
console.log(bigarr)
console.log(smarr)




  },
  methods: {
    // 进入修改地址页面
    inaddaddresslist: function() {
      this.$router.push({ path: "/addaddresslist" });
    },
    bank: function() {
    //   this.$router.go(-1)
      this.$router.push({path:"/home/goodsinfo",query:{productId:this.productId}})
    },



    // 点击提交订单页面
    submitorder:function(){
      if(this.checkAll==false){
        Toast({
         message: '请勾选到店自选协议',
         duration: 500
        });
        return 
      }
      console.log(this.beizhu.textmsg)
                var arr=[]
            console.log(this.beizhu)
             for(let key  in this.beizhu.textmsg){
                 console.log(key + '---' + this.beizhu.textmsg[key])
                 if(this.beizhu.textmsg[key]!=""){
                    arr.push({supplierId:key,notes:this.beizhu.textmsg[key]})
                 }
                
            }
            var arr3=[]

            for( let key in this.times.timeobj){
                 console.log(key + '---' + this.times.timeobj[key])
                 arr3.push({supplierId:key,receiveTime:this.times.timeobj[key]})

            }
            console.log(arr3)
            arr=JSON.stringify(arr)
            arr3=JSON.stringify(arr3)
            var data={
                shippingType:0,
                noteMapList:arr,
                receiveTimeList:arr3
            }
         
            console.log(arr)
             this.axios.post('cusOrderCart/submitOrder',this.qs.stringify(data)).then(response=>{
                 console.log(response)
                 if(response.data.success==true){
                     alert("订单已提交。。正在支付。。。")
                     this.$router.push({path:'/home'})
                 }
             })
    },

      

 

    // 点击确认修改时间
    sureedittime:function(){
        this.orderlist[this.editindex].supMap.receiveTime=this.timestr
        this.popupVisible=false
        this.times.timeobj[this.timesupplierId]=this.timestr
        console.log(this.times)
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
    // 点击进入使用优惠券页面
           // 点击进入使用优惠券页面
          // 点击使用优惠券
        gg:function(item){
            console.log(item)
             this.$router.push({path:"/usecoupon",query:{supplierId:item.supMap.supplierId,orderMoney:item.orderMoney}})
        },

      // 页面一加载获取页面数据
           getmsg:function(){
             var productSkuId=this.$route.query.productSkuId
            var productAmount=this.$route.query.productAmount
            var data={
                productSkuId:productSkuId,
                productAmount:productAmount
            }
            console.log(data)
              this.axios.post('cusProInfo/buyNow',this.qs.stringify(data)).then(response=>{
                  console.log(response)
                  if(response.data.success==true){
                        this.addressmsginfo=response.data.data.receiverInfoDef
                        this.orderlist=response.data.data.showSupMapList
                           this.productId=this.orderlist[0].supMap.proMapList[0].productId
                        this.redbanum=response.data.data.redAmount
                        for(var i=0;i<response.data.data.showSupMapList.length;i++){
                         this.allprice+=response.data.data.showSupMapList[i].supMoney
                        this.discountprice+=response.data.data.showSupMapList[i].discountMoney
                        }
                  }
                  Indicator.close();
              })
           
        },

           // 点击使用红包
        isredbag:function(item){
            console.log(item)
             if(this.redbanum==0){
                MessageBox.alert("提示", "红包已用完");
                return
            }
              MessageBox.confirm('是否使用红包?','红包剩余'+this.redbanum+"个").then(action => {
                  var supplierId=item.supMap.supplierId
                  var data={
                      supplierId:supplierId,
                      isUseRedPacket:1
                  }
                   this.axios.post('cusOrderCart/useRedPacket',this.qs.stringify(data)).then(response=>{
                       console.log(response)
                       this.getmsg()
                   })
              }).catch(() => {

                // this.$toast('操作取消');
            });
        },
            // 点击取消使用红包
        nouseredbag:function(item){
              MessageBox.confirm("已使用红包是否取消使用").then(action => {
                   var supplierId=item.supMap.supplierId
                  var data={
                      supplierId:supplierId,
                      isUseRedPacket:0
                  }
                    this.axios.post('cusOrderCart/useRedPacket',this.qs.stringify(data)).then(response=>{
                       console.log(response)
                       this.getmsg()
                   })
              }).catch(() => {

                // this.$toast('操作取消');
            });
        },

    // 点击弹出时间选择组件
    selecttime:function(id,index){
        this.editindex=index
        this.popupVisible=true
        console.log(id)
        this.timesupplierId=id
       
    },

    // 点击到店自取页面
    inshopyourselforder: function() {
      this.$router.push({ path: "/buynoworder",query:{productSkuId:this.$route.query.productSkuId,productAmount:this.$route.query.productAmount} });
    }
  }
};
</script>
<style lang="scss" scoped>
.bigcontentmsg {
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
//    padding-bottom:48px;
.bigcontent{
    margin-bottom: 50px;
}
  p {
    margin: 0;
  }
  .header {
    width: 100%;
    height: 45px;
    background-color: #ffb7b7;
    position: fixed;
    top: 0;
    z-index: 99;
    display: flex;
    // justify-content: space-between;
    i {
      line-height: 45px;
      color: rgba(255, 255, 255, 1);
    }
    h3 {
      text-align: center;
      width: 100%;
      line-height: 35px;
      font-size: 18px;
      font-family: PingFangSC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
  }
  .midel {
    height: 114px;
    width: 100%;
    background-color: #ffb7b7;
    padding-top: 20px;
    .msginfo {
      background-color: #fff;
      margin: 0 14px;
      padding: 8px 25px 8px 25px;
      position: relative;
      .biaoshi {
        position: absolute;
        width: 180px;
        height: 10px;
        background-color: #ffffff;
        top: -10px;
        right: 0;
        //    z-index: 999;
        border-top-left-radius: 8px;
      }
      .publictitle {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        span {
          font-size: 16px;
          font-family: PingFang-SC;
          font-weight: 500;
          color: rgba(77, 77, 77, 1);
          flex: 1;
          text-align: center;
        }
      }
 
    }
         .titlemsg {
           background-color: #fff;
      margin: 0 14px;
      padding: 8px 25px 14px 25px;
        .storensme {
          font-size: 18px;
          font-weight: 600;
          color: rgba(91, 91, 91, 1);
        }
        .storeimg {
          height: 90px;
          img {
            width: 49%;
            height: 100%;
          }
        }
        .footerbox {
          display: flex;
          margin-top: 4px;
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
      }
    .ordermsg {
      background-color: #fff;
      margin: 13px;
      padding: 14px 25px;
      border-radius: 10px;
      .storename {
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(95, 95, 95, 1);
        padding-bottom: 5px;
        border-bottom: 1px solid #dddddd;
      }
      .goodsmsglist {
        display: flex;
        margin-bottom: 5px;
        img {
          width: 88px;
          height: 88px;
          border-radius: 6px;
        }
        .right {
          margin-left: 20px;
          width: 100%;
          .goodsname {
            font-size: 14px;
            font-family: PingFangSC;
            font-weight: 600;
            color: rgba(95, 95, 95, 1);
          }
          .guige {
            font-size: 12px;
            font-family: PingFang-SC;
            font-weight: 500;
            color: rgba(162, 162, 162, 1);
          }
          .price {
            text-align: right;
            font-size: 16px;
            font-family: PingFangSC;
            font-weight: 600;
            color: rgba(95, 95, 95, 1);
          }
        }
      }
      .nowprice {
        text-align: right;
        .priceword {
          font-size: 14px;
          font-weight: 500;
          color: rgba(95, 95, 95, 1);
        }
        .peicenum {
          font-size: 18px;
          font-weight: 600;
          color: rgba(95, 95, 95, 1);
        }
      }
      .nodifience {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        .beizhutext {
          width: 100%;
          border: none;
        }
        .beizhutext::-webkit-input-placeholder {
          font-size: 10px;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(162, 162, 162, 1);
        }

        .beizhutext:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          font-size: 10px;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(162, 162, 162, 1);
        }
        .beizhutext::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          font-size: 10px;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(162, 162, 162, 1);
        }
        .beizhutext:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          font-size: 10px;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(162, 162, 162, 1);
        }
        .left {
          font-size: 14px;
          font-family: PingFang-SC;
          font-weight: 500;
          color: rgba(95, 95, 95, 1);
        }
        .right {
          font-size: 10px;
          font-family: PingFang-SC;
          font-weight: 500;
          color: rgba(162, 162, 162, 1);
        }
        .havejuan {
          color: black;
        }
        .teleft {
          line-height: 30px;
          .textthore {
            text-decoration: line-through;
          }
        }
        i {
          font-size: 10px;
          //  font-family:PingFang-SC;
          font-weight: 500;
          color: rgba(162, 162, 162, 1);
          font-style: normal;
        }
      }
    }
    .bottombox {
      background-color: #fff;
      margin: 13px;
      padding: 14px 22px;
      border-radius: 10px;
      margin-bottom: 60px;
      .secondlist {
        display: flex;
        justify-content: space-between;
        span {
          width: 100%;
          font-size: 14px;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(95, 95, 95, 1);
          .beuzhu {
            font-size: 10px;
            font-family: PingFang-SC-Medium, PingFang-SC;
            font-weight: 500;
            color: rgba(162, 162, 162, 1);
          }
        }

        .payright {
          text-align: right;
          font-size: 10px;
          font-family: PingFang-SC-Medium, PingFang-SC;
          font-weight: 500;
          color: rgba(162, 162, 162, 1);
        }
      }
    }
  }
  .footer {
    position: fixed;
    width: 347px;
    height: 48px;
    background-color: #ffb7b7;
    bottom: 10px;
    border-radius: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    display: flex;
    justify-content: space-between;
    line-height: 48px;
    padding: 0 16px;
    .left {
      font-size: 12px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    .right {
      .hejiword {
        font-size: 12px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        .price {
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFangSC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          font-style: normal;
        }
      }
      .submissionbtn {
        height: 100%;
        border-left: 1px solid #ffffff;
        padding-left: 10px;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFangSC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>