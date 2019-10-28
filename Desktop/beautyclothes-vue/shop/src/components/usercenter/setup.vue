<template>
    <div class="setupbox">
       <div class="header">
           <i class="mui-icon mui-icon-back" @click="bank"></i>
           <h3>设置</h3>
       </div>
       <ul class="contentmsg">
           <li class="firstli" @click="insetusermsg">
               <div class="left">
                   <p class="title">个人信息</p>
                   <p class="smxianshi">头像、昵称</p>
               </div>
                <i class="mui-icon mui-icon-forward"></i>
           </li>
            <li class="firstli" @click="inaccountsecurity">
               <div class="left">
                   <p class="title" >账号和安全</p>
                   <p class="smxianshi">修改密码、修改手机号码、社交账号绑定</p>
               </div>
                <i class="mui-icon mui-icon-forward"></i>
           </li>
       </ul>

         <ul class="contentmsg">
           <li class="firstli secondli" @click="inpaysetup">
               <div class="left">
                   <p class="title">支付设置</p>
                  
               </div>
                <i class="mui-icon mui-icon-forward"></i>
           </li>
            <li class="firstli secondli" @click="incurrency">
               <div class="left">
                   <p class="title">通用</p>
               </div>
                <i class="mui-icon mui-icon-forward"></i>
           </li>
           <li class="firstli secondli">
               <div class="left">
                   <p class="title">音效</p>
               </div>
                <i class="mui-icon mui-icon-forward"></i>
           </li>
       </ul>
        <ul class="contentmsg">
             <li class="firstli secondli">
               <div class="left">
                   <p class="title">关于云聚优品</p>
               </div>
                <i class="mui-icon mui-icon-forward"></i>
           </li>
        </ul>
        <span class="loginout" @click="loginout">
            退出账号
        </span>
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
        // 退出登录按钮事件
        loginout:function(){
             this.axios.get('customerLogin/sinOut').then(response=>{
                console.log(response)
                localStorage.removeItem("userName")
                this.$router.push({path:'/login'})
          })
        },
        // 点击进入账号和安全页面
        inaccountsecurity:function(){
            this.$router.push({path:'/setup/accountsecurity'})
        },
        // 点击进入支付设置页面
        inpaysetup:function(){
            this.$router.push({path:'/setup/paysetup'})
        },
        // 点击进入通用设置页面
        incurrency:function(){
            this.$router.push({path:'/setup/currency'})
        },
        // 点击进入个人信息设置页面
        insetusermsg:function(){
            this.$router.push({path:'/setusermsg'})
        }
    },
}
</script>
<style lang="scss" scoped>
    .setupbox{
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
                line-height: 45px;
                font-size:18px;
                font-family:PingFangSC;
                font-weight:600;
                color:rgba(255,255,255,1);
            }

        }
        .contentmsg{
            background-color: #ffffff;
            margin: 10px 0;
            .firstli{
                display: flex;
                justify-content: space-between;
                padding: 4px 12px;
                border-bottom: 1px solid #cccccc;
                p{
                    margin: 0;
                }
                .left{
                    .title{
                        font-size:16px;
                        font-family:PingFang-SC;
                        font-weight:500;
                        color:rgba(68,68,68,1);
                    }
                    .smxianshi{
                        font-size:12px;
                        font-family:PingFang-SC;
                        font-weight:500;
                        color:rgba(192,192,192,1);
                    }
                }
                i{
                    color: #D1D1D1;
                }
            }
            .secondli{
                 padding: 10px 12px;
            }
        }
        .loginout{
            padding: 6px 40px;
            background-color: #FFB7B7;
            border-radius:5px;
            position: absolute;
            bottom: 18px;
            left: 50%;
            transform: translateX(-50%);
            font-size:14px;
            font-family:PingFangSC;
            font-weight:600;
            color:rgba(255,255,255,1);
        }
    }
</style>