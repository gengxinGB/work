<template>
    <div class="allarticlebox">
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h3>文章详情</h3>
        </div>
         <div class="contentmsg">
                <div class="contenttop">
                    <div class="left">
                        <img :src="articlemsg.headPic" alt="">
                        <span class="topmag">
                            <p class="storename">{{articlemsg.customerName}}</p>
                            <p class="time">{{articlemsg.distanceDays!=0?articlemsg.distanceDays+"天前":articlemsg.distanceHours!=0?articlemsg.distanceHours+"小时前":articlemsg.distanceMinutes+"分钟前"}}</p>
                        </span>
                    </div>
                    <div class="right">
                          <span class="guanzhu" v-if="articlemsg.concernStatus==1?true:false" @click="change(articlemsg.customerId,$event)">{{sta1}}</span>
                          <span class="yiguanzhu" v-if="articlemsg.concernStatus==0?true:false" @click="change(articlemsg.customerId,$event)">{{sta2}}</span>
                          <span class="huxiangguanzhu" v-if="articlemsg.concernStatus==2?true:false" @click="change(articlemsg.customerId,$event)">{{sta3}}</span>
                          <span class="benren" v-if="articlemsg.concernStatus==-1?true:false">{{sta4}}</span>
                    </div>
                </div>

            <div>
                    <div class="wordmsg">
                   <p> {{articlemsg.title}} </p>
                    <p class="msginfo">
                        <!-- 打破一成不变的精致，闪耀缤纷才是正确的打开方式。 -->
                        {{articlemsg.content}}
                        <!-- <span>
                            #YSL电光唇釉#
                        </span> -->
                        <!-- 为你的唇妆渡上魅惑电光。502号黯红电波，性感活力肆意切换，霓虹唇色犹如幻彩星河 -->
                    </p>
    
                </div>
                <div class="picbox" >
                    <img v-for="(otem,index) in articlemsg.articlePicList" :key="index" :src="otem.articlePicUrl" alt="" v-preview="otem.articlePicUrl">
                </div>
            </div>
                 <p class="liulan">{{articlemsg.browseVolume}}次浏览</p>
                <div class="commentbox">
                    <input type="text" placeholder="请输入评论" readonly @click="showsend(articlemsg.articleId)">
                     <div class="footright">
                        <img src="../../assets/newimg/点赞 (2).png" alt="" v-if="articlemsg.collectionStatus==1?true:false" @click="addzan(articlemsg.articleId)">
                        <img src="../../assets/newimg/未点赞.png" alt="" v-if="articlemsg.collectionStatus==0?true:false" @click="addzan(articlemsg.articleId)">
                        <img src="../../assets/newimg/评评论.png" alt="" @click="showsend(articlemsg.articleId)">
                        <img src="../../assets/newimg/分享.png" alt="">
                     </div>
                </div>
                <h4 class="pinunlist"> 
                    评论列表
                </h4>
                <span v-if="!listshow" class="nonelist">
                    暂无评论
                </span>
                <ul class="pinlunbox" v-if="listshow">
                        <li v-for="(msglist,index) in articlemsg.commentMapList" :key="index">
                            <p class="title"><img :src="msglist.headPic" alt=""> <span>{{msglist.customerName}}</span> </p>
                             <p class="content">{{msglist.content}}</p>
                             <div class="imgbox">
                                 <p v-for="(imgmsg,index) in msglist.commentPicList" :key="index">
                                      <img :src="imgmsg.articleCommentPicUrl" alt="">
                                 </p>
                                 
                             </div>
                             
                             <p class="footers"><span>{{
                                 msglist.createTime
                                 }}</span>
                                <span class="right">
                                    <img src="../../assets/newimg/未点赞.png" alt="">
                                     <img src="../../assets/newimg/评评论.png" alt="">
                                </span>
                             </p>
                        </li>
                </ul>
        </div>
         
    <!-- 评论弹出框 -->
     <mt-popup
         v-model="popupVisible"
         position="bottom">
         <div class="dibu">
             <input type="text" v-model="sendmsg">
             <span class="sendbtn" @click="sendbtn()">发送</span>
         </div>
      </mt-popup>

    </div>

    
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            articlemsg:{},
             sta1:"已关注",
            sta2:"未关注",
            sta3:"互相关注",
            sta4:"本人",
            listshow:true,
            // 评论内容
            commentmsg:"",
            articleId:"",
             popupVisible:false,
              articleId:"",
            sendmsg:""
        }
    },
    created() {
        this.getmsg()
    },
    methods: {
        getmsg:function(){
            // var customerId=this.$route.query.customerId
            var articleId=this.$route.query.articleId
             this.axios.get("discovery/getArticleInfo?articleId="+articleId).then(response=>{
                   console.log(response)
                   if(response.data.data.commentMapList==null){
                       this.listshow=false;
                   }
                   this.articlemsg=response.data.data

               })     
        },
        bank:function(){
            this.$router.go(-1)
        },

        // 发表评论按钮
            sendbtn:function(){
                       var data={
                articleId:this.articleId,
                content:this.sendmsg
                 }
              console.log(data)
              this.axios.post("discovery/commentArticle",this.qs.stringify(data)).then(response=>{
                  console.log(response)
                  if(response.data.success==true){
                      this.sendmsg=""
                      this.popupVisible=false
                      Toast({
                          message: "评论成功",
                          duration: 500
                        });
                        this.getmsg()
                  }
              })
            },

          change:function(id,e){
            var data={
                concernCustomerId:id
            }
            this.axios.post("cusPersonalCenter/concernAndRemoveConcern",this.qs.stringify(data)).then(response=>{
                    console.log(response)
                    // this.getmsg()
                    if(response.data.data.concernStatus==0){
                        e.target.innerText="未关注"
                    }else if(response.data.data.concernStatus==1){
                       e.target.innerText="已关注"
                    }else if(response.data.data.concernStatus==2){
                       e.target.innerText="互相关注"
                    }
            })
            
        },
        showsend:function(id){
            this.articleId=id
            this.popupVisible=true
        },


            // 点击取消和点赞
        addzan:function(id){
            var data={
                articleId:id
            }
             this.axios.post("discovery/addAndCancelCollections",this.qs.stringify(data)).then(response=>{
                 console.log(response)
                 if(response.data.success==true){
                     this.getmsg()
                 }
             })
        },

        // // 点击文章评论按钮事件
        // sendcomment:function(){
        //     if(this.commentmsg==""){
        //         Toast({
        //           message: "评论内容不能为空",
        //           duration: 500
        //         });
        //     }
        // }

    },
}
</script>
<style lang="scss" scoped>
    .allarticlebox{
        padding-top: 45px;

           // 遮盖层的样式
        .mint-popup-bottom{
             width: 100%;
         }
            .dibu{
                width: 100%;
                padding: 3px;
                input{
                    width: 75%;
                    background-color: #cccccc;
                }
                .sendbtn{
                     background-color: orangered;
                    color: #ffffff;
                    padding: 5px 18px;
                    border:1px solid #cccccc;
                    border-radius: 5px;
                }
            }

        .header{
            width: 100%;
            height: 45px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 10;
            display: flex;
            i{
                line-height: 45px;
                color: white;
            }
            h3{
                margin: auto;
               font-size:18px;
                font-family:PingFangSC;
                font-weight:600;
                color:rgba(255,255,255,1);
            }
        }
         .contentmsg{
            background:rgba(255,255,255,1);
            margin: 10px 12px;
            box-shadow:0px 2px 5px 0px rgba(0,0,0,0.1);
            border-radius:5px;
           
            .contenttop{
                 padding: 10px 12px;
                display: flex;
                 justify-content:space-between;
                
                .left{
                    display: flex;
                    img{
                        width:42px;
                        height:42px;
                        background:rgba(5,5,5,1);
                        border-radius: 42px;
                    }
                    .topmag{
                        margin-left: 9px;
                        p{
                            margin: 0;
                            padding: 0;
                        }
                        .storename{
                             font-size:18px;
                             font-family:PingFangSC;
                             font-weight:600;
                             color:rgba(34,34,34,1);
                        }
                        .time{
                            font-size:12px;
                            font-family:PingFang-SC;
                            font-weight:500;
                            color:rgba(34,34,34,1);
                        }
                    }
                }
                .right{
                    margin-top: 10px;
                    margin-right: 15px;
                    span{
                        padding: 4px 16px;
                        background:rgba(255,192,35,1);
                        border-radius:13px;
                        text-align: center;
                        font-size:12px;
                        font-family:PingFangSC;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                    }
                }
            }
            .wordmsg{
                margin-top: 14px;
                padding: 0 18px 10px 23px;
                line-height:20px;
               overflow: hidden;
                p{
                    margin: 0;
                    font-size:14px;
                    font-family:PingFangSC;
                    font-weight:600;
                     color:rgba(94,94,94,1);
                }
                .msginfo{
                    
                     display: -webkit-box;
                    -webkit-box-orient: vertical;
                }
                .footmsg{
                    float: right;
                    font-size:12px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(8,167,223,1);
                }
            }
            .picbox{
                padding-left: 23px;
                padding-right: 140px;
                img{
                    width: 89px;
                    height: 89px;
                }
            }
            .liulan{
                 padding-left: 23px;
            }
            .commentbox{
                padding:0 15px 0 23px;
                padding-bottom: 33px;
                display: flex;
                justify-content: space-between;
                input{
                width:220px;
                height:24px;
                background:rgba(255,255,255,1);
                border-radius:15px;
                border:1px solid rgba(193,192,192,1);
                font-size:14px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(178,178,178,1);
                }
                .footright{
                    img{
                        width: 20px;
                        height: 17px;
                    }
                }

            }
            .pinunlist{
                border-top: 1px solid #cccccc;
                padding: 6px 20px;
            }
            .nonelist{
                padding: 6px 20px ;
            }
            .pinlunbox{
                padding: 0 20px 10px 20px;
                
                li{
                    padding-top: 5px;
                     border-bottom: 1px solid #cccccc;
                 .title{
                        img{
                            width: 42px;
                            height: 42px;
                            border-radius: 42px;
                            vertical-align: middle;
                        }
                        span{
                            margin-left: 10px;
                            font-size: 14px;
                            font-weight: 600;
                        }
                    }
                    .content{
                        font-size: 14px;
                        color: black;
                    }
                    .imgbox{
                        display: flex;
                        flex-wrap: wrap;
                        padding-left: 23px;
                        padding-right: 100px;
                        P{
                            width: 50%;
                           
                            img{
                                margin-right: 5px;
                                width: 89px;
                                height: 89px;
                                border-radius: 5px;
                            }
                        }
                    }
                    .footers{
                        display: flex;
                        justify-content: space-between;
                        img{
                             width: 20px;
                            height: 17px;
                        }
                    }
                }
            }
        }
    }
</style>