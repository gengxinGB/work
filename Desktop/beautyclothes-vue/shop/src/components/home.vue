<template>
  <div id="homebox">
    <div class="header">
      <span class="posiimg">
        <img src="../assets/newimg/定位.png" alt />
      </span>
      <span class="dingwei">
        <p @click="inlocation">
          <span class="citynamess">{{city || "南京"}}</span>
          <i class="mui-icon mui-icon-arrowdown down"></i>
        </p>
        <p class="weater">{{weather}}</p>
      </span>
      <input class="inputbox" type="text" @focus="insearch" placeholder />
      <span class="saoyisao" @click="inscan">
        <img src="../assets/newimg/扫一扫2.png" alt />
      </span>
    </div>
    <div class="imgbox">
      <mt-swipe :auto="4000">
        <mt-swipe-item class="imgs" v-for="item in imglumolist" :key="item.rotaryId">
          <img :src="item.picUrl" alt />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <ul class="smallimgbox">
      <li>
        <router-link to="/beautymakeupcategroy">
          <img src="../assets/newimg/美妆.png" alt />
          <p>美妆</p>
        </router-link>
      </li>
      <li>
        <router-link to="/home/chanpinfenlei" exact>
          <img src="../assets/newimg/服饰.png" alt />
          <p>服饰</p>
        </router-link>
      </li>
      <li>
        <router-link to="/lease">
          <img src="../assets/newimg/租赁.png" alt />
          <p>租赁</p>
        </router-link>
      </li>
      <li>
        <router-link to="/brandindex">
          <img src="../assets/newimg/品牌.png" alt />
          <p>品牌</p>
        </router-link>
      </li>
    </ul>
    <!-- <geolcation></geolcation> -->
    <!-- 内容显示部分 -->

    <div class="drimlike">
      <div class="toptitle">
        <span class="topleft"></span>
        <h3 class="like">今日折扣</h3>
        <span class="moregoods" @click="morediscount">查看更多</span>
      </div>
      <ul class="discountbox">
        <li v-for="(item,index) in discountlist" :key="index">
          <img :src="item.productPicUrl" alt @click="ingoodsinfo(item.isRent,item.productId)" />
          <div class="wordmsg">
            <p class="title">{{item.productName}}</p>
            <p class="price">
              <span class="newprice">￥{{item.discountPrice}}</span>
              <span class="oldprice">￥{{item.productPrice}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div class="drimlike">
      <div class="toptitle">
        <span class="topleft"></span>
        <h3 class="like">猜你喜欢</h3>
      </div>
      <ul class="goodsinfo">
        <li
          v-for="item in likelist"
          :key="item.productId"
          @click="ingoodsinfo(item.isRent,item.productId)"
        >
          <!-- <router-link :to="{path:'home/goodsinfo',query:{productId:item.productId}}"> -->
          <img class="rentpic" v-if="item.isRent==1?true:false" :src="item.rentPicUrl" alt />
          <div class="imgwordbox">
            <img :src="item.productPicUrl" alt />
            <div class="wordbox">
              <p class="msginfo">{{item.productName}}</p>
              <p class="dibumsg">
                <span class="price">{{item.isRent==1?"￥"+item.rentPrice+"/天":'￥'+item.productPrice}}</span>
                <span class="paypeploe">{{item.sale}}人付款</span>
              </p>
            </div>
          </div>
          <!-- </router-link> -->
        </li>
      </ul>
    </div>

    <span class="mui-icon-extra mui-icon-extra-top backtop" v-if="btnFlag" @click="backtop"></span>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
// import geolcation from '../components/geolcation/geolcation.vue'
import { Indicator } from "mint-ui";
import LocationSdk from "../commons/location-sdk.js";
import { send } from "q";
export default {
  //引入组件
  // components:{
  //     geolcation:geolcation
  // },
  data() {
    return {
      // 记录返回顶部按钮是否隐藏
      btnFlag: false,
      // 轮播图数据存储
      imglumolist: [],
      // 内容的以及分类标题的集合
      firsttitle: [],
      // 点击一级标题的value值
      value: 0,
      keyWords: "",
      // 今日推荐模块的集合
      todyRecommend: [],
      cityweizhi: 1,
      // 猜你喜欢的集合
      likelist: [],
      // 今日折扣商品集合
      discountlist: [],
      cityname: "",
      city: "南京",
      issendlocation: true,
      location: {
        // 经度
        longitude: "-1",
        // 纬度
        latitude: "-1"
      },
      weather: localStorage.getItem("cityname")
    };
  },
  created() {
    this.getweather(),
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
    if (this.$store.state.usemsg.issendgecolotion == false) {
      this.getMsgFormSon();
    }

    this.discountmsg();
    // 轮播图请求的数据
    this.axios.get("rotary/homeRotaryPic").then(responese => {
      // console.log(responese);
      if (responese.data.data.length == 0) {
        Toast("数据加载失败");
      } else if (responese.status == 200 && responese.data.success == true) {
        this.imglumolist = responese.data.data;
        Indicator.close();
      }
    });

    // 猜你喜欢模块接口
    this.axios.get("cusProInfo/getProductFavourite").then(responese => {
      // console.log(responese.data.data);
      this.likelist = responese.data.data;
    });

    // 获取经纬度
    let self = this;
    this.issendlocation = this.$store.state.usemsg.issendgecolotion;
    console.log(this.issendlocation);
    LocationSdk.getLocation({
      success: res => {
        console.log("current location is:" + res);
        self.location = res;
        console.log(this.location);
        if (this.issendlocation == true) {
          this.sendapi();
          this.$store.commit("setisgeolcation", false);
        }
      },
      error: res => {
        console.log("failed to get location:" + res);
        self.location = {
          //  longitude:"32.046764",
          //  latitude:"118.736105"
          longitude: "-1",
          latitude: "-1"
        };
        if (this.issendlocation == true) {
          this.sendapi();
          this.$store.commit("setisgeolcation", false);
        }
        //  this.sendapi()
      }
    });
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
    //console.log(this.oneCategoryId)
  },
  watch: {
    city() {
      this.getweather();
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  methods: {
    //获取天气并绑定
    getweather() {
      this.axios
        .get("/customerWeather/getWeatherInfoByCityName?cityName=" + this.city)
        .then(res => {
          this.weather = res.data.data.temperature;
        });
    },
    // 点击进入扫一扫页面
    inscan: function() {
      this.$router.push({ path: "/scan" });
    },
    //发送百度api
    sendapi: function() {
      //  alert(this.location.longitude)
      //  alert(this.location.latitude)

      this.$http
        .jsonp(
          "http://api.map.baidu.com/reverse_geocoding/v3/?ak=8AxZDuCHACGEIzHKhZYuVqGTs5t7QMNL&output=json&coordtype=wgs84ll&location=" +
            this.location.latitude +
            "," +
            this.location.longitude +
            ""
        )
        .then(response => {
          console.log(response);
          // alert(1111111111)
          this.cityname = response.data.result.addressComponent.city;
          // 存储到vuex中
          // this.$store.commit('setcityname',this.city)
          localStorage.setItem("cityname", this.cityname);

          //  一开始的定位状态
          this.$store.commit("setstartgecolotion", this.cityname);
          var startgecolotion = this.$store.state.usemsg.startgecolotion;
          alert(startgecolotion + "1111111111");
          this.getMsgFormSon();
          this.issendlocation = false;
          // alert(this.city+"999999999")
          alert(this.cityname + "2222222");
          // 开始发送数据
          // this.sendparent()
        });
    },

    // 跳转到搜索页面
    insearch: function() {
      this.$router.push("/search");
    },

    // 获取子组件传过来的城市信息
    getMsgFormSon: function() {
      //   this.city=this.$store.state.usemsg.cityname
      //  alert(this.city+"111111111")
      //     if(this.city==""){
      //         this.city="呵呵"
      //     }
      this.city = localStorage.getItem("cityname");
      //    alert(this.city+"3333333")
      //     console.log(this.cityweizhi)
    },
    inlocation: function() {
      this.$router.push({ path: "/location" });
    },
    // 点击查看更多今日折扣
    morediscount: function() {
      this.$router.push({ path: "/discount" });
    },

    // 点击首页一级标题  跳转到商品详情页面
    togoodslist: function(e) {
      // console.log(e.target);
      //  document.querySelector("#toptitlemsg")
      this.keyWords = e.currentTarget
        .querySelector("#toptitlemsg")
        .innerText.trim();
      // console.log(this.keyWords);
      this.$router.push({
        path: "/search/searchgoodslist",
        query: { keyWords: this.keyWords, value: 0 }
      });
    },
    // 返回顶部的事件
    backtop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;

      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },
    ingoodsinfo: function(isRent, id) {
      if (isRent == 1) {
        this.$router.push({
          path: "/lease/leasegoodsinfo",
          query: { productId: id }
        });
      } else {
        this.$router.push({
          path: "/home/goodsinfo",
          query: { productId: id }
        });
      }
    },
    // 今日折扣商品接口数据
    discountmsg: function() {
      this.axios.get("cusProduct/showDiscountInHome").then(responese => {
        // console.log(responese);
        // console.log(responese.data.data);
        if (responese.data.data.length < 3) {
          this.discountlist = responese.data.data;
        } else {
          // var arr=[]
          for (var i = 0; i < 3; i++) {
            this.discountlist.push(responese.data.data[i]);
          }
        }
        // console.log(this.discountlist);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
}

#homebox {
  .header {
    display: flex;
    height: 45px;
    background-color: #ffb7b7;
    width: 100%;
    position: fixed;
    z-index: 10;
    top: 0;
    // line-height: 45px;
    .dingwei {
      margin-left: 6px;
      margin-top: 10px;
      p {
        margin: 0;
        padding: 0;
        font-size: 10px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 12px;
        font-style: normal;
        .citynamess {
          display: inline-block;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 40px;
          overflow: hidden;
        }
      }
      .weater {
        font-size: 6px;
      }
    }
    .saoyisao {
      margin-top: 10px;
      margin-left: auto;
      margin-right: 10px;
      img {
        width: 22px;
        height: 22px;
      }
    }
    .posiimg {
      margin-left: 10px;
      // line-height: 50px;
      margin-top: 10px;
      img {
        // vertical-align: bottom;
        width: 17px;
        height: 22px;
      }
    }
    .down {
      font-size: 10px;
      color: rgba(255, 255, 255, 1);
    }
    .inputbox {
      width: 65%;
      height: 24px;
      background: rgba(255, 255, 255, 1);
      border-radius: 15px;
      opacity: 0.7809;
      margin: 0;
      padding: 0;
      border: none;
      // line-height: 45px;
      margin-top: 10px;
      margin-left: 6px;
    }
  }

  .imgbox {
    width: 100%;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    margin: auto;
    margin-top: 40px;

    img {
      width: 100%;
      height: 200px;
    }
  }
  .smallimgbox {
    background-color: #ffffff;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #cccccc;
    li {
      width: 25%;
      // height: 55px;
      text-align: center;
      margin-top: 10px;
      img {
        width: 58px;
        height: 58px;
      }
      p {
        font-size: 12px;
        color: #1f1f1f;
      }
    }
  }
  .drimlike {
    background-color: #ffffff;
    .discountbox {
      display: flex;
      li {
        width: 33%;
        margin: 0 6px;
        .wordmsg {
          .title {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #1f1f1f;
            font-size: 12px;
          }
          .price {
            .newprice {
              font-size: 14px;
              color: #d42828;
              font-weight: bold;
            }
            .oldprice {
              font-size: 10px;
              color: #999;
              text-decoration: line-through;
            }
          }
        }
        img {
          width: 100%;
          border-radius: 5px;
        }
      }
    }
    .toptitle {
      display: flex;
      // line-height: 22px;
      padding: 4px 0;
      .moregoods {
        margin-left: auto;
        font-size: 12px;
        color: #a3a3a3;
        margin-right: 10px;
      }
    }
    .like {
      font-size: 16px;
      color: rgba(31, 31, 31, 1);
      margin-left: 20px;
    }
    .topleft {
      display: inline-block;
      width: 10px;
      height: 20px;
      background-color: #ffb7b7;
    }
    .goodsinfo {
      display: flex;
      justify-content: space-around;
      .rentpic {
        position: absolute;
        top: 0;
        left: 16px;
        width: 35px;
        height: 35px;
        border-radius: 35px;
      }
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin: 5px;
      padding: 0;
      box-sizing: border-box;
      li {
        width: 48%;
        padding: 0;
        background-color: white;
        position: relative;
        margin-bottom: 6px;
        .imgwordbox {
          box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.31);
          border-radius: 5px;
          img {
            width: 100%;
            height: 200px;
            border-radius: 5px;
          }
          .wordbox {
            padding: 0 4px;
            .msginfo {
              height: 42px;
              margin-top: 3px;
              overflow: hidden;
              display: -webkit-box;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              white-space: normal;
              color: #1f1f1f;
              //                    overflow:hidden;
              //                    display:-webkit-box; //将对象作为弹性伸缩盒子模型显示;
              //                    text-overflow:ellipsis;//溢出部分用省略号代替
              //                    -webkit-line-clamp:2; //设置文本显示两行
              //                    -webkit-box-orient:vertical;  //从上到下排列子元素;
              //                    white-space:normal;
            }
            .dibumsg {
              .price {
                font-size: 14px;
                color: rgb(255, 80, 0);
              }
              .paypeploe {
                font-size: 10px;
              }
            }
          }
        }
      }
    }
  }
  .backtop {
    position: fixed;
    right: 3px;
    top: 70%;
    background-color: #828282;
    padding: 5px;
    border-radius: 50%;
  }
}
</style>
