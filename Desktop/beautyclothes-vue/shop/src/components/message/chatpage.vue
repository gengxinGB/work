<template>
    <div class="chatbox">
        <!-- <h1>聊天界面</h1> -->
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h4>王小明</h4>
        </div>
        
        <div class="msglistbox">
            <ul class="msgbox">
                <li :class="item.direction==1?'leftmsg':'rightmsg' " v-for="(item,index) in wxChatData" :key="index">
                   <img :src="item.direction==1?zhupic:morepic" alt="" class="userheaderpic">
                   <div class="msgboxcontent">
                        <span class="textmsg"   v-if="item.type==1"  v-emotion="item.content">
                        <!-- {{}} -->
                       </span>
                        <img src="../../assets/img/goodsinfopic2.png" alt="" class="msgpic" v-if='item.type==2'>
                   </div>
                  
                </li>



             
            </ul>
        </div>

        <div class="footer">
            <i class="mui-icon mui-icon-mic"></i>
            <input type="text" v-model="sendmsg">
            <img src="../../assets/newimg/addaddress.png" alt="" v-if="addmoreisshow">
            <span class="sendbtn" v-if="!addmoreisshow">发送</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // input框中的值
            sendmsg:'',
            // 添加按钮的状态
            addmoreisshow:true,
              //  主人头像
             zhupic:require('../../assets/img/fenleixqnv.jpg'),
            //  聊天人头像
            morepic:require('../../assets/img/goodsinfopic1.jpg'),
             wxChatData: [{
             direction: 2,
           
               id: 1,
               type: 1,
               content: '你好!![呲牙]',
               ctime: new Date().toLocaleString()
             },
             {
               direction: 1,
               id: 2,
               type: 1,
               content: '你也好。[害羞]',
               ctime: new Date().toLocaleString()
             },
             {
               direction: 2,
               id: 3,
               type: 1,
               content: '这是我的简历头像：',
               ctime: new Date().toLocaleString()
             },
             {
               direction: 2,
               id: 4,
               type: 2,
               content: '../../assets/img/goodsinfopic2.png',
               ctime: new Date().toLocaleString()
             },
             {
               direction: 1,
               id: 5,
               type: 1,
               content: '你开心就好。[微笑]',
               ctime: new Date().toLocaleString()
             }]

               }
           },
     watch: {
         'sendmsg':function(newVal){
             console.log(newVal)
             if(newVal!=""){
                 this.addmoreisshow=false
             }else{
                 this.addmoreisshow=true

             }
         }
        },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
       
    },
}
</script>
<style lang="scss" scoped>
    .chatbox{
        padding-top: 45px;
        padding-bottom: 64px;
        .header{
            width: 100%;
            height: 45px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 99;
            display: flex;
            // justify-content: space-between;
            i{
                line-height: 45px;
                color: #ffffff;
            }
            h4{
                margin: auto;
               font-size:18px;
                font-weight:600;
                color:rgba(255,255,255,1);
            }
        }
        .msglistbox{
            padding: 10px;
           
            .msgbox{
                .leftmsg{
                     margin-bottom: 30px;
                    display: flex;
                    .userheaderpic{
                        width: 53px;
                        height: 53px;
                        border-radius: 53px;
                    }
                    .msgboxcontent{
                        margin-left: 8px;
                        background-color: #ffffff;
                        padding: 6px;
                        min-width: 277px;
                        border-radius: 4px;
                        .textmsg{
                             letter-spacing:4px;
                        }
                        .msgpic{
                            width: 120px;
                            height: 120px;
                        }
                    }
                }

                .rightmsg{
                     margin-bottom: 30px;
                     display: flex;
                     position: relative;
                    .userheaderpic{
                        width: 53px;
                        height: 53px;
                        border-radius: 53px;
                        // float: right
                        position: absolute;
                        right: 0;
                    }
                    .msgboxcontent{
                        // text-align: left;
                         min-width: 277px;
                        margin-right: 63px;
                        background-color: orange;
                        padding: 6px;
                        text-align: right;
                        border-radius: 4px;
                        .textmsg{
                            letter-spacing:4px;
                        }
                        .msgpic{
                            width: 120px;
                            height: 120px;
                        }
                    }
                }
            }
        }
        .footer{
            width: 100%;
            height: 64px;
            background-color: #FFB7B7;
            position: fixed;
            bottom: 0;
            display: flex;
            z-index: 99;
            input{
                width:280px;
                height:28px;
                background:rgba(255,255,255,1);
                border-radius:15px;
                opacity:0.8279000000000001;
                margin-top: 16px;
                margin-left: 10px;
               
            }
             img{
                 width: 33px;
                 height: 33px;
                 margin-top: 16px;
                 margin-left: 10px;
              }
              i{
                  margin-top: 16px;
                  margin-left: 10px;
                 color: #ffffff;

              }
            .sendbtn{
                width:48px;
                height:28px;
                background:rgba(255,255,255,1);
                border-radius:5px;
                opacity:0.8279000000000001;
                margin-top: 16px;
                text-align: center;
                margin-left: 16px;
                font-size:14px;
                font-weight:500;
                color:rgba(95,95,95,1);
                line-height:28px;
            }
        }
    }
</style>