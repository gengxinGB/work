<template>
    <div class="editusernamebox">
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h3>修改昵称</h3>
            <span @click="save">保存</span>
        </div>
        <div class="msgbox">
            <h4>用户名</h4>
            <input type="text" placeholder="请输入新的用户名" v-model.trim="username">
            <p>
                以英文字母或汉字开头，限4-16个字符，一个汉字为2 个字符
            </p>

        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            username:''
        }
    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
        save:function(){
            if(this.username==""){
                Toast({
              message: '用户名不能为空',
              duration: 500

            });
            return
            }
            var re = /^[\u4E00-\u9FA5A-Za-z].{2,20}$/;
            if(this.username.length>=4&&this.username.length<16){
                    if(!re.test(this.username)){
                // alert("2")
             Toast({
              message: '用户名必须以字母或汉字开头',
              duration: 500
              });
              return
              }else{
                //   发送请求
                var data={
                    customerName:this.username
                }
                 this.axios.post('cusPersonalCenter/updateCustomerName',this.qs.stringify(data)).then(response=>{
                     console.log(response)
                     if(response.data.success==true){
                          Toast({
                         message: '修改成功',
                         duration: 500
                         });
                         this.$router.go(-1)
                     }
                 })

              }
            }else{
             Toast({
              message: '用户名长度不正确',
              duration: 500
              });
            }
        
        }
    },
}
</script>
<style lang="scss" scoped>
    .editusernamebox{
        padding-top: 45px;
        .header{
            width: 100%;
            height: 45px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            display: flex;
            justify-content: space-between;
            i{
                line-height: 45px;
                color: #ffffff;
            }
            h3{
                font-size:18px;
                font-weight:600;
                color:rgba(255,255,255,1);
                line-height: 35px;
            }
            span{
                // line-height: 35px;
                border-radius:13px;
                height: 26px;
                width: 56px;
                text-align: center;
                background-color: #FFC349;
                font-size:12px;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height:23px;
                margin-top: 10px;
                margin-right: 10px;
            }
        }
        .msgbox{
            background-color: #ffffff;
            padding: 10px 20px;
            h4{
                font-size:18px;
                font-weight:600;
                color:#444;
            }
            input{
                border: none;
                border-bottom: 1px solid #cccccc;
                padding: 0;
            }
            p{
                font-size:12px;
                font-weight:500;
                color:rgba(98,98,98,1);
            }
        }
    }
</style>