<template>
   <div class="productlistbox">
        <ul class="goodsinfo">
        <li v-for="item in msglist" :key="item.productId" @click="ingoodsinfo(item.isRent,item.productId)">
        <!-- <router-link :to="{path:'/home/goodsinfo',query:{productId:item.productId}}"> -->
         <img class="rentpic" v-if='item.isRent==1?true:false' :src="item.rentPicUrl" alt="">
            <img :src="item.productPicUrl" alt="">
            <div class="wordbox">
            <p class="msginfo" >{{item.productName}}</p>
            <p class="dibumsg">
            <span class="price">{{item.isRent==1?'租赁价格'+item.rentPrice:'￥'+item.productPrice}}</span> <span class="paypeploe">{{item.sale}}人付款</span>
            </p>
            </div>
        <!-- </router-link> -->
    </li>
        </ul>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
             msglist:[],
        }
    },
    created() {
        Indicator.open({
        text: '加载中...',
       spinnerType: 'fading-circle'
      });
        this.getnewgoodsmsg()
    },
    methods: {
        // 获取新品上市产品接口
        getnewgoodsmsg:function(){
            var supplierId=this.$route.query.supplierId
            var data={
                supplierId:supplierId
            }
            this.axios.post('cusSupplierInfo/newProducts',this.qs.stringify(data)).then(response=>{
                console.log(response)
                if(response.data.data.length==0){
                    Toast({
                      message: '暂无上新商品',
                      duration: 500
                    });
                      Indicator.close();
                    return
                }
                 this.msglist=response.data.data
                  Indicator.close();
                 console.log(this.msglist)
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
    .productlistbox{
        margin-top: 10px;
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
            }
            .wordbox{
                padding: 0 10px;
                border: 1px solid #cccccc;
                .msginfo{
                    height: 42px;
                    margin-top: 3px;
                    overflow: hidden;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp:2;
                    -webkit-box-orient:vertical;
                    white-space: normal; 
            }
            .dibumsg{
                .price{
                    color: rgb(255, 80, 0)
                }
                .paypeploe{
                    float: right;
                }
            }
            }
        }
    }
    }
</style>