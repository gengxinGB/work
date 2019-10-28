<template>
    <div class="beautybox">
         <div class="header">
            <i class="mui-icon mui-icon-back" @click="back"></i>  <h4 class="title">{{msglist[0].二级商品分类}}</h4>
        </div>
           <ul class="goodsinfo">
     <li v-for="item in msglist" :key="item.商品ID" >
         <router-link :to='{path:"home/goodsinfo",query:{productId:item.商品ID}}'> 
           <div class="imgwordbox">
                <img :src="item.主图地址" alt="">
            <div class="wordbox">
            <p class="msginfo" >{{item.商品名}}</p>
            <p class="dibumsg">
            <span class="price">{{item.单价}}</span> <span class="paypeploe">{{item.销售量}}人付款</span>
            </p>
            </div>
           </div>
         </router-link>
    </li>
    
</ul>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            msglist:[]
        }
    },
    created() {
        this.getgoodsinfo()
    },
    methods: {
        getgoodsinfo:function(){
            var twoCategoryId=this.$route.query.twoCategoryId
            console.log(twoCategoryId)
            var data={
                twoCategoryId:twoCategoryId
            }
             this.axios.post("cusProductCategory/searchGoodsByCategoryInBeauty",this.qs.stringify(data)).then(response=>{
                 console.log(response)
                 if(response.data.data.length==0){
                     Toast("没有该商品")
                    this.$router.push({path:"/beautymakeupcategroy"})
                 }else{
                     this.msglist=response.data.data
                 }
                 
             })
        },
        back:function(){
            this.$router.push({path:"/beautymakeupcategroy"})
        }
    },
}
</script>
<style lang="scss" scoped>
    .beautybox{
        padding-top: 45px;
            .header{
            width: 100%;
            height: 40px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 10;
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
            background-color: white;
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