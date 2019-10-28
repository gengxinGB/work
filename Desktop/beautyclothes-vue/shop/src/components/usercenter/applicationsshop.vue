<template>
    <div class="applicationshopbox">
       <div class="headerbox"> <i class="mui-icon mui-icon-back" @click="bank"></i> <h4 class="title">申请店铺</h4> </div>
        <div class="content">
            <div class="topimg">
                <img src="../../assets/img/fenleixqnv.jpg" alt="">
                <p>点击修改头像</p>
            </div>
            <div class="shopmsg">
                 <input type="text" placeholder="设置店铺名称">
                 <input type="text" placeholder="设置店铺名称">
                 <div class="foots">
                       <span>立即开通</span>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    created() {
        
    },
    methods: {
        bank:function(){
            this.$router.push({path:'/usercenter'})
        }
    },
}
</script>
<style lang="scss" scoped>
    .applicationshopbox{
        padding-top: 45px;
        .headerbox{
            height: 45px;
            width: 100%;
            position: fixed;
            background-color:#FFB7B7;
            display: flex;
            color: white;
            top: 0;
            i{
                line-height: 45px;
            }
            .title{
                // text-align: center;
                font-family:PingFangSC;
                font-weight:600;
                color:rgba(255,255,255,1);
                margin: auto;
                font-weight: normal;
            }
        }
        .content{
            .topimg{
                text-align: center;
                padding-top: 18px;
                img{
                    width: 136px;
                    height: 136px;
                    border-radius: 136px;
                }
            }
            .shopmsg{
                background-color: #FFFFFF;
                // height: 100%;
                padding: 28px 20px;
                input{
                    border: none;
                    border-bottom: 1px solid #D7D7D7;
                }
                .foots{
                    margin-top: 60px;
                    text-align: center;
                    span{

                        padding: 5px 25px;
                        border-radius:5px;
                        background-color: #FFB7B7;
                        font-size:14px;
                        font-family:PingFang-SC;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                    }
                }
            }
        }
    }
</style>