<template>
    <div class="beautymakeupcategroy">
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="back"></i>  <h4 class="title">美妆</h4>
        </div>
        <div class="content">
            <ul class="imgbox" v-for="item in msglist" :key="item.oneCategoryId">
                <div class="huazhuangtitle">
                    {{item.oneCategoryName}}
                </div>
                <li v-for="smitem in item.twoCategoryDTOList" :key="smitem.twoCategoryId"><img :src="smitem.twoCategoryPicUrl" alt="" @click="ingoods(smitem.twoCategoryId)"> 
                    <p>{{smitem.twoCategoryName}}</p>
                </li>
            </ul>
         
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            msglist:[]
        }
    },
    created() {
        this.getmsg()
    },
    methods: {
        back:function(){
            this.$router.push({path:"/home"})
        },
        // 获取美妆的信息
        getmsg:function(){
            this.axios.get("cusProductCategory/getOneAndTwoCategoryInBeauty").then(response=>{
                console.log(response)
                this.msglist=response.data.data

            })
        },
        // 点击进入美妆详情
        ingoods:function(id){

            this.$router.push({path:"/beautymakeupinfo",query:{twoCategoryId:id}})
        }
    },
}
</script>
<style lang="scss" scoped>
    .beautymakeupcategroy{
        background-color: #F6F6F6;
       padding-bottom: 20px;
        padding-top: 40px;
        .header{
            width: 100%;
            height: 40px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 10;
            display: flex;
            color: white;
             i{
                line-height: 35px;
            }
            .title{
                // text-align: center;
                margin: auto;
                font-weight: normal;
            }
        }
        .content{
           
            .imgbox{
                 background-color: white;
                display: flex;
                flex-wrap: wrap;
                margin: 10px 30px 0 59px;
                padding: 16px 17px 0 38px;
                position: relative;
                li{
                    width: 25%;
                     padding:0px 5px;
                    
                    text-align: center;
                    // margin-left: 30px;
                    img{
                        width: 100%;
                        // height: 100%;
                        height: 50px;
                        border-radius: 100%;
                    }
                    p{
                        font-size: 12px;
                        color: #757575;
                        white-space :nowrap;
                    }
                }
                .huazhuangtitle{
                    width:84px;
                    height:34px;
                    background-color: #FFB7B7;
                    text-align: center;
                    line-height: 34px;
                    box-shadow:0px 2px 6px 0px rgba(0,0,0,0.2);
                    border-radius:17px;
                    position: absolute;
                    top: 0;
                    left: -45px;
                    color: white;
                }
            }
        }
    }
</style>