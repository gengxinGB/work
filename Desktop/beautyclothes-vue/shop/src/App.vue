<template>
  <div id="appbox">
    <transition name="fade" mode="out-in">
      <div>
        <router-view></router-view>
        <lg-preview></lg-preview>
      </div>
    </transition>

    <div v-if="footsnavisshow" class="footer">
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" to="/find">
          <span>
            <img src="./assets/newimg/faxian.png" alt />
          </span>
          <p class="mui-tab-label">发现</p>
        </router-link>

        <router-link class="mui-tab-item" to="/message">
          <!-- <span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span> -->
          <span>
            <img src="./assets/newimg/消息.png" alt />
          </span>
          <p class="mui-tab-label">消息</p>
        </router-link>

        <router-link class="mui-tab-item" to="/home" exact>
          <span class="homepic">
            <span>
              <img src="./assets/newimg/首页.png" alt />
            </span>
            <p class="mui-tab-label">首页</p>
          </span>
        </router-link>

        <router-link class="mui-tab-item" to="/shopcar">
          <span>
            <img src="./assets/newimg/购物车.png" alt />
          </span>
          <p class="mui-tab-label">购物车</p>
        </router-link>
        <router-link class="mui-tab-item" to="/usercenter">
          <span class="mui-icon">
            <img src="./assets/newimg/个人.png" alt />
          </span>
          <p class="mui-tab-label">个人</p>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // title标签影藏的状态
      heardershow: true,
      //  底部标签的显示隐藏状态
      footsnavisshow: true
    };
  },
  watch: {
    //  监听路由地址的变化 改变头部区域的变化
    $route(e) {
      console.log(e.name);
      //  如果路由是search隐藏头部部分
      if (e.name == "search") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "home" || e.name == "/") {
        this.footsnavisshow = true;
        document.querySelector("#appbox").style.paddingBottom = 50 + "px";
      } else if (e.name == "searchgoodslist") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "goodsinfo") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "storeindex") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "storeproductmsg") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "storesearch") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "newgoods") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "storeallgoods") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "contactcustomer") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "storemsg") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "brandgoodsinfo") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "lease") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "leaseinfo") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "leasegoodsinfo") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "chanpinfenlei") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "threecategroy") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "leaseorder") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "editaddress") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "beautymakeupcategroy") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "discount") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "categroygoodsmsg") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "beautymakeupinfo") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "discountlist") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "collection") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "collectionlist") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "fans") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "follow") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "footprint") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "delivergoods") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "deliverlist") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "myorder") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "allarticle") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "myaddress") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "addaddress") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "sendarticle") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "mywallet") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "addbankcard") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "applicationshop") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "addbankfirst") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "setup") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "membershipcard") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "coupon") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "paymember") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "accountsecurity") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "paysetup") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "currency") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "generateorder") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "addaddresslist") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "searchstore") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "usecoupon") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "setusermsg") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "followuser") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "followstore") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "followbrand") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "brandindex") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "shopyourselforder") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "fittingroom") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "popo") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "storesearchindex") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "editusername") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "editpassword") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "edittelephonenum") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "buyershow") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "edituserpic") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "editbirthday") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "leaseorderyourself") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "chatpage") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "location") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "pinlun") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "buynoworder") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "buynowyourself") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else if (e.name == "scan") {
        this.footsnavisshow = false;
        document.querySelector("#appbox").style.paddingBottom = 0 + "px";
      } else {
        this.footsnavisshow = true;
        document.querySelector("#appbox").style.paddingBottom = 50 + "px";
      }
    }
  },
  mounted() {
    console.log(this.$route.path + "55555");
    //  根据路由显示当前头部和底部的信息
    if (this.$route.path == "/search") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/home") {
      this.heardershow = false;
      document.querySelector("#appbox").style.paddingTop = 0 + "px";
      // this.footsnavisshow=true
      document.querySelector("#appbox").style.paddingBottom = 50 + "px";
    } else if (this.$route.path == "/search/searchgoodslist") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/home/goodsinfo") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/storeindex") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/storeindex/storeproductmsg") {
      this.heardershow = false;
      document.querySelector("#appbox").style.paddingTop = 0 + "px";
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/storesearch") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "storeindex/storeallgoods") {
      this.heardershow = false;
      document.querySelector("#appbox").style.paddingTop = 0 + "px";
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "storeindex/contactcustomer") {
      this.heardershow = false;
      document.querySelector("#appbox").style.paddingTop = 0 + "px";
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/storemsg") {
      this.heardershow = false;
      document.querySelector("#appbox").style.paddingTop = 0 + "px";
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/brandgoodsinfo") {
      this.heardershow = false;
      document.querySelector("#appbox").style.paddingTop = 0 + "px";
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/lease") {
      this.heardershow = false;
      document.querySelector("#appbox").style.paddingTop = 0 + "px";
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/lease/leaseinfo") {
      this.heardershow = false;
      document.querySelector("#appbox").style.paddingTop = 0 + "px";
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/lease/leasegoodsinfo") {
      this.heardershow = false;
      document.querySelector("#appbox").style.paddingTop = 0 + "px";
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/home/chanpinfenlei") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/chanpinfenlei/threecategroy") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/lease/leaseorder") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/editaddress") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/beautymakeupcategroy") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/discount") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/categroygoodsmsg") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/beautymakeupinfo") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/discountlist") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/collection") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/collection/collectionlist") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/fans") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/follow") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/footprint") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/delivergoods") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/delivergoods/deliverlist") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/myorder") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/find/allarticle") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/myaddress") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/addaddress") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/sendarticle") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/mywallet") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/addbankcard") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/applicationshop") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/addbankfirst") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/setup") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/membershipcard") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/coupon") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/paymember") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/setup/accountsecurity") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/setup/paysetup") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/setup/currency") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/generateorder") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/addaddresslist") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/search/searchstore") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/usecoupon") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/setusermsg") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/follow/followuser") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/follow/followstore") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/follow/followbrand") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/brandindex") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/shopyourselforder") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/fittingroom") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/popo") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/storesearchindex") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/setusermsg/editusername") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/accountsecurity/editpassword") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/accountsecurity/edittelephonenum") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/storeindex/buyershow") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/setusermsg/edituserpic") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/setusermsg/editbirthday") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/lease/leaseorderyourself") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/chatpage") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/location") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/pinlun") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/buynoworder") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/buynowyourself") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else if (this.$route.path == "/scan") {
      this.footsnavisshow = false;
      document.querySelector("#appbox").style.paddingBottom = 0 + "px";
    } else {
      this.footsnavisshow = true;
      document.querySelector("#appbox").style.paddingBottom = 50 + "px";
    }
  },
  methods: {
    //   show:function (event) {
    //    console.log(event.target.nodeName)
    //   //  给v-html同级目录注册点击事件 然后通过event.target.nodeName来获取到值
    //    if(event.target.nodeName=='INPUT'){
    //     //  console.log("搜索")
    //     // event.target.INPUT.onkeyup=function(){
    //     //   console.log(1111111)
    //     // }
    //     this.$router.push('/search')
    //    };
    //    if(event.target.nodeName=='I'){
    //      console.log('定位')
    //    }
    // },
  },
  update(route) {
    console.log(this.title);
    if (!["", "/"].includes(route.path)) {
      // 判断是否根页面，用于切换标题与返回上一页或回到主页
      [this.title] = [route.meta.title];
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      //回调函数，此时this指针不可用，可采用回调函数访问。
      vm.update(to);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.update(to);
    next();
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.fade-enter-active {
  opacity: 0;
  // transform: translateX(100%)
}
.fade-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%);
  // position: absolute;
  opacity: 0;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

#appbox {
  background-color: #f2f2f2;
  .footer {
    nav {
      line-height: 16px;
      a {
        span {
          img {
            width: 24px;
            height: 24px;
            margin-top: 2px;
          }
        }
        p {
          font-size: 10px;
        }
        .homepic {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          img {
            width: 46px;
            height: 46px;
          }
        }
      }
      .router-link-active {
        p {
          color: #ffb09c;
        }
      }
    }
  }
}
</style>


