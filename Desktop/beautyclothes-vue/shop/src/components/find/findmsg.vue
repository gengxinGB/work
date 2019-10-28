<template>
    <div>
       <div class="contentmsg" v-for="(item,index) in msglist" :key="index">
                <div class="contenttop">
                    <div class="left">
                        <img :src="item.headPic" alt="">
                        <span class="topmag">
                            <p class="storename">{{item.customerName}}</p>
                            <p class="time">{{item.distanceDays!=0?item.distanceDays+"天前":item.distanceHours!=0?item.distanceHours+"小时前":item.distanceMinutes+"分钟前"}}</p>
                        </span>
                    </div>
                    <div class="right">
                          <span class="guanzhu" v-if="item.concernStatus==1?true:false" @click="change(item.customerId,$event)">{{sta1}}</span>
                          <span class="yiguanzhu" v-if="item.concernStatus==0?true:false" @click="change(item.customerId,$event)">{{sta2}}</span>
                          <span class="huxiangguanzhu" v-if="item.concernStatus==2?true:false" @click="change(item.customerId,$event)">{{sta3}}</span>
                          <span class="benren" v-if="item.concernStatus==-1?true:false">{{sta4}}</span>
                    </div>
                </div>

            <div @click="allarticle(item.articleId)">
                    <div class="wordmsg">
                   <p> {{item.title}} </p>
                    <p class="msginfo">
                        <!-- 打破一成不变的精致，闪耀缤纷才是正确的打开方式。 -->
                        {{item.content}}
                        <!-- <span>
                            #YSL电光唇釉#
                        </span> -->
                        <!-- 为你的唇妆渡上魅惑电光。502号黯红电波，性感活力肆意切换，霓虹唇色犹如幻彩星河 -->
                    </p>
                    <p class="footmsg">
                       查看全文
                    </p>
                    
                </div>
                <div class="picbox" >
                    <img v-for="(otem,index) in item.articlePicList" :key="index" v-lazy="otem.articlePicUrl" alt="" v-preview="otem.articlePicUrl">
                </div>
            </div>

                 <p class="liulan">{{item.browseVolume}}次浏览</p>
                <div class="commentbox">
                    <div class="sendbox">
                        <input type="text" placeholder="请输入评论"  @click="showsend(item.articleId,index)" readonly>
                       
                    </div>

                     <div class="footright">
                        <img src="../../assets/newimg/点赞 (2).png" alt="" v-if="item.collectionStatus==1?true:false" @click="addzan(item.articleId)">
                        <img src="../../assets/newimg/未点赞.png" alt="" v-if="item.collectionStatus==0?true:false" @click="addzan(item.articleId)">
                        <img src="../../assets/newimg/评评论.png" alt="" @click="showsend(item.articleId,index)">
                        <img src="../../assets/newimg/分享.png" alt="">
                     </div>
                </div>
                <!-- 评论弹出框 -->
                <mt-popup
                    v-model="popupVisible"
                    position="bottom">
                    <div class="dibu">
                        <input type="text" v-model="sendmsg[indexac]">
                        <span class="sendbtn" @click="sendbtn()">发送</span>
                    </div>
                 </mt-popup>
        </div>
    </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
    data() {
        return {
            msglist:[],
            sta1:"已关注",
            sta2:"未关注",
            sta3:"互相关注",
            sta4:"本人",
            sendmsg:[],
            popupVisible:false,
            articleId:"",
            indexac:""
        }
    },
    watch: {
       $route(){
           Indicator.open("加载中...");
           this.getmsg()
        }
    },
    created() {
        Indicator.open("加载中...");
        this.getmsg()
    },
    methods: {
        getmsg:function(){
            var discoveryType=this.$route.query.discoveryType
            this.axios.get("discovery/hotArticlesAndConcernArticles?discoveryType="+discoveryType).then(response=>{
                console.log(response)
                if(response.status==200&&response.data.success==true){
                    this.msglist=response.data.data
                    Indicator.close();
                }else if(response.data.success==false){
                    MessageBox("提示", "请先登录");
                    this.$router.push({path:"/login"})
                }
                
            })
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
        // 点击查看全部信息
        allarticle:function(articleId){
                this.$router.push({path:"/find/allarticle",query:{articleId:articleId}})
    
        },
        // input框获取焦点后 显示发送按钮
        showsend:function(id,i){
            this.popupVisible=true
            this.articleId=id
            this.indexac=i
        },
        sendbtn:function(){
            var data={
                articleId:this.articleId,
                content:this.sendmsg[this.indexac]
            }
            console.log(data)
              this.axios.post("discovery/commentArticle",this.qs.stringify(data)).then(response=>{
                  console.log(response)
                  if(response.data.success==true){
                      this.sendmsg[this.indexac]=""
                      this.popupVisible=false
                      Toast({
                          message: "评论成功",
                          duration: 500
                        });
                  }
              })
        }
    },
}
</script>
<style lang="scss" scoped>
img[lazy=loading] {
  height: 100px;
  width: 100%;
  background-color:#cccccc;
}
      .contentmsg{
            background:rgba(255,255,255,1);
            margin: 10px 12px;
            box-shadow:0px 2px 5px 0px rgba(0,0,0,0.1);
            border-radius:5px;
           
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
                    -webkit-line-clamp: 3;
                    overflow: hidden;
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
                // padding-left: 23px;
                // padding-right: 140px;
                margin: 0 25px;
                img{
                    width: 33%;
                    height: 89px;
                    // margin: 4px;
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
                .sendbox{
                    position: relative;
                }
               
                .footright{
                    img{
                        width: 20px;
                        height: 17px;
                    }
                }

            }
        }
</style>