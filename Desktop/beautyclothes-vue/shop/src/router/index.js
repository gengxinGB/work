import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import Message from '../components/message'
import Shopcar from '../components/shopcar'
import Usercenter from '../components/usercenter'
import Login from '../components/login'
import Register from '../components/register'
import Codelogin from '../components/codelogin'
import Forgetpwd from '../components/forgetpwd'
import Goodsinfo from '../components/goodsinfo'
// 邮箱登录
import Emaillogin from '../components/emaillogin'
import Canpinfenlei from '../components/chanpinfenlei'
// 商品详情二级分类移入
import Threecategroy from '../components/chanpinfenlei/threecategroy'

// 商品分类商品信息
import Categroygoodsmsg from '../components/chanpinfenlei/categroygoodsmsg'

// 搜索模块
import Search from '../components/search/search'
// 搜索结果商品页面
import Searchgoodslist from '../components/search/searchgoodslist'
// 搜索结果店铺页面
import Searchstore from '../components/search/searchstore'

// 定位页面展示
// import Geolocation from '../components/geolcation/geolcation'
// 评论组件
import Pinlun from '../components/pinlun'


// 进入店铺首页
import Storeindex from '../components/store/storeindex'

// 店铺搜索首页

import Storesearchindex from '../components/store/storesearchindex'

// 点击商品首页分类进去商品详情
import Storeproductmsg from '../components/store/storeproductmsg'

// 店铺搜索路由
import Storesearch from '../components/store/storesearch'

// 店铺新品上市模块
import Newgoods from '../components/store/newgoods'

// 店铺所有商品模块
import Storeallgoods from '../components/store/storeallgoods'

// 买家秀
import Buyershow from '../components/store/buyershow'

// 联系客服
import Contactcustomer from '../components/store/contactcustomer'

// 店铺详情页面
import Storemsg from '../components/store/storemsg'

// 品牌首页
import Brandindex from '../components/brand/brandindex'

// 品牌商品详情页面
import Brandgoodsinfo from '../components/brand/brandgoodsinfo'

// 租赁页面
import Lease from '../components/lease/lease'

// 租赁商品列表展示页面
import Leaseinfo from '../components/lease/leaseinfo'

// 单个商品详情展示页面
import Leasegoodsinfo from '../components/lease/leasegoodsinfo'

// 租赁订单页面
import Leaseorder from '../components/lease/leaseorder'

// 租赁到店自取页面
import Leaseorderyourself from '../components/lease/leaseorderyourself'

// 发现页面
import Find from '../components/find'

// 发现详情页面
import Findmsg from '../components/find/findmsg'

// 修改地址页面
import Editaddress from '../components/address/editaddress'

// 美妆分类页面
import Beautymakeupcategroy from '../components/beautymakeup/beautymakeupcategroy'


// 今日折扣
import Discount from '../components/discount/discount'

// 今日折扣列表
import Discountlist from '../components/discount/discountlist'


// 美妆列表页面
import Beautymakeupinfo from '../components/beautymakeup/beautymakeupinfo'

// 收藏页面
import Collection from '../components/usercenter/collection'

// 收藏页面列表子路由
import Collectionlist from '../components/usercenter/collectionlist'

// 粉丝 页面
import Fans from '../components/usercenter/fans'

// 关注页面
import Follow from '../components/usercenter/follow'

//关注用户
import Followuser from '../components/follow/followuser'

//关注品牌
import Followbrand from '../components/follow/followbrand'

// 关注店铺
import Followstore from '../components/follow/followstore'


// 足迹页面
import Footprint from '../components/usercenter/footprint'

// 待发货  待付款页面
import Delivergoods from '../components/delivergoods/delivergoods'

//付款发货列表页面
import Deliverlist from '../components/delivergoods/deliverlist'

// 我的订单页面
import Myorder from '../components/usercenter/myorder'

// 获取文章所有的信息
import Allarticle from '../components/find/allarticle'

//我的收货地址
import Myaddress from '../components/usercenter/myaddress'

// 添加收货地址
import Addaddress from '../components/usercenter/addaddress'

// 发表文章
import Sendarticle from '../components/find/sendarticle'

// 我的钱包页面

import Mywallet from '../components/usercenter/mywallet'

