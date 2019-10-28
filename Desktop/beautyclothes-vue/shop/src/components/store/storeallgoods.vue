<template>
      <div class="productlistbox">
          <p class="msgnav">
              <span @click="msgtoggle(0)" :class="{active:0==active}">综合</span>
              <span @click="msgtoggle(1,'sale',false)" :class="{active:1==active}">销量</span>
              <span @click="msgtoggle(2)" :class="{active:2==active}">信用</span>
              <span @click="msgtoggle(3,'productPrice',false)" :class="{active:3==active}">价格降序</span>
              <span @click="msgtoggle(4,'productPrice',true)" :class="{active:4==active}">价格升序</span>

          </p>
        <ul class="goodsinfo">
        <li v-for="item in msglist" :key="item.productId" @click="ingoodsinfo(item.isRent,item.productId)">
        <!-- <router-link :to="{path:'/home/goodsinfo',query:{productId:item.productId}}"> -->
         <img class="rentpic" v-if='item.isRent==1?true:false' :src="item.rentPicUrl" alt="">
            <img :src="item.productPicUrl" alt="">
            <div class="wordbox">
            <p class="msginfo" >{{item.productName}}</p>
            <p class="dibumsg">
            <span class="price">{{item.isRent?'租赁价格'+item.rentPrice:'￥'+item.productPrice}}</span> <span class="paypeploe">{{item.sale}}人付款</span>
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
            active:0,
            msglist:[]
        }
    },
    created() {
        Indicator.open({
        text: '加载中...',
       spinnerType: 'fading-circle'
      });
        this.getallgoodsmsg()
    },
    methods: {
        getallgoodsmsg:function(){
            var supplierId=this.$route.query.supplierId
            console.log(supplierId)
            var data={
                supplierId:supplierId
            }
            this.axios.post('cusSupplierInfo/allGoodsInSup',this.qs.stringify(data)).then(response=>{
                console.log(response)
                 this.msglist=response.data.data
                  Indicator.close();
            })
        },
        // 点击进入商品详情页
        ingoodsinfo:function(isRent,id){
            if(isRent==1){
                this.$router.push({path:'/lease/leasegoodsinfo',query:{productId:id}})
            }else{
                this.$router.push({path:'/home/goodsinfo',query:{productId:id}})
            }
        },
        // 点击进行筛选操作
        msgtoggle:function(i,word,state){
            this.active=i
            if(i==0){
                this.getallgoodsmsg()
                return
            }else if(i==2){
                 Toast({
                      message: '暂无信用排名',
                      duration: 500
                 });
                 return
            }
             this.msglist.sort(this.sortBy(word,state))
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

    },
}
</script>
<style lang="scss" scoped>
     .productlistbox{
         background-color: #ffffff;
        margin-top: 10px;
        .msgnav{
            span{
                margin: 0 18px;
                font-size:12px;
                font-weight:500;
                color:rgba(106,106,106,1);
            }
            .active{
                font-size:12px;
                font-weight:500;
                color:rgba(255,183,183,1);
            }
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
            .rentpic{
                position: absolute;
                width: 50px;
                height: 50px;
                border-radius: 50px;
                top: 0;
                left: 0;
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