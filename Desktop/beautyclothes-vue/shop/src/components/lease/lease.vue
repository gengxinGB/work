<template>
    <div class="leasebox">
         <div class="headerbox"> <i class="mui-icon mui-icon-back" @click="bank"></i> <h4 class="title">服装租赁</h4> </div>
        <ul class="imgbox">
            <li v-for="item in leaselist" :key="item.rentCategoryId">
                <router-link :to='{path:"/lease/leaseinfo",query:{rentCategoryId:item.rentCategoryId,name:item.rentCategoryName}}'>
                    <img :src="item.rentCategoryUrl" alt="">
                    <p>{{item.rentCategoryName}}</p>
                </router-link>
            </li>
        </ul>

           <div class="drimlike">
       <div class="toptitle">
            <span class="topleft"></span> <h3 class="like"> 热门服装 </h3>
       </div>
   <ul class="goodsinfo">
     <li v-for="item in likelist" :key="item.productId" @click="ingoodsinfo(item.productId)">
        <!-- <router-link :to="{path:"home/goodsinfo",query:{productId:item.productId}}"> -->
         <img class="rentpic" v-if="item.isRent==1?true:false" :src="item.rentPicUrl" alt="">
           <div class="imgwordbox">
                <img :src="item.productPicUrl" alt="">
            <div class="wordbox">
            <p class="msginfo" >{{item.productName}}</p>
            <p class="dibumsg">
            <span class="price">{{item.isRent==1?"￥"+item.rentPrice+"/天":"￥"+item.productPrice}}</span> <span class="paypeploe">{{item.sale}}人付款</span>
            </p>
            </div>
           </div>
        <!-- </router-link> -->
    </li>
    
</ul>

     </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            leaselist:[],
            likelist:[]
        }
    },
    created() {
        this.getlease()
        this.getgoodsmsg()
    },
    methods: {
    // 点击返回上一层
      bank:function(){
          this.$router.go(-1)
      },

    // 点击进入商品详情
    ingoodsinfo:function(id){
        this.$router.push({path:"/lease/leasegoodsinfo",query:{productId:id}})
    },
    //获取分类接口
     getlease:function(){
         this.axios.get("cusRentCenter/getRentCategories").then(response=>{
             console.log(response)
             this.leaselist=response.data.data
             console.log(this.leaselist)
         })
     },
    //  热门服装接口数据
    getgoodsmsg:function(){
        this.axios.get("cusRentCenter/showRent").then(response=>{
            console.log(response)
            this.likelist=response.data.data
        })
    }


    },
}
</script>
<style lang="scss" scoped>
    .leasebox{
       
            .headerbox{
            height: 35px;
            width: 100%;
            position: fixed;
            background-color:#FFB7B7;
            display: flex;
            color: white;
            i{
                line-height: 35px;
            }
            .title{
                // text-align: center;
                margin: auto;
                font-weight: normal;
            }
        }
           .imgbox{
            display: flex;
            flex-wrap: wrap;
            padding-top:40px;
            
            li{
                position: relative;
                width: 25%;
                text-align: center;
                img{
                  width:69px;
                height:69px;
                background-color:rgba(0,0,0,1);
                opacity:0.42560000000000003;
                border-radius: 69px;
                }
                p{
                    position: absolute;
                    // text-align: center;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    color: #FFFFFF;
                }
            }
        }
        .drimlike{
            margin-top: 10px;
        }
        .toptitle{
            display: flex;
            // line-height: 22px;
            padding: 4px 0;
            .moregoods{
                margin-left: auto;
                font-size: 12px;
                color: #A3A3A3;
                margin-right: 10px;
            }
        }
         .like{
        font-size: 16px;
        color:rgba(31,31,31,1);
        margin-left: 10px;
    }
    .topleft{
        display: inline-block;
        width: 10px;
        height: 20px;
        background-color: #FFB7B7
    }
    .goodsinfo{
         .rentpic{
            position: absolute;
            top:0;
            left: 16px;
            width: 35px;
            height: 35px;
            border-radius: 35px;
        }
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        li{
            width: 50%;
            padding: 0 15px;
            
            position: relative;
            margin-bottom: 6px;
          .imgwordbox{
                box-shadow:0px 0px 8px 0px rgba(0,0,0,0.31);
                  border-radius:5px;
                img{
                width: 100%;
                height: 147px;
                border-radius:5px;
            }
            .wordbox{
                background-color: white;
                 padding: 0 4px;
                .msginfo{
                    height: 42px;
                    margin-top: 3px;
                    overflow: hidden;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp:2;
                    -webkit-box-orient:vertical;
                    white-space: normal; 
                    color: #1F1F1F;
//                    overflow:hidden;
//                    display:-webkit-box; //将对象作为弹性伸缩盒子模型显示;
//                    text-overflow:ellipsis;//溢出部分用省略号代替
//                    -webkit-line-clamp:2; //设置文本显示两行
//                    -webkit-box-orient:vertical;  //从上到下排列子元素;
//                    white-space:normal;
            }
            .dibumsg{
               
                .price{
                    font-size: 14px;
                    color: rgb(255, 80, 0)
                }
                .paypeploe{
                    font-size: 10px;
                }
            }
            }
          }
        }
    }
    }
</style>