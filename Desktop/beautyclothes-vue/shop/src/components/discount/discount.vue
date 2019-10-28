<template>
    <div class="discountbox">
         <div class="header">
            <i class="mui-icon mui-icon-back" @click="back"></i>  <h4 class="title">今日折扣</h4>
        </div>
        <nav>
            <p :class="{active:-1==active}" @click="toggle(-1,'精选')"> 精选 </p>
            <p v-for="(item,$index) in navlist" :key="$index" @click="toggle($index,item.oneCategoryName)" :class="{active:$index==active}">{{item.oneCategoryName}}</p>
        </nav>

        <!-- 内容模块 -->
        <div class="goodsmsg">
            <router-view></router-view>
           
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
               active:-1,
                navlist:[]
            }
    },
    created() {
        this.getnavmsg()
        this.$router.push({path:'/discountlist',query:{categoryName:"精选"}})
    },
    methods: {
        back:function(){
            this.$router.push({path:'/home'})
        },
        toggle(index,name){
             this.active=index
             this.$router.push({path:'/discountlist',query:{categoryName:name}})
        },
        // 页面加载获取导航接口
        getnavmsg:function(){
            this.axios.get('cusProduct/showDiscountCategoryInDiscount').then(response=>{
                console.log(response)
                this.navlist=response.data.data
            })
        },
    },
}
</script>
<style lang="scss" scoped>
    .discountbox{
        padding-top: 40px;
      
        .header{
             width: 100%;
            height: 40px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 10;
            display: flex;
            color: white;
             i{
                line-height: 35px;
            }
            .title{
                // text-align: center;
                margin: auto;
                font-weight: normal;
            }
        }
        nav{
        height: 20px;
        line-height: 20px;
        background-color: white;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: middle;
        -ms-flex-align: middle;
        align-items: middle;
        overflow: auto;
        p{
        text-align: center;
        font-size: 14px;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        margin: 0 10px;
        color: #6D6D6D;
      }
      .active{
       color: #FFB7B7;
       }
     }
   
        
    }
</style>