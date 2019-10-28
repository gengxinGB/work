<template>
    
    <div class="searchstore">
         <div class="header">
            <i class="mui-icon mui-icon-arrowleft bank" @click="bank"></i>
            <input type="text" v-model="keyWords" readonly @click="bank">
            <i class="mui-icon-extra mui-icon-extra-filter shaixuan"></i>
        </div>
         <div class="topbox">
            <p class="titlebox">
                <span @click="toggle(0,0)" :class="{active:0==active}">商品</span>
                <span @click="toggle(1,1)" :class="{active:1==active}">店铺</span>
            </p>
        </div>
        <!-- 排列筛选 -->
        <div class="sortbox">
            <p class="sortnav">
                <span @click="navtoggle(0)" :class="{navactive:0==navactive}">综合</span>
                <span @click="navtoggle(1)" :class="{navactive:1==navactive}">销量</span>
                <span @click="navtoggle(2,'distance',true)" :class="{navactive:2==navactive}">距离</span>

            </p>
        </div>
         <div class="bigbox" v-for="item in msglist" :key="item.supplierId">
             <div class="topmsgbox">
                 <div class="topimgbox"> <img :src="item.supplierLogoUrl" alt=""></div>
                 <div class="storeinfo">
                     <div >
                         <h4>{{item.supplierName}}</h4>
                        <p>店铺等级：{{item.supplierLevel}} 星</p>

                     </div>
                     <div class="leftbox">
                         <p>到店距离{{item.distance}}KM</p>
                         <button @click="instore(item.supplierId)" class="inshop">进店</button>
                         
                     </div>
                 </div>
             </div>
             <div class="footerbox">
                 <a href="javascript:;" @click="ingoodsinfo(smitem.isRent,smitem.productId)" v-for="smitem in item.productAndPicDTOList" :key="smitem.productId"> <img :src="smitem.productPicUrl" alt="">  <p class="price">{{smitem.isRent==1?"￥"+smitem.rentPrice+"/天":"￥"+smitem.productPrice}}</p></a>
             </div>
             
         </div>

    </div>
</template>
<script>
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
     data() {
        return {
            msglist:[],
            keyWords:'',
            value:'',
            supplierId:'',
            active:1,
            locationaddress:'',
            navactive:0
        }
    },
    watch:{
        $route(){
            this.sendmsg()
        }
    },
    mounted() {
        // 页面一加载请求方法
      this.sendmsg()
      Indicator.open('加载中...');
    },
    methods: {
        // 筛选条件的事件
        navtoggle:function(i,word,state){
            this.navactive=i
            if(i==2){
                 this.msglist.sort(this.sortBy(word,state))
            }else if(i==0){
                this.sendmsg()
            }

        },


        // 点击切换高亮以及数据
        toggle:function(i,val){
            this.active=i
            if(i==0){
                this.$router.push({path:'/search/searchgoodslist',query:{keyWords:this.keyWords,value:val}})
            }
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


        bank:function(){
            this.$router.push({path:'/search'})
        },
        // 点击进入店铺
        instore:function(supplierId){
            
            this.$router.push({path:'/storeindex',query:{supplierId:supplierId}})
        },

        // 封装请求商品数据的方法
        sendmsg:function(){
              console.log(this.$route.query.keyWords)
              this.keyWords=this.$route.query.keyWords
              this.value=this.$route.query.value
            //    this.city=localStorage.getItem("cityname")
              this.locationaddress=localStorage.getItem("cityname")
              console.log(this.locationaddress)
              var data={
                    keyWords:this.keyWords,
                    value:this.value,
                    locationAddress:this.locationaddress
              }
            this.axios.post('cusProduct/searchBox',this.qs.stringify(data)).then(response=>{
             console.log(response)
            if(response.status==200&&response.data.data.length==0){
               Toast({
                  message: '暂无店铺',
                  duration: 500
                });
                 Indicator.close();
            }else{
                this.msglist=response.data.data
                console.log(this.msglist)
                 Indicator.close();
            }
        })
        },
        ingoodsinfo:function(isRent,id){
         if(isRent==1){
             this.$router.push({path:'/lease/leasegoodsinfo',query:{productId:id}})
            }else{
            this.$router.push({path:'/home/goodsinfo',query:{productId:id}})
            }
        }
    },
}
</script>
<style lang="scss" scoped>
ul{
    list-style: none;
    margin: 0;
    padding: 0;
}
p{
    margin: 0;
}
.searchstore{
    // padding: 0 10px;
     padding-top: 45px;
     .header{
        position: fixed;
        top: 0;
        display: flex;
        height: 45px;
        background-color: #FFB7B7;
        width: 100%;
        z-index: 10;
        input{
            width: 100%;
            margin: 0;
            margin: 0 45px;
            height:24px;
            background:rgba(255,255,255,1);
            border-radius:15px;
            opacity:0.78;
            margin-top: 10px;
        }
        .bank{
            position: absolute;
            left: 7px;
            color: #fff;
            top: 50%;
            transform: translateY(-50%);
        }
        .shaixuan{
            position: absolute;
            right: 10px;
            color: #fff;
            top: 50%;
            transform: translateY(-50%);
        }
    }
     .topbox{
        background-color: #FFB7B7;
        padding-bottom: 7px;
        .titlebox{
            text-align: center;
            margin: 0;
            span{
                font-size:16px;
                font-family:PingFangSC-Semibold,PingFangSC;
                font-weight:400;
                color:rgba(255,255,255,1);
                margin: 0 10px;
                 padding-bottom: 3px;
            }
            .active{
                font-weight: 500;
                border-bottom: 3px solid #fff;
            }
        }
    }
    .sortbox{
        background-color: #ffffff;
         padding: 8px 0;
        .sortnav{
            span{
                font-size: 12px;
                margin: 0 30px;
            }
            .navactive{
                color: #FFB7B7;
            }
        }
    }
    .bigbox{
        background-color: white;
        border-radius: 5px;
        // margin-bottom: 8px;
        margin: 6px;
        padding: 4px;
        .topmsgbox{
            border-bottom: 1px solid #cccccc;
            display: flex;
            position: relative;
            h4{
                font-size: 16px;
                font-weight: normal;
            }
            .topimgbox{
                width: 40px;
                height: 100%;
                margin-top: 5px;
                margin-left: 5px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .storeinfo{
                width: 100%;
                margin-left: 8px;
                display: flex;
                // position: relative;
                justify-content: space-between;
                .leftbox{
                    text-align: center;
                }
                .inshop{
                    // position: absolute;
                    // right: 5px;
                    // top: 10px;
                    background-color: #FFB7B7 ;
                    color: #ffffff;
                    border: none;
                    border-radius: 5px;
                }
            }
        }
        .footerbox{
            display: flex;
            a{
                width: 33%;
                text-align: center;
                border: 1px solid #cccccc;
                border-top: none;
                img{
                    width: 100%;
                    height: 110px;
                }
                .price{
                    color: red;
                    font-weight: 600px;
                    font-size: 16px;
                }
            }
        }
    }
}

</style>
