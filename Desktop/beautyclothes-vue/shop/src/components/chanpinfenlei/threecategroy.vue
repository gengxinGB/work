<template>
    <div class="erfenleibox">
      
        <div>
            <ul>
            <li v-for="(item,index) in msglist" :key="index" @click="ingoodsmsg(item.threeCategoryId)"  >
                <img :src="item.threeCategoryPicUrl" alt="">
               <p > {{item.threeCategoryName}}  </p>
            </li>
        </ul>   
        </div>    
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            msglist:[],
            twoCategoryId:""
          
        }
    },
    created() {
        this.threecategroymsg()
    },
    watch: {
       "$route"(to,from){
           if(this.$route.query.twoCategoryId){
                this.threecategroymsg()
           }
       },
    
           
       
    },
    methods: {
        ingoodsmsg:function(id){
            this.$router.push({path:"/categroygoodsmsg",query:{ThreeCategoryId:id}})
        },
        // 点击显示信息
        // mshshow:function(i){
        //     this.activeindex=this.activeindex==i?-1:i
        // }
        // 页面请求详细信息接口
        threecategroymsg:function(){
            this.twoCategoryId=this.$route.query.twoCategoryId
            console.log(this.twoCategoryId)
             this.axios.get("cusProductCategory/getThreeCategorys?twoCategoryId="+this.twoCategoryId).then(respone=>{
            console.log(respone)
            console.log(respone.data.data)
            if(respone.data.data.length==0){
                Toast("没有该商品")
            }else{
              this.msglist=respone.data.data
            }
        })
        }
    },
}
</script>
<style lang="scss" scoped>
ul{
    list-style: none;
}


.erfenleibox{
    .secondtitle{
        margin-left: 5px;
        margin-top: 5px;
        background-color: #cccccc;
        padding: 6px 0;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        margin-left: 5px;
        // margin-top: 20px;
        li{
            text-align: center;
            font-size: 14px;
            width: 33.33%;
            img{
                width:50px;
                height: 50px;
            }
        }
    }

}

</style>
