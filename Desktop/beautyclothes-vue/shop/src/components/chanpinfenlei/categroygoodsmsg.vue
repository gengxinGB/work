<template>
    <div class="goodsmsg">
         <div class="header"> <i class="mui-icon mui-icon-back" @click="bank"></i> <h4>商品列表</h4> </div>
        <ul>
            <li v-for="item in msglist" :key="item.商品ID" @click="ingoodsinfo(item.是否为租赁,item.商品ID)">
                <a href="javascript:;">
                       <img v-lazy="item.主图地址" alt="">
                <div class="rightbox">
                    <p class="goodsmsgtitle">{{item.商品名}}</p>
                    <span class="catagroy">{{item.一级商品分类}}</span> <span class="catagroy">{{item.二级商品分类}}</span> <span class="catagroy">{{item.三级商品分类}}</span>
                    <p class="footsbox">  <span><i class="mui-icon mui-icon-home"></i>{{item.店铺名}}</span> <span><i>{{item.isRent==1?"租赁价格"+item.租赁价格:"￥"+item.单价}}</i> </span> <span>已售:{{item.销售量}}</span></p>
                </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            // 商品详细信息集合
            msglist:[]
        }
    },
    created() {
        this.getmsg()
    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
        getmsg:function(){
            var ThreeCategoryId=this.$route.query.ThreeCategoryId
            var data={
                ThreeCategoryId:ThreeCategoryId
            }
             this.axios.post("cusProductCategory/searchGoodsByCategory",this.qs.stringify(data)).then(response=>{
                 console.log(response)
                 console.log(response.data.data)
                 if(response.data.data.length==0){
                        Toast("没有该商品")
                         this.$router.go(-1)
                 }else{
                     this.msglist=response.data.data
                 }
                 
             })
        },
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
img[lazy=loading] {
  height: 100px;
  width: 100%;
  background-color:#cccccc;
}
.goodsmsg{
         
    padding-top: 45px;
    // padding-top: 40px;
     .header{
         height: 45px;
         width: 100%;
         position: fixed;
         top: 0;
         z-index: 10;
         background-color: #FFB7B7;
         line-height: 35px;
         display: flex;
         i{
             line-height: 45px;
             color: #ffffff;
         }
         h4{
             margin: auto;
             color: #ffffff;

         }
     }
ul{
    list-style:none;
    padding:0;
    margin: 0;
    li{
      a{
        //   display: block;
        margin-top: 8px;
        display: flex;
        background-color: white;
        box-shadow: 0 0 6px #cccccc;
        img{
            width: 100px;
            height: 100px;
        }
        .rightbox{
            padding-left: 5px;
            .goodsmsgtitle{
               overflow: hidden;
               display: -webkit-box;
               text-overflow: ellipsis;
               -webkit-line-clamp:2;
               -webkit-box-orient:vertical;
               white-space: normal; 
               font-size: 16px;
               color: black;
            }
            .catagroy{
                font-size: 14px;
                padding: 8px;
                background-color: azure;
                border-radius: 2px;
                color: #8f8f94;
            }
            .footsbox{
                margin-top: 10px;
                i{
                    color: red;
                    font-style: normal;
                }
                span{
                    margin:3px;
                }
            }
        }
      }
    }
}
    }
</style>