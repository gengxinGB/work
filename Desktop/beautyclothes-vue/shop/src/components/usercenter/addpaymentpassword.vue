<template>
  <div id="addpaymentpassword">
    <div class="header">
      <i class="mui-icon mui-icon-back" @click="bank"></i>
      <h3>支付设置</h3>
      <img src alt />
    </div>
    <div class="container">
      <div class="part1">
        <div class="part1-header">
          <p>支付密码</p>
        </div>
        <div class="part1-input">
          <div class="input-item">
            <span>{{paymentpsw.substring(0,1)}}</span>
          </div>
          <div class="input-item">
            <span>{{paymentpsw.substring(1,2)}}</span>
          </div>
          <div class="input-item">
            <span>{{paymentpsw.substring(2,3)}}</span>
          </div>
          <div class="input-item">
            <span>{{paymentpsw.substring(3,4)}}</span>
          </div>
          <div class="input-item">
            <span>{{paymentpsw.substring(4,5)}}</span>
          </div>
          <div class="input-item">
            <span>{{paymentpsw.substring(5,6)}}</span>
          </div>
        </div>
      </div>
      <div class="part2">
        <div class="part2-item" @click="changepayment(1)">
          <span>1</span>
        </div>
        <div class="part2-item" @click="changepayment(2)">
          <span>2</span>
        </div>
        <div class="part2-item" @click="changepayment(3)">
          <span>3</span>
        </div>
        <div class="part2-item" @click="changepayment(4)">
          <span>4</span>
        </div>
        <div class="part2-item" @click="changepayment(5)">
          <span>5</span>
        </div>
        <div class="part2-item" @click="changepayment(6)">
          <span>6</span>
        </div>
        <div class="part2-item" @click="changepayment(7)">
          <span>7</span>
        </div>
        <div class="part2-item" @click="changepayment(8)">
          <span>8</span>
        </div>
        <div class="part2-item" @click="changepayment(9)">
          <span>9</span>
        </div>
        <div class="part2-item" @click="changepayment(null)">
          <span>CE</span>
        </div>
        <div class="part2-item" @click="changepayment(0)">
          <span>0</span>
        </div>
        <div class="part2-item" @click="changepayment('ce')">
          <span>--</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //这里是支付密码绑定，为字符串，方便显示，记得转number
      paymentpsw: ""
    };
  },
  methods: {
    bank() {
      this.$router.go(-1);
    },
    changepayment(msg) {
      if (this.paymentpsw.length <= 5) {
        if (typeof msg === "number") {
          this.paymentpsw = this.paymentpsw + msg;
        }
      }
      if (typeof msg === "string") {
        this.paymentpsw = this.paymentpsw.substring(
          0,
          this.paymentpsw.length - 1
        );
      } else if (msg === null) {
        this.paymentpsw = "";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#addpaymentpassword {
  .header {
    width: 100%;
    height: 45px;
    background-color: #ffb7b7;
    position: fixed;
    top: 0;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    i {
      color: #ffffff;
      line-height: 45px;
    }
    h3 {
      line-height: 45px;
      color: #ffffff;
      font-size: 18px;
    }
    img {
      width: 32px;
      height: 32px;
      margin-top: 6px;
      margin-right: 8px;
      border: none;
      outline: none;
    }
  }
  .container {
    height: 100vh;
    width: 100vw;
    position: relative;
    padding: 1.5rem 0;
    .part1 {
      position: absolute;
      top: 2rem;
      width: 100vw;
      height: 50vh;
      .part1-header {
        p {
          text-align: center;
          font-size: 0.5rem;
          color: black;
          font-weight: 500;
          opacity: 0.7;
        }
      }
      .part1-input {
        margin: 0.5rem 0.5rem;
        display: flex;
        align-items: center;
        height: 1.7rem;
        .input-item {
          flex: 1;
          height: 100%;
          width: 15%;
          border: 1px solid #aaa69d;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.2rem;
          opacity: 0.5;
          span {
            opacity: 1;
            font-size: 0.7rem;
            color: black;
          }
        }
      }
    }
    .part2 {
      width: 100vw;
      height: 40vh;
      position: absolute;
      bottom: 0;
      z-index: 99;
      background-color: #fff;
      display: flex;
      flex-flow: wrap;
      //   flex-direction: center;
      align-items: center;
      .part2-item {
        height: 25%;
        width: 33%;
        border: 1px solid rgba(227, 227, 227, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 0.7rem;
          font-weight: 400;
        }
      }
      .part2-item:active {
        background-color: #84817a;
      }
    }
  }
}
</style>