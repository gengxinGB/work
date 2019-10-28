<template>
    <div id="forgetbox">
        <h4>邮箱登录</h4>
        <input type="text" placeholder="请输入邮箱" v-model="email">
        <input type="number" class="codeinput" placeholder="请输入验证码" v-model="codemsg">
        <mt-button type="danger" class="getcode" v-show="yanzhengshow">{{times}}秒后获取</mt-button>
        <mt-button type="danger" class="getcode" @click="getcode" v-show="!yanzhengshow">获取验证码</mt-button>
        <p v-show="isshow" class="red">{{tishimsg}}</p>
        <mt-button type="primary" size="large" class="codeloginbtn" @click="lijilogin">立即登录</mt-button>
        <router-link to="/login">账号密码登录</router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            email:"",
            codemsg:"",
            tishimsg:"",
            isshow:false,
            times:0,
            yanzhengshow:false
        }
    },
    methods: {
        // 获取验证码的事件
        getcode:function(){
            if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)){
                this.tishimsg="请输入正确的邮箱",
                this.isshow=true
            }else{
                this.isshow=false
                // 请求接口位置
                var data={
                    customerEmail:this.email
                }
                console.log(this.email)
                // 获取邮箱验证码接口
                this.axios.post('customerLogin/sendMailCodeByLogin',this.qs.stringify(data)).then(responese=>{
                    console.log(responese)
                    if(responese.status==200&&responese.data.success==false){
                     this.tishimsg=responese.data.errorMsg
                     this.isshow=true
                    }else if(responese.status==200&&responese.data.success==true){
                        // 倒计时开始
                        this.isshow=false
                        this.times=60
                        var timeid=setInterval(()=>{
                            if(this.times==0){
                             this.yanzhengshow=false
                             clearInterval(timeid)
                            }else{
                                this.yanzhengshow=true
                            }
                            this.times--
                        },1000)
                    }
                })

            }

        },
        // 立即登录的事件
        lijilogin:function(){
            // 如果输入框的信息为空时验证
            if(this.phone==""||this.codemsg==""){
                this.tishimsg="请输入完整信息"
                this.isshow=true
            }else if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)){
                     this.tishimsg="请输入正确的邮箱地址"
                     this.isshow=true
            }else if(!/^[0-9]{6}$/.test(this.codemsg)){
                this.tishimsg="验证码为6位数字"
                this.isshow=true
            }else{
                this.isshow=false
                // 验证通过之后请求接口
                var data1={
                    customerEmail:this.email,
                    mailCode:this.codemsg
                }
                 const xhrFields={
                  withCredentials: true
            }
                // 邮箱验证码登录接口
                 this.axios.post('customerLogin/sinInByQQMail',this.qs.stringify(data1),xhrFields).then(responese=>{
                    console.log(responese)
                    console.log(this.email)
                    console.log(this.codemsg)
                    // 验证码错误
                     if(responese.status==200&&responese.data.success==false){
                        this.tishimsg=responese.data.errorMsg
                        this.isshow=true
                     }else if(responese.status==200&&responese.data.success==true){
                          sessionStorage.setItem("userName",responese.data.data)
                         // 正确
                          this.$router.push('/home')
                     }
                })
            }
        }
    },
}
</script>
<style lang="scss" scoped>
#forgetbox{
    padding: 0 5px;
    .red{
        color: red;
    }
    h4{
       margin: 15px 0;
    }
    .codeinput{
        width: 60%;
    }
    .getcode{
        margin-left: 10px;
    }
    .codeloginbtn{
        margin: 15px 0;
    }
}
</style>
