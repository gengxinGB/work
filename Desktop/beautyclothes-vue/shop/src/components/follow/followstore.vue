<template>
    <div>
        <div class="nohave" v-if="nohaveshow">
            暂无关注的店铺!!!!
        </div>
           <ul class="msgbox">
            <li v-for="item in fanslist" :key="item.customerId">
                <div class="leftbox">
                <img :src="item.supplierLogoUrl" alt="">
                    <div class="wordmsg">
                        <p class="username">{{item.supplierName}}</p>
                        <p class="gexing">暂无简介</p>
                    </div>
                </div>
               <div class="right">
                    <span class="rightbox1" v-show="item.concernStatus==2?false:true" @click="remove(item.supplierId,$event)">已关注</span>
                    <span class="rightbox1" v-show="item.concernStatus==2?true:false" @click="remove(item.supplierId,$event)"> 互相关注</span>
                    <span class="rightbox1" v-show="item.concernStatus==0?true:false" @click="remove(item.supplierId,$event)"> 未关注</span>
                    <p class="instore" @click="instore(item.supplierId)">进入店铺</p>
               </div>
               
            </li>
        </ul>
    </div>
</template>
<script>
import { Indicator } from "mint-ui";

export default {
    data() {
        return {
            fanslist:[],
            nohaveshow:false
        }
    },
    created() {
        Indicator.open("加载中...");
        this.getmsg()
    },
    methods: {
        // 获取店铺的信息
         getmsg:function(){
             this.axios.get("cusPersonalCenter/showConcerns?concernType="+2).then(response=>{
                console.log(response)
                if(response.data.data.supplierMapList.length==0){
                    this.nohaveshow=true
                     Indicator.close();
                }else{
                     this.nohaveshow=false
                      Indicator.close();
                    this.fanslist=response.data.data.supplierMapList
                }
               
            })
        },
        // 点击改变状态
        remove:function(id,e){
            var data={
                supplierId:id
            }
         this.axios.post("cusPersonalCenter/concernSupplier",this.qs.stringify(data)).then(response=>{
             console.log(response)
             if(response.data.success==true){
                 if(response.data.data==0){
                     e.target.innerText="未关注"
                 }else if(response.data.data==1){
                     e.target.innerText="已关注"
                 }else if(response.data.data==2){
                     e.target.innerText="互相关注"

                 }
             }
        })
        },
        // 点击进入店铺
        instore:function(id){
              this.$router.push({path:"/storeindex",query:{supplierId:id}})
        }
    },
}
</script>
<style lang="scss" scoped>
   .nohave{
       background-color: #ffffff;
       padding: 10px;
   }
     .msgbox{
         p{
             margin: 0;
         }
            background-color: white;
            li{
                display: flex;
                 justify-content: space-between;
                 padding: 8px 10px;
                 border-bottom: 1px solid #cccccc;
                .leftbox{
                    display: flex;
                    .wordmsg{
                        margin-left: 16px;
                        .username{
                            font-size:14px;
                            font-family:PingFang-SC;
                            font-weight:500;
                            color:rgba(66,66,66,1);
                        }
                        .gexing{
                            font-size:12px;
                            font-family:PingFang-SC;
                            font-weight:500;
                            color:rgba(88,88,88,1);
                        }
                    }
                    p{
                        margin: 0;
                    }
                    img{
                        width: 44px;
                        height: 44px;
                        border-radius: 44px;
                        vertical-align: middle;
                    }
                    
                }
                 .right{
                    .instore{
                         font-size:12px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    background-color: #FFC023;
                    // display: inline-block;
                    margin-top: 4px;
                     width:68px;
                     height:22px;
                    border-radius: 17px;
                    text-align: center;
                    line-height: 22px;
                    }
                 .rightbox{
                    font-size:12px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    background-color: #FFC023;
                    display: inline-block;
                     width:68px;
                     height:22px;
                    border-radius: 17px;
                    text-align: center;
                    line-height: 22px;
                    // margin-top: 2px;
                }
                .rightbox1{
                    display: inline-block;
                     font-size:12px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    background-color: #A7A7A7;
                     width:68px;
                     height:22px;
                    border-radius: 17px;
                    text-align: center;
                    line-height: 22px;
                    // margin-top: 2px;
                }
                 }
            }
        }
</style>