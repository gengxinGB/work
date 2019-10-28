<template>
    <div class="storeindexbox">
        <div class="headerbox">
            <div class="left">
                <!-- <i class="mui-icon mui-icon-back" @click="bank"></i> -->
                <img :src="storemsg.supplierLogoUrl" alt="">
                <h4 class="username">{{storemsg.supplierName}}</h4>
                <span class="fansnum">
                    粉丝数111
                </span>
            </div>

            <span class="right" @click="guanzhu(storemsg.supplierId)" v-if='storemsg.isCollection==0'>关注</span>
            <span class="right" @click="guanzhu(storemsg.supplierId)" v-if='storemsg.isCollection==1' >已关注</span>
        </div>
        <div class="navmsg">
           <div class="inputbox">
                <input type="text" class="srarchbox"  v-model="searmsg" readonly @click="instoresearch" placeholder="搜索">
                <i class="mui-icon mui-icon-search searchicon"></i>
           </div>
            <p class="navbox">
                <span @click="togglt(0)" :class="{active:0==active}">店铺简介</span>
                <span @click="togglt(1)" :class="{active:1==active}">商品</span>
                <span @click="togglt(2)" :class="{active:2==active}">新品</span>
                <span @click="togglt(3)" :class="{active:3==active}">买家秀</span>
            </p>
        </div>
         <!-- <input type="text" class="srarchbox" ref='search' v-model="searmsg" readonly @click="instoresearch"> <button type="button" class="mui-btn mui-btn-danger mui-btn-outlined" @click="getsearch()">搜索</button> -->
        <!--路由内容变化区域  -->
        <router-view></router-view>

        <!-- 店铺底部 -->
        <nav class="mui-bar mui-bar-tab" >
            <router-link class="mui-tab-item " to="/" exact >
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>

			<router-link class="mui-tab-item " :to="{path:'/storeindex/storeallgoods',query:{supplierId:supplierId}}" @click.native="noactive" exact >
				<span class="mui-icon mui-icon-extra mui-icon-extra-gift"></span>
				<span class="mui-tab-label">宝贝</span>
			</router-link>
			
		
			<router-link class="mui-tab-item" to="/storeindex/contactcustomer" @click.native="noactive">
				<span class="mui-icon mui-icon-extra mui-icon-extra-custom"></span>
				<span class="mui-tab-label">联系客服</span>
			</router-link>
		</nav>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            // 头部导航信息
            active:0,
            msgarr:[],
            msg:[],
            // 店铺id
            supplierId:"",
            // 店铺信息
            storemsg:[],
            fristid:'',
            searmsg:'',
            // 活动距离
            pos:0,
            ishow:true
            
        }
    },
    created() {
        this.getshopstoremsg()
         
    },
     
mounted () {
           window.addEventListener('scroll', this.handleScroll)
       },

