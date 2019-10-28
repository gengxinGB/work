<template>
    <div class="addressbox">
       <div class="header">
           <i class="mui-icon mui-icon-back" @click="bank"></i>
           <h3>我的收货地址</h3>
           <img src="../../assets/newimg/addaddress.png" alt="" @click="inaddaddress">
       </div>

        <div class="contentmsg">
            <div class="msgbox" v-for="(item,index) in addresslist" :key="index">
                <img src="../../assets/img/fenleixqnv.jpg" alt="" class="headerpic">
                <div class="middlemsg">
                    <p> <span class="username">{{item.receiverName}}</span> <span class="telephone">{{item.receiverPhone}}</span>  <span class="default" v-if="item.isDefault==1?true:false">默认</span> </p>
                    <p class="addressmsg">{{item.province}}{{item.city}} {{item.area}}{{item.street}}{{item.address}}</p>
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
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            addresslist:[]
        }
    },
    created() {
        this.getaddressmsg()
    },
    methods: {
        bank:function(){
            this.$router.push({path:'/usercenter'})
        },
        inaddaddress:function(){
            this.$router.push({path:'/addaddress'})
        },
        getaddressmsg:function(){
            this.axios.get('cusPersonalCenter/getAddressList').then(response=>{
                console.log(response)
                this.addresslist=response.data.data
                 this.addresslist.sort(this.sortBy('isDefault',false))

            })            
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
        // 点击编辑按钮的操作
        editmsg:function(id){
            this.$router.push({path:'/addaddress',query:{customerAddrId:id}})
        },


        //封装的排序方法 
      sortBy: function(attr,rev){
        //第二个参数没有传递 默认升序排列
        if(rev ==  undefined){
            rev = 1;
        }else{
            rev = (rev) ? 1 : -1;
        }
        
        return function(a,b){
            a = a[attr];
            b = b[attr];
            if(a < b){
                return rev * -1;
            }
            if(a > b){
                return rev * 1;
            }
            return 0;
        }
    },
    },
}
</script>
<style lang="scss">
    .addressbox{
          p{
             margin: 0;
         }
        padding-top: 50px;
        .header{
            width: 100%;
            height: 45px;
            position: fixed;
            background-color: #FFB7B7;
            top: 0;
            display: flex;
            justify-content: space-between;
            i{
                line-height: 45px;
                color: #ffffff;
            }
            h3{
                font-size: 18px;
                color: #ffffff;
                line-height: 45px;
                font-weight: 600;
            }
            img{
                width: 32px;
                height: 32px;
                margin-top: 6px;
                margin-right: 10px;
            }
        }
        .contentmsg{
            .msgbox{
                background-color: #ffffff;
                margin:5px 10px 5px 10px;
                padding: 10px 5px 10px 10px;
                border-radius:10px;
                border:1px solid rgba(221,221,221,1);
                display: flex;
                justify-content: space-between;
                .headerpic{
                    width: 44px;
                    height: 44px;
                    border-radius: 44px;
                }
                .middlemsg{
                    margin: 0 10px;
                    // text-align: left;
                    width: 100%;
                    .username{
                        font-size: 18px;
                        font-weight:600;
                        color:rgba(80,80,80,1)
                    }
                    .telephone{
                        margin-left: 8px;
                        font-size:14px;
                        font-family:PingFang-SC;
                        font-weight:500;
                        color:rgba(80,80,80,1);
                    }
                    .default{
                        padding: 2px 10px;
                        background-color: #FFC023;
                        border-radius: 13px;
                        color: #ffffff;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                    .addressmsg{
                        color: #505050;
                        font-size:14px;
                        font-family:PingFang-SC;
                        font-weight:500;
                    }
                }
                .rightmsg{
                    // text-align: right;
                    margin-top: 15px;
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
</style>