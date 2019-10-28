<template>
  <div id="loginbox">
    <div class="bgc"></div>
    <h4>云聚</h4>
    <div class="container">
      <div class="switch">
        <span id="login">登录</span>
        <span id="register" @click="goregister()">注册</span>
      </div>
      <div class="form">
        <div class="input">
          <input type="text" placeholder="请输入账号" v-model="loginName" />
        </div>
        <div class="input">
          <input type="text" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="control">
          <span @click="govalidate()">验证码登录</span>
          <span>忘记密码？</span>
        </div>
        <div class="btn">
          <button @click="lijilogin">登录</button>
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
  </div>

  <!-- <span>账号：</span>
    <input type="text" placeholder="账号" v-model="loginName" />
    <br />
    <span>密码：</span>
    <input type="password" placeholder="请输入密码" v-model="password" />
    <p class="tishi" v-show="isshow">{{errormsg}}</p>
    <mt-button type="primary" size="large" class="loginbtn" @click="lijilogin">立即登录</mt-button>
    <p class="loginfa">
      <router-link to="/codelogin">验证码登录</router-link>
      <router-link to="/register">立即注册</router-link>
      <router-link to="/forgetpwd" class="forgetpwd">忘记密码?</router-link>
    </p>

    <div class="disanfang">
      <img src="../assets/img/disanfanglogin.jpg" alt />
      <p>微信登录</p>
      <router-link to="/emaillogin">邮箱登录</router-link>
    </div>
  </div>-->
</template>
<script>
export default {
  data() {
    return {
      loginName: "",
      password: "",
      errormsg: "",
      isshow: false
    };
  },
  methods: {
    lijilogin: function() {
      console.log(this.password);
      // console.log(this.$router.go())
      if (this.phone == "" || this.password == "") {
        // 账号密码不能为空的验证
        this.errormsg = "账号或密码不能为空";
        this.isshow = true;
      } else if (!/^[a-zA-Z0-9]{6,23}$/.test(this.password)) {
        // 验证密码格式
        this.errormsg = "密码由6-22位字母或数字组成";
        this.isshow = true;
      } else {
        this.isshow = false;
        //  验证通过请求接口数据
        var data = {
          loginName: this.loginName,
          password: this.password
        };
        this.axios
          .post("customerLogin/sinInByPwd", this.qs.stringify(data))
          .then(responese => {
            console.log(responese);
            // 成功的回调函数
            console.log(responese);
            if (responese.data.success == false) {
              this.errormsg = responese.data.errorMsg;
              console.log(responese.data.errorMsg);
              this.isshow = true;
            } else if (responese.data.success == true) {
              console.log(1);
              this.$router.push({ path: "/home" });

              //  this.$router.push(to.name)
              localStorage.setItem("userName", responese.data.data);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    //转到注册界面
    goregister() {
      this.$router.push({ path: "/register" });
    },
    //验证码登录
    govalidate() {
      this.$router.push({ path: "/codelogin" });
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to.name + "--------to ");
    console.log(from.name + "------from");
    //  console.log(next)
    // if(isLogin){
    // }
    next(vm => {
      console.log(vm);
    });
  },
  beforeRouteLeave(to, from, next) {
    console.log(to.name + "----leave to");
    console.log(from.name + "-----leave from ");
    next(vm => {
      console.log(vm);
    });
  }
};
</script>
<style lang="scss" scoped>
#loginbox {
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
        line-height: 2rem;
        margin: 0.3rem 0;
        opacity: 0.5;
      }
      span#login {
        opacity: 1;
        font-size: 0.7rem;
        color: #ffa9a5;
        font-weight: bold;
        border-right: 1px solid #ffd5db;
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
}
// #loginbox{
//     padding: 0 5px;
//     .tishi{
//         color: red;
//     }
//     h4{
//         margin: 8px 0;
//     }
//     .loginbtn{
//         margin: 20px 0;
//     }
//     // .forgetpwd{
//     //     float: right;
//     // }
//     .loginfa{
//         font-size: 17px;
//         a{
//             width: 33%;
//             margin: 20px;
//         }
//     }
//     .disanfang{
//         text-align: center;
//         margin-top: 20px;
//         img{
//             width: 50px;
//             height: 50px;
//             border-radius: 50px;
//         }
//     }
// }
</style>
