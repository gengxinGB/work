<template>
    <div class="fansbox">
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i> <h4 class="title">粉丝</h4>
        </div>
        <ul class="msgbox">
            <li v-for="item in fanslist" :key="item.customerId">
                <div class="leftbox">
                <img :src="item.headPic" alt="">
                    <div class="wordmsg">
                        <p class="username">{{item.customerName}}</p>
                    <p class="gexing">{{item.sign}}</p>
                    </div>
                </div>
                <span class="rightbox" v-show="item.concernStatus==2?false:true" @click="remove(item.customerId)">关注</span>
                <span class="rightbox1" v-show="item.concernStatus==2?true:false" @click="remove(item.customerId)" > 互相关注</span>
            </li>

         
        </ul>

    </div>
</template>
<script>
export default {
    data() {
        return {
            fanslist:[]
        }
    },
    created() {
        this.getfanslist()
    },
    methods: {
        bank:function(){
            this.$router.push({path:'/usercenter'})
        },
        // 获取粉丝列表信息
        getfanslist:function(){
            this.axios.get('cusPersonalCenter/showFans').then(response=>{
                console.log(response)
                this.fanslist=response.data.data
            })
        },
        remove:function(id){
            var data={
                concernCustomerId:id
            }
             this.axios.post('cusPersonalCenter/concernAndRemoveConcern',this.qs.stringify(data)).then(response=>{
                console.log(response)
                this.getfanslist()
             })
        }
    },
}
</script>
<style lang="scss" scoped>
    .fansbox{
        padding-top: 35px;
        .header{
            width: 100%;
            height: 35px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 10;
            color: white;
            display: flex;
                i{
                line-height: 35px;
            }
            .title{
                // text-align: center;
                margin: auto;
                font-weight: normal;
            }
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
    }
</style>