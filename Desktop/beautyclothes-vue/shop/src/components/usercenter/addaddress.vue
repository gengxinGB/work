<template>
    <div class="addaddressbox">
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h3>添加地址</h3>
            <span @click="save">保存</span>
        </div>
        <div class="addmsg">
            <input type="text" placeholder="收货人" v-model.trim="receiverName">
            <input type="text" placeholder="手机号码" v-model.trim="receiverPhone">
            <input type="text" placeholder="所在地区" v-model.trim="citymsg"  @click="choose" readonly>
            <textarea placeholder="详细地址：如街道、门牌号、小区、楼栋数、单元室等" v-model.trim="address"></textarea>
        <!--省市区三级联动-->
<div class="divwrap" v-if="show">
  <v-distpicker type="mobile" @province="onChangeProvince1" @city="onChangeCity"
                @area="onChangeArea"></v-distpicker>
</div>
<!--遮罩层-->
<div class="blacks" v-if="show" @click="countermand"></div>
<!--触发选择-->

        </div>
        <div class="footsmsg">
                <p class="addresslogo">
                    标签地址：<span :class="{active:1==active}" @click="activetext(1,'家')">家</span>
                             <span :class="{active:2==active}" @click="activetext(2,'公司')">公司</span>
                             <span :class="{active:3==active}" @click="activetext(3,'学校')">学校</span>
                </p>
                <p class="default">  <span>设为默认地址：</span>
                    <mt-switch v-model="value"></mt-switch>
                </p>
        </div>
    </div>
</template>
<script>
import { Switch } from 'mint-ui';
 import VDistpicker from 'v-distpicker';
 import { Toast } from 'mint-ui';
export default {
     components: {VDistpicker},
     name: "particular",
    data() {
        return {
            value:false,
             lxr: '',
        lxdh: '',
        show: false,
        //省市区
        province: '',
        city: '',
        area: '',
        citymsg:'',
        // 默认高亮的标签
        active:0,
        // 标签的信息
        label:'',
        // 是否默认地址
        isDefault:0,
        // 收货人姓名
        receiverName:"",
        // 收货人手机号
        receiverPhone:"",
        // 详细地址
        address:"",

        // 地址信息id
        customerAddrId:"",

        // 修改地址的xinxi
        editaddressmsg:{}



        }
    },
    created() {
      
          this.geteditmsg()

    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
          //取消选择地区
      countermand: function () {
        this.show = false
      },
      //打开选择地区
      choose: function () {
        this.show = true;
      },
      onChangeProvince1: function (a) {
        this.province = a.value;
        // if (a.value == '台湾省') {
        //   this.show = false;
        // }
      },
      onChangeCity: function (a) {
        this.city = a.value;
      },
      onChangeArea: function (a) {
        this.area = a.value;
        this.show = false;
        this.citymsg = this.province + this.city + this.area;
        console.log(this.citymsg)
        // this.citymsg=this.city
      },

    // 点击标签高亮显示
    activetext:function(i,label){
        this.active=i
        this.label=label
        console.log(this.label)
    },

    //   点击保存   请求接口
    save:function(){
        // 获取是否默认
        if(this.value==false){
            this.isDefault=0
        }else{
            this.isDefault=1
        }
        var data={
            receiverName:this.receiverName,
            receiverPhone:this.receiverPhone,
            province:this.province,
            city:this.city,
            area:this.area,
            address:this.address,
            label:this.label,
            isDefault:this.isDefault,
            customerAddrId:this.customerAddrId,
        }
         if(this.receiverName==""){
                Toast({
                  message: '请输入用户名',
                  duration: 500
                });
         }else if(this.receiverPhone==""){
                  Toast({
                  message: '请输入联系方式',
                  duration: 500
                });
         }else if(!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.receiverPhone)){
            //  console.log()
                Toast({
                  message: '请输入正确的手机号',
                  duration: 500
                });
         } else if(this.citymsg==""){
                  Toast({
                  message: '请输入所在地区',
                  duration: 500
                });
         }else if(this.address==""){
                Toast({
                  message: '请输入详细地址',
                  duration: 500
                }); 
         } else{
          this.axios.post('cusPersonalCenter/addOrUpdateAddress',this.qs.stringify(data)).then(response=>{
              console.log(response)
              if(response.data.success==true){
                      Toast({
                      message: '添加地址成功',
                     duration: 500
                   });
                   this.$router.go(-1) 
              }else if(response.data.success==false){
                      Toast({
                      message: '添加地址失败',
                     duration: 500
                   });
              }
          })
         }
    },
    // 页面一加载请求的接口
       geteditmsg:function(){

          this.customerAddrId=this.$route.query.customerAddrId
          console.log(this.customerAddrId)
          if(this.customerAddrId==undefined){
              return
          }
          var data={
            customerAddrId:this.customerAddrId
          }
          console.log(data)
          this.axios.post('cusPersonalCenter/jumpToEditAddress',this.qs.stringify(data)).then(response=>{
            console.log(response)
            this.editaddressmsg=response.data.data
            this.receiverName=this.editaddressmsg.receiverName
            this.receiverPhone=this.editaddressmsg.receiverPhone
            this.province=this.editaddressmsg.province
            this.city=this.editaddressmsg.city
            this.area=this.editaddressmsg.area
            this.citymsg=this.editaddressmsg.province+this.editaddressmsg.city+this.editaddressmsg.area
            this.address=this.editaddressmsg.address
            if(this.editaddressmsg.label=='家'){
              this.label=this.editaddressmsg.label
              this.active=1
            }else if(this.editaddressmsg.label=='公司'){
                this.label=this.editaddressmsg.label
                this.active=2
            }else if(this.editaddressmsg.label=='学校'){
                this.label=this.editaddressmsg.label
                this.active=3
            }
            if(this.editaddressmsg.isDefault==1){
              this.value=true
            }else{
              this.value=false
            }
          })

       }
    },
}
</script>
<style lang="scss">
    .addaddressbox{
        /*遮罩层*/
.blacks {
  position: fixed;
  width: 100%;
  height: 50%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.45);
}
/*省市区三级联动*/
.divwrap {
  height: 50%;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 99;
  overflow: auto;
}

