<template>
    <div class="usermsgbox">
       <div class="header">
           <i class="mui-icon mui-icon-back" @click="bank"></i>
           <h3>个人信息</h3>
       </div>
       <div class="contentmsg">
           <div class="topmsg">
               <p class="msglist" @click="inedituserpic"> <span class="left">头像</span> <i class="mui-icon mui-icon-arrowright"></i> </p>
               <p class="msglist" @click="ineditusername"> <span class="left">昵称</span> <i class="mui-icon mui-icon-arrowright"></i> </p>
           </div>
           <div class="footermsg">
               <p class="msglist" @click="inbirthday">
                   <span class="left">生日</span>
                   <span class="right"> <i class="mui-icon mui-icon-arrowright"></i> </span>
               </p>
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
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
        ineditusername:function(){
            this.$router.push({path:'setusermsg/editusername'})
        },
        // 点击修改头像
        inedituserpic:function(){
             this.$router.push({path:'setusermsg/edituserpic'})
        },
        // 点击进入修改生日页面
        inbirthday:function(){
            this.$router.push({path:'/setusermsg/editbirthday'})
        }
    },
}
</script>
<style lang="scss" scoped>
    .usermsgbox{
        p{
            margin: 0;
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
        .contentmsg{
            margin-top: 10px;
            .topmsg{
                background-color: #ffffff;
                margin-bottom: 10px;
                .msglist{
                    border-bottom: 1px solid #cccccc;
                    display: flex;
                    justify-content: space-between;
                    padding: 15px 10px;
                    .left{
                        font-size:18px;
                        font-weight:500;
                        color:rgba(68,68,68,1);
                    }
                }
            }
            .footermsg{
                background-color: #ffffff;
                .msglist{
                    display: flex;
                    justify-content: space-between;
                     padding: 15px 10px;
                    .left{
                        font-size:18px;
                       font-weight:500;
                       color:rgba(68,68,68,1);
                    }
                }
                
            }
        }
    }
</style>