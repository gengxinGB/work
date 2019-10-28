<template>
    <div class="fenleibox">
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h4 class="title">服饰</h4>
        </div>
        <!-- <div class="leftbox">
                <div v-for="(item,index) in firstlist" :key="index">
                    <p class="firsttitle">{{item.oneCategoryName}}</p>
                      <ul class="categroybox">
                        <li :class="{active:active==smitem.twoCategoryId}" v-for="(smitem,index) in item.twoCategoryDTOList" :key="index" @click='getthreemsg(smitem.twoCategoryId)'>{{smitem.twoCategoryName}}</li>
                    </ul>
                </div>
        </div> -->
     <div class="content">
               <div class="left">
             <div v-for="(item,index) in firstlist" :key="index">
                    <p class="firsttitle">{{item.oneCategoryName}}</p>
                      <ul class="categroybox">
                        <li :class="{active:active==smitem.twoCategoryId}" v-for="(smitem,index) in item.twoCategoryDTOList" :key="index" @click='getthreemsg(smitem.twoCategoryId)'>{{smitem.twoCategoryName}}</li>
                    </ul>
                </div>
        </div>
        <div class="rightbox">
            <router-view></router-view>
        </div>
     </div>
    </div>
</template>
<script>
import threecategroy from '../components/chanpinfenlei/threecategroy'
export default {
    data() {
        return {
            clientHeight:'',
            firstlist:[],
            categoryId:1,
            active:1.1,
            isshow:false,
            twoCategoryId:''
        }
    },
    components:{
       threecategroy
    },
    mounted() {
        this.clientHeight =`${document.documentElement.clientHeight}`
        console.log(this.clientHeight)
        document.querySelector(".rightbox").style.height=this.clientHeight
    },
    created() {
        this.axios.get('cusProductCategory/getClothesCategory').then(respone=>{
            console.log(respone)
            console.log(respone.data.data)
             this.firstlist=respone.data.data
            // this.categoryId=respone.
             this.twoCategoryId=this.firstlist[0].twoCategoryDTOList[0].twoCategoryId
             this.$router.push({path:'/chanpinfenlei/threecategroy',query:{twoCategoryId:this.twoCategoryId}})
        })
        // this.getid(1)

    },
    methods: {
          // 点击返回上一层
        bank:function(){
             this.$router.push({path:'/home'})
        },
    
      

        // 点击传递给子组件id
        getthreemsg:function(twoCategoryId){
            this.active=twoCategoryId
            console.log(twoCategoryId)
            this.$router.push({path:'/chanpinfenlei/threecategroy',query:{twoCategoryId:twoCategoryId}})
        }

    },
}
</script>
<style lang="scss" scoped>
ul{
    list-style: none;
    padding: 0;
    margin: 0;
    li{
        text-align: center;
   
    }
 
}


.fenleibox{
    padding-top: 45px;
     .header{
        height: 35px;
        line-height: 35px;
        width: 100%;
        position: fixed;
        top: 0;
        background-color: #FFB7B7;
        z-index: 10;
        display: flex;
        color: white;
        .title{
             // text-align: center;
             font-weight:600;
             font-size: 18px;
             margin: auto;
             font-weight: normal;
         }
         i{
           line-height: 35px;
         }
    }
  
    .content{
    display: flex;
    height: 100%;
    position: relative;
    }
    .left{
        background-color: white;
        // width: 67px;
        position: absolute;
        left: 16px;
        box-shadow:0px 2px 5px 0px rgba(0,0,0,0.1);
        .firsttitle{
           padding: 4px 24px;
            background:linear-gradient(180deg,rgba(255,178,160,1) 0%,rgba(255,183,183,1) 100%);
            box-shadow:0px 2px 6px 0px rgba(0,0,0,0.2);
            border-radius:17px;
            text-align: center;
            line-height: 25px;
            font-size:18px;
            font-family:PingFang-SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            margin-left: -6px;
        }
        .categroybox{
            li{
                padding: 8px 0;
                font-size:18px;
                font-family:PingFang-SC;
                font-weight:500;
                color:rgba(102,102,102,1);
            }
            .active{
                color: #FFB7B7;
            }
        }
    }
   
    .rightbox{
        overflow: auto;
        // height: 100%;
        // flex: 4;
        width: 100%;
        background-color: white;
        margin: 0 30px 0 60px;
        // margin-left: 80px;
        // background-color: green;
        padding: 20px 24px 0 40px;
    }

}
</style>
