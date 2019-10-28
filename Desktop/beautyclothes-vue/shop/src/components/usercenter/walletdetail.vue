<template>
  <div id="walletDetail">
    <div class="header">
      <i class="mui-icon mui-icon-back" @click="bank()"></i>
      <h3>我的钱包</h3>
      <img />
    </div>
    <div class="container">
      <div class="price">
        <p>我的零钱</p>
        <div class="pricedetail">
          <span>￥</span>
          <span class="cash">200.00</span>
        </div>
      </div>
      <div class="operation">
        <div class="recharge">
          <button id="recharge">充值</button>
        </div>
        <div class="rich">
          <button id="rich">提现</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    bank: function() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
#walletDetail {
  position: relative;
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
    }
  }
  .container {
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .price {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0.6;
      p {
        color: black;
        font-size: 0.7rem;
      }
      .pricedetail {
        margin: 0.6rem 0;
        span {
          font-size: 0.8rem;
        }
        .cash {
          font-weight: bold;
          font-size: 1.5rem;
        }
      }
    }
    .operation {
      display: flex;
      flex-direction: column;
      margin-bottom: 4rem;
      .recharge {
        width: 135px;
        height: 32px;
        margin-bottom: 0.2rem;
        #recharge {
          width: 100%;
          height: 100%;
          background-color: rgba(255, 176, 154, 1);
          border: none;
          outline: none;
          border-radius: 0.2rem;
        }
      }
      .rich {
        width: 135px;
        height: 32px;
        #rich {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          border-radius: 0.2rem;
          border: 1px solid rgba(255, 176, 154, 1);
        }
      }
    }
  }
}
</style>