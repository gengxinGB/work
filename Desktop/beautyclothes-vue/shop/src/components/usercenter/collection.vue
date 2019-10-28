<template>
    <div class="findbox">
        <div class="header">
           <i class="mui-icon mui-icon-back" @click="back"></i>
            <p class="title"> <span :class="{active:0==active}" @click="toggle(0,keywordone)">{{keywordone}}</span> <span :class="{active:1==active}"  @click="toggle(1,keywordtwo)">{{keywordtwo}}</span> </p>
            <span>
                 <img src="../../assets/newimg/搜索.png" alt="">
                 <img src="../../assets/newimg/shezhi.png" alt="">
            </span>
        </div>
        <div class="bigpicbox">
         <!-- <div class="picbox">
                <img src="../../assets/img/fenleixqnv.jpg" alt="">
                  <div class="rightbox">
                    <h3>双肩带  原创气质宫廷风</h3>
                    <p class="usercang">4214人收藏</p>
                    <p class="price"><span class="left">￥68</span>  <span class="findxiang">找相似</span>  </p>
                </div>
        </div> -->
        <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active:0,
            keywordone:"宝贝",
            keywordtwo:"内容"
        }
    },
    created() {
        this.$router.push({path:'/collection/collectionlist',query:{collectionType:"宝贝"}})
    },
    methods: {
        toggle:function(i,keyword){
            this.active=i
            console.log(keyword)
            this.$router.push({path:'/collection/collectionlist',query:{collectionType:keyword}})
        },
        back:function(){
            this.$router.push({path:'/usercenter'})
        }
    },  
}
</script>
<style lang="scss" scoped>
    .findbox{
        padding-top: 46px;
        .header{
            width: 100%;
            height: 40px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 10;
            display: flex;
            padding: 0 12px;
            line-height: 40px;
            justify-content:space-between;
            i{
                line-height: 40px;
                color: #FFFFFF;
            }
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
        .bigpicbox{
          margin: 0 10px;
       
        }
        
       
    }
</style>