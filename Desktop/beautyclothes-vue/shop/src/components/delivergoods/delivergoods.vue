<template>
    <div class="delivergoods">
       <div class="header">
           <i class="mui-icon mui-icon-back" @click="bank"></i>
           <p class="nav">
               <span @click="togle(0,keyword1)" :class="{active:0==active}">{{keyword1}}</span>
               <span @click="togle(1,keyword2)" :class="{active:1==active}">{{keyword2}}</span>
               <span @click="togle(2,keyword3)" :class="{active:2==active}">{{keyword3}}</span>
               <span @click="togle(3,keyword4)" :class="{active:3==active}">{{keyword4}}</span>
           </p>
       </div>

       <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active:0,
            activeindex:"",
            keyword1:"待付款",
            keyword2:"待发货",
            keyword3:"已发货",
            keyword4:"退款/售后",
            orderStatus:""
        }
    },
    created() {
        this.getindex()
    },
    methods: {
        togle:function(i,keyword){
            this.active=i
            this.$router.push({path:"/delivergoods/deliverlist",query:{orderStatus:keyword}})
        },
        // 获取传过来的activeindex值并且进行高亮显示
        getindex:function(){
            this.activeindex=this.$route.query.activeindex
            this.active=this.activeindex
            this.orderStatus=this.$route.query.keyword
             this.$router.push({path:"/delivergoods/deliverlist",query:{orderStatus:this.orderStatus}})
        },
        bank:function(){
            this.$router.push({path:"/usercenter"})
        }
    },
}
</script>
<style lang="scss" scoped>
    .delivergoods{
        padding-top: 50px;
        .header{
            width: 100%;
            height: 50px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 10;
            display: flex;
            
            i{
                 line-height: 50px;
                 color: #FFFFFF;
                 font-size: 28px;
            }
            .nav{
                margin-top: 20px;
                span{
                    color:rgba(86,86,86,1);
                    font-size: 14px;
                    margin-right: 30px;
                    font-family:PingFangSC;
                    // padding-bottom: 6px;
                    font-weight: 600;
                    padding: 0 2px 6px 2px;
                }
                .active{
                    border-bottom: 4px solid #FFFFFF;
                    color: white;
                }
            }
        }
    }
</style>