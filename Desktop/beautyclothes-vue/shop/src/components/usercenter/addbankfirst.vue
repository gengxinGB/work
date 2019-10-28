<template>
    <div class="cardnumbox">
       <div class="headerbox"> <i class="mui-icon mui-icon-back" @click="bank"></i> <h4 class="title">添加银行卡</h4> </div>
         <div class="contentmsg">
            <div class="msgbox">
                <span>卡号</span>
            <input type="text" class="textbox" v-model.trim="cardnummsg">
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
            cardnummsg:""
        }
    },
    created() {
        
    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
        nextinto:function(){
             BIN.getBankBin(this.cardnummsg,(err,data)=>{
	            if(!err){
                    // 获得银行卡的信息
                    console.log(data)
                    
                    // 银行名
                    var bankName=data.bankName
                    
                    // 银行卡种类
                    var cardTypeName=data.cardTypeName
                         this.$router.push({path:'/addbankcard',query:{cardnummsg:this.cardnummsg,bankName:bankName,cardTypeName:cardTypeName}})
	            }else{
                     Toast({
                     message: err.split(',')[0].split(':')[1],
                     duration: 500
                })
                }
            })


           
        }
    },
}
</script>
<style lang="scss" scoped>
    .cardnumbox{
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