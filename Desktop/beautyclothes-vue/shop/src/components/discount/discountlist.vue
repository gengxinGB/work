<template>
    <div class="discountlist">
       <div v-for="(item,index) in msglist" :key="index" class="bigbx">
             <div class="picbox" >
                  <img :src="item.productPicUrl" alt="">
             </div>
              <div class="goodswordmsg">
                  <h3 class="title">{{item.productName}}</h3>
                  <p class="paiming">{{item.rank}}</p>
                <mt-progress :value="(item.sale/item.totalStock)*100" :bar-height="8">
                  <div slot="start" class="leftword">已售{{item.sale}}件</div>
                  <div slot="end" class="rightword"> 剩余{{item.surplusStock}}件</div>
                </mt-progress>
                <div class="footsmsg">
                    <span class="price">￥{{item.discountPrice}} <i>￥{{item.productPrice}}</i> </span>
                    <button class="rushbuy" @click="ingoodsinfo(item.productId)">马上抢</button>
                </div>
              </div>
       </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msglist:[],
            value:""
        }
    },
    created() {
        this.getlist()
    },
    watch: {
         $route(){
           this.getlist()
        }
    },
    methods: {
            // 点击进入商品详情
            ingoodsinfo:function(id){
                this.$router.push({path:"/home/goodsinfo",query:{productId:id}})
            },
        getlist:function(){
            var categoryName=this.$route.query.categoryName
            var data={
                categoryName:categoryName
            }
             this.axios.post("cusProduct/showDiscountProductInDiscount",this.qs.stringify(data)).then(response=>{
             console.log(response)
            //  for(var i=0;i<response.data.data.length;i++){
            //      response.data.data[i].sale
            //  }
             this.msglist=response.data.data
            this.msglist.sort(this.sortBy("sale",false))
         })
        },
        // 封装的排序方法 
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
    .discountlist{
       
       .bigbx{
         display: flex;
          background-color: white;
        margin: 10px;
        padding:10px 10px 6px 10px;
        border-radius:10px;
       border:1px solid rgba(221,221,221,1);
    
       }
        .picbox{
            width: 122px;
            height: 116px;
            img{
                width: 100%;
                height: 100%;
                box-shadow:0px 2px 8px 0px rgba(0,0,0,0.31);
                border-radius:5px
            }
       }
       .goodswordmsg{
           margin-left: 15px;
           .title{
               font-size: 14px;
               font-weight:600;
               color:rgba(31,31,31,0.87);
                line-height:20px
           }
           .paiming{
               font-size:12px;
                font-family:PingFang-SC;
                font-weight:500;
                color:rgba(220,14,14,0.87);
                line-height:17px;
                margin-bottom: 0;
           }
        .leftword{
            position: absolute;
            left: 0;
            top: 15px;
            font-size: 10px;
            color: #565656;
        }
        .rightword{
            position: absolute;
            right: 0;
            top: 15px;
            color: #ABABAB;
            font-size: 8px;
        }
        .footsmsg{
            margin-top: 15px;
            line-height: 34px;
            .price{
                font-size:14px;
                font-family:PingFang-SC;
                font-weight:bold;
                color:rgba(212,40,40,0.87);
                line-height:20px;
                i{
                    font-style: normal;
                    text-decoration: line-through;
                    font-size:12px;
                    font-family:PingFang-SC;
                    font-weight:500;
                    color:rgba(171,171,171,0.87);
                    line-height:14px;
                }
            }
            .rushbuy{
                width:84px;
                height:31px;
                background:rgba(234,64,64,1);
                border-radius:5px;
                color: #FFFFFF;
                font-size: 14px;
                margin-left: 6px;
                border: none;
            }
        }
       }
    }
</style>