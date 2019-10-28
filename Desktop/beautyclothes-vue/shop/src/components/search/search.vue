<template>
    <div class="searchbox">
        <div class="header">
            <i class="mui-icon mui-icon-arrowleft bank" @click="bank"></i>
            <input type="text" v-model="keywords" placeholder="请输入你要查找的名称">
            <i class="mui-icon mui-icon-search searchicon"></i>
            <span @click="searchmsg">搜索</span>
        </div>
        <div class="histroymsgbox"  v-show="histroyishow">
            <div class="top">
                <h4>历史搜索 </h4>
                <i class="mui-icon mui-icon-trash" @click="alldelete"></i>
            </div>
            <ul class="histroylist">
                <li class="oneslist" v-for="(item,index) in historymsg" :key="index">
                    <span @click="insearch(item.keywords)" @touchstart="gotouchstart(item.id)" @touchend="emptyTime">{{item.keywords}}</span>
                </li>
            </ul>
            <div class="searchfind">
            <h4>搜索发现</h4>
            <ul class="searchfindbox" >
                 <li class="searchfindlist" v-for="(item,index) in searchfindmsg" :key="index">
                     <span @click="insearch(item)">{{item}}</span>
                 </li>
               
            </ul>
        </div>

        </div>
      
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    
    data() {
        return {
            keywords:"",
            val1:0,
            val2:1,
            val:0,
            historymsg:[],
            histroyishow:true,
            searchfindmsg:[],
            // 长按事件的定时器
             Loop:null
        }
    },
    created() {
        this.gethistroymsg()
        this.getsearchfindmsg()
       
    },
    methods: {
         // 点击返回上一层
      bank:function(){
          this.$router.push('/home')
      },

        // 获取select的值
        getval:function(){
            // console.log(11111)
            var value=document.querySelector("#searchgoodsbox").value
            this.val=value
            console.log(value)
        },
        searchmsg:function(){
            var data={
                value:this.val,
                keyWords:this.keywords
            }
            if(this.keywords==""){
                Toast('请输入要搜索的商品');
                return
            }
             this.$router.push({path:'/search/searchgoodslist',query:{keyWords:this.keywords,value:this.val}})
        
        },

        // 获取搜索历史记录
        gethistroymsg:function(){
              this.axios.get('cusProduct/searchHistory').then(response=>{
                  console.log(response)
                  if(response.data.success==true){
                      this.historymsg=response.data.data
                  }
                   console.log(this.historymsg)
        if(this.historymsg.length==0){
            this.histroyishow=false
        }else{
            this.histroyishow=true
        }
              })
        },
        // 点击记录跳转
        insearch:function(keywords){
              this.$router.push({path:'/search/searchgoodslist',query:{keyWords:keywords,value:this.val}})
        },
        // 长按操作
        gotouchstart:function(id){
            clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
            this.Loop = setTimeout(function() {
           MessageBox.confirm('是否删除本条记录').then(action => {
               var data={
                   id:id
               }
                this.axios.post('cusProduct/deleteSearchOne',this.qs.stringify(data)).then(response=>{
                    console.log(response)
                    if(response.data.success==true){
                        this.gethistroymsg()
                    }
                })
             
          }).catch(() => {});
         }.bind(this), 1000);

        },
        emptyTime:function () {
         clearTimeout(this.Loop); //清空定时器，防止重复注册定时器
        },

        // 删除全部历史记录
        alldelete:function(){
           this.axios.post('cusProduct/deleteSearchAll').then(response=>{
               console.log(response)
               if(response.data.success==true){
                   this.gethistroymsg()
               }
           })
        },
        // 获取搜索发现的信息
        getsearchfindmsg:function(){
             this.axios.post('cusProduct/searchDiscovery').then(response=>{
                 console.log(response)
                 if(response.data.success==true){
                     this.searchfindmsg=response.data.data
                 }
             })
        }

    },
}
</script>
<style lang="scss" scoped>
* {
-webkit-touch-callout:none;
-webkit-user-select:none;
-khtml-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none;
}

   .searchbox{
       padding-top: 45px;
   }
    
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
   .histroymsgbox{
       padding: 20px 20px;
       background-color: #ffffff;
       .top{
           display: flex;
           justify-content: space-between;
           i{
               color: #FFB7B7;
           }
       }
       .histroylist{
           margin-top: 10px;
           display: flex;
           flex-wrap: wrap;
           .oneslist{
               margin-bottom: 16px;
               width: 33%;
               text-align: center;
               span{
                   white-space: nowrap; 
                   display: inline-block;
                    width:88px;
                    height:26px;
                    background:rgba(232,232,232,1);
                    border-radius:16px;
                   overflow: hidden;
                   text-overflow:ellipsis;
                   line-height: 26px;
                   font-size:14px;
                    font-weight:500;
                    color:rgba(101,101,101,1);
                    padding: 0px 6px;
               }
           }
       }
   }
   .searchfind{
       padding-top: 4px;
       .searchfindbox{
           display: flex;
           flex-wrap: wrap;
           .searchfindlist{
               margin: 5px 0;
               width: 50%;
               span{
                   font-size:14px;
                    font-weight:500;
                    color:rgba(101,101,101,1);
               }
           }
       }

   }

</style>
