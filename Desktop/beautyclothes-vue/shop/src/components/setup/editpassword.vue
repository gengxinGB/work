<template>
    <div class="editmsgbox">
          <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h3>修改密码</h3>
            <span @click="save">保存</span>
        </div>
        <div class="msgbox">
            <p class="list">
                <span>旧密码</span>
                <input type="password" placeholder="请填写旧密码" v-model.trim="oldpassword">
            </p>
            <p class="list">
                <span>新密码</span>
                <input type="password" placeholder="请填写新密码" v-model.trim="newpassword">
            </p>
             <div class="msgword">
            <p>
                密码长度为6-12位，有字母和数字组成。
            </p>
        </div>
        </div>
       
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            oldpassword:'',
            newpassword:''
        }
    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
        save:function(){
           if(this.oldpassword==""){
                Toast('旧密码不能为空');
                return
           }
           if(this.newpassword==""){
               Toast('新密码不能为空');
               return
           }
           var reg = /^[\w]{6,12}$/
           if(!reg.test(this.oldpassword)){
               Toast("请输入正确格式的旧密码")
               return
           }
           if(!reg.test(this.newpassword)){
               Toast("请输入正确格式的新密码")
               return
           }
           var data={
               newPassword:this.newpassword,
               oldPassword:this.oldpassword
           }
            this.axios.post('cusPersonalCenter/updatePassword',this.qs.stringify(data)).then(response=>{
                console.log(response)
                if(response.data.success==false){
                    Toast(response.data.errorMsg)
                }else if(response.data.success==true){
                    Toast("修改密码成功")
                    this.$router.go(-1)
                }
             })
           

        }
    },
}
</script>
<style lang="scss" scoped>
    .editmsgbox{
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
            padding: 50px 30px;
            .list{
                display: flex;
                position: relative;
                border-bottom: 1px solid #cccccc;
                span{
                    position: absolute;
                    font-size:16px;
                    font-weight:500;
                    color:rgba(93,93,93,1);
                    margin-top: 8px;
                }
                input{
                    margin: 0;
                    margin-left: 60px;
                    border: none;

                }
            }
            .msgword{
                margin-top: 10px;
            }
        }
    }
</style>