/*外部*/
.divwrap > .distpicker-address-wrapper {
  color: #0d0d0d;
  height: 100%;
}

/*头部*/
.divwrap >>> .address-header {
  background: #000;
  color: #fff;
  width: 100%;
  position: fixed;
  bottom: 50%;
  height: 0.5rem;
  font-size: 0.2rem;
}

/*头部内容*/
.divwrap >>> .address-header ul li {
  flex-grow: 1;
  text-align: center;
}

/*选择过省市区的头部*/
.divwrap >>> .address-header .active {
  color: #fff;
  border-bottom: 0.05rem solid #666;
}

/*内容部分*/
.divwrap >>> .address-container {
  overflow: scroll;
  height: 100%;
}

/*点过的地区内容*/
.divwrap >>> .address-container .active {
  color: red;
}
        padding-top: 45px;
        .header{
            width: 100%;
            height: 45px;
            position: fixed;
            top: 0;
            background-color: #FFB7B7;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            i{
                line-height: 45px;
                color: #ffffff;
            }
            h3{
                font-size:18px;
                font-family:PingFangSC;
                font-weight:600;
                color:rgba(255,255,255,1);
                line-height: 35px;
            }
            span{
                // line-height: 45px;
                // padding: 2px 10px;
                width: 56px;
                height: 26px;
                text-align: center;
                background-color: #FFC349;
                border-radius: 10px;
                margin-top: 10px;
                color: #FFFFFF;
                line-height: 26px;
                margin-right: 10px;
                font-size: 12px;
                font-weight:500;
            }
        }
        .addmsg{
            background-color: #ffffff;
            margin: 10px;
            padding: 10px;
            input{
                margin: 0;
                border: none;
                margin-bottom: 4px;
                border-bottom: 1px solid #DADADA;
            }
            textarea{
                border: none;
            }
        }
        .footsmsg{
            background-color: #ffffff;
            margin: 0 10px 0 10px;
            padding: 10px;
            .addresslogo{
                span{
                    border: 1px solid #979797;
                    padding: 1px 15px;
                    border-radius: 5px;
                    margin: 0 4px;
                }
                .active{
                    background-color: #FFB7B7;
                    color: #fff;
                }
               
            }
             .default{
                    display: flex;
                    justify-content: space-between;
                }
        }
    }
</style>