<template>
    <div class="searchgoods">
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <input type="text" readonly v-model="searchword" @click="insearch">
        </div>
          <div class="shaixuanlist">
            <p class="shaixuanbox">
                <span @click="paitoggle(0)" :class="{paiactive:0==paiactive}">综合</span>
                <span @click="paitoggle(1,'销售量',false)" :class="{paiactive:1==paiactive}">销量</span>
                <span @click="paitoggle(2)" :class="{paiactive:2==paiactive}">信用</span>
                <span @click="paitoggle(3,'单价',false)" :class="{paiactive:3==paiactive}">价格降序</span>
                <span @click="paitoggle(4,'单价',true)" :class="{paiactive:4==paiactive}">价格升序</span>
            </p>
        </div>
            <div class="goodsbox">
             <ul>
                 <li v-for="(item,index) in msglist" :key="index"> <img :src="item.主图地址" alt="" @click="ingoodsinfo(item.是否为租赁,item.商品ID)">
                  <div class="bottomword">
                      <p class="title">{{item.商品名}} </p>
                      <p class="pricenum">
                          <span class="price" v-if='item.是否为租赁==0?true:false'>￥{{item.单价}}</span>
                          <span class="price" v-if='item.是否为租赁==1?true:false'>￥{{item.租赁价格}}/天</span>

                          <span class="paypelope">{{item.销售量}}人付款</span>
                      </p>
                  </div>
                  </li>
             </ul>
        </div>

    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
             msglist:[],
             searchword:'',
             paiactive:0
        }
    },
    watch: {
        $route(){
             console.log(111)
              this.getmsg()
        }
    },
    created() {
        this.getmsg()
       
    },
    methods: {
        insearch:function(){
            this.$router.push({path:'/storesearchindex',query:{supplierId:this.$route.query.supplierId}})
        },
        // 点击返回
        bank:function(){
            this.$router.go(-2)
        },

        getmsg:function(){
            var supplierId=this.$route.query.supplierId
            var keyWords=this.$route.query.keyWords
            this.searchword=keyWords
            var data={
                supplierId:supplierId,
                keyWords:keyWords
            }
            this.axios.post('cusSupplierInfo/searchGoodsInSup',this.qs.stringify(data)).then(response=>{
               
                console.log(response)
                if(response.data.data.length>0){
                    this.msglist=response.data.data
                }else{
                    Toast("没有你搜索的内容");
                }
            })
        },
         ingoodsinfo:function(isRent,id){
            if(isRent==1){
                this.$router.push({path:'/lease/leasegoodsinfo',query:{productId:id}})
            }else{
                this.$router.push({path:'/home/goodsinfo',query:{productId:id}})
            }
        },
          // 筛选点击高亮
        paitoggle:function(i,word,state){
               this.paiactive=i
               if(i==2){
                   Toast({
                      message: '暂无信用排名',
                      duration: 500
                 });
                 return
               }
               if(i==0){
                   this.getmsg()
                   return;
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
img[lazy=loading] {
  height: 100px;
  width: 100%;
  background-color:#cccccc;
}
.searchgoods{
 
    // padding: 0 5px;
    padding-top: 45px;
    .header{
        height: 45px;
        background-color: #FFB7B7;
        position: fixed;
        top: 0;
        z-index: 99;
        width: 100%;
        display: flex;
        i{
            line-height: 45px;
            color: #ffffff;
        }
        input{
        width: 100%;
        margin-left: 28px;
        margin-right: 30px;
        // margin-top: 2px;
        height: 28px;
        background:rgba(255,255,255,1);
        border-radius:15px;
        opacity:0.7809;
        // line-height: 45px;
        margin-top: 10px;
        }
    }
     .shaixuanlist{
            p{
         margin: 0;
        }
        padding: 8px 0;
        background-color: #ffffff;
        .shaixuanbox{
            text-align: center;
            span{
                margin:0 15px;
                color: #6A6A6A;
                font-size: 12px;
            }
            .paiactive{
                color: #FFB7B7;
            }
        }
    }
    .goodsbox{
        // width: 100%;
        margin: 10px 10px;
        ul{
             width: 100%;
            display: flex;
            flex-wrap: wrap;
            li{
                width: 46%;
                margin: 0 6px;
                // background:rgba(255,255,255,1);
                box-shadow:0px 2px 8px 0px rgba(0,0,0,0.31);
                border-radius:5px;
                overflow: hidden;
                margin-bottom: 10px;
                img{
                    width: 100%;
                    height: 144px;
                }
                .bottomword{
                    padding: 0 10px;
                    .title{
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                        font-size:12px;
                        font-family:PingFangSC-Regular,PingFangSC;
                        font-weight:500;
                        color:rgba(31,31,31,0.87);
                        }
                        .pricenum{
                            .price{
                                font-size:14px;
                                font-weight:bold;
                                color:rgba(212,40,40,0.87);
                            }
                            .paypelope{
                                font-size:10px;
                                font-weight:400;
                                color:rgba(153,153,153,0.87);
                            }
                        }
                }
            }
        }
    }
}
</style>