<template>
  <div class="contentmsgbox">
    <div class="header">
      <i class="mui-icon mui-icon-back" @click="bank"></i>
      <h3>支付设置</h3>
    </div>
    <div class="infomsg">
      <p class="smalltitle firsttitle" @click="goaddpaymentpasswor()">
        <span class="bigword">支付密码设置</span>
        <span class="smallword">
          <i class="mui-icon mui-icon-forward"></i>
        </span>
      </p>
      <p class="smalltitle">
        <span class="bigword">指纹/面容支付</span>
        <span class="smallword">
          <mt-switch v-model="value"></mt-switch>
        </span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: false
    };
  },
  created() {},
  methods: {
    //去设置支付密码页面
    goaddpaymentpasswor() {
      this.$router.push({ path: "/addPaymentPassword" });
    },
    bank: function() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.contentmsgbox {
  .mint-switch-core {
    border-color: #ffc349;
    background-color: #ffc349;
  }
  p {
    margin: 0;
  }
  padding-top: 45px;
  .header {
    width: 100%;
    height: 45px;
    background-color: #ffb7b7;
    position: fixed;
    top: 0;
    z-index: 99;
    display: flex;
    // justify-content: space-between;
    i {
      line-height: 45px;
      color: rgba(255, 255, 255, 1);
    }
    h3 {
      text-align: center;
      width: 100%;
      line-height: 35px;
      font-size: 18px;
      font-family: PingFangSC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
  }
  .infomsg {
    background-color: #fff;
    margin-top: 10px;
    padding: 0 20px 0 10px;
    .firsttitle {
      border-bottom: 1px solid #cccccc;
    }
    .smalltitle {
      display: flex;
      justify-content: space-between;
      padding: 16px 0;
      // border-bottom: 1px solid #cccccc;
      .bigword {
        font-size: 18px;
        font-family: PingFang-SC;
        font-weight: 500;
        color: rgba(68, 68, 68, 1);
      }
      .smallword {
        font-size: 12px;
        font-family: PingFang-SC;
        font-weight: 500;
        color: rgba(192, 192, 192, 1);
        i {
          font-size: 12px;
          // font-family:PingFang-SC;
          font-weight: 500;
          color: rgba(192, 192, 192, 1);
        }
      }
    }
  }
}
</style>