<template>
  <div id="registerbox">
    <div class="bgc"></div>
    <h4>云聚</h4>
    <div class="container">
      <div class="switch">
        <span id="login" @click="gologin()">登录</span>
        <span id="register">注册</span>
      </div>
      <div class="form">
        <div class="input">
          <input type="text" placeholder="请输入手机号" v-model="phone" />
        </div>
        <div class="input">
          <input type="text" placeholder="亲输入验证码" v-model="codemsg" />
          <span @click="getcode()">获取验证码</span>
        </div>
        <div class="input">
          <input type="text" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="input">
          <input type="text" placeholder="请确认密码" v-model="enterpassword" />
        </div>
        <div class="control">
          <span @click="govalidate()">验证码登录</span>
          <span>忘记密码？</span>
        </div>
        <div class="btn">
          <button @click="lijiregister">注册</button>
        </div>
        <span v-if="isshow">{{tishimsg}}</span>
      </div>
    </div>

    <!-- <h1>注册组件</h1> -->
    <!-- <h4>立即注册</h4>
        <span>用户名：&nbsp;</span><input type="text" placeholder="请输入用户名" v-model="username"><br>
        <span>密 &nbsp; &nbsp; 码：</span><input type="password" placeholder="请输入密码" v-model="password"> <br>
        <span>确认密码:</span><input type="password" placeholder="确认密码" v-model="enterpassword"><br>
        <span>手机号：&nbsp;</span><input type="text" placeholder="请输入手机号" v-model="phone"><br>
        <span>验证码：&nbsp;</span><input type="text" placeholder="请输入验证码" class="codeinput" v-model="codemsg"><mt-button class="getcodebtn" type="danger" @click="getcode">获取验证码</mt-button>
         <p class="red" v-show="isshow">{{tishimsg}}</p>
          <mt-button type="primary" size="large" class="zhuce" @click="lijiregister">立即注册</mt-button>
    <p> <router-link to="/login">已有账号立即登录</router-link></p>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 提示信息
      tishimsg: " ",
      username: "",
      password: "",
      enterpassword: "",
      phone: "",
      codemsg: "",
      // 提示信息显示状态
      isshow: false
    };
  },
  methods: {
    //验证码登录
    govalidate() {
      this.$router.push({ path: "/codelogin" });
    },
    //返回login页面
    gologin() {
      this.$router.push({ path: "/login" });
    },
    // 获取验证码
    getcode: function() {
      // 当手机号输入正确才能获取验证码
      if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          this.phone
        )
      ) {
        this.tishimsg = "手机号码不正确";
        this.isshow = true;
      } else {
        this.isshow = false;
        this.axios
          .post("/customerLogin/sinInByQQMail", {
            phone: this.phone
          })
          .then(responese => {
            this.tishimsg = "验证码发送成功";
            this.isshow = true;
          })
          .catch(error => {
            this.tishimsg = "手机号码不正确";
            this.isshow = true;
          });
      }
    },
    // 立即注册
    lijiregister: function() {
      // 输入信息不能为空
      if (
        this.username == "" ||
        this.password == "" ||
        this.enterpassword == "" ||
        this.phone == "" ||
        this.codemsg == ""
      ) {
        this.tishimsg = "请输入完整的信息";
        this.isshow = true;
        // 手机号输入框验证
      } else if (this.password != this.enterpassword) {
        // 密码不一致
        this.tishimsg = "密码不一致";
        this.isshow = true;
      } else if (!/^[a-zA-Z0-9]{6,23}$/.test(this.password)) {
        // 验证密码格式
        this.tishimsg = "密码由6-22位字母或数字组成";
        this.isshow = true;
      } else if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          this.phone
        )
      ) {
        // 手机号码的格式验证
        this.tishimsg = "手机号格式不正确";
        this.isshow = true;
      } else if (!/^[0-9]{6}$/.test(this.codemsg)) {
        //验证码的格式验证
        this.tishimsg = "验证码为6位数字";
        this.isshow = true;
      } else {
        this.isshow = false;
        // 请求接口
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#registerbox {
  position: relative;
  .bgc {
    position: absolute;
    width: 100%;
    height: 10rem;
    background: linear-gradient(
      180deg,
      rgba(255, 88, 145, 1) 0%,
      rgba(255, 175, 132, 0.63) 75%,
      rgba(255, 175, 132, 0.07) 100%
    );
  }
  .container {
    position: absolute;
    box-shadow: 0 0 10px rgba(99, 110, 114, 0.4);
    border-radius: 0.2rem;
    // top: 7rem;
    left: 50%;
    transform: translate(-50%, 2rem);
    background: white;
    width: 9rem;
    height: 15rem;
    .switch {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ffd5db;
      margin-bottom: 0.5rem;
      span {
        flex: 1;
        text-align: center;
        line-height: 2rem;
        margin: 0.3rem 0;
        opacity: 0.5;
      }
      span#register {
        opacity: 1;
        font-size: 0.7rem;
        color: #ffa9a5;
        font-weight: bold;
        border-left: 1px solid #ffd5db;
      }
    }
    .form {
      .input {
        margin: 0.1rem 0.3rem;
        input {
          font-size: 0.4rem;
          border: none;
          outline: none;
          border-bottom: 1px solid rgba(223, 230, 233, 1);
          opacity: 0.5;
        }
      }
      .input:nth-of-type(2) {
        position: relative;
        span {
          position: absolute;
          right: 0;
          color: #ff909d;
          font-size: 0.4rem;
          opacity: 0.5;
        }
      }
    }
    .control {
      margin: 0.1rem 0.3rem;
      display: flex;
      justify-content: space-between;
      opacity: 0.5;
      span {
        font-size: 0.4rem;
      }
    }
    .btn {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%);
      width: 3rem;
      margin-bottom: 1rem;
      border-radius: 0.1rem;
      button {
        width: 100%;
        background: linear-gradient(
          90deg,
          rgba(255, 95, 146, 1) 0%,
          rgba(255, 197, 174, 1) 100%
        );
      }
    }
  }
}
//   .registerbox{
//       padding:0 5px;
//       .red{
//           color: red;
//       }
//       h4{
//           margin: 10px 0;
//       }
//       input{
//           width: 70%;
//       }
//       .codeinput{
//           width: 40%;
//         //   margin-left: 5px;
//       }
//       .getcodebtn{
//           margin-left: 5px;
//       }
//       .zhuce{
//           margin: 15px 0;
//       }
</style>