destroyed () {
    window.removeEventListener('scroll',this.handleScroll)
  },
 methods: {
    //  点击其它按钮取消高亮
     noactive:function(){
         console.log(111111)
         this.active=-1
     },

    //点击关注事件
    guanzhu:function(id){
        var data={
            supplierId:id
        }
        this.axios.post('cusPersonalCenter/concernSupplier',this.qs.stringify(data)).then(response=>{
            console.log(response)
            if(response.data.success==false){
                Toast({
                  message: '用户未登录',
                  duration: 500
                });
                  localStorage.removeItem("userName")
                 this.$router.push({path:'/login'})
            }else if(response.data.success==true){
                 if(response.data.data==1){
                    this.storemsg.isCollection=1                      
                 }else if(response.data.data==0){
                    this.storemsg.isCollection=0                   

                 }

                 
            }
        })

    },

    //  点击进入搜索首页  
    instoresearch:function(){
         this.$router.push({path:'/storesearchindex',query:{supplierId:this.supplierId}})
    },

    bank:function(){
        this.$router.go(-1)
    },
  



     // 点击搜索按钮跳转到搜索
     getsearch:function(){
          this.active=-1
         if(this.$refs.search.value!=""){
           this.$router.push({path:'/storeindex/storesearch',query:{supplierId:this.supplierId,keyWords:this.searmsg}})
         }else{
              Toast('请输入要搜索的内容');
         }
     },
     // 点击进去店铺详情页
            instoremsg:function(){
                this.$router.push({path:'/storemsg',query:{supplierId:this.supplierId}})
            },

        
        // 获取店铺首页信息
        getshopstoremsg:function(){
            this.supplierId=this.$route.query.supplierId
            // console.log(this.supplierId)
            var data={
                supplierId:this.supplierId
            }
            this.axios.post('cusSupplierInfo/inSupplier',this.qs.stringify(data)).then(response=>{
                    console.log(response)
                    this.storemsg=response.data.data
                    this.msg=response.data.data.showMapList
                    // var msglist=response.data.data.threeCategoryProDTOList
                   console.log(this.msg)
                    // this.fristid=this.msg[0].showCategoryId
                     this.$router.push({path:'/storeindex/storeproductmsg',query:{supplierId:this.supplierId}})
            })
        },

        // 点击切换头部导航
        togglt:function(i){
              this.active=i
            //   点击进入不同的页面
            if(i==0){
                // 进入店铺简介
                this.$router.push({path:"/storeindex/storeproductmsg",query:{supplierId:this.supplierId}})
               
            }else if(i==1){
            //   进入店铺商品页面
         this.$router.push({path:'/storeindex/storeallgoods',query:{supplierId:this.supplierId}})
            }else if(i==2){
                // 进入新品页面
         this.$router.push({path:'/storeindex/newgoods',query:{supplierId:this.supplierId}})
            
            }else if(i==3){
                // 进入买家秀页面
                this.$router.push({path:'/storeindex/buyershow',query:{supplierId:this.supplierId}})
            }
        }

    },

}
</script>
<style lang="scss" scoped>

    .storeindexbox{
        padding-top: 45px;
        padding-bottom: 55px;
        .headerbox{
            background-color: #FFB7B7;
            height: 45px;
            position: fixed;
            width: 100%;
            top: 0;
            display: flex;
            justify-content: space-between;
            z-index: 99;
            .left{
                img{
                    width: 28px;
                    height: 28px;
                    border-radius: 28px;
                    margin-top: 8px;
                    margin-right: 8px;
                }
                margin-left: 10px;
                display: flex;
                i{
                    line-height: 45px;
                    color: #ffffff;
                }
                .username{
                    line-height: 35px;
                    font-size:16px;
                    font-weight:600;
                    color:rgba(255,255,255,1);
                }
                .fansnum{
                    line-height: 45px;
                    font-size:10px;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    margin-left: 10px;
                }
            }
            .right{
                height: 22px;
                width: 53px;
                line-height: 22px;
                background-color: #FFC023;
                border-radius:13px;
                text-align: center;
                margin-top: 10px;
                margin-right: 10px;
                font-size:12px;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
           
        }
         .navmsg{
             display: flex;
             background-color: #FFB7B7;
             padding: 5px;
             .inputbox{
                 position: relative;
                 .searchicon{
                     position: absolute;
                     right: 6px;
                     font-size: 18px;
                     top: 5px;
                 }
             }
                input{
                    width:88px;
                    height:24px;
                    background:rgba(255,255,255,1);
                    border-radius:15px;
                    opacity:0.78;
                    margin: 0;
                }
                .navbox{
                    span{
                        margin:0 10px;
                        font-size:14px;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                        padding-bottom: 6px;
                    }
                    .active{
                        border-bottom: 3px solid #ffffff;
                    }
                }
            }
        nav{
            .banktop{
                 width: 50px;
                height: 50px;
                border-radius: 50px;
            }
            .router-link-active{
                color: pink;
            }
        }
    }
</style>