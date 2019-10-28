<template>
  <div id="forgetbox">
    <div class="bgc"></div>
    <h4>云聚</h4>
    <div class="container">
      <div class="switch">
        <span>验证码登录</span>
      </div>
      <div class="form">
        <div class="input">
          <input type="text" placeholder="请输入手机号" v-model="phone" />
        </div>
        <div class="input">
          <input type="text" placeholder="亲输入验证码" v-model="codemsg" />
          <span @click="getcode()">获取验证码</span>
        </div>
        <div class="back">
          <span @click="gologin()">返回账号密码登录</span>
        </div>
        <div class="btn">
          <button @click="lijilogin()">登录</button>
        </div>
      </div>
    </div>
    <div class="wxpart">
      <div class="line">
        <span>
          <hr />其他登录方式
          <hr />
        </span>
      </div>
      <div class="icon">
        <img src="../assets/img/wx.jpg" />
      </div>
    </div>
    <!-- <h4>验证码登录</h4>
        <input type="text" placeholder="请输入手机号" v-model="phone">
        <input type="number" class="codeinput" placeholder="请输入验证码" v-model="codemsg"><mt-button type="danger" class="getcode" @click="getcode">获取验证码</mt-button>
        <p v-show="isshow" class="red">{{tishimsg}}</p>
        <mt-button type="primary" size="large" class="codeloginbtn" @click="lijilogin">立即登录</mt-button>
    <router-link to="/login">账号密码登录</router-link>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      codemsg: "",
      tishimsg: "",
      isshow: false
    };
  },
  methods: {
    //goback
    gologin() {
      this.$router.push({ path: "/login" });
    },
    // 获取验证码的事件
    getcode: function() {
      if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          this.phone
        )
      ) {
        (this.tishimsg = "请输入正确的手机号"), (this.isshow = true);
      } else {
        this.isshow = false;
        // 请求接口位置
      }
    },
    // 立即登录的事件
    lijilogin: function() {
      // 如果输入框的信息为空时验证
      if (this.phone == "" || this.codemsg == "") {
        this.tishimsg = "请输入完整信息";
        this.isshow = true;
      } else if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          this.phone
        )
      ) {
        this.tishimsg = "手机号格式不正确";
        this.isshow = true;
      } else if (!/^[0-9]{6}$/.test(this.codemsg)) {
        this.tishimsg = "验证码为6位数字";
        this.isshow = true;
      } else {
        this.isshow = false;
        // 验证通过之后请求接口
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#forgetbox {
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
    height: 10rem;
    .switch {
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ffd5db;
      margin-bottom: 0.5rem;
      span {
        flex: 1;
        text-align: center;
        font-size: 0.7rem;
        line-height: 2rem;
        margin: 0.3rem 0;
        opacity: 0.8;
        color: #ff7496;
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
      .back {
        margin-left: 0.5rem;
        span {
          font-size: 0.4rem;
          opacity: 0.6;
        }
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
  .wxpart {
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: 15rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .line {
      display: block;
    }
    .icon {
      img {
        height: 1rem;
      }
    }
  }
  // padding: 0 5px;
  // .red{
  //     color: red;
  // }
  // h4{
  //    margin: 15px 0;
  // }
  // .codeinput{
  //     width: 60%;
  // }
  // .getcode{
  //     margin-left: 10px;
  // }
  // .codeloginbtn{
  //     margin: 15px 0;
  // }
}
</style>
