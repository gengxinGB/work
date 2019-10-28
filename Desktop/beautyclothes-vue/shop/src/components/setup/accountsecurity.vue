<template>
    <div class="contentmsgbox">
            <div class="header">
                 <i class="mui-icon mui-icon-back" @click="bank"></i>
                 <h3>账号安全</h3>
             </div>
             <div class="infomsg">
                  <p class="smalltitle firsttitle"> <span class="bigword">登录密码</span> <span class="smallword" @click="editmsg">修改<i class="mui-icon mui-icon-forward"></i> </span> </p>
                  <p class="smalltitle"> <span class="bigword">修改手机号码</span> <span class="smallword" @click="edtelephonenum"> 188****5632 <i class="mui-icon mui-icon-forward"></i> </span> </p>
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
            this.$router.go(-1)
        },
        editmsg:function(){
            this.$router.push({path:'/accountsecurity/editpassword'})
        },
        // 点击进入修改手机号码页面
        edtelephonenum:function(){
            this.$router.push({path:'/accountsecurity/edittelephonenum'})
        }
    },
}
</script>
<style lang="scss" scoped>
    .contentmsgbox{
        p{
            margin: 0
        }
        padding-top: 45px;
         .header{
            width: 100%;
            height: 45px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 99;
            display: flex;
            // justify-content: space-between;
            i{
                line-height: 45px;
                color:rgba(255,255,255,1);
            }
            h3{
                text-align: center;
                width: 100%;
                line-height: 35px;
                font-size:18px;
                font-family:PingFangSC;
                font-weight:600;
                color:rgba(255,255,255,1);
            }

        }
        .infomsg{
            background-color: #fff;
            margin-top: 10px;
            padding: 0 20px 0 10px;
            .firsttitle{
                 border-bottom: 1px solid #cccccc;
            }
            .smalltitle{
                display: flex;
                justify-content: space-between;
                padding: 16px 0;
                // border-bottom: 1px solid #cccccc;
                .bigword{
                    font-size:18px;
                    font-family:PingFang-SC;
                    font-weight:500;
                    color:rgba(68,68,68,1);
                }
                .smallword{
                    font-size:12px;
                    font-family:PingFang-SC;
                    font-weight:500;
                    color:rgba(192,192,192,1);
                    i{
                        font-size:12px;
                        // font-family:PingFang-SC;
                        font-weight:500;
                        color:rgba(192,192,192,1);
                    }
                }
            }
        }
    }
</style>