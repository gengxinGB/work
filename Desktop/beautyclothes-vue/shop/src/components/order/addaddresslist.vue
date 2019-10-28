<template>
  <div class="index">
    <div class="header"> <i class="mui-icon mui-icon-back" @click="bank"></i>  <span>选择收货地址</span> <img src="../../assets/newimg/addaddress.png" alt="" @click="inaddaddress"> </div>
    

    <div class="addresslist" v-for="(item,index) in addresslist" :key="index" >
         <div class="addressmsg">
          <div class="left" @click="seleaddress($event,item.customerAddrId)">
             <p> <span class="name">{{item.receiverName}}</span> <span class="tel"> {{item.receiverPhone}}</span> </p>
            <p class="addressinfo"> <i class="default">{{item.isDefault==1?"默认":""}}</i> {{item.province}}{{item.city}}{{item.area}}{{item.street}}{{item.address}}</p>
          </div>
           <div class="rightmsg">
                    <p class="btns editbtn" @click="editmsg(item.customerAddrId)">编辑</p>
                    <p class="btns delbtn" @click="deletemsg(item.customerAddrId)">删除 </p>
            </div>
         </div>
    </div>
    
  </div>
</template>

<script>
// 导入数据
import { MessageBox } from 'mint-ui';

export default {
  name: 'index',
  data() {
    return {
    // 新增地址的值
    // 是否默认
    value:true,
    // 地址列表数据
    addresslist:[],
    // 接受参数
    idmsglist:[]
    }
     
  },
  methods: {
      // 点击编辑按钮的操作
        editmsg:function(id){
            this.$router.push({path:'/addaddress',query:{customerAddrId:id}})
        },
          // 点击删除按钮的操作
        deletemsg:function(id){
            var data={
                customerAddrId:id
            }
            this.axios.post('cusPersonalCenter/deleteAddress',this.qs.stringify(data)).then(response=>{
                console.log(response)
                if(response.data.success==true){
                    Toast({
                      message: '删除成功',
                      duration: 500
                    });
                    // this.$router.go(0)
                    this.getaddressmsg()
                }
            })
        },
    // 点击返回上一层
    bank:function(){
        this.$router.go(-1)
    },
    // 选择收货地址
    seleaddress:function(e,id){
        this.axios.get('cusOrderCart/getAddress?addressId='+id).then(response=>{
            console.log(response)
            if(response.data.success==true){
                this.$router.go(-1)
            }
        })
        
    },
    // 获取收货地址信息
    getaddressmsg:function(){
        // var 
        this.axios.get('cusPersonalCenter/getAddressList').then(response=>{
                console.log(response)
                this.addresslist=response.data.data
        })
        // this.idmsglist=this.$store.state.usemsg.idmsglist
        
        console.log(this.idmsglist)
    },
    // 点击进入添加收货地址
    inaddaddress:function(){
        this.$router.push({path:'/addaddress'})
    }
  },
  created() {
      this.getaddressmsg()
  },
}
</script>
<style <style lang="scss" scpoed>
 .area-class {
  width: 100%;
  height: 50%;
}
.index{
    // background-color: #ffffff;
    // margin: 10px;
    .header{
        display: fixed;
        height: 45px;
        background-color: #FFB7B7;
        top: 0;
        z-index: 10;
        line-height:45px;
        display: flex;
        justify-content: space-between;
        i{
            line-height: 45px;
            color: #ffffff;
        }
        span{
            color: #ffffff;
        }
        img{
            height: 32px;
            width: 32px;
            margin-top: 6px;
            margin-right: 6px;
        }
    }
    .addresslist{
        // margin-top: 8px;
        display: flex;
       
        .addressmsg{
             width: 100%;
            //  margin-left: 6px;
             margin: 10px 10px 0 10px;
            padding: 10px;
             display: flex;
             justify-content: space-between;
            background-color: #ffffff;
            border-radius:10px;
           border:1px solid rgba(221,221,221,1);
            p{
                margin: 0;
                padding: 0;
                word-break: break-all;
                .name{
                    font-size: 16px;
                    color: black;
                }
                .tel{
                    margin-left: 6px;
                }
            }
            .addressinfo{
                color: black;
                .default{
                  color: orangered;
                  font-style:normal;
                }
            }
             .rightmsg{
                    // text-align: right;
                    margin-top: 10px;
                    .btns{
                        white-space: nowrap;
                        padding: 0px 9px;
                        font-size: 12px;
                        margin: 4px 0;
                    }
                    .editbtn{
                        border-radius:5px;
                        border:1px solid rgba(151,151,151,1);
                    }
                    .delbtn{    
                        border-radius:5px;
                        border:1px solid rgba(255,0,0,1);
                        color: #FF0000;
                    }
                }
        }
    }
}
</style>>

