<template>
  <div class="index">
    <div class="header"> <i class="mui-icon mui-icon-back" @click="bank"></i>  <h4>收货地址</h4>        <img src="../../assets/newimg/addaddress.png" @click="inaddaddress" alt=""></div>
    <!-- <input class="inplist" type="text" placeholder="收货人" v-model="usermsg">
    <input class="inplist" type="tel" placeholder="手机号码" v-model="telnum">
    <input class="inplist" type="text" placeholder="邮编" v-model="code">
    <div class="page-content">
      <mt-cell title="省市区:" :value="areaString" is-link @click.native="handlerArea"></mt-cell>
      <mt-cell title="街道:" :value="streetString" is-link @click.native="handlerStreet"></mt-cell>
      <mt-popup v-model="areaVisible" class="area-class" position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </mt-popup>
      <mt-popup v-model="streetVisible" class="area-class" position="bottom">
        <mt-picker :slots="slotstree" @change="onStreeChange"></mt-picker>
      </mt-popup>
    </div>
    <textarea placeholder="详细地址：如道路，门牌号，单元室等..." v-model="detaaddress"></textarea>
    <button class="addaddressbtn" @click="addaddress"> <i class="mui-icon mui-icon-plusempty"></i> 新增收货地址</button> -->

    <div class="addresslist" v-for="(item,index) in addresslist" :key="index" @click="seleaddress($event,item.customerAddrId)">
         <div class="addressmsg">
              <p> <span class="name">{{item.receiverName}}</span> <span class="tel"> {{item.receiverPhone}}</span> </p>
        <p class="addressinfo"> <i class="default">{{item.isDefault==1?"默认":""}}</i> {{item.province}}{{item.city}}{{item.area}}{{item.street}}{{item.address}}</p>
         </div>
    </div>
    
  </div>
</template>

<script>
// 导入数据
// import data from "../../assets/js/city.json"
import { MessageBox } from "mint-ui";
// var index = 0
// var index2 = 0
// var index3 = 0
// // 初始化省
// let province = Object.keys(data)
// // 初始化市
// let _y = Object.values(data)
// let _m = _y.map(res => {
//   return Object.keys(res)
// })
// let city = _m[index]
// // 初始化区
// let _c = Object.values(data)
// _c = _c.map(res => {
//   return Object.values(res)
// })
// let __d = Object.values(_c[index])
// let area = Object.keys(__d[index])
// // 初始化街
// let __a = Object.values(__d[0])
// let street = __a[0]
export default {
  name: "index",
  data() {
    return {
    // 新增地址的值
    // 是否默认
    value:true,
    // 地址列表数据
    addresslist:[],
    // 联系人
       usermsg:"",
       telnum:"",
       code:"",
       detaaddress:"",
    
    }
  },
  methods: {
    // handlerArea() {
    //   this.areaVisible = true
    // },
    // handlerStreet() {
    //   if (this.slotstree[0].values.length === 0) {
    //     this.streetString = "无可选街道"
    //     return
    //   }
    //   this.streetVisible = true
    // },
    // onValuesChange(picker, values) {
    //     console.log(picker)
    //     console.log(values)

    //   index = province.indexOf(values[0])
    //   index2 = _m[index].indexOf(values[1])
    //   if (index >= 0) {
    //     picker.setSlotValues(1, _m[index])
    //   }
    //   if (index >= 0 && index2 >= 0) {
    //     let __d = Object.values(_c[index])
    //     let area = Object.keys(__d[index2])
    //     index3 = area.indexOf(values[2])
    //     picker.setSlotValues(2, area)
    //     this.areaString = values.join(",")
    //     if (index3 >= 0) {
    //       let __a = Object.values(__d[index2])
    //       let street = __a[index3]
    //       this.slotstree[0].values = street
    //     } else {
    //       this.$set(this.slotstree[0].values, [])
    //       this.streetString = "无可选街道"
    //     }
    //   }
    // },
    // onStreeChange(picker, values) {
    //   this.streetString = values.join(",")
    // },
    // 点击返回上一层
    bank:function(){
        this.$router.go(-1)
    },
    // 选择收货地址
    seleaddress:function(e,id){
        console.log(e)
      
      this.$router.push({path:"lease/leaseorder",query:{customerAddrId:id}})

    },


    // 新增收货地址按钮
    // addaddress:function(){
    //   if(this.usermsg==""){
    //     MessageBox("提示", "请输入用户名");
    //     return
    //   }else
    //     if(this.telnum==""){
    //       MessageBox("提示", "请输入手机号");
    //       return
    //   }
    //   if(!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.telnum)){
    //       MessageBox("提示", "请输入正确的手机号");
    //       return
    //   }
    //   if(this.detaaddress==""){
    //      MessageBox("提示", "请输入详细地址");
    //       return
    //   }


    //   // 请求接口
    //     MessageBox("提示", "新增成功");
    //     return
      
    // },

     // 点击进入添加收货地址
    inaddaddress:function(){
        this.$router.push({path:"/addaddress"})
    },


    // 获取收货地址信息
    getaddressmsg:function(){
        this.axios.get("cusPersonalCenter/getAddressList").then(response=>{
                console.log(response)
                this.addresslist=response.data.data
                
        })
    },
    changevalue:function(e,i,m,index){
            console.log(e)
            console.log(i)
            console.log(m)
            console.log(index)
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
    background-color: #ffffff;
    .header{
        display: fixed;
        height: 45px;
        background-color: #FFB7B7;
        top: 0;
        z-index: 10;
        // line-height:35px;
        display: flex;
        justify-content: space-between;
        i{
          line-height: 45px;
          color: #ffffff;
        }
        h4{
          line-height: 35px;
          color: #ffffff;
        }
         img{
            height: 32px;
            width: 32px;
            margin-top: 6px;
            margin-right: 6px;
        }
    }
    .inplist{
        // width: 80%;
        border: none;
        border-bottom: 1px solid #eee;
    }
    .addaddressbtn{
        //  text-align: center;
        display: block;
        margin: auto;
        background-color: #eeeeee;
        border-radius: 16px;
    }
    .addresslist{
        margin-top: 8px;
        display: flex;
        padding: 6px;
        border: 1px solid #eeeeee;
        .addressmsg{
            margin-left: 6px;
           
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
        }
    }
}
</style>>

