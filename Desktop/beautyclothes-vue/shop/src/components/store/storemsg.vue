<template>
    <div class="storemsgbox">
       <div class="headerbox"> <i class="mui-icon mui-icon-back" @click="bank"></i> <h4 class="title">店铺印象</h4> </div>
       <div class="storebox">
          <div class="storetop">
              <img :src="storemsg.supplierLogoUrl" alt="">
              <span class="storename">{{storemsg.supplierName}}</span>
          </div>
          <div class="storebottom">
              <span class="fans">粉丝数:{{storemsg.fans}}</span>
              <span class="sure">关注</span>
          </div>
       </div>
       <div class="jichumsg">
           <h4>基础信息</h4>
            <p class="message">
                <span class="left">掌柜名</span> <span class="right">{{storemsg.linkMan}}</span>
            </p>
             <p class="message">
                <span class="left">店铺等级</span> <span class="right">{{storemsg.supplierLevel}}</span>
            </p>
             <p class="message">
                <span class="left">所在地</span> <span class="right">{{storemsg.address}}</span>
            </p>
             <p class="message">
                <span class="left">联系方式</span> <span class="right">{{storemsg.phoneNumber}}</span>
            </p>
       </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            storemsg:{}
        }
    },
    created() {
        this.getstoremsg()
    },
    methods: {
            // 点击返回上一层
            bank:function(){
                this.$router.go(-1)
            },

        // 获取店铺详细信息
        getstoremsg:function(){
             var supplierId=this.$route.query.supplierId
             console.log(supplierId)
             this.axios.get('cusSupplierInfo/displaySupplier?supplierId='+supplierId).then(respone=>{
                console.log(respone)
                this.storemsg=respone.data.data
                console.log(this.storemsg)
             })
        }
    },
}
</script>
<style lang="scss" scoped>
  *{
      padding: 0;
      margin: 0;
  }
    .storemsgbox{
        .headerbox{
            height: 35px;
            width: 100%;
            position: fixed;
            background-color: skyblue;
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
        .storebox{
            padding: 0 5px;
            padding-top: 40px;
            background-color: white;
            .storetop{
                img{
                    width: 30px;
                    height: 30px;
                    border-radius: 30px;
                    vertical-align: middle
                }
                .storename{
                   margin-left: 8px;
                }
            }
            .storebottom{
                margin-top: 6px;
                padding-bottom: 5px;
                .sure{
                    float: right;
                    margin-right: 6px;
                }
            }
        }
        .jichumsg{
            background-color: white;
            margin-top: 6px;
            h4{
                padding: 6px;
                font-weight: normal;
                border-bottom: 1px solid #cccccc;
            }
            .message{
                overflow: hidden;
                padding: 6px;
                font-size: 16px;
                border-bottom: 1px solid #cccccc;
                .left{
                    float: left;
                }
                .right{
                    float: right;
                }
            }
        }
     
    }
</style>