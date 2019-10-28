<template>
    <div class="addbankcardbox">
      <div class="headerbox"> <i class="mui-icon mui-icon-back" @click="bank"></i> <h4 class="title">添加银行卡</h4> </div>
       <div class="contentmsg">

             <div class="msgbox">
                <span>卡类型</span>
            <input type="text" class="textbox" v-model.trim="cardnummsg" readonly>
            </div>

            <div class="msgbox">
                 <span>持卡人</span>
            <input type="text" class="textbox" v-model.trim="username">
            </div>
            <div class="msgbox">
                 <span>身份号</span>
            <input type="text" class="textbox" v-model.trim="idcard">
            </div>
             <div class="msgbox">
                 <span>手机号</span>
            <input type="text" class="textbox" v-model.trim="telephone">
            </div>
           <div class="foots" @click="nextinto">
                <span class="nexttext">下一步</span>
           </div>
       </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
var BIN = require('bankcardinfo');
export default {
    data() {
        return {
            // 卡类型
            cardnummsg:"",
            // 身份证号码
            idcard:"",
            // 持卡人信息
            username:"",
            // 手机号码
            telephone:"",
            // 银行名
            bankname:"",
            // 卡种类
            cardtype:"",
            // 卡账号
            banknum:""
        }
    },
    created() {
        // this.nextinto()
        // 卡号
        this.banknum=this.$route.query.cardnummsg
        // 银行名
        this.bankname=this.$route.query.bankName
        // 卡种类
        this.cardtype=this.$route.query.cardTypeName
        // 卡类型
        this.cardnummsg=this.bankname+"-"+this.cardtype
        
    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
        // 获取银行卡信息
    nextinto:function(){
            // 判断输入的信息
    var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            if(this.username==""){
                Toast({
                  message: '请输入持卡人姓名',
                  duration: 500
                })
            }else if(this.idcard=="") {
                 Toast({
                  message: '请输入身份证号',
                  duration: 500
                })
            }else if(!idcardReg.test(this.idcard)){
                  Toast({
                  message: '请输入正确的身份证号',
                  duration: 500
                })

            } else if(this.telephone==""){
                 Toast({
                  message: '请输入手机号',
                  duration: 500
                })
            }else if(!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.telephone)){
                Toast({
                  message: '请输入正确的手机号',
                  duration: 500
                })
            }else{
                var data={
                    bankName:this.bankname,
                    bankCardNo:this.banknum,
                    bankCardType:this.cardtype,
                    cardHolderName:this.username,
                    cardHolderTel:this.telephone,
                    identityCardNo:this.idcard

                }
             this.axios.post('cusPersonalCenter/addBankCard',this.qs.stringify(data)).then(response=>{
                 console.log(response)
                 if(response.data.success==true){
                     Toast({
                      message: '添加银行卡成功',
                      duration: 500,
                    });
                    this.$router.push({path:'/mywallet'})
                 }else if(response.data.success==false){
                      Toast({
                      message: response.data.errorMsg,
                      duration: 500,
                    });
                 }
             })
            }
            
    
           
        }
    },
}
</script>
<style lang="scss" scoped>
    .addbankcardbox{
        padding-top: 45px;
           .headerbox{
            height: 45px;
            width: 100%;
            position: fixed;
            background-color:#FFB7B7;
            display: flex;
            color: white;
            top: 0;
            i{
                line-height: 45px;
            }
            .title{
                // text-align: center;
                font-family:PingFangSC;
                font-weight:600;
                color:rgba(255,255,255,1);
                margin: auto;
                font-weight: normal;
            }
        }
        .contentmsg{
            background-color: #FFFFFF;
            border-radius: 10px;
            margin: 10px 10px 0px 10px;
            padding: 20px 30px 20px 32px;
            .msgbox{
                display: flex;
                justify-content: space-between;
                // margin-bottom:  14px;
                span{
                    // line-height: 40px;
                     margin-top: 20px;
                     font-size:14px;
                    font-family:PingFang-SC;
                    font-weight:500;
                    color:rgba(107,107,107,1);
                }
            }
            .textbox{
                width: 220px;
                margin: 0;
                border: none;
                border-bottom: 2px solid #D7D7D7;
                // margin-top: 5px;
            }
            .foots{
                text-align: center;
                margin-top: 22px;
            }
            .nexttext{
                font-size:14px;
                font-family:PingFang-SC;
                font-weight:500;
                color:rgba(255,255,255,1);
                background-color: #FFB7B7;
                padding: 5px 32px;
                border-radius:5px;

            }
        }
    }
</style>