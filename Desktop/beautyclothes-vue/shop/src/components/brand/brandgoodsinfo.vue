<template>
    <div class="brandgoodsbox">
          <div class="headerbox"> <i class="mui-icon mui-icon-back" @click="bank"></i> <h4 class="title">{{topbrandlist.brandName}}</h4> </div>
            <div class="bigimgbox">
                 <img src="../../assets/img/fenleixqnv.jpg" alt="">
            </div>
          <div class="brandinfo">
             <div v-if="topisshow">
                <div class="infotop">
                 <div class="left">
                    <img :src="topbrandlist.brandLogo" alt="">
                  <span class="brandname">{{topbrandlist.brandName}}</span>
                 </div>
                 <div class="right">
                     <p class="guanzhu" v-if="topbrandlist.isCollection==1?true:false" @click="changestatus">已关注</p>
                     <p class="guanzhu" v-if="topbrandlist.isCollection==0?true:false" @click="changestatus">关注</p>

                     <p>粉丝数{{topbrandlist.fans}}</p>
                 </div>
              </div>
              <p class="jianjie">
                 {{topbrandlist.brandDesc}}
              </p>
            </div>
              <p class="desc" :class='searchBarFixed == true ? "isFixed" :""'>
              <span>价格 
              <i @click='price("productPrice",true,1)' class="mui-icon mui-icon-arrowthinup" :class="{active : active==1}"></i> 
              <i @click='price("productPrice",false,2)' class="mui-icon mui-icon-arrowthindown" :class="{active : active==2}"></i> 
              </span> 
              <span >销量 
                  <i @click='price("sale",true,3)' class="mui-icon mui-icon-arrowthinup" :class="{active : active==3}"></i> 
                  <i @click='price("sale",false,4)' class="mui-icon mui-icon-arrowthindown" :class="{active : active==4}"></i>
             </span> </p>
                <!-- 图片区域 -->
              <div class="contentbox">
                <h4 class="brandtitle">品牌单品</h4>
                <ul class="goodsinfo">
                <li v-for="item in arrlist" :key="item.productId" @click="ingoodsinfo(item.isRent,item.productId)">
                    <!-- <router-link :to="{path:"/home/goodsinfo",query:{productId:item.productId}}"> -->
                     <img class="rentpic" v-if="item.isRent==1?true:false" :src="item.rentPicUrl" alt="">
                        <img :src="item.productPicUrl" alt="">
                        <div class="wordbox">
                        <p class="msginfo" >{{item.productName}}</p>
                        <p class="dibumsg">
                        <span class="price">{{item.isRent==1?"￥"+item.rentPrice+"/天":"￥"+item.productPrice}}</span> <span class="paypeploe">{{item.sale}}人付款</span>
                        </p>
                        </div>
                    <!-- </router-link> -->
                </li>
    
            </ul>
              </div>

          </div>
    </div>
