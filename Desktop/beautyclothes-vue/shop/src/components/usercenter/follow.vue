<template>
    <div class="fansbox">
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i> 
            <p class="title">
                <router-link :to="{path:'/follow/followuser'}" > 用户</router-link>
                <router-link :to="{path:'/follow/followstore'}" > 店铺</router-link>
                <router-link :to="{path:'/follow/followbrand'}" > 品牌</router-link>
            </p>
        </div>
       
        <router-view></router-view>

    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            fanslist:[],
            isshow:true,
            active:1,
        }
    },
    created() {
        // this.getfanslist()
        this.$router.push({path:'/follow/followuser'})
    },
    methods: {
        // toggle:function(i){
        //     this.active=i
         
           
        // },
        bank:function(){
            this.$router.push({path:'/usercenter'})
        },
        // 获取粉丝列表信息
        


 
    },
}
</script>
<style lang="scss" scoped>
    .fansbox{
        padding-top: 45px;
        .header{
            width: 100%;
            height: 45px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 10;
            color: white;
            display: flex;
                i{
                line-height: 45px;
            }
            .title{
                width: 100%;
                // margin: auto;
                text-align: center;
                line-height: 45px;
                // font-weight: normal;
                a{
                    font-size:18px;
                    font-family:PingFangSC-Semibold,PingFangSC;
                    font-weight:600;
                   color:rgba(86,86,86,1);
                    margin: 0 8px;
                    padding-bottom:6px;
                   
                }
                .router-link-active{
                     border-bottom: 3px solid #fff;
                     color: #fff;
                }
            }
        }
       
    }
</style>