// 添加银行卡页面
import Addbankcard from '../components/usercenter/addbankcard'

// 添加银行卡号
import Addbankfirst from '../components/usercenter/addbankfirst'

// 申请店铺
import Applicationshop from '../components/usercenter/applicationsshop'

// 设置页面
import Setup from '../components/usercenter/setup'

// 账号和安全页面
import Accountsecurity from '../components/setup/accountsecurity'

// 修改密码
import Editpassword from '../components/setup/editpassword'

// 修改手机号码
import Edittelephonenum from '../components/setup/edittelephonenum'

// 修改用户头像
import Edituserpic from '../components/setup/edituserpic'

// 支付和设置页面
import Paysetup from '../components/setup/paysetup'

// 个人信息设置
import Setusermsg from '../components/setup/setusermsg'

// 修改昵称
import Editusername from '../components/setup/editusername'

// 修改生日页面
import Editbirthday from '../components/setup/editbirthday'

// 通用设置
import Currency from '../components/setup/currency'

// 会员卡
import Membershipcard from '../components/usercenter/membershipcard'

// 会员卡充值页面
import Paymember from '../components/usercenter/paymember'

// 优惠券
import Coupon from '../components/usercenter/coupon'

// 生成订单页面
import Generateorder from '../components/order/generateorder'

// 生成到店自取订单页面
import Shopyourselforder from '../components/order/shopyourselforder'

// 生成订单的地址页面
import Addaddresslist from '../components/order/addaddresslist'

// 立即购买的订单
import Buynoworder from '../components/order/buynoworder'

// 立即购买到店自取页面
import Buynowyourself from '../components/order/buynowyourself'


// 试衣间
import Fittingroom from '../components/fittingroom'

// 订单中使用优惠券
import Usecoupon from '../components/order/usecoupon'

// 聊天界面
import Chatpage from '../components/message/chatpage'

// 定位页面
import Location from '../components/geolcation/location'

// 扫一扫页面
import Scan from '../components/topevent/scan'

// 测试路由地址
import text from '../components/text'

//钱包细节
import walletDetail from '../components/usercenter/walletDetail'

//添加支付密码
import addpaymentPassword from '../components/usercenter/addpaymentpassword'
Vue.use(Router)

