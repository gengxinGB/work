<template>
    <div class="buyressgowbox">

        <div class="smnsgbox" v-if='isshowmsg'>
            <p class="busymsginfo">暂无买家秀信息！！！</p>
        </div>
        <ul class="msgbox" v-if='!isshowmsg'>
            <!-- <li class="msglist">
                <img src="../../assets/img/fenleixqnv.jpg" alt="">
                <p class="footermsg">
                    很好，非常喜欢
                </p>
            </li>    
              <li class="msglist">
                <img src="../../assets/img/fenleixqnv.jpg" alt="">
                <p class="footermsg">
                    很好，非常喜欢
                </p>
            </li>   -->

              <li class="msglist" v-for="(item,index) in busymsg" :key="index">
                <img :src="item.commentPicUrl" alt="">
                <div class="footermsg">
                    <p class="msg">
                       {{item.content}}
                    </p>
                    <span class="footerright">
                        <img @click="isgreat(item.commentId,index)" src="../../assets/newimg/点赞 (2).png" alt="" v-if='item.hasGreat==1?true:false'>
                        <img @click="isgreat(item.commentId,index)" src="../../assets/newimg/未点赞.png" alt="" v-if='item.hasGreat==0?true:false'>
                        <span class="grentnum">{{item.greatNum}}</span>
                    </span>
                </div>
            </li>  

              <!-- <li class="msglist">
                <img src="../../assets/img/fenleixqnv.jpg" alt="">
                <div class="footermsg">
                    <p class="msg">
                       很好，非常喜欢户撒或多哈所多军哈所绿多哈所所所所所所所所所所所所所所所所所所所
                    </p>
                    <span class="footerright">
                        <img src="../../assets/newimg/点赞 (2).png" alt="">
                        <span>990</span>
                    </span>
                </div>
            </li>  -->
        </ul> 
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            // 展示数据的参数
            isshowmsg:false,
            busymsg:[]
        }
    },
    created() {
        this.getmsg()
    },
    methods: {
    // 获取买家秀的数据
        getmsg:function(){
            var supplierId=this.$route.query.supplierId
            this.axios.get('cusSupplierInfo/getBuyingShows?supplierId='+supplierId).then(response=>{
                console.log(response)
                if(response.data.success==true){
                    if(response.data.data.length>0){
                            this.isshowmsg=false
                            this.busymsg=response.data.data
                            console.log(this.busymsg)
                    }else{
                        this.isshowmsg=true
                    }
                }
            })

        },
        // 点击是否点赞
        isgreat:function(id,i){
            var data={
                productCommentId:id
            }
       this.axios.post('cusGreat/clickGreat',this.qs.stringify(data)).then(response=>{
           console.log(response)
           if(response.data.success==false){
                 Toast({
                  message: '用户未登录',
                //   position: 'bottom',
                  duration: 500
                });
                 localStorage.removeItem("userName")
                this.$router.push({path:'/login'})
           }else if(response.data.success==true){
                 if(response.data.data.greatStatus==1){
                    //  item.hasGreat=1
                    // for(var i=0)
                    this.busymsg[i].hasGreat=1
                    this.busymsg[i].greatNum=response.data.data.greatNum
                 }else{
                    //  item.hasGreat=0
                    this.busymsg[i].hasGreat=0
                    this.busymsg[i].greatNum=response.data.data.greatNum
                 }
           }
       })

        }
    },
}
</script>
<style lang="scss" scoped>
    .buyressgowbox{
        .smnsgbox{
            background-color: #ffffff;
            padding: 8px;
            .busymsginfo{
                margin: 0;
                font-size: 18px;
                color: #666666;
                font-weight: 600;
            }
        }
        .msgbox{
            margin: 8px;
            display: flex;
            flex-wrap: wrap;
            // background-color: #ffffff;
            text-align: center;
            .msglist{
                background-color: #ffffff;
                width: 47%;
                margin: 4px;
                border-radius: 5px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 120px;
                }
                .footermsg{
                    margin: 0;
                    padding: 4px;
                    text-align: left;
                    .msg{
                        overflow: hidden ;
                        display: -webkit-box ;
                        -webkit-line-clamp: 2 ;
                        -webkit-box-orient: vertical ;
                        word-break: break-all ;
                        height: 42px;
                    font-size:12px;
                    font-weight:500;
                    color:rgba(102,102,102,1);
                    }
                  
                    .footerright{
                        float: right;
                        img{
                            width: 16px;
                            height: 16px;
                        }
                        .grentnum{
                            font-size: 14px;
                            color: #666666;
                        }
                    }
                }
                
            }
        }
    }
</style>