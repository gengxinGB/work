<template>
       <div class="searchbox">
        <div class="header">
            <i class="mui-icon mui-icon-arrowleft bank" @click="bank"></i>
            <input type="text" v-model="keywords" placeholder="请输入你要查找的名称">
            <i class="mui-icon mui-icon-search searchicon"></i>
            <span @click="searchmsg">搜本店</span>
        </div>
        <div class="goods">

        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            keywords:""
        }
    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },

        // 点击搜索按钮的事件
        searchmsg:function(){
             var supplierId=this.$route.query.supplierId
            if(this.keywords==""){
                Toast("请输入搜索的内容");
                return;
            }
            this.$router.push({path:'/storesearch',query:{supplierId:supplierId,keyWords:this.keywords}})
            // this.axios.post('cusSupplierInfo/searchGoodsInSup',this.qs.stringify(data)).then(response=>{
               
            //     console.log(response)
            //     if(response.data.data.length>0){
            //         this.msglist=response.data.data
            //     }else{
            //         Toast("没有你搜索的内容");
            //     }
            // })
        }
    },
}
</script>
<style lang="scss" scoped>
     // padding-bottom: 50px;
    .header{
      position: fixed;
     z-index: 10;
     top: 0;
     width: 100%;
     height: 45px;
    display: flex;
    background-color: #FFB7B7;
    // color: white;
    justify-content: space-between;
 
    .searchicon{
        position: absolute;
        // right: 0 !important;
        // top: 0;
        // left: 273px;
        right: 84px;
        top: 50%;
        transform: translateY(-50%);
        color: #B7B7B7;
        font-size: 16px;
    }
    input{
        // width: 50%;
        // height: 90%;
        width: 100%;
        margin-left: 33px;
        margin-right: 77px;
        // margin-top: 2px;
        height: 28px;
        background:rgba(255,255,255,1);
        border-radius:15px;
        opacity:0.7809;
        // line-height: 45px;
        margin-top: 10px;
    }
     input::-webkit-input-placeholder {
        font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(195,195,195,1);
        border: none;
      }

      input:-moz-placeholder {   /* Mozilla Firefox 4 to 18 */
          font-size:12px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(195,195,195,1);
          }
     input::-moz-placeholder {   /* Mozilla Firefox 19+ */
             font-size:12px;
              font-family:PingFangSC-Regular,PingFangSC;
              font-weight:400;
              color:rgba(195,195,195,1);
          }
     input:-ms-input-placeholder {  /* Internet Explorer 10-11 */
             font-size:12px;
             font-family:PingFangSC-Regular,PingFangSC;
             font-weight:400;
             color:rgba(195,195,195,1);
          }
    .bank{
        position: absolute;
        color: white;
       left: 7px;
       top: 50%;
       transform: translateY(-50%);
       font-size: 28px;
       font-weight: normal;
    }
    span{
        position: absolute;
        right: 10px;
        padding: 4px 16px;
        background:linear-gradient(339deg,rgba(255,195,73,1) 0%,rgba(255,213,35,0.85) 100%);
        border-radius:13px;
        color: white;
        // line-height: 45px;
        font-size:12px;
        font-family:PingFang-SC-Medium,PingFang-SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        top: 50%;
        transform: translateY(-50%);
    }
   }
</style>