const router = new Router({

  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },
    //  {path:'/geolocation',name:'geolcation',component:Geolocation},
    // 首页
    { path: '/home', name: 'home', component: Home },

    // 消息页面
    { path: '/message', name: 'message', component: Message },

    //  购物车
    { path: '/shopcar', name: 'shopcar', component: Shopcar },


    { path: "/usercenter", name: 'usercenter', component: Usercenter },
    // 登录组件
    { path: '/login', name: 'login', component: Login },
    // 注册组件
    { path: '/register', name: 'register', component: Register },
    //  验证码登录
    { path: '/codelogin', name: 'codelogin', component: Codelogin },
    //  忘记密码
    { path: '/forgetpwd', name: 'forgetpwd', component: Forgetpwd },
    //  商品详情 
    { path: '/home/goodsinfo', name: 'goodsinfo', component: Goodsinfo },
    // 邮箱登录
    {
      path: '/emaillogin', name: 'emaillogin', component: Emaillogin
    },
    // 分类模块路由
    {
      path: '/home/chanpinfenlei', name: 'chanpinfenlei', component: Canpinfenlei, children: [
        { path: '/chanpinfenlei/threecategroy', name: 'threecategroy', component: Threecategroy },
        //  {path:'/home/chanpinfenlei',redirect:'/chanpinfenlei/threecategroy'},
      ],
    },
    // 分类商品详情
    { path: '/categroygoodsmsg', name: 'categroygoodsmsg', component: Categroygoodsmsg },


    // 搜索页面的路由
    { path: '/search', name: 'search', component: Search },

    // 搜索商品结果页
    { path: '/search/searchgoodslist', name: 'searchgoodslist', component: Searchgoodslist },
    // 搜索店铺结果页
    { path: '/search/searchstore', name: 'searchstore', component: Searchstore },

    //评论页面的路由
    { path: '/pinlun', name: 'pinlun', component: Pinlun },



    // 进入店铺
    {
      path: '/storeindex', name: 'storeindex', component: Storeindex, children: [
        { path: '/storeindex/storeproductmsg', name: 'storeproductmsg', component: Storeproductmsg },

        { path: '/storeindex/newgoods', name: 'newgoods', component: Newgoods },
        { path: '/storeindex/storeallgoods', name: 'storeallgoods', component: Storeallgoods },
        { path: '/storeindex/contactcustomer', name: 'contactcustomer', component: Contactcustomer },

        // 买家秀
        { path: '/storeindex/buyershow', name: 'buyershow', component: Buyershow }
      ]
    },

    // 店铺内搜搜索
    { path: '/storesearchindex', name: 'storesearchindex', component: Storesearchindex },
    //  店铺搜索内容展示
    { path: '/storesearch', name: 'storesearch', component: Storesearch },

    // 店铺详情页面
    { path: '/storemsg', name: 'storemsg', component: Storemsg },

    //  品牌首页页面
    { path: '/brandindex', name: 'brandindex', component: Brandindex },

    // 品牌商品详情页
    { path: '/brandgoodsinfo', name: 'brandgoodsinfo', component: Brandgoodsinfo },

    // 租赁页面
    { path: '/lease', name: 'lease', component: Lease },

    // 租赁商品列表页面
    { path: '/lease/leaseinfo', name: 'leaseinfo', component: Leaseinfo },

    // 单个商品详情页面
    { path: '/lease/leasegoodsinfo', name: 'leasegoodsinfo', component: Leasegoodsinfo },

    //租赁商品订单页面
    { path: '/lease/leaseorder', name: 'leaseorder', component: Leaseorder },

    //  租赁到店自取页面
    { path: '/lease/leaseorderyourself', name: 'leaseorderyourself', component: Leaseorderyourself },

    //  发现页面
    {
      path: '/find', name: 'find', component: Find, children: [
        { path: '/find/findmsg', name: 'findmsg', component: Findmsg },
        // {path:'/',redirect:'/find/findmsg'},
      ]
    },

    // 修改地址页面
    { path: '/editaddress', name: 'editaddress', component: Editaddress },

    // 美妆分类页面
    { path: '/beautymakeupcategroy', name: 'beautymakeupcategroy', component: Beautymakeupcategroy },


    // 今日折扣页面
    {
      path: '/discount', name: 'discount', component: Discount, children: [
        { path: '/discountlist', name: 'discountlist', component: Discountlist }
      ]
    },

    // 美妆详情列表
    { path: '/beautymakeupinfo', name: 'beautymakeupinfo', component: Beautymakeupinfo },

    // 收藏页面
    {
      path: '/collection', name: 'collection', component: Collection, children: [
        // 收藏列表子路由
        { path: '/collection/collectionlist', name: 'collectionlist', component: Collectionlist }
      ]
    },
    // 粉丝页面
    { path: '/fans', name: 'fans', component: Fans },

    //关注页面
    {
      path: '/follow', name: 'follow', component: Follow, children: [
        // 关注用户
        { path: '/follow/followuser', name: 'followuser', component: Followuser },
        // 关注店铺
        { path: '/follow/followstore', name: 'followstore', component: Followstore },
        // 关注品牌
        { path: '/follow/followbrand', name: 'followbrand', component: Followbrand }

      ]
    },

    // 足迹页面

    { path: '/footprint', name: 'footprint', component: Footprint },

    // 发货  待付款等页面
    {
      path: '/delivergoods', name: "delivergoods", component: Delivergoods, children: [
        { path: '/delivergoods/deliverlist', name: 'deliverlist', component: Deliverlist }
      ]
    },
    // 我的订单
    { path: '/myorder', name: 'myorder', component: Myorder },

    // 获取文章全部信息
    { path: '/find/allarticle', name: 'allarticle', component: Allarticle },

    // 我的收货地址
    { path: '/myaddress', name: 'myaddress', component: Myaddress },

    // 添加收货地址
    { path: '/addaddress', name: 'addaddress', component: Addaddress },

    // 发表文章页面
    { path: '/sendarticle', name: 'sendarticle', component: Sendarticle },

    // 我的钱包页面
    { path: '/mywallet', name: 'mywallet', component: Mywallet },

    // 添加银行卡卡号
    { path: '/addbankfirst', name: "addbankfirst", component: Addbankfirst },

    // 添加银行卡页面
    { path: '/addbankcard', name: 'addbankcard', component: Addbankcard },

    // 申请店铺
    { path: '/applicationshop', name: 'applicationshop', component: Applicationshop },

    // 设置页面
    { path: '/setup', name: 'setup', component: Setup },

    // 账号和安全页面
    { path: '/setup/accountsecurity', name: 'accountsecurity', component: Accountsecurity },

    // 修改密码
    { path: '/accountsecurity/editpassword', name: 'editpassword', component: Editpassword },

    // 修改手机号码
    { path: '/accountsecurity/edittelephonenum', name: 'edittelephonenum', component: Edittelephonenum },
    // 支付设置页面
    { path: '/setup/paysetup', name: 'paysetup', component: Paysetup },

    // 个人信息设置页面
    { path: '/setusermsg', name: 'setusermsg', component: Setusermsg },

    // 修改昵称
    { path: '/setusermsg/editusername', name: 'editusername', component: Editusername },

    // 修改生日
    { path: '/setusermsg/editbirthday', name: 'editbirthday', component: Editbirthday },

    // 修改用户头像
    { path: '/setusermsg/edituserpic', name: 'edituserpic', component: Edituserpic },

    // 通用设置页面
    { path: '/setup/currency', name: 'currency', component: Currency },

    // 会员卡页面
    { path: '/membershipcard', name: 'membershipcard', component: Membershipcard },

    // 会员卡充值页面
    { path: '/paymember', name: 'paymember', component: Paymember },

    // 优惠券页面
    { path: "/coupon", name: 'coupon', component: Coupon },

    // 生成立即购买的订单
    { path: '/buynoworder', name: 'buynoworder', component: Buynoworder },

    // 生成立即购买到店自取订单
    { path: '/buynowyourself', name: 'buynowyourself', component: Buynowyourself },

    // 生成订单页面
    { path: '/generateorder', name: 'generateorder', component: Generateorder },

    // 生成到店自取页面
    { path: '/shopyourselforder', name: 'shopyourselforder', component: Shopyourselforder },

    // 生成订单地址修改页
    { path: '/addaddresslist', name: 'addaddresslist', component: Addaddresslist },

    // 订单中使用优惠券页面
    { path: '/usecoupon', name: "usecoupon", component: Usecoupon },

    // 试衣间页面
    { path: '/fittingroom', name: 'fittingroom', component: Fittingroom },

    // 聊天界面
    { path: '/chatpage', name: 'chatpage', component: Chatpage },

    // 定位页面
    { path: '/location', name: 'location', component: Location },

    //扫一扫页面
    { path: '/scan', name: 'scan', component: Scan },

    // 测试路由地址
    { path: '/popo', name: 'text', component: text },

    //钱包细节
    { path: '/walletDetail', name: 'walletDetail', component: walletDetail },

    //添加支付密码模块
    { path: '/addpaymentPassword', name: 'addPaymaentPassword', component: addpaymentPassword },

  ],
  //点击高亮 
  linkActiveClass: 'router-link-active'
});
router.beforeEach((to, from, next) => {
  // console.log(to.name+"-----to即将离开的目标")
  // console.log(from.name+"-----from正要离开的路由")
  // to and from are both route objects. must call `next`.
  const nextRoute = ['message', 'usercenter', 'shopcar']
  var isLogin = localStorage.getItem('userName')
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!isLogin) {
      // alert("请登录")
      router.push({ name: 'login' })
    }
  }
  if (to.name == 'login') {
    if (isLogin) {
      router.push({ name: 'home' })
    }
  }

  next()
  // console.log(next().name)
}),
  router.afterEach((to, from) => {
    console.log(to.name + "----after to")
    console.log(from.name + "-----after  from")
    const nextRoute = ['message', 'usercenter', 'shopcar']
    var isLogin = localStorage.getItem('userName')
    if (nextRoute.indexOf(to.name) >= 0) {
      if (!isLogin) {
        // Toast({
        //   message: '请先登录',
        //   position: 'center',
        //   duration: 5000
        // });
        router.push({ name: 'login' })
      }
    }
  })
// beforeRouteLeave(to,from,next) { 

// }
export default router;

