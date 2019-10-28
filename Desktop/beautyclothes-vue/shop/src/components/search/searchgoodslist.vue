<template>
    <div class="searchgoods">
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
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            msglist:[],
            keyWords:'',
            value:'',
            active:0,
            // 筛选高亮
            paiactive:0
        }
    },
    watch:{
        // 监听路由当后面的参数发生变化再次发送请求
        $route(){
           this.sendmsg()
        }
    },
    created() {

        Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });
        // 页面一加载请求 
        this.sendmsg()
        this.active=0
    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
        // 请求数据接口
        sendmsg:function(){
            console.log(this.$route.query.keyWords)
            this.keyWords=this.$route.query.keyWords
            this.value=this.$route.query.value
            var data={
                keyWords:this.keyWords,
                value:this.value
             }
            this.axios.post('cusProduct/searchBox',this.qs.stringify(data)).then(response=>{
            console.log(response)
            if(response.status==200&&response.data.data.length==0){
                    Toast({
                      message: '暂无商品',
                      duration: 500
                    });
                      Indicator.close();
            }else{
                this.msglist=response.data.data
                Indicator.close();
                // console.log(this.msglist)
            }
        })
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
               this.msglist.sort(this.sortBy(word,state))
            
        },
        // 头部高亮
        toggle:function(i,val){
            this.active=i
                var data={
                keyWords:this.keyWords,
                value:val
             }
        if(i==0){
            this.sendmsg()
        }else{
            this.$router.push({path:'/search/searchstore',query:{keyWords:this.keyWords,value:val}})
        }
        },
         ingoodsinfo:function(isRent,id){
            if(isRent==1){
                this.$router.push({path:'/lease/leasegoodsinfo',query:{productId:id}})
            }else{
                this.$router.push({path:'/home/goodsinfo',query:{productId:id}})
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
    },
}
</script>
<style lang="scss" scoped>
img[lazy=loading] {
  height: 100px;
  width: 100%;
  background-color:#cccccc;
}
p{
    margin: 0;
}
.searchgoods{
    margin-top: 45px;
    background:rgba(255,255,255,1);
    // padding: 0 5px;
    // padding-top: 40px;
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
            height:28px;
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
    .shaixuanlist{
        padding: 8px 0;
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
        margin: 0 20px;
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
