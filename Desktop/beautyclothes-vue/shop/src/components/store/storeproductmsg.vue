<template>
    <div class="productlistbox">
             <img v-if="likelist.supplierShowPic" :src="likelist.supplierShowPic" class="brand">
         <div class="storemsg">
             <h4 class="srorename">{{likelist.supplierName}}</h4>
             <p class="storebrief">
                {{likelist.supplierDesc}}
             </p>
         </div>

       <h4 class="tuijiangoods">推荐商品</h4>
        <ul class="goodsinfo">
        <li v-for="(item,index) in likelist.productAndPicDTOList" :key="index" @click="ingoodsinfo(item.isRent,item.productId)">
        <!-- <router-link :to="{path:'/home/goodsinfo',query:{productId:item.productId}}"> -->
             <img class="rentpic" v-if='item.isRent==1?true:false' :src="item.rentPicUrl" alt="">
            <img :src="item.productPicUrl" alt="">
            <div class="wordbox">
            <p class="msginfo" >{{item.productName}}</p>
            <p class="dibumsg">
            <span class="price">{{item.isRent==1?"租赁价格"+item.rentPrice:"￥"+item.productPrice}}</span> <span class="paypeploe">{{item.sale}}人付款</span>
            </p>
            </div>
        <!-- </router-link> -->
       </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 获取商品信息的集合
            likelist:{}
        }
    },
    created() {
        this.getcteategroymsg()
    },
    watch: {
        $route(){
           this.getcteategroymsg()
        }
    },
    methods: {
        // 分类获取商品信息
        getcteategroymsg:function(){
            var supplierId=this.$route.query.supplierId
            
            this.axios.get('cusSupplierInfo/supplierIntroduction?supplierId='+supplierId).then(response=>{
                console.log(response)
                if(response.data.success==true){
                    this.likelist=response.data.data
                }
                // this.likelist=response.data.data
                console.log(this.likelist)
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
        .brand{
            width: 100%;
            height: 183px;
        }
        .storemsg{
            background-color: #ffffff;
            padding: 8px;
            margin-bottom: 10px;
            width: 100%;
            .srorename{
                 padding: 4px;
                 font-size:18px;
                 font-weight:600;
                 color:rgba(90,90,90,1);
            }
            .storebrief{
                letter-spacing:2px;
                font-size:14px;
                font-weight:500;
                color:rgba(79,79,79,1);
            }
        }
        // margin-top: 10px;
        .tuijiangoods{
            background-color: #ffffff;
            padding: 4px;
            font-size:18px;
            font-weight:600;
            color:rgba(90,90,90,1);
        }
         .goodsinfo{
             
        // width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        margin: 6px;
        li{
            width: 48%;
            margin: 0 2px;
            background-color: white;
            position: relative;
            //  text-align:justify;
            border-radius: 6px;
            overflow: hidden;
            margin-bottom: 10px;
            .rentpic{
                position: absolute;
                top: 0;
                left: 0;
                width: 50px;
                height: 50px;
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