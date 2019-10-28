<template>
    <div class="findbox">
        <div class="header">
            <img src="../assets/newimg/照相机.png" alt="" @click="sendarticle">
            <p class="title"> <span :class="{active:0==active}" @click="toggle(0,keywordone)">{{keywordone}}</span> <span :class="{active:1==active}"  @click="toggle(1,keywordtwo)">{{keywordtwo}}</span> </p>
            <img src="../assets/newimg/搜索.png" alt="">
        </div>



        <router-view></router-view>
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            active:0,
            keywordone:"热门",
            keywordtwo:"关注"
        }
    },
    watch: {
        $route(){
            console.log(11111)
             if(this.$route.path=='/find'){
                 this.$router.push({path:'/find/findmsg',query:{discoveryType:"热门"}})
             }

        }
    },
    created() {
        this.$router.push({path:'/find/findmsg',query:{discoveryType:"热门"}})
    },
    methods: {
        toggle:function(i,keyword){
            this.active=i
            this.$router.push({path:'/find/findmsg',query:{discoveryType:keyword}})
        },
        // 点击进入发表文章页面
        sendarticle:function(){
            this.$router.push({path:'/sendarticle'})
        }
        
    },  
}
</script>
<style lang="scss" scoped>
    .findbox{
        padding-top: 45px;
        .header{
            width: 100%;
            height: 45px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 10;
            display: flex;
            padding: 0 12px;
            line-height: 45px;
            justify-content:space-between;
            img{
                width: 28px;
                height: 28px;
                margin-top: 8px;
            }
            .title{
                span{
                    font-size:18px;
                    font-family:PingFangSC;
                    font-weight:600;
                    color:#565656;
                    padding-bottom: 6px;
                    margin: 0 3px;
                }
                .active{
                    // font-weight:600;
                    color:rgba(255,255,255,1);
                    // text-decoration:underline;
                    border-bottom: 2px solid #ffffff;
                }
            }
        }
      
    }
</style>