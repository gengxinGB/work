<template>
    <div class="bigcontentmsg">
          <div class="header">
                 <i class="mui-icon mui-icon-back" @click="bank"></i>
                 <h3>提交订单</h3>
            </div>
            <div class="midel">
                 <div class="msginfo">
                     <div class="publictitle">
                         <span>骑手配送</span>
                         <span @click="inshopyourselforder">到店自取</span>
                     </div>
                     <div class="titlemsg">
                         <div class="top">
                             <div class="left">
                                 <p class="address">{{addressmsginfo.addressInfo}}</p>
                                 <p class="phonr">{{addressmsginfo.receiverName}} {{addressmsginfo.receiverPhone}}</p>
                             </div>
                             <div class="right">
                                    <i class="mui-icon mui-icon-forward addressedit" @click="inaddaddresslist"></i>
                             </div>
                         </div>
                         <div class="bottom">
                             <span>立即送出</span>
                         </div>
                     </div>
                     <div class="biaoshi"></div>
                </div>

                <div class="ordermsg" v-for="(item,index) in orderlist" :key="index">
                    <h4 class="storename">{{item.supMap.supplierName}}</h4>
                    <div class="goodsmsglist" v-for="(otem,index) in item.supMap.proMapList" :key="index">
                        <img :src="otem.picUrl" alt="">
                        <div class="right">
                            <h4 class="goodsname">{{otem.productName}}</h4>
                            <p class="guige"> {{otem.productSpecs}}</p>
                            <p class="price"> ￥{{otem.price}}</p>
                            <p>x{{otem.productAmount}}</p>
                        </div>
                    </div>
                    
                    <p class="nowprice">
                        <span class="priceword">实付</span>
                        <span class="peicenum">¥{{item.supMoney}}</span>
                    </p>
                    <p class="nodifience">
                        <span class="left">配送费 <br> <i>已减8元配送费</i> </span>
                        <span class="left teleft">  <i class="textthore">￥8</i> ￥{{item.shippingMoney}}</span>
                    </p>
                      <p class="nodifience">
                        <span class="left">抵用券 </span>
                        <span class="right havejuan" v-if='item.isMember==1&&item.redUseStatus==0?true:false' @click="isredbag(item)"> 可使用会员红包 <i class="mui-icon mui-icon-arrowright"></i></span>
                        <span class="right havejuan" v-if='item.isMember==1&&item.redUseStatus==1?true:false' @click="nouseredbag(item)"> 已使用会员红包 <i class="mui-icon mui-icon-arrowright"></i></span>
                       
                        <span class="right" v-if='item.isMember==0?true:false'> 暂无可用，开通会员可享大红包 <i class="mui-icon mui-icon-arrowright"></i></span>
        
                   
                    </p>
                      <p class="nodifience">
                        <span class="left">商家代金券</span>
                        <span @click="gg(item)" class="right havejuan" v-if='item.isUseCoupon==null?true:false'> 请选择优惠券 <i class="mui-icon mui-icon-arrowright" ></i></span>

                        <span @click="gg(item)" class="right havejuan" v-if='item.isUseCoupon==1?true:false'> 已使用满{{item.coupon.targetAmount}}减{{item.coupon.discountAmount}} <i class="mui-icon mui-icon-arrowright" ></i></span>
                        <span class="right" v-if='item.isUseCoupon==0?true:false'> 暂无可用 <i class="mui-icon mui-icon-arrowright"></i></span>
                    </p>
                      <p class="nodifience">
                        <span class="left">备注
                           <input type="text" class="beizhutext" placeholder="有什么需要可以写在这里" v-model="beizhu.textmsg[item.supMap.supplierId]">
                        </span>
                    </p>
                  
                </div>

                <div class="fiftroom">
                    <h4 class="fifroomtitle">试衣间产品</h4>
                     <div class="listbox" v-for="(item,index) in fiftroommsg" :key="index">
                         <h4 class="storename">{{item.supMap.supplierName}}</h4>
                         <div class="goodslist" v-for="(otem,index) in item.fittingRoomDTOList" :key="index">
                             <img :src="otem.productSkuPic" >
                             <div class="right">
                                 <p>{{otem.productSpecs}}</p>
                                 <p>{{otem.productName}}</p>
                             </div>
                         </div>
                     </div>
                </div>

                <div class="bottombox">
                    <p class="secondlist">
                        <span>号码保护
                            <p class="beuzhu">对商家、骑手隐藏您的真实手机号，保护您的隐私</p>
                        </span>
                        <mt-switch v-model="value"></mt-switch>
                    </p>
                   
                     <p class="secondlist">
                        <span>支付方式
                        </span>
                        <span class="payright">在线支付</span>
                    </p>

                </div>

            </div>

            <div class="footer">
                <span class="left">已优惠{{discountprice}}元</span>
                <p class="right">
                <span class="hejiword">合计 <i class="price">￥{{allprice}}</i> </span>
                <span class="submissionbtn" @click="submitorder">提交订单</span>
                </p>
            </div>
           
    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            value:false,
            // 地址信息
            addressmsginfo:{},
            orderlist:{},
            customerAddrId:'',
            arr1:[],
            arr:[],
            idmsglist:[],
            // 折扣价格
            discountprice:0,
            // 总价
            allprice:0,
            redUseStatus:0,
            // 红包数量
            redbanum:null,
            // 备注的值
            beizhu:{
                textmsg:{}
            },
            // 试衣间信息
            fiftroommsg:[]
        }
    },
    created() {
        Indicator.open('加载中...');
        this.getmsg()
    },
    methods: {

        // 进入修改地址页面
        inaddaddresslist:function(){
            this.$router.push({path:'/addaddresslist'})
        },
        bank:function(){
            this.$router.push({path:"/shopcar"})
        },

      

        //页面加载获取数据  
        getmsg:function(){
             this.idmsglist=this.$store.state.usemsg.idmsglist

            console.log(this.idmsglist)
             this.arr1=JSON.stringify(this.idmsglist)
            var data={
                cartIdListStr:this.arr1,
            }
            console.log(data)
              this.axios.post('cusOrderCart/newSettleAccounts',this.qs.stringify(data)).then(response=>{
                  console.log(response)
                  if(response.data.success==true){
                        this.addressmsginfo=response.data.data.receiverInfoDef
                        this.orderlist=response.data.data.showSupMapList
                        this.redbanum=response.data.data.redAmount
                        this.allprice=0
                        this.discountprice=0
                        for(var i=0;i<response.data.data.showSupMapList.length;i++){
                         this.allprice+=response.data.data.showSupMapList[i].supMoney
                        this.discountprice+=response.data.data.showSupMapList[i].discountMoney
                        }

                        // 获取试衣间的消息
                        for(var i=0;i<response.data.data.showSupMapList.length;i++){
                            if(response.data.data.showSupMapList[i].fittingRoomDTOList.length>0){
                                this.fiftroommsg.push(response.data.data.showSupMapList[i])
                            }
                        }
                        console.log(this.fiftroommsg)
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

        // 点击使用优惠券
        gg:function(item){
            console.log(item)
             this.$router.push({path:"/usecoupon",query:{supplierId:item.supMap.supplierId,orderMoney:item.orderMoney}})
        },


        // 点击提交订单接口
        submitorder:function(){
          var arr=[]
            console.log(this.beizhu)
             for(let key  in this.beizhu.textmsg){
                 console.log(key + '---' + this.beizhu.textmsg[key])
                 if(this.beizhu.textmsg[key]!=""){
                    arr.push({supplierId:key,notes:this.beizhu.textmsg[key]})
                 }
                
            }
            arr=JSON.stringify(arr)
            var data={
                shippingType:1,
                noteMapList:arr
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


        // 点击到店自取页面
        inshopyourselforder:function(){
            this.$router.push({path:'/shopyourselforder'})
        }
    },

}
</script>
<style lang="scss" scoped>
    .bigcontentmsg{
          padding-top: 45px;
        //   margin-bottom: 48px;
          p{
              margin: 0;
          }
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
        .midel{
            height: 114px;
            width: 100%;
            background-color: #FFB7B7;
            padding-top: 20px;
            .msginfo{
                background-color: #fff;
                margin: 0 14px;
                padding: 8px 25px 14px 25px;
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
                .publictitle{
                 display: flex;
                align-items: center;
                margin-bottom: 15px;
            
               span{
                    font-size:16px;
                    font-family:PingFang-SC;
                    font-weight:500;
                    color:rgba(77,77,77,1);
                    flex: 1;
                    text-align: center;
                }
                }
                .titlemsg{
                    .top{
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #cccccc;
                        .left{
                            .address{
                                font-size:18px;
                                font-family:PingFangSC;
                                font-weight:600;
                                color:rgba(95,95,95,1);
                            }
                            .phone{
                                font-size:14px;
                                font-family:PingFang-SC;
                                font-weight:500;
                                color:rgba(95,95,95,1);
                            }
                        }
                        .right{
                            .addressedit{
                                font-size: 16px;
                                background-color: #FFB7B7;
                                color: #fff;
                                padding: 2px;
                                border-radius: 16px;
                            }
                        }
                    }
                    .bottom{
                        font-size:18px;
                        margin-top: 5px;
                        font-family:PingFangSC;
                        font-weight:600;
                        color:rgba(95,95,95,1);
                    }
                }
               
            }
            .ordermsg{
                background-color: #fff;
                margin: 13px;
                padding: 14px 25px;
                border-radius:10px;
                .storename{
                    font-size:14px;
                    font-family:PingFangSC;
                    font-weight:600;
                    color:rgba(95,95,95,1);
                    padding-bottom: 5px;
                    border-bottom: 1px solid #DDDDDD;
                }
                .goodsmsglist{
                    display: flex;
                    margin-bottom: 5px;
                    img{
                        width: 88px;
                        height: 88px;
                        border-radius: 6px;
                    }
                    .right{
                        margin-left: 20px;
                        width: 100%;
                        .goodsname{
                            font-size:14px;
                            font-family:PingFangSC;
                            font-weight:600;
                            color:rgba(95,95,95,1);
                        }
                        .guige{
                            font-size:12px;
                            font-family:PingFang-SC;
                            font-weight:500;
                            color:rgba(162,162,162,1);
                        }
                        .price{
                            text-align: right;
                            font-size:16px;
                            font-family:PingFangSC;
                            font-weight:600;
                            color:rgba(95,95,95,1);
                        }
                    }
                }
                .nowprice{
                    text-align: right;
                    .priceword{
                        font-size:14px;
                        font-family:PingFang-SC;
                        font-weight:500;
                        color:rgba(95,95,95,1);
                    }
                    .peicenum{
                        font-size:18px;
                        font-family:PingFangSC;
                        font-weight:600;
                        color:rgba(95,95,95,1);
                    }
                }
                .nodifience{
                    display: flex;
                    justify-content: space-between;
                   margin-bottom: 5px;
                     .beizhutext{
                            
                            width: 100%;
                            border: none;
                        }
                         .beizhutext::-webkit-input-placeholder {
                            font-size:10px;
                            font-family:PingFang-SC-Medium,PingFang-SC;
                            font-weight:500;
                            color:rgba(162,162,162,1);
                         }

                        .beizhutext:-moz-placeholder {   /* Mozilla Firefox 4 to 18 */
                               font-size:10px;
                            font-family:PingFang-SC-Medium,PingFang-SC;
                            font-weight:500;
                            color:rgba(162,162,162,1);
                            }
                        .beizhutext::-moz-placeholder {   /* Mozilla Firefox 19+ */
                              font-size:10px;
                            font-family:PingFang-SC-Medium,PingFang-SC;
                            font-weight:500;
                            color:rgba(162,162,162,1);
                            }
                        .beizhutext:-ms-input-placeholder {  /* Internet Explorer 10-11 */
                               font-size:10px;
                                 font-family:PingFang-SC-Medium,PingFang-SC;
                                 font-weight:500;
                                 color:rgba(162,162,162,1);
                            }

                    .left{
                        font-size:14px;
                        font-family:PingFang-SC;
                        font-weight:500;
                        color:rgba(95,95,95,1);
                        
                    }
                    .right{
                         font-size:10px;
                         font-family:PingFang-SC;
                         font-weight:500;
                         color:rgba(162,162,162,1);
                        
                     }
                     .havejuan{
                         color: black;
                     }
                     .teleft{
                         line-height: 30px;
                         .textthore{
                             text-decoration: line-through;
                         }
                     }
                      i{
                         font-size:10px;
                        //  font-family:PingFang-SC;
                         font-weight:500;
                         color:rgba(162,162,162,1);
                         font-style: normal;
                    }
                }
            }
            .fiftroom{
                background-color: #ffffff;
                margin: 13px;
                  padding: 14px 22px;
                border-radius:10px;
                // margin-bottom: 60px;
                .fifroomtitle{
                    font-size:18px;
                     font-weight:600;
                     color:rgba(95,95,95,1);
                     border-bottom: 1px solid #cccccc;
                     padding-bottom: 10px;
                }
                .listbox{
                   margin-bottom: 16px;
                    .storename{
                         font-size:16px;
                        font-weight:600;
                        color:rgba(95,95,95,1);
                    }
                    .goodslist{
                         margin-bottom: 8px;
                        display: flex;
                        img{
                         width: 88px;
                        height: 88px;
                        border-radius: 6px;
                        }
                        .right{
                            margin-left: 10px;
                        }
                    }
                    
                }
            }
            .bottombox{
                 background-color: #fff;
                margin: 13px;
                padding: 14px 22px;
                border-radius:10px;
                margin-bottom: 60px;
                .secondlist{
                    display:flex;
                    justify-content: space-between;
                    span{
                        width: 100%;
                        font-size:14px;
                        font-family:PingFang-SC-Medium,PingFang-SC;
                        font-weight:500;
                        color:rgba(95,95,95,1);
                        .beuzhu{
                            font-size:10px;
                            font-family:PingFang-SC-Medium,PingFang-SC;
                            font-weight:500;
                            color:rgba(162,162,162,1);
                        }
                      

                       
                    }
                   

                     .payright{
                            text-align: right;
                            font-size:10px;
                            font-family:PingFang-SC-Medium,PingFang-SC;
                            font-weight:500;
                            color:rgba(162,162,162,1);
                    }
                }
            }
        }
        .footer{
            position: fixed;
            width:347px;
            height: 48px;
            background-color: #FFB7B7;
            bottom: 10px;
            border-radius:24px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 99;
           display: flex;
           justify-content: space-between;
           line-height: 48px;
           padding:0 16px;
           .left{
               font-size:12px;
               font-family:PingFang-SC-Medium,PingFang-SC;
               font-weight:500;
               color:rgba(255,255,255,1);
           }
           .right{
               
               .hejiword{
                   font-size:12px;
                    font-family:PingFang-SC-Medium,PingFang-SC;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    .price{
                        font-size:18px;
                        font-family:PingFangSC-Semibold,PingFangSC;
                        font-weight:600;
                        color:rgba(255,255,255,1);
                        font-style: normal;
                    }
               }
               .submissionbtn{
                   height: 100%;
                   border-left: 1px solid #FFFFFF;
                   padding-left: 10px;
                   font-size:16px;
                    font-family:PingFangSC-Semibold,PingFangSC;
                    font-weight:600;
                    color:rgba(255,255,255,1);
               }
           }
        }
    }
</style>