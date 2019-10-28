// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 引入进度条
// import progressBar from 'vue-draggable-progressbar'
// import progressBar from 'vue-draggable-progressbar'

// yinru引入轮播样式
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import "swiper/dist/css/swiper.css"

Vue.use(VueAwesomeSwiper)

// 引入mintui
import MintUI from 'mint-ui'
import "mint-ui/lib/style.css"
Vue.use(MintUI)

// 修改mint ui默认样式
import "./assets/css/mint-ui.scss"

import App from './App'
import router from './router'
// 引入动画css文件
// import animate from 'animate.css'

// 引入时间插件
import Calendar from 'vue-mobile-calendar'

Vue.use(Calendar)

// 无限滑动周日历组件


// 时间选择器

import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker);


// 引入geolcation.vue组件
// 引入jq
import $ from 'jquery'

// 引入rem文件
import './rem.js'

Vue.config.productionTip = false



// Vue.use(progressBar)
/* eslint-disable no-new */
// 引入axios来进行请求数据
import axios from 'axios'
//暂时注释   Vue.prototype.$axiox=Axios
axios.defaults.baseURL = '/api';

Vue.prototype.axios = axios
import qs from 'qs'
Vue.prototype.qs = qs
axios.defaults.withCredentials = true;


/*引入资源请求插件*/
import VueResource from 'vue-resource'

/*使用VueResource插件*/
Vue.use(VueResource)


// 使 用滑动导航插件
import LyTab from 'ly-tab'
Vue.use(LyTab)

// 引入vuex
import vuex from 'vuex'
Vue.use(vuex)


// 引入vantui
// import Vant from 'vant';
// import 'vant/lib/index.css';

// Vue.use(Vant);

// 使用图片预览插件
import vuePicturePreview from 'vue-picture-preview'

Vue.use(vuePicturePreview)


// 导入mui组件
import "./assets/mui/css/mui.css"
import "./assets/mui/css/icons-extra.css"

// 创建vuex公共存储组件
const store = new vuex.Store({


  // 设置属性
  state: {
    isLogin: false,
    usemsg: {
      idmsglist: [],
      couponmsg: {},
      // 地址id
      addressid: "",
      redUseStatus: "",
      // 定位的城市信息
      cityname: '',
      issendgecolotion: true,
      // 一开始定位的城市信息
      startgecolotion: ''
    }
  },


  // 获取属性的状态
  getters: {
    //获取登录状态
    isLogin: state => state.isLogin,
  },

  // 设置属性状态
  mutations: {
    //保存登录状态
    userStatus(state, flag) {
      state.isLogin = flag
    },
    setvalue(state, msg) {
      state.usemsg.idmsglist = msg

    },
    stecoupon(state, msg) {
      state.usemsg.couponmsg = msg
    },
    setaddressid(state, msg) {
      state.usemsg.addressid = msg
    },
    setredUseStatus(state, msg) {
      state.usemsg.redUseStatus = msg
    },
    // 定位的城市信息
    setcityname(state, msg) {
      state.usemsg.cityname = msg
    },

    // 保存定位的次数
    setisgeolcation(state, msg) {
      state.usemsg.issendgecolotion = msg
    },
    // 一开始的定位状态
    setstartgecolotion: function (state, msg) {
      state.usemsg.startgecolotion = msg
    }

  },

  // 应用mutations
  actions: {
    //获取登录状态
    userLogin({ commit }, flag) {
      commit("userStatus", flag)
    },
  }
})

// 路由守卫
// router.beforeEach((to, from, next) => {

//   //获取用户登录成功后储存的登录标志
//   let getFlag = localStorage.getItem("Flag");

//   //如果登录标志存在且为isLogin，即用户已登录
//   if(getFlag === "isLogin"){

//     //设置vuex登录状态为已登录
//     store.state.isLogin = true
//     next()

//     //如果已登录，还想想进入登录注册界面，则定向回首页
//     if (!to.meta.isLogin) {

//       next({
//         path: '/home'
//       })
//     }

//   //如果登录标志不存在，即未登录
//   }else{

//     //用户想进入需要登录的页面，则定向回登录界面
//     if(to.meta.isLogin){
//       next({
//         path: '/login',
//       })
//     //用户进入无需登录的界面，则跳转继续
//     }else{
//       next()
//     }

//   }

// });

// router.afterEach(route => {
//   window.scroll(0, 0);
// });

// * 转换成图片表情
// */
function toEmotion(text, isNoGif) {
  var list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '愉快', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极', '嘿哈', '捂脸', '奸笑', '机智', '皱眉', '耶', '红包', '鸡'];

  if (!text) {
    return text;
  }

  text = text.replace(/\[[\u4E00-\u9FA5]{1,3}\]/gi, function (word) {
    var newWord = word.replace(/\[|\]/gi, '');
    var index = list.indexOf(newWord);
    var backgroundPositionX = -index * 24
    var imgHTML = '';
    if (index < 0) {
      return word;
    }

    if (isNoGif) {
      if (index > 104) {
        return word;
      }
      imgHTML = `<i class="static-emotion" style="background:url(https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/default218877.gif) ${backgroundPositionX}px 0;"></i>`
    } else {
      var path = index > 104 ? '/img' : 'https://res.wx.qq.com/mpres/htmledition/images/icon';
      imgHTML = `<img class="static-emotion-gif" style="vertical-align: middle" src="${path}/emotion/${index}.gif">`
    }
    return imgHTML;
  });
  return text;
}


Vue.directive('emotion', {
  bind: function (el, binding) {
    el.innerHTML = toEmotion(binding.value)
  }
});



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
