<template>
    <div id="goodsinfobox">
        <div class="header" >
            <span><img src="../../assets/newimg/返回.png" alt="" @click="bank"></span>
            <span><img src="../../assets/newimg/更多.png" alt=""></span>
        </div>
        <!-- 轮播图部分 -->
        <div class="imgbox">
           <mt-swipe :auto="0" :continuous="belon">
          <mt-swipe-item v-for="itemimg in lubolist" :key="itemimg.id">
              <img :src="itemimg.picUrl" v-preview="itemimg.picUrl" alt="">
          </mt-swipe-item>
        </mt-swipe>    
        </div>  
        <!-- 产品详情部分 -->
        <div class="canashumsg">
         <div class="smbox">
            <p class="price"><span class="pricenum">￥{{productmsg.rentPrice}}</span>  /天 </p>
         <p class="msginfo">
            {{productmsg.productName}}
         </p>
         <p class="salemsg">
             <span class="feft">S码</span>
             <span class="midden">M码</span>
             <span class="midden">L码</span>
         </p>
         </div>
         <div class="xuanze" >    <!-- @click="msgshow" -->
             <!-- <span class="selecttitle">选择</span>
             <span>选择参数</span>
             <i class="mui-icon mui-icon-arrowright right"></i> -->
             <h4 class="goodstitle">商品信息</h4>
                <span class="categorylogo">{{productmsg.twoCategoryName}}</span>
                <span class="categorylogo">{{productmsg.threeCategoryName}}</span>

            <div class="goodsmsg">
                <p class="canshulist"><span class="canname">价格</span> <span class="canmsg">￥{{productmsg.defaultPrice}}</span> </p>
                <p class="canshulist"><span class="canname">品牌</span> <span class="canmsg">{{productmsg.supplierName}}</span> </p>
                <p class="canshulist"><span class="canname">规格</span> <span class="canmsg">XL/黑色</span></p>
                <p class="canshulist"><span class="canname">材质</span> <span class="canmsg">聚酯纤维</span></p>
            </div>
         </div>
         
       
        </div>
        
        <!--底部固定店铺信息开始  -->
        <div class="storefoots">
            <div class="iconbox">
                <a href="javascript:;" @click="inshopstroe"> <span><img src="../../assets/newimg/店铺.png" alt=""></span> <p >店铺</p></a>
                <a href="javascript:;"> <span><img src="../../assets/newimg/客服 (4).png" alt=""></span> <p>客服</p></a>
                <a href="javascript:;" v-if="productmsg.isCollection==0?true:false" @click="shoucanggoods"> <span><img src="../../assets/newimg/shoucang2.png" alt=""></span> <p>收藏</p></a>
                <a href="javascript:;" v-if="productmsg.isCollection==1?true:false" @click="shoucanggoods"> <span><img src="../../assets/newimg/shoucang.png" alt=""></span> <p>收藏</p></a>

            </div>
            <div class="btnbox">
                <!-- <a href="javascript:;" class="toshopcar">  </a> -->
                <a href="javascript:;" class="buysuccess" @click="msgshow"> 租这件 </a>
            </div>
        </div>
        <!--底部固定店铺信息结束  -->

    <mt-popup class="popupbox"
      v-model="popupVisible"
       position="bottom"
      >
           <div class="selectmsgbox">
                <i class="mui-icon mui-icon-close closeright" @click="popuphid"></i>   
                <div class="topbox">
                    <div class="imgbox">
                   <img src="../../assets/img/gouwugoods.jpg" alt="">
               </div>
               <div class="goodsprice">
                    <p>￥{{productmsg.defaultPrice}}</p>
                    <p>库存{{productmsg.totalStock}}件</p>
                    <p>已选择：{{color}}  {{size}}</p>
               </div>
                </div>

                <div class="bodyitem">
                    <ul class="selectinfo">
                        <li v-for="(ProductItem,n) in specifications" :key="n">
                            <h3>{{ProductItem.name}}</h3>
                            <div class="items">
                                <a href="javascript:;" v-for="(oitem,index) in ProductItem.item" :key="index" @click="selectName(oitem.name,n,$event,index)"  :class='[oitem.isShow?"":"noneActive",subIndex[n] == index?"productActive":""]'>
                                    <span>{{oitem.name}}</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                    <div class="shopnumbox">
                        <h3 >租赁时间：</h3><br>
                         <input class="datavalue " type="text" @click="isdateshow" v-model="datevalue" readonly>
                         -
                         <input class="datavalue" type="text" @click="isdateshow1" v-model="datevalue1" readonly>

                          <!-- <calendar @change="onChange"/> -->
                    </div>
                    
                </div>
                <!-- 底部购买加入购物车部分 -->
                <div class="footer">
                     <div v-if="dateshow">
                         <inlineCalendar @change="onChange"
                        mode="single"
                     />
                     </div>

                    <div v-if="dateshow1">
                         <inlineCalendar @change="onChange1"
                        mode="single"
                     />
                     </div>
                      

                   <a class="buybtn" href="javascript:;" @click="inlease">立即租赁</a>
                </div>
            </div> 
    </mt-popup>

     </div>
