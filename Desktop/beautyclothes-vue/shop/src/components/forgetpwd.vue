<template>
    <div class="forgetbox">
        <h4>忘记密码</h4>
        <span>手机号：&nbsp; </span><input type="text" placeholder="请输入手机号" v-model="phone"><br>
        <span>验证码：&nbsp; </span><input type="text" placeholder="输入验证码" class="codeinp" v-model="codemsg"><mt-button class="getcodebtn" type="danger" @click="getcode">获取验证码</mt-button> <br>
        <span>新密码：&nbsp; </span> <input type="password" placeholder="新密码" v-model="newpassword"><br>
        <span>确认密码:</span> <input type="password" placeholder="确认密码" v-model="enterpassword">
        <p v-show="isshow" class="red">{{errormsg}}</p>
        <mt-button class="tijiaobtn" type="danger" size="large" @click="tijiaomsg" >提交</mt-button>
        <span> <router-link to="/login">记起密码立即登录！</router-link> </span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            phone:"",
            codemsg:"",
            newpassword:"",
            enterpassword:"",
            // 提示信息
            errormsg:"",
            isshow:false
            
        }
    },
    methods: {
        // 获取验证码事件
        getcode:function(){
            // 手机号输入正确才能进行验证
            if(!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.phone)){
                this.errormsg="请输入正确的手机号"
                this.isshow=true
            }else{
                // 请求数据接口
                this.isshow=false
            }
        },
        // 提交按钮事件
        tijiaomsg:function(){
            if(this.phone==""||this.codemsg==""||this.newpassword==""||this.enterpassword==""){
                // 输入信息验证
                this.errormsg="请填入完整的信息"
                this.isshow=true
            }else if(!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.phone)){
                // 手机号验证
                this.errormsg="请输入正确的手机号"
                this.isshow=true
            }else if(!/^[0-9]{6}$/.test(this.codemsg)){
                // 验证码验证
                this.errormsg="请输入正确的验证码"
                this.isshow=true
            }else if(!/^[a-zA-Z0-9]{6,23}$/.test(this.newpassword)){
                // 密码格式
                this.errormsg="密码由6-22数字或字母组成"
                this.isshow=true
            }else if(this.newpassword!=this.enterpassword){
                // 新旧密码的验证
                this.errormsg="密码不一致"
                this.isshow=true
            }else{
                this.isshow=false
                // 请求接口的位置
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.forgetbox{
    padding: 0 5px;
    .red{
        color: red;
    }
    input{
        width: 70%;
        margin:10px 0;
    }
    .codeinp{
        width: 40%;
    }
    .getcodebtn{
         margin:10px 0;
        margin-left: 5px;
        
    }
    .tijiaobtn{
        margin: 15px 0;
    }
}
</style>
