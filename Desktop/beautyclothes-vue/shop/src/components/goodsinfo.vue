<template>
    <div id="goodsinfobox">
        <div class="header1" v-if="!isshow">
            <span class="left"> 
                <img src="../assets/newimg/返回.png" alt="" @click="bank">
            </span>
            <span class="right">
                <img src="../assets/newimg/详情购物车.png" alt="" @click="msgshow">
                <img src="../assets/newimg/更多.png" alt="">
            </span>
        </div>

        <div class="header" v-if='isshow'>
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <p class="topnav">
                <span :class="{active:0==active}" @click="changetitle(0)">宝贝</span>
                <span :class="{active:1==active}" @click="changetitle(1)">评价</span>
                <span :class="{active:2==active}" @click="changetitle(2)">详情</span>
                <span :class="{active:3==active}" @click="changetitle(3)">推荐</span>
            </p>
            <p class="rightimg">
                <span><img src="../assets/newimg/购物车无背景.png" alt=""></span>
                <span><img src="../assets/newimg/更多 无背景.png" alt=""> </span>
            </p>
        </div>
        <!-- 宝贝部分 -->
    <div class="linkbox">
          <div class="imgbox">
           <mt-swipe :auto="0" :continuous="belon">
            <mt-swipe-item v-for="itemimg in lubolist" :key="itemimg.id">
              <img :src="itemimg.picUrl" v-preview="itemimg.picUrl" alt="">
          </mt-swipe-item>
          </mt-swipe>    
        </div> 
       <div class="word">
        <div class="smbox">
            <p class="price">￥{{productmsg.discountPrice==null?productmsg.defaultPrice:productmsg.discountPrice}}  <span class="oldprice">{{productmsg.discountPrice==null?"":"￥"+productmsg.defaultPrice}}</span>  </p>
             <p class="msginfo">
             {{productmsg.productName}}
            </p>
         </div>
       
       </div>
         <div class="fahuo">
             <p class="fahuolist">
                 <span class="left">
                     <strong class="title">发货</strong> <i class="mui-icon mui-icon-location"></i> 江苏 南京 免运费
                 </span>
                 <span class="right">
                     月销 {{productmsg.sale}}件
                 </span>
             </p>
         </div>
         <div class="canshu">
             <p> <span class="left"> <span class="title">服务</span> <span class="middle"> 无忧退货•七天无理由•运费险</span> </span> <span class="right"> <i class="mui-icon mui-icon-arrowright"></i> </span> </p>
             <p  @click="msgshow('sel')"> <span class="left"> <span class="title">选择</span> <span class="middle">选择参数</span> </span>  <span class="left"> <i class="mui-icon mui-icon-arrowright"></i></span></p>
             <p> <span class="left"><span class="title">参数</span>  <span class="middle">品牌使用年龄</span> </span> <span class="left"> <i class="mui-icon mui-icon-arrowright"></i></span></p>
         </div>

    </div>

    <!-- 评价部分 -->
        <div class="linkbox">
            <div class="contentmsg" v-if="pinlunisshow">
                <p class="topmsg"> <span class="left">宝贝评价（{{productmsg.commentNum}}）</span>  <span class="right" @click="incomment">查看全部 <i class="mui-icon mui-icon-arrowright"></i> </span> </p>
                <div class="footermsg">
                    <img :src="productmsg.firstCommentDTO.customerHeadPic" alt="">
                    <div class="right">
                        <p class="username"> {{productmsg.firstCommentDTO.customerName}}</p>
                        <p class="msg">  {{productmsg.firstCommentDTO.commentContent}} </p>
                    </div>
                </div>
            </div>
            <div class="storemsg">
                <div class="left">
                    <img :src="productmsg.supplierLogoUrl" alt="">
                  <div class="middle">
                    <h4>{{productmsg.supplierName}}</h4>
                    <p  @click="inshopstroe">进入店铺 <i class="mui-icon mui-icon-arrowright"></i> </p>
                  </div>
                </div>
                <div class="right">
                    <span @click="guanzhustore(productmsg.supplierId)" v-if='productmsg.isConcern==1?true:false'>关注</span>
                    <span @click="guanzhustore(productmsg.supplierId)" v-if="productmsg.isConcern==0?true:false">已关注</span>

                </div>
            </div>
        </div>

        <div class="linkbox">
         <!-- 商品详情开始 -->
            <div class="storegoodsinfo">
                <p class="title">—————— 详情 —————— </p>
                <ul>
                    <li v-for="(infoimg,index) in productmsg.detailPicList" :key="index">
                        <img :src="infoimg.picUrl" alt="">
                    </li>
                   
                </ul>
            </div>
        </div> 
      
         <!-- 商品推荐部分 -->
        <div class="linkbox">
            <ul class="recommendbox">
                <li>
                    <img src="../assets/img/fenleixqnv.jpg" alt="">
                    <div class="bottombox">
                        <p class="topmsg">双肩带 原创气质宫廷风</p>
                        <p class="price">￥138</p>
                    </div>
                </li>
                  <li>
                    <img src="../assets/img/fenleixqnv.jpg" alt="">
                    <div class="bottombox">
                        <p class="topmsg">双肩带 原创气质宫廷风</p>
                        <p class="price">￥138</p>
                    </div>
                </li>
                  <li>
                    <img src="../assets/img/fenleixqnv.jpg" alt="">
                    <div class="bottombox">
                        <p class="topmsg">双肩带 原创气质宫廷风</p>
                        <p class="price">￥138</p>
                    </div>
                </li>
                  <li>
                    <img src="../assets/img/fenleixqnv.jpg" alt="">
                    <div class="bottombox">
                        <p class="topmsg">双肩带 原创气质宫廷风</p>
                        <p class="price">￥138</p>
                    </div>
                </li>
                  <li>
                    <img src="../assets/img/fenleixqnv.jpg" alt="">
                    <div class="bottombox">
                        <p class="topmsg">双肩带 原创气质宫廷风</p>
                        <p class="price">￥138</p>
                    </div>
                </li>
              
            </ul>
        </div>
        
        <!--底部固定店铺信息开始  -->
        <div class="storefoots">
            <div class="iconbox">
                <a href="javascript:;"  @click="inshopstroe"> <img src="../assets/newimg/店铺.png" alt=""> <p>店铺</p></a>
                <a href="javascript:;"> <img src="../assets/newimg/客服 (4).png" alt=""> <p>客服</p></a>
                <a href="javascript:;" v-if="productmsg.isCollection==0?true:false" @click="collcetion"> <img src="../assets/newimg/shoucang2.png" alt=""> <p>收藏</p></a>
                <a href="javascript:;" v-if="productmsg.isCollection==1?true:false" @click="collcetion"> <img src="../assets/newimg/shoucang.png" alt=""> <p>收藏</p></a>

            </div>
            <div class="btnbox">
                <a href="javascript:;" class="toshopcar" @click="msgshow('car')"> 加入购物车 </a>
                <a href="javascript:;" class="buysuccess" @click="msgshow('sel')"> 立即购买 </a>
            </div>
        </div>
        <!--底部固定店铺信息结束  -->


    <mt-popup class="popupbox"
      v-model="popupVisible"
       position="bottom"
       @touchmove.native.stop.prevent>
           <div class="selectmsgbox">
                <i class="mui-icon mui-icon-close closeright" @click="popuphid"></i>   
                <div class="topbox">
                    <div class="imgbox">
                   <img src="../assets/img/gouwugoods.jpg" alt="">
               </div>
               <div class="goodsprice">
                    <p>￥{{price}}</p>
                    <p>库存{{skunum}}件</p>
                    <p>已选择：{{selectguige}}</p>
               </div>
                </div>

                <div class="bodyitem">
                    <ul class="selectinfo">
                        <li v-for="(ProductItem,n) in specifications" :key="n">
                            <h3>{{ProductItem.name}}</h3>
                            <div class="items">
                                <a href="javascript:;" v-for="(oitem,index) in ProductItem.item" :key="index" @click="selectName(oitem.name,n,$event,index)" v-bind:class="[oitem.isShow?'':'noneActive',subIndex[n] == index?'productActive':'']">
                                    <span>{{oitem.name}}</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                    <div class="shopnumbox">
                        <h3>购买数量</h3>
                     <div class="mui-numbox">
					<button class="mui-btn mui-btn-numbox-minus" type="button" @click="jiannum">-</button>
					<input class="mui-input-numbox" type="number" :value="num" />
					<button class="mui-btn mui-btn-numbox-plus" type="button" @click="addnum">+</button>
				   </div>
                    </div>
                </div>
                <!-- 底部购买加入购物车部分 -->
                <div class="footer" v-if="footershow">
                   <a class="inshopcar" href="javascript:;" @click="addshopcar">加入购物车</a>
                   <a class="buybtn" href="javascript:;" @click="inbuynow" >立即购买</a>
                </div>
                  <div class="footer" v-if="!footershow">
                     <a class="shiyi" href="javascript:;" @click="addshiyi">加入试衣间</a>
                     <a class="shiyi" href="javascript:;" @click="addshopcar">加入购物车</a>
                </div>
            </div> 
    </mt-popup>

  
     </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            belon:false,
            popupVisible:false,
            pp:false,
            footershow:true,
            // 保存商品id
            productId:"",
            // 保存的商品信息
            productmsg:{},
            // 页面加载时页面上所有的数据
            allproduct:[],
            // 保存数字框的初始状态
            num:1,
            color:'颜色',
            size:'尺寸',
            // 点击高亮的元素
            activeName:"",
            // 商品的规格信息
            hasproducts:"",
            // 保存的数据
            arr1:[],
            // 要渲染的字段
            specifications:'',
            selectArr: [], //存放被选中的值
            shopItemInfo: {}, //存放要和选中的值进行匹配的数据
            subIndex: [], //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
            // 保存店铺id
            supplierId:'',
            lubolist:[],
            isshow:false,
            active:0,
            strmsg:'',
            scroll:'',
            selectguige:'',
            skunum:0,
            price:0,
            pinlunisshow:false
        }
    },
    created() {
         this.getproductmsg()
    },
      mounted () {
           window.addEventListener('scroll', this.handleScroll)
        
       },
       watch: {
           scroll(){
               this.loadSroll()
           },
       
       },
     
      
    destroyed () {
        window.removeEventListener('scroll',this.handleScroll)
        // this.scroll=0
      },
    methods: {
        
  // 点击立即购买的事件
  inbuynow:function(){
      var productSkuId= this.shopItemInfo[this.strmsg].id
      productAmount:this.num,
      this.$router.push({path:'/buynoworder',query:{productSkuId:productSkuId,productAmount:this.num}})
  },

    // 加入试衣间
    addshiyi:function(){
         for(var i=0;i<this.strmsg.length;i++){
                if(this.strmsg[i]==""){
                    return
                }
            }
            console.log(this.productmsg.productId)
            var productSkuId= this.shopItemInfo[this.strmsg].id
            var data={
                 productId:this.productmsg.productId,
                 productSkuId:productSkuId
            }
             this.axios.post('cusFittingRoom/addToFittingRoom',this.qs.stringify(data)).then(response=>{
                    console.log(response)
                    if(response.data.success==false&&response.data.errorMsg=="用户未登录！"){
                             MessageBox.alert('用户未登录，请登录').then(action => {
                             localStorage.removeItem("userName")
                           this.$router.push({path:'/login'})
                    });
                    
                    }else if(response.data.success==false){
                        MessageBox.alert(response.data.errorMsg, "提示");
                    }else if(response.data.success==true){
                         this.popupVisible=false
                   
                     Toast({
                      message: '添加成功在试衣间等亲。。',
                      duration: 500
                    });
                    }
             })
    },

        // 滑动监听事件
      handleScroll () {
        
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
       console.log(this.scroll)
      this.scroll>10? this.isshow = true : this.isshow = false
      if(this.scroll>10){
          this.isshow=true
         
      }else{
          this.isshow=false
      }
    },
        // 点击返回上一层
        bank:function(){
             this.$router.go(-1)
        },

        // 点击头部标签高亮显示
        changetitle:function(i){
            this.active=i
            let linkboxs=document.getElementsByClassName('linkbox')
            console.log(linkboxs)
             // 获取需要滚动的距离
            let total = linkboxs[i].offsetTop;
            console.log(total)
            document.body.scrollTop = total;
            // Firefox
            document.documentElement.scrollTop = total;
            // Safari
           window.pageYOffset = total;
        },
        loadSroll:function(){
             let linkboxs=document.getElementsByClassName('linkbox')
             for(var i=0;i<=linkboxs.length-1;i++){
                 if(this.scroll>=linkboxs[i].offsetTop-50){
                     this.active=i
                 }
             }
        },

        // 点击收藏宝贝
        collcetion:function(){
            console.log(this.productId)
               var data={
                productId:this.productId
            }
             this.axios.post('discovery/addAndCancelCollections',this.qs.stringify(data)).then(response=>{
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
                    
                    MessageBox.alert('用户未登录，请登录').then(action => {
                             localStorage.removeItem("userName")
                   this.$router.push({path:'/login'})
                    });
                    
                }
             })
        },

        // 点击关注店铺
        guanzhustore:function(id){
            var data={
                supplierId:id
            }

             this.axios.post('cusPersonalCenter/concernSupplier',this.qs.stringify(data)).then(response=>{
                 console.log(response)
                 if(response.data.success==true){
                     if(response.data.data==1){
                         this.productmsg.isConcern=1
                     }else if(response.data.data==0){
                         this.productmsg.isConcern=0
                     }
                 }
             })
        },

        // 点击高亮的事件
        selectName:function(item,n,event,index){
            // console.log(arrvalue)
            var self=this
          if(self.selectArr[n]!=item){
              self.selectArr[n]=item
              self.subIndex[n]=index
            //   console.log(self.selectArr)
          }else{
              self.selectArr[n] = "";
              self.subIndex[n] = -1; //去掉选中的颜色 
             
          }
           console.log(self.selectArr)
         self.checkItem()
        } ,
        // 执行的方法
        checkItem:function(){
            var self=this
            var option=self.specifications
            var result=[]
            for(var i in option){
                result[i]=self.selectArr[i]?self.selectArr[i] :''
            }
            console.log(result)
            // for(var i=0;i<result.length;i++){
            //     if(result[i]!=""){
            //      console.log(this.shopItemInfo[result].skuStock) 
            //     }
            // }
            //  console.log(this.shopItemInfo[result].skuStock) 
            this.selectguige=result
            for(var i in option){
                var last=result[i]
                for(var k in option[i].item){
                    result[i]=option[i].item[k].name
                    option[i].item[k].isShow=self.isMay(result)
                    // option[i].item[k].isShow=self.isMay()

                }
                result[i]=last
                // console.log(last+"111111111")
                // console.log(last)
            }
            console.log(result)
        

            this.strmsg=result
            // console.log(this.shopItemInfo[result].id)
           console.log("这里执行了  result")
            console.log(option)
            self.$forceUpdate()//重绘
        },
        isMay: function (result) {
            for (var i in result) { 
                if (result[i] == '') {
                    return true; //如果数组里有为空的值，那直接返回true
                }
                console.log(result[i])
            }

             console.log(result)
             if(this.shopItemInfo[result]==undefined){
                 return false
             }else if(this.shopItemInfo[result].skuStock){
                  this.skunum=this.shopItemInfo[result].skuStock 
                  this.price=this.shopItemInfo[result].productPrice
                 return true
             }

        //匹配选中的数据的库存，若不为空返回true反之返回false
       },



        // 点击跳转至店铺
        inshopstroe:function(){
            this.$router.push({path:'/storeindex',query:{supplierId:this.supplierId}})
        },

        // 点击跳转至评论页面
        incomment:function(){
        this.$router.push({path:'/pinlun',query:{productId:this.productId}})
            
        },


        // 弹出选择的事件
        msgshow:function(item){
            this.popupVisible=true
            console.log(item)
            if(item=="sel"){
                this.footershow=true
            }else if(item=="car"){
                this.footershow=false
            }
        },
        // 点击x按钮数据隐藏
        popuphid:function(){
            //  this.checkIt
            this.popupVisible=false
           
        },
        
        // 点击数字框减小
        jiannum:function(){
            if(this.skunum>=0){
                if(this.num>1){
                this.num--
                }else{
                this.num==1
                }
            }
      
        },

        // 点击数字框增加
        addnum:function(){
             this.num++
            if(this.num>this.skunum){
                this.num=this.skunum
            }
           
        },
       
    //    点击加入购物车
        addshopcar:function(){
            console.log(this.strmsg)
            for(var i=0;i<this.strmsg.length;i++){
                if(this.strmsg[i]==""){
                    return
                }
            }
            console.log(this.productmsg.productId)
            var productSkuId= this.shopItemInfo[this.strmsg].id
            var data={
                productId:this.productmsg.productId,
                productAmount:this.num,
                productSkuId:productSkuId
            }
             this.axios.post('cusOrderCart/addToCart',this.qs.stringify(data)).then(response=>{
                 console.log(response)
                 if(response.data.success==false){
                     MessageBox.alert('用户未登录，请登录').then(action=>{
                          localStorage.removeItem("userName")
                      this.$router.push({path:'/login'})
                     })
                     
                 }
                 if(response.data.success==true){
                     this.popupVisible=false
                   
                     Toast({
                      message: '添加成功在购物车等亲。。',
                      duration: 500
                    });
                 }
             })
        },
        // 获取商品详情
        getproductmsg:function(){
            // 获取产品id
            this.productId=this.$route.query.productId
            console.log(this.productId)
            var data={
                productId:this.productId
            }
            this.axios.post('cusProInfo/getProInfo',this.qs.stringify(data)).then(response=>{
                console.log(response)
                this.productmsg=response.data.data
                console.log(this.productmsg)
                // console.log(this.productmsg.detailPicList)
                this.productmsg.rotaryPicList.push(this.productmsg.masterPic)
                if(this.productmsg.firstCommentDTO==null){
                        this.pinlunisshow=false
                }else{
                        this.pinlunisshow=true
                }
                this.lubolist=this.productmsg.rotaryPicList
                console.log(this.productmsg.rotaryPicList)

                this.supplierId=response.data.data.supplierId
                console.log(this.productmsg.attributeList)


                
                this.specifications=JSON.parse(this.productmsg.attributeList)
                 console.log(this.specifications)
                var arr=this.productmsg.productSkuList
               
                 //  数据加载修改数据结构
                var self=this
                 console.log(arr)
                for(var i in arr){
                    self.shopItemInfo[arr[i].productSpecs]=arr[i]
                    console.log(self.shopItemInfo[arr[i].productSpecs])

                }
                console.log(self.shopItemInfo)
                 self.checkItem()
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
    padding-bottom: 55px;
    .header1{
        width: 100%;
        height: 35px;
        display: flex;
        justify-content: space-between;
        position: fixed;
        z-index: 999;
        top: 0;
        padding: 0 4px;
        span{
            // line-height: 35px;
            margin-top: 5px;
        }
        img{
           
            width: 24px;
            height: 24px;
        }
    }
    .header{
        height: 35px;
        line-height: 35px;
        width: 100%;
        position: fixed;
        top: 0;
        background-color: #FFB7B7;
        z-index: 10;
        color: white;
        display: flex;
        justify-content: space-between;
        i{
            line-height: 35px;
        }
        .title{
            margin: auto;
                font-weight: normal;
        }
        .rightimg{
            margin-right: 16px;
            img{
                // width: 14px;
                height:14px;
                margin:0 0  0  14px;
            }
        }
        .topnav{
           span{
                line-height: 35px;
                margin: 0 9px;
                font-size:14px;
                font-family:PingFang-SC;
                font-weight:500;
                color:rgba(105,105,105,1);
                padding-bottom: 2px;
               
           }
           .active{
                border-bottom:3px solid #ffffff;
                color:rgba(255,255,255,1);
           }
        }
    }
    position: relative;
    .storefoots{
        position: fixed;
        bottom: 0px;
        background-color: #f6f6f6;
        width: 100%;
        height: 55px;
        display: flex;
        justify-content: space-between;
        .iconbox{
            display: flex;
            a{
                // margin: 10px;
                // line-height: 100%;
                margin: 4px 6px 0px 6px;
                img{
                    width: 24px;
                    height: 24px;
                }
                p{
                    margin: 0;
                    padding: 0;
                    color: #FFB7B7;
                }
            }
        }
        .btnbox{
            height: 40px;
            line-height: 40px;
            
            font-size: 16px;
            margin-top: 10px;
            margin-left: 10px;
            // margin-left: 10px;
               a{
                   color: white;
                   display: inline-block;
                   text-align: center;
                   line-height: 32px;
                  width: 83px;
                  height: 32px;
                   margin: 0 4px;
                   font-size:14px;
                    font-family:PingFangSC;
                    font-weight:600;
                    color:rgba(255,255,255,1);
                    border-radius: 5px;
               }
           .toshopcar{
                background-color:#FFB7B7;
           
           }
            .buysuccess{
                background-color:#FFB09A;
              
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
                 }
                 .mui-numbox{
                     margin-left:auto
                 }
             }
         }
         .footer{
             position: fixed;
             bottom: 0;
             width: 100%;
             box-sizing:border-box;
             font-size:0;
             text-align: center;
             a{
                
                //  background-color: #ff0036;
                 display: inline-block;
                 font-size: 16px;
                 text-align: center;
                 padding: 10px 0;
                 color: white;
             }
             .inshopcar{
                 background-color: #FF9500;
                  width: 50%;
             }
             .buybtn{
                  width: 50%;
                 background-color: #FF0036;
             }
             .shiyi{
                 background-color: #FFB09A;
                text-align: center;
                margin: 0 15px 4px 25px;
                font-size:14px;
                padding: 10px 26px;
                border-radius: 5px;
             }
         }
        }
    }
}
.linkbox{
    p{
        margin:0;
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
  .word{
    padding: 10px;
    background-color: #fff;
    margin-bottom: 5px;
    .price{
    color: #ff0036;
    font-size: 24px;
    margin: 8px 0;
    .oldprice{
        font-size: 16px;
        color: #999;
        text-decoration: line-through;
    }
    }
    .msginfo{
        color: #051B28;
        line-height: 20px;
        font-size: 16px;
    }
  }
  .fahuo{
      background-color: #fff;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      .fahuolist{
          width: 100%;
          display: flex;
          justify-content: space-between;
          .left{
              font-size:14px;
              font-weight:500;
              color:rgba(132,132,132,1);
              .title{
                  font-weight:500;
                  color:rgba(132,132,132,1); 
              }
              i{
                  font-size: 16px;
              }
          }
      }
  }
  .canshu{
      background-color: #fff;
      padding: 10px;
      margin-top: 5px;
      p{
          margin:4px 0;
          display: flex;
          justify-content: space-between;
          .left{
              .title{
                  font-size:14px;
                  font-family:PingFang-SC-Medium,PingFang-SC;
                  font-weight:500;
                  color:rgba(132,132,132,1);
                  margin-right: 10px;
              }
              .middle{
                  font-size:12px;
                  font-family:PingFang-SC-Medium,PingFang-SC;
                  font-weight:500;
                  color:rgba(132,132,132,1);
              }
          }
      }
  }
  .contentmsg{
      background-color: #fff;
      margin-top: 5px;
      padding: 10px;
      .topmsg{
          display: flex;
          justify-content: space-between;
          margin-bottom: 6px;
          .left{
            font-size:14px;
            font-weight:500;
            color:rgba(140,140,140,1)
          }
          .right{
              font-size:10px;
            font-weight:500;
            color:rgba(140,140,140,1);
            i{
                font-size: 14px;
            }
          }
      }
      .footermsg{
          display: flex;
          img{
              width: 44px;
              height: 44px;
              border-radius: 44px;
          }
          .right{
              margin-left: 8px;
              .username{
                  font-size:14px;
                  font-weight:600;
                  color:rgba(103,102,102,1);
              }
          }
      }
  }
  .storemsg{
      background-color: #fff;
      margin-top: 5px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      .left{
          display: flex;
           img{
          width: 58px;
          height: 58px;
          border-radius: 58px;
      }
      .middle{
          margin-left: 10px;
          h4{
            font-size:18px;
            font-weight:600;
            color:rgba(34,34,34,1);
          }
          p{
              font-size:14px;
              font-weight:500;
              color:rgba(74,74,74,1);
              i{
                  font-size: 16px;
              }
          }
      }
      }
      .right{
          margin-top: 10px;
          span{
              padding: 4px 20px;
              background-color: #FF9500;
              border-radius: 12px;
              font-size:12px;
              font-weight:400;
             color:rgba(255,255,255,1);
          }
      }
     
  }
  .recommendbox{
      display: flex;
      margin: 10px 15px 10px 15px;
      flex-wrap:wrap;
    //   width: 100%;
      li{
          margin: 0 10px;
          width: 43%;
          background-color: #fff;
          box-shadow:0px 2px 8px 0px rgba(0,0,0,0.31);
          border-radius:5px;
          overflow: hidden;
          margin-bottom: 8px;
        //   text-align: center;
          img{
              width: 100%;
              height: 144px;
          }
          .bottombox{
              .topmsg{
                  font-size:10px;
                  font-weight:400;
                  color:rgba(31,31,31,0.87);
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
              }
              .price{
                  font-size:14px;
                font-weight:bold;
                color:rgba(212,40,40,0.87);
              }
          }
      }
  }
   
}



  
   
    
   
 
  
.storegoodsinfo{
    // margin: 10px;
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



</style>
