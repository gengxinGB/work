<template>
    <div>
        <div class="nohave" v-if="nohaveshow">暂时还没有关注的用户哦！！</div>
         <ul class="msgbox">
            <li v-for="item in fanslist" :key="item.customerId">
                <div class="leftbox">
                <img :src="item.headPic" alt="">
                    <div class="wordmsg">
                        <p class="username">{{item.customerName}}</p>
                    <p class="gexing">{{item.sign}}</p>
                    </div>
                </div>
                <span class="rightbox " v-show="item.concernStatus==2?false:true" @click="remove(item.customerId,item.concernStatus,$event)">已关注</span>
                <span class="rightbox" v-show="item.concernStatus==2?true:false" @click="remove(item.customerId,item.concernStatus,$event)"> 互相关注</span>
                <span class="rightbox1" v-show="item.concernStatus==0?true:false" @click="remove(item.customerId,item.concernStatus,$event)"> 未关注</span>

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
        getmsg:function(){
             this.axios.get("cusPersonalCenter/showConcerns?concernType="+1).then(response=>{
                 if(response.data.data.customerMapList.length==0){
                     this.nohaveshow=true
                     Indicator.close();
                 }else{
                    this.fanslist=response.data.data.customerMapList
                    Indicator.close();
                 }
                console.log(response)
               
            })
        },
             //点击取消状态 
        remove:function(id,staus,e){
            console.log(e)
            console.log(e.target)
            console.log(e.target.innerText)
             
          var data={
                concernCustomerId:id
            }
             this.axios.post("cusPersonalCenter/concernAndRemoveConcern",this.qs.stringify(data)).then(response=>{
                console.log(response)
                // this.getfanslist()
                status=response.data.data.concernStatus
                // console.log(status)
                    if(status==0){
                    e.target.innerText="未关注"
                }else if(status==1){
                    e.target.innerText="已关注"
                }else if(status==2){
                    e.target.innerText="互相关注"
                }
             })
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
                .rightbox{
                    font-size:12px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    background-color: #FFC023;
                     width:68px;
                     height:22px;
                    border-radius: 17px;
                    text-align: center;
                    line-height: 22px;
                    margin-top: 5px;
                }
                .rightbox1{
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
                    margin-top: 5px;
                }
            }
        }
</style>