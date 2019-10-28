<template>
    <div class="edittelebox">
         <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h3>修改手机号码</h3>
            <span @click="save">保存</span>
        </div>
        <div class="msgbox">
                <h4 class="title">请输入您要绑定的手机号</h4>
                <p class="list">
                    <span class="number">+86</span>
                    <input type="text" placeholder="请输入手机号码" class="teletext">
                </p>
                <p class="list">
                    <input type="text" placeholder="请输入验证码" class="codetext">
                    <span class="getcode">获取验证码</span>
                </p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
        save:function(){
            // 请求接口
        }
    },
}
</script>
<style lang="scss" scoped>
    .edittelebox{
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
            padding: 10px 30px;
            .title{
                text-align: center;
                margin-bottom: 30px;
            }
             .list{
                 position: relative;
                 border-bottom: 1px solid #cccccc;
                 input{
                     border: none;
                     margin: 0;
                 }
                 .number{
                     position: absolute;
                     font-size:12px;
                    font-weight:500;
                    color:rgba(77,77,77,1);
                    left: 2px;
                    top: 8px;
                 }
                 .teletext{
                     margin-left: 30px;
                 }
                 .getcode{
                     position: absolute;
                     right: 2px;
                     top: 8px;
                     font-size:12px;
                    font-weight:500;
                    color:rgba(255,183,183,1);
                 }
                 .codetext{
                     width: 100%;
                     padding-right: 100px;
                 }
             }
        }
    }
</style>