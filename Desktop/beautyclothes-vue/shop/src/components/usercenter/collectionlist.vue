<template>
    <div>
         <div class="picbox" v-for="item in productList" :key="item.productId">
                <img :src="item.productPicUrl" alt="">
                  <div class="rightbox">
                    <h3>{{item.productName}}</h3>
                    <p class="usercang">{{item.collectionNum}}人收藏</p>
                    <p class="price"><span class="left">{{item.isRent==1?"租赁价格￥"+item.rentPrice:item.discountPrice!=null?"折扣价￥"+item.discountPrice:"￥"+item.productPrice }}</span>  <span class="findxiang">找相似</span>  </p>
                </div>
                <span class="rentpic" v-show="item.isRent==0?false:true">
                        <img :src="item.rentPicUrl" alt="">
                </span>
        </div>
         
         <div class="artbox" v-for="(item,index) in articleList" :key="index">
               <p class="title">{{item.title}}</p>
               <div class="artmsg">
                    <p><span>{{item.author}}</span> <span> 发布于：{{ new Date(+new Date(item.createTime)+836001000).toISOString().replace(/T/g, ' ').replace(/.[\d]{3}Z/,' ')}}</span></p>
                    <span class="inartmsg" @click="inarticlemsg(item.articleId)">详情</span>
               </div>
         </div>


    </div>
</template>
<script>
export default {
    data() {
        return {
            // 商品集合
            productList:[],
            // 文章集合
            articleList:[]
        }
    },
    watch: {
          $route(){
           this.getcollectionmsg()
        }
    },
    created() {
        this.getcollectionmsg()
    },
    methods: {
        
        // 获取页面内容
        getcollectionmsg:function(){
            var collectionType=this.$route.query.collectionType
            console.log(collectionType)
            this.axios.get('cusPersonalCenter/getCollectionInPersonalCenter?collectionType='+collectionType).then(response=>{
                 console.log(response)
                this.productList=response.data.data.productList
                this.articleList=response.data.data.articleList
            })
        },
        // 点击进入商品详情页面
        inarticlemsg:function(id){
              this.$router.push({path:'/find/allarticle',query:{articleId:id}})
        }
    },
}
</script>
<style lang="scss" scoped>
     .picbox{
            display: flex;
            background-color: white;
            border-radius:10px;
            padding: 10px 16px;
            margin-bottom: 2px;
             position: relative;
              .rentpic{
                    width: 40px;
                    height: 40px;
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    img{
                         border-radius: 40px;
                        height: 100%;
                        width: 100%;
                        background-color:#fff;
                    }
                }
            h3{
                margin: 0;
            } 
            p{
                margin: 0;
            }
            img{
                width: 92px;
                height: 92px;
                background:rgba(255,255,255,1);
                border-radius:5px;
            }
            .rightbox{
                width: 100%;
                padding-left: 10px;
                h3{
                    font-size: 14px;
                    font-weight:600;
                    color:rgba(31,31,31,0.87);
                }
                .usercang{
                    margin-top: 5px;
                    font-size:12px;
                    font-family:PingFang-SC;
                    font-weight:500;
                    color:rgba(161,161,161,0.87);
                }
                .price{
                    margin-top: 25px;
                    display: flex;
                    justify-content:space-between;
                    .left{
                        font-size:16px;
                        font-family:PingFang-SC;
                        font-weight:bold;
                        color:rgba(212,40,40,0.87);
                    }
                    .findxiang{
                        font-size:12px;
                        font-family:PingFang-SC;
                        font-weight:500;
                        color:rgba(155,155,155,0.87);
                        padding: 0px 9px;
                        border-radius: 10px;
                        border:1px solid #cccccc;
                    }
                }
            }

        }
        .artbox{
            background-color: white;
            padding: 4px; 
            border-radius: 6px;
            margin-bottom: 4px;
            .artmsg{
                display: flex;
                justify-content: space-between;
                .inartmsg{
                    color: #08A7DF;
                    font-size: 14px;
                }
            }
            .title{
                font-size:14px;
                font-family:PingFangSC;
                font-weight:600;
                color:rgba(31,31,31,0.87);
            }
        }
</style>