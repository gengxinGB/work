<template>
    <div class="brithdaybox">
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h4>修改生日</h4>
            <span> 保存</span>
        </div>
        <div class="msgbox">
            <h4>生日</h4>
            <input type="text" placeholder="请输入你的生日">
            <span>只能修改一次，输入格式为1990-01-01</span>
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
        }
    },
}
</script>
<style lang="scss" scoped>
    .brithdaybox{
         padding-top: 45px;
        .header{
            width: 100%;
            height: 45px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 99;
            display: flex;
            justify-content: space-between;
            i{
                color: #ffffff;
                line-height: 45px;
            }
            h4{
                color: #ffffff;
                font-size:18px;
                font-weight:600;
                color:rgba(255,255,255,1);
                line-height: 35px;
            }
             span{
                width: 60px;
                height: 26px;
                line-height: 26px;
                text-align: center;
                border-radius: 6px;
                background-color: #FFC023;
                margin-top: 10px;
                font-size:14px;
                color: #fff;
                margin-right: 8px;
            }
        }
        .msgbox{
            padding: 10px 20px;
            background-color: #fff;
            input{
                border: none;
            }
        }
    }
</style>