</template>
<script>
import { Indicator } from "mint-ui";
export default {
    data() {
        return {
            brandinfolist:{},
            topbrandlist:{},
            // 要排序的数据
            arrlist:[],
            name:1,
            active:"",
            topisshow:true,
            searchBarFixed:false
        }
    },
    created() {
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        this.getbrandinfo()
    },
    mounted () {
           window.addEventListener("scroll", this.handleScroll)
       },

    destroyed () {
        window.removeEventListener("scroll",this.handleScroll)
      },

    methods: {

     // 滑动监听事件
      handleScroll () {
     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
       console.log(scrollTop)
      scrollTop>200? this.searchBarFixed = true : this.searchBarFixed = false
    },
        // 点击返回上一层
            bank:function(){
                this.$router.go(-1)
            },
        // 点击进行价格/销量排序
        price:function(a,e,name){
            this.arrlist.sort(this.sortBy(a,e))
             this.active = name;
        },
    
    //封装的排序方法 
      sortBy: function(attr,rev){
        //第二个参数没有传递 默认升序排列
        if(rev ==  undefined){
            rev = 1;
        }else{
            rev = (rev) ? 1 : -1;
        }
        return function(a,b){
            a = a[attr];
            b = b[attr];
            if(a < b){
                return rev * -1;
            }
            if(a > b){
                return rev * 1;
            }
            return 0;
        }
    },

    // 点击改变状态
    changestatus:function(){
          var data={
                brandId:this.$route.query.brandId
            }
         this.axios.post("cusPersonalCenter/concernBrand",this.qs.stringify(data)).then(response=>{
             console.log(response)
             if(response.data.success==true){
                     this.getbrandinfo()
             }
         })
    },

        
        // 获取品牌商品详情接口
         getbrandinfo:function(){
             var brandId=this.$route.query.brandId
             console.log(brandId)
             var data={
                 brandId:brandId
             }
              this.axios.post("cusBrandInfo/getGoodsInBrand",this.qs.stringify(data)).then(response=>{
                    console.log(response)
                    this.topbrandlist=response.data.data.brandAndInfoDTO
                    this.arrlist=response.data.data.productAndPicDTOList
                    Indicator.close();
              })
         },
        //  点击跳转详情页面
        ingoodsinfo:function(isRent,id){
                if(isRent==1){
             this.$router.push({path:"/lease/leasegoodsinfo",query:{productId:id}})
            }else{
            this.$router.push({path:"/home/goodsinfo",query:{productId:id}})
            }
        }
    
    },

}
</script>
<style lang="scss" scoped>
    .brandgoodsbox{
        p{
            margin: 0;
        }
        padding-top: 45px;
             .headerbox{
            height: 45px;
            width: 100%;
            position: fixed;
            background-color: #FFB7B7;
            display: flex;
            z-index: 10;
            color: white;
            top:0;
            i{
                line-height: 45px;
            }
            .title{
                // text-align: center;
                margin: auto;
                font-weight: normal;
            }
        }
        .bigimgbox{
            img{
                width: 100%;
                height: 180px;
            }
        }
        .brandinfo{
            background-color: white;
            //  padding: 0 8px;
            // padding-top:40px;
           
            .infotop{
                 padding: 0 8px;
                 overflow: hidden;
                 border-bottom: 1px solid #cccccc;
            .left{
                float: left;
                img{
                width: 50px;
                height: 50px;
                border-radius: 50px;
                vertical-align: middle
            }
            .brandname{
                font-size:18px;
                font-weight:600;
                color:rgba(255,183,183,1);
            }
            }
            .right{
                float: right;
                p{
                    text-align: left;
                }
                .guanzhu{
                    padding: 2px 20px;
                    background-color: #FFC023;
                    border-radius: 13px;
                    color: #fff;
                }
            }
            }
        .jianjie{
             padding: 0 8px;
            margin-top: 6px;
            padding-bottom: 8px;
            min-height: 42px;
            overflow: hidden;
             display: -webkit-box;
            text-overflow: ellipsis;
            // -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            white-space: normal; 
            font-weight:500;
            color:rgba(79,79,79,1);
            font-size: 14px;
           
        }
        .desc{
            width: 100%;
            text-align: center;
            font-size: 0;
            span{
                display: inline-block;
                width: 50%;
                background-color: #cccccc;
                font-size: 14px;
                i{
                 font-weight: 700;
                }
                .active{
                    color: red;
                }
            }
        }
        .isFixed{
        position:fixed;
         background-color:#Fff;
        top:35px;
        right: 0;
        z-index:999;
        }
        .contentbox{
            background-color: #F6F6F6;
            width: 100%;
            padding: 10px;
        }
        .brandtitle{
            margin:15px;
            font-size:18px;
            font-weight:600;
            color:rgba(90,90,90,1);
        }
        .goodsinfo{
      
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        li{
            width: 48%;
            margin: 0 2px;
            background-color: white;
            position: relative;
            //  text-align:justify;
            margin-bottom: 10px;
            border-radius: 10px;
            overflow: hidden;
            
            .rentpic{
                position: absolute;
                width: 50px;
                height: 50px;
                top: 0;
                left: 0;
                border-radius: 50px;
            }
            img{
                width: 100%;
                height: 180px;
                // border: 1px solid #cccccc;
            }
            .wordbox{
                padding: 0 10px;
                // border: 1px solid #cccccc;
                .msginfo{
                    height: 42px;
                    margin-top: 3px;
                    overflow: hidden;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp:2;
                    -webkit-box-orient:vertical;
                    white-space: normal; 
                    color:rgba(31,31,31,0.87);
                    font-weight: 500;
//                    overflow:hidden;
//                    display:-webkit-box; //将对象作为弹性伸缩盒子模型显示;
//                    text-overflow:ellipsis;//溢出部分用省略号代替
//                    -webkit-line-clamp:2; //设置文本显示两行
//                    -webkit-box-orient:vertical;  //从上到下排列子元素;
//                    white-space:normal;
            }
            .dibumsg{
                padding: 2px;
                .price{
                    color:#D42828;
                    font-weight: 600;
                    font-size: 14px;
                }
                .paypeploe{
                    float: right;
                }
            }
            }
        }
    }
        }
        
    }
</style>