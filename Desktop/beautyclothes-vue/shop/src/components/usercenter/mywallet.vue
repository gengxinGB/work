<template>
  <div class="mywalletbox">
    <div class="header">
      <i class="mui-icon mui-icon-back" @click="bank"></i>
      <h3>我的钱包</h3>
      <img src="../../assets/newimg/addaddress.png" alt @click="inaddcard" />
    </div>
    <div class="balancebox">
      <div class="left" @click="gowalletdetail()">
        <p class="titleprice">余额（元）</p>
        <p class="num">{{walletmsg.userMoney}}</p>
      </div>
      <div class="right">
        <p class="titleprice">银行卡（张）></p>
        <P class="num">{{walletmsg.cardsNum}}</P>
      </div>
    </div>

    <div
      class="bankcardbox"
      v-for="(item,index) in walletmsg.cardMapList"
      :key="index"
      @click="isdelete(item.bankCardId)"
    >
      <div class="top">
        <h3>{{item.bankName}}</h3>
        <p>{{item.bankCardType}}</p>
      </div>
      <div class="cardnum">{{item.showCardNum}}</div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      walletmsg: {}
    };
  },
  created() {
    this.getwalletmsg();
  },
  methods: {
    //转到钱包细节界面
    gowalletdetail() {
      this.$router.push({ path: "/walletDetail" });
    },

    bank: function() {
      this.$router.push({ path: "/usercenter" });
    },
    // 进入添加银行卡页面
    inaddcard: function() {
      this.$router.push({ path: "/addbankfirst" });
    },
    // 获得我的钱包的数据
    getwalletmsg: function() {
      this.axios.get("cusPersonalCenter/myWallet").then(response => {
        console.log(response);
        this.walletmsg = response.data.data;
      });
    },
    // 点击调用删除接口
    isdelete: function(id) {
      var data = {
        customerBankCardsId: id
      };
      MessageBox.confirm("是否移除银行卡?")
        .then(action => {
          this.axios
            .post("cusPersonalCenter/removeBankCard", this.qs.stringify(data))
            .then(response => {
              console.log(response);
              if (response.data.success == true) {
                this.getwalletmsg();
              }
            });

          // alert(1111)
        })
        .catch(() => {}); //一定别忘了这个
    }
  }
};
</script>
<style lang="scss" scoped>
.mywalletbox {
  padding-top: 45px;
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
  .balancebox {
    background-color: #ffb7b7;
    margin: 10px;
    display: flex;
    border-radius: 10px;
    height: 88px;
    // line-height: 88px;
    .left {
      width: 50%;
      text-align: center;
      margin-top: 18px;
      // line-height: 88px;
      .titleprice {
        font-size: 16px;
        font-family: PingFang-SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      .num {
        font-size: 20px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
    }
    .right {
      // line-height: 88px;
      margin-top: 18px;
      width: 50%;
      text-align: center;
      .titleprice {
        font-size: 16px;
        font-family: PingFang-SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
      .num {
        font-size: 20px;
        font-family: PingFangSC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .bankcardbox {
    margin: 0 10px 10px 10px;
    padding: 10px 50px;
    // width:353px;
    height: 135px;
    background: #01c5a9;
    border-radius: 10px;
    .top {
      h3 {
        font-size: 20px;
        color: #ffffff;
      }
      p {
        font-size: 16px;
        color: #ffffff;
      }
    }
    .cardnum {
      text-align: right;
      color: #ffffff;
      font-size: 20px;
    }
  }
}
</style>