</template>
<script>
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
export default {
    data() {
        return {
            belon:false,
            popupVisible:false,
            // 保存商品id
            productId:"",
            // 保存的商品信息
            productmsg:[],
            // 页面加载时页面上所有的数据
            allproduct:[],
            // 保存数字框的初始状态
            num:1,
            color:"颜色",
            size:"尺寸",
            // 点击高亮的元素
            activeName:"",
            // 商品的规格信息
            hasproducts:"",
            // 保存的数据
            arr1:[],
            // 要渲染的字段
            specifications:"",
            selectArr: [], //存放被选中的值
            shopItemInfo: {}, //存放要和选中的值进行匹配的数据
            subIndex: [], //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
            // 保存店铺id
            supplierId:"",
            lubolist:[],
            // isShow:false,
            dateshow:false,
            dateshow1:false,
            datevalue:"- - ",
            datevalue1:"- -"
           
        }
    },
    created() {
         this.getproductmsg()
    },
      mounted () {
           window.addEventListener("scroll", this.handleScroll)
       },

    destroyed () {
        window.removeEventListener("scroll",this.handleScroll)
      },
    methods: {
        // 点击收藏店铺
        shoucanggoods:function(){
            var data={
                productId:this.productId
            }
           this.axios.post("discovery/addAndCancelCollections",this.qs.stringify(data)).then(response=>{
                 console.log(response)
                //  if(response.data.success==true){
                //      this.getmsg()
                //  }
                if(response.data.success==true){
                    if(response.data.data.collectionStatus==1){
                        this.productmsg.isCollection=1
                    }else if(response.data.data.collectionStatus==0) {
                        this.productmsg.isCollection=0
                    }
                }else if(response.data.success==false){
                    
                    MessageBox.confirm("用户未登录，请登录").then(action => {
                             localStorage.removeItem("userName")
                   this.$router.push({path:"/login"})
                    });
                    
                }
             })
        },


        isdateshow1(){
            this.dateshow1=true;
        },
        isdateshow(){
            this.dateshow=true;
           
        },
      
         onChange(date) {
        //      var arr=[]
        // for(var i=0;i<date.length;i++){
        //     arr.push(date[i].format("YYYY-MM-DD"))
        // }
       console.log(date.format("YYYY-MM-DD"));
            this.datevalue=date.format("YYYY-MM-DD")
             this.dateshow=false
         },
    onChange1(date) {
       console.log(date.format("YYYY-MM-DD"));
            this.datevalue1=date.format("YYYY-MM-DD")
            //  this.dateshow=false
             this.dateshow1=false
         },
   
        // 点击返回上一层
        bank:function(){
             this.$router.go(-1)
        },

        // 时间戳函数
        imestampToTime(timestamp) {
     // 判断时间戳的函数是否是十位   如果是就加三位 编程十三位来计算 
     var date=timestamp.toString().length<10?new Date(timestamp * 1000):new Date(timestamp)
	    //格式组装
     var Y = date.getFullYear() + "-";
     var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
     var D = date.getDate() + " ";
    // console.log(Y)
	    //格式拼接
     var time= Y + M + D
     return time
},




        // 点击立即租赁请求接口
        inlease:function(){
            // console.log(this.datevalue+"开始时间")
            // console.log(this.datevalue1+"结束时间")
            var starttime=this.datevalue.replace(/-/g,"")
            var endtime=this.datevalue1.replace(/-/g,"")
            // 获取当前时间
            var nowtime=(new Date()).valueOf();
            // nowtime=nowtime.toString()
            nowtime=this.imestampToTime(nowtime)
            nowtime=nowtime.replace(/-/g,"")
            // console.log(nowtime+"          当前时间")
            // console.log(starttime+"        开始时间")
            // console.log(endtime+"          结束时间")

            if(starttime==""&&endtime==""){
                 MessageBox("提示", "请选择租赁时间")
                 return
            }
            if(nowtime-starttime>0||nowtime-endtime>0){
                 MessageBox("提示", "租赁时间要大于当前时间")
                 return
            }

           
            console.log(endtime-starttime)
            if(endtime-starttime>=1){
                 var data={
                   productSkuId:"20190816125936007643",
                   startDate:this.datevalue,
                   endDate:this.datevalue1,
              }
              this.axios.post("cusOrderLease/addOrderLease",this.qs.stringify(data)).then(response=>{
                 console.log(response)
                 if(response.data.success==false){
                    MessageBox("提示", "请登录")
                    this.$router.push({path:"/login"})
                 }else if(response.data.success==true){
                      MessageBox("提示", "租赁订单已提交")
                      this.$router.push({path:"/lease/leaseorder"})
                 }
                 
               })
            }else{
                console.log(111111111)
                MessageBox("提示", "租赁时间要大于一天")
            }  
       
        },

      
   selectName: function (item, n, event, index) {
            var self = this;
            // n为索引值
            if (self.selectArr[n] != item) {
                self.selectArr[n] = item;
                self.subIndex[n] = index;
            } else {
                self.selectArr[n] = "";
                self.subIndex[n] = -1; //去掉选中的颜色 
            }
           
            self.checkItem();
        },
        checkItem: function () {
            var self = this;
            var option = self.specifications;
           
            var result = [];  //定义数组存储被选中的值
            for (var i in option) {
                result[i] = self.selectArr[i] ? self.selectArr[i] : "";
            }
           
            for (var i in option) {
                var last = result[i];  //把选中的值存放到字符串last去
                for (var k in option[i].item) {
                    result[i] = option[i].item[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
                    option[i].item[k].isShow = self.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
                }
                result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
            }
            console.log(result)
            self.$forceUpdate(); //重绘

        },
        isMay: function (result) {
            for (var i in result) { 
                if (result[i] == "") {
                    return true; //如果数组里有为空的值，那直接返回true
                    console.log(1111111)
                }
            }
			console.log(result)
            console.log(this.shopItemInfo)
            console.log(this.shopItemInfo[result])
            if(this.shopItemInfo[result]==undefined){
                return false
            }else if(this.shopItemInfo[result].skuStock){

                return true
            }
            
            //  return this.shopItemInfo[result].skuStock == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
        },




        // 点击跳转至店铺
        inshopstroe:function(){
            this.$router.push({path:"/storeindex",query:{supplierId:this.supplierId}})
        },

        // 点击跳转至商品详情页面
        inpinlun:function(){
        this.$router.push({path:"/pinlun",query:{productId:this.productId}})
            
        },


        // 弹出选择的事件
        msgshow:function(){
            this.popupVisible=true
        },
        // 点击x按钮数据隐藏
        popuphid:function(){
            this.popupVisible=false
        },
        
        // 点击数字框减小
        jiannum:function(){
            if(this.num>1){
                this.num--
            }else{
                this.num==1
            }
        },

        // 点击数字框增加
        addnum:function(){
            this.num++
        },
       

        // 获取商品详情
        getproductmsg:function(){
            // 获取产品id
            this.productId=this.$route.query.productId
            console.log(this.productId)
            var data={
                productId:this.productId
            }
            this.axios.post("cusProInfo/getProInfo",this.qs.stringify(data)).then(response=>{
                console.log(response)
                if(response.data.data.isRent==1){
                this.productmsg=response.data.data
                this.productmsg.rotaryPicList.push(this.productmsg.masterPic)
                this.lubolist=this.productmsg.rotaryPicList
                this.supplierId=response.data.data.supplierId
                console.log(this.productmsg.attributeList)
                this.specifications=JSON.parse(this.productmsg.attributeList)
                console.log(this.specifications)
                var arr=this.productmsg.productSkuList
                console.log(arr)
                 //  数据加载修改数据结构
                var self=this
                for(var i in arr){
                    self.shopItemInfo[arr[i].productSpecs]=arr[i]
                    console.log(self.shopItemInfo[arr[i].productSpecs])
                }
                console.log(self.shopItemInfo)
                 self.checkItem()
                }
                
                })

        }
  }
}
</script>
<style lang="scss" scoped>

ul{
    list-style: none;
    margin: 0;
    padding: 0;
}
#goodsinfobox{
    .header{
        height: 35px;
        line-height: 35px;
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 999;
        display: flex;
        justify-content: space-between;
        span{
            width: 24px;
            height: 24px;
            margin: 6px 10px 0 10px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    position: relative;
    .storefoots{
        position: fixed;
        bottom: 0px;
        background-color: white;
        width: 100%;
        height: 55px;
        display: flex;
        .iconbox{
            display: flex;
            margin-left: 10px;
            a{
                margin: 6px 6px 6px 0;
                // line-height: 100%;
                span{
                    img{
                        width: 24px;
                        height: 24px;
                    }
                }
                p{
                    margin: 0;
                    padding: 0;
                    font-size:10px;
                    font-family:PingFang-SC;
                    font-weight:500;
                    color:rgba(245,178,179,1);
                }
            }
        }
        .btnbox{
            height: 40px;
            line-height: 40px;
            // background-color: skyblue;
            // padding: 0 32px;
            // border-radius: 15px;
            font-size: 16px;
            margin-top: 10px;
             text-align: right;
             flex: 1;
             margin-right: 8px;
            // float: right;
            .buysuccess{
                 background-color: #FFB09A;
                border-radius:10px; 
                font-size:14px;
                font-family:PingFangSC;
                font-weight:600;
                color:rgba(255,255,255,1);
                padding: 6px 20px;
            //    border-bottom-right-radius:10px; 
            }
        }
    }
    // 弹出选择的样式
    .popupbox{
    
        width: 100%;
        .selectmsgbox{
            // padding: 0 10px;
            position: relative;
            width: 100%;
            min-height: 400px;
            background-color: white;
            .topbox{
                padding: 0 10px;
                display: flex;
                border-bottom: 1px solid #cccccc;
                padding-bottom: 16px;
                .imgbox{
                width: 100px;
                height: 100px;
                background-color: white;
                padding: 2px;
                border: 1px solid #cccccc;
                margin: 4px 0 0 4px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
             .goodsprice{
                 padding: 0 10px;
                 margin-left: 8px;
                 margin-top: 20px;
                    p{
                        color: black;
                        margin: 0;
                    }
                }
            }
            .closeright{
                position: absolute;
                right: 5px;
                top: 5px;
            }
         .bodyitem{
             padding: 0 10px;
             margin-bottom: 42px;
             .selectinfo{
                 li{
                     border-bottom: 1px solid #cccccc;
                     padding-bottom: 5px;
                     widows: 100%;
                     h3{
                         font-size: 14px;
                         font-weight: normal;
                     }
                     .items{
                         width: 100%;
                        a{
                           -webkit-box-sizing: border-box; 
                            -moz-box-sizing: border-box;  
                            box-sizing: border-box;
                           display: inline-block;
                        //    background-color: #f5f5f5;
                           background-color:#cccccc;
                            color: black;
                           text-align: center;
                            padding: 4px 15px;
                           border-radius: 4px;
                           margin: 6px 6px;
                           box-sizing: border-box;
                           img{
                               width: 24px;
                               height: 24px;
                               vertical-align: middle;
                           }
                           span{
                             vertical-align: middle;
                             font-size: 14px;
                             color: black;
                           }
                       }
                       .productActive{
                            background-color: #FFB7B7;
                             
                             span{
                                    color: #fff;
                             }
                       }
                       .noneActive{
                           background-color: #ccc;
                           opacity: 0.4;
                           color: #000;
                           pointer-events: none;

                       }
                     }
                 }
             }
             .shopnumbox{
                 border-bottom: 1px solid #cccccc;
                 padding: 10px 0;
                 display: flex;
                 h3{
                     font-size: 14px;
                     font-weight: normal;
                     margin-top: 8px;
                 }
                .datavalue{
                 width: 35%;
                 margin:0 3px;
                 height: 30px;
                 
             }
             }
         }
         .footer{
             position: fixed;
             bottom: 0;
             width: 100%;
             box-sizing:border-box;
             font-size:0;
             a{
                 width: 100%;
                //  background-color: #ff0036;
                 display: inline-block;
                 font-size: 16px;
                 text-align: center;
                 padding: 10px 0;
                 color: white;
             }
             .buybtn{
                 background-color: #FF0036;
             }

         }
        }
    }
}
.imgbox{
    width: 100%;
    height: 375px;
    background-color: aquamarine;
    img{
        width: 100%;
        height: 100%;
    }
}
.canashumsg{
    margin-bottom: 50px;
    padding: 0 10px;
     background-color: white;
    .smbox{
        padding: 8px 4px;
        border-radius: 4px;
        margin-top: 8px;
        border-bottom: 1px solid #ccc;
    }
    .salemsg{
        width: 100%;
        
        span{
            display: inline-block;
             margin-right: 33px;
             font-size:12px;
            font-family:PingFang-SC;
            font-weight:500;
            color:rgba(140,138,138,1);
            // text-align: center;
        }
    }
    .price{
    // color: #ff0036;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(110,110,110,1);
    margin: 8px 0;
    .pricenum{
        font-size:20px;
        font-family:PingFangSC;
        font-weight:600;
        color:rgba(222,4,4,1);
    }
    }
    .msginfo{
        font-size:20px;
        font-family:PingFangSC;
        font-weight:600;
        color:rgba(110,110,110,1);
    }
    .xuanze{
        font-size: 12px;
        // margin: 10px 0;
        background-color: white;
        padding: 8px 0;
        
        .goodstitle{
            font-size:20px;
            font-family:PingFangSC;
            font-weight:600;
            color:rgba(110,110,110,1);
            margin-bottom: 10px;
        }
        .categorylogo{
            padding: 2px 16px;
             border-radius:5px;
            border:1px solid rgba(195,195,195,1);
            font-size:14px;
            font-family:PingFang-SC;
            font-weight:500;
            color:rgba(195,195,195,1);
            margin-right: 10px;
        }
        .goodsmsg{
            background-color: #F2F2F2;
            padding: 12px;
            margin-top: 8px;
            p{
                margin: 0;
                margin-bottom: 10px;
            }
            .canshulist{
                // margin-top: 8px;
                
                .canname{
                    display: inline-block;
                    min-width: 60px;
                    font-size:12px;
                    font-family:PingFang-SC;
                    font-weight:500;
                    color:rgba(85,85,85,1);
                }
                .canmsg{
                    margin-left: 20px;
                    font-size:12px;
                    font-family:PingFang-SC;
                    font-weight:500;
                    color:rgba(85,85,85,1);
                }
            }
        }
    }
  

.storegoodsinfo{
    margin: 10px;
    .title{
        text-align: center;
    }
    ul{
       
        li{
            width: 100%;
            img{
                width: 100%;
            }
        }
    }
}

}

</style>
