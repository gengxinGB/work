<template>
  <div class="footbox">
      <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank" ></i> <h4 class="title">足迹</h4>
            <img src="../../assets/newimg/shezhi.png" alt="">
        </div>
   
 <div class="date">
       <!-- 年份 月份 -->
   <div class="month" v-if="!istimeshow">
      <i class="mui-icon mui-icon-back" @click="lastmouth(0,$event)" :class="{active2:0==active2}"></i> 
      <i class="mui-icon mui-icon-forward" @click="nowmouth(1,$event)" :class="{active2:1==active2}"></i>
   </div>
   <!-- 星期 -->
   <ul class="weekdays">
    <li>一</li>
    <li>二</li>
    <li>三</li>
    <li>四</li>
    <li>五</li>
    <li>六</li>
    <li>日</li>
   </ul>
   <!-- 日期 -->
   <ul class="days">
    <li @click="pick(day.time,index)" v-for="(day, index) in arr5" :key="index" >
     <!--本月-->
     <span v-if="day.time.getMonth()+1 != currentMonth" class="other-month" :class="{active1:index==active1}">{{ day.time.getDate() }}</span>
     <span v-else>
     <!--今天-->
     <span v-if="day.time.getFullYear() == new Date().getFullYear() && day.time.getMonth() == new Date().getMonth() && day.time.getDate() == new Date().getDate()" class="active" :class="{active1:index==active1}">{{ day.time.getDate() }}</span>
     <span v-else :class="{active1:index==active1}">{{ day.time.getDate() }}</span>
     </span>
     <span class="biqoji" v-if="day.has==1?false:true">  </span>
    </li>
   </ul>


   <i class="mui-icon mui-icon-arrowdown allrili" @click="showall" v-if='istimeshow'></i>
   <i class="mui-icon mui-icon-arrowup allrili" @click="hidenall" v-if="!istimeshow"></i>
 </div>

  <div class="contmsg" v-for="(item,index) in msglist" :key="index">
      <h3>   {{item.date}} </h3>
      <ul class="msgbox">
          <li v-for="(otem,index) in item.productList" :key="index"><img :src="otem.productPicUrl" alt="" @click="ingoodsmsg(otem.productId)">
          <p class="pricename"><span class="price">￥{{otem.productPrice}}</span>  </p>
          </li>
      </ul>
  </div>

  


   </div>




 
 
</template>

<script>
 import { Toast } from 'mint-ui';
 
 export default {
  name: 'date',
 
  data () {
   return {
    currentYear: 1970,  // 年份
    currentMonth: 1, // 月份
    currentDay: 1,  // 日期
    currentWeek: 1,  // 星期
    days: [],
    active1:-1,
    istimeshow:true,
    msglist:[],
    active2:1,
    arr:[],
    // 改造成对象的形式
    arr2:[],
    // 键值对的数组
    arr4:[],
    arr5:[]
    
   }
  },
 
  mounted () {
 
  },
 
  created () {
   this.initData(null,7,0)
   this.getfootsmsg()
  },
 
  methods: {
    

    // 点击展开数据
    showall:function(){
        // this.active2=i
        this.istimeshow=false;
        this.getfootsmsg()
       this.initData(null,35,0)
    },
    //点击返回当前月
    nowmouth:function(i,e){
        this.getfootsmsg()
        this.active2=i
        this.initData(null,35,0)
        if($(e.target).hasClass('active2')){
            Toast({
          message: '没有更多足迹',
          duration:500
        });
        }
    } ,

    // 点击展开上个月
    lastmouth:function(i,e){
        this.getfootsmsg()
        this.active2=i
        this.currentMonth=this.currentMonth-1
         this.initData(null,35,1)
        //  console.log($(e.target).hasClass('active2'))
          if($(e.target).hasClass('active2')){
                    Toast({
                     message: '没有更多足迹',
                     duration:500
                     });
          }
    },
    // 点击收缩数据
    hidenall:function(){
        this.istimeshow=true
        this.initData(null,7,0)
       this.getfootsmsg()
    },

    // 点击进入商品详情
    ingoodsmsg:function(id){
        this.$router.push({path:'/home/goodsinfo',query:{productId:id}})
    },



    //   点击返回上一层
    bank:function(){
        this.$router.push({path:'/usercenter'})
    },
   formatDate (year, month, day) {
    const y = year
    let m = month
    if (m < 10) m = `0${m}`
    let d = day
    if (d < 10) d = `0${d}`
    return `${y}-${m}-${d}`
   },
 
   initData (cur,num,n) {
       this.arr4=[]
    let date = ''
    if (cur) {
     date = new Date(cur)
    } else {
     date = new Date()
    }
    this.currentDay = date.getDate()     // 今日日期 几号
    this.currentYear = date.getFullYear()    // 当前年份
    this.currentMonth = date.getMonth() + 1-n  // 当前月份
    this.currentWeek = date.getDay() // 1...6,0  // 星期几
    if (this.currentWeek === 0) {
     this.currentWeek = 7
    }
    const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)// 今日日期 年-月-日
    this.days.length = 0
    // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
    /* eslint-disabled */
      
    for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
     const d = new Date(str)
     d.setDate(d.getDate() - i)
      // console.log(y:" + d.getDate())
    //   console.log(d+"2222222222")
        // this.arr2['time']=d
    //  this.days.push(d)
     this.arr4.push({'time':d,'has':1})
    }
  
    for (let i = 1; i <= num- this.currentWeek; i += 1) {
     const d = new Date(str)
     d.setDate(d.getDate() + i)
    //  this.days.push(d)
     this.arr4.push({'time':d,'has':1})
    }
    // console.log(this.arr4)
    // console.log(this.days)
    //  this.arr5=[]
     for(var i=0;i<this.arr4.length;i++){
        //  arr.push(new Date(this.days[i]))
         this.arr4[i].time=(this.arr4[i].time.getFullYear() + '-' + this.p((this.arr4[i].time.getMonth() + 1)) + '-' + this.p(this.arr4[i].time.getDate()))
     }
    //   console.log(this.arr)
           
    //     for(var i=0;i<this.arr.length;i++){
    //        this.arr1.push({'time':this.arr[i],'has':'0'})
    //     }
    //   console.log(this.arr1)
// console.log(this.arr4)




   },
     p(s) {
      return s < 10 ? '0' + s : s
    },
 
   // 上个星期
   weekPre () {
    // const d = this.days[0]  // 如果当期日期是7号或者小于7号
    const d = this.arr4[0].time  // 如果当期日期是7号或者小于7号
    
    d.setDate(d.getDate() - 7)
    this.initData(d,7,0)
   },
 
   // 下个星期
   weekNext () {
    // const d = this.days[6]  // 如果当期日期是7号或者小于7号
    const d = this.arr4[6].time  // 如果当期日期是7号或者小于7号

    d.setDate(d.getDate() + 7)
    this.initData(d,7,0)
   },
 
   // 上一個月  传入当前年份和月份
   pickPre (year, month) {
    const d = new Date(this.formatDate(year, month, 1))
    d.setDate(0)
    this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1),7,0)
   },
 
 
   // 下一個月  传入当前年份和月份
   pickNext (year, month) {
    const d = new Date(this.formatDate(year, month, 1))
    d.setDate(35)
    this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1),7,0)
   },
 
   // 当前选择日期
   pick (date,i) {
    // console.log(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
    var str=this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
    // console.log(i)
    this.active1=i
    var data={
       ymd:this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
    }
    // 点击接口
    this.axios.post('cusFootPrint/getFootPrint',this.qs.stringify(data)).then(response=>{
        // console.log(response)
         response.data.data.sort(this.sortBy('date',false))
         if(response.data.data.length==0){
             Toast("今天没有足迹哦")
         }else{
                   for(var i=0;i<response.data.data.length;i++){
               if(str==response.data.data[i].date){
                    this.msglist=response.data.data
                    return
               }else{
                    Toast({
                     message: '今天没有足迹哦',
                     duration:500
                     });
               }
         }
         }
      
        //  if(response.data.data.length==0){
               
        //  }else{

        //   this.msglist=response.data.data

        //  }

    })
   },
   formatterDate1 (date) {
    let result = new Date(date);
    return result;
},

    // 页面一加载显示数据
    getfootsmsg:function(){
        this.axios.get('cusFootPrint/getAllFootPrint').then(response=>{
            // console.log(response)
            // console.log(this.msglist)
            // console.log(response.data.data)
           response.data.data.sort(this.sortBy('date',false))
            // console.log(response.data.data)
            this.msglist=response.data.data
            for(var i=0;i<response.data.data.length;i++){
                for(var k=0;k<this.arr4.length;k++){
                  if(response.data.data[i].date==this.arr4[k].time){
                      this.arr4[k].has=0
                  }
                }
            }
            // console.log(this.arr4)
            for(var i=0;i<this.arr4.length;i++){
               this.arr4[i].time=this.formatterDate1(this.arr4[i].time);
            }
            //  console.log(this.arr4)
              this.arr5=this.arr4
            //  console.log(this.arr5)
        })
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
<style lang="scss" scoped>
.footbox{
    padding-top: 40px;
}
  .header{
            width: 100%;
            height: 45px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 10;
            color: white;
            display: flex;
                i{
                line-height: 45px;
            }
            .title{
                // text-align: center;
                margin: auto;
                font-weight: normal;
            }
            img{
                width: 26px;
                height: 26px;
                margin-top: 8px;
                margin-right: 8px;
            }
        }
 
 .date {
  height: px2rem(180);
  color: #333;
 background-color: white;
 padding: 8px  0;
 position: relative;
 .allrili{
     position: absolute;
     right: 5px;
     width: 20px;
     height: 20px;
     border-radius: 20px;
     background-color: white;
     bottom: -10px;
     font-size: 10px;
     text-align: center;
     line-height: 20px;
 }
  .month {
      margin: auto;
      display: flex;
   font-size: px2rem(24);
   text-align: center;
   margin-top: px2rem(20);
   justify-content: space-between;
   .yearmouth{
       font-size: 16px;
       color: black;
     
   }
    .active2{
          color: #cccccc;
      }
  }
 
  .weekdays {
    margin-bottom: 10px;
   display: flex;
   font-size: px2rem(28);
   margin-top: px2rem(20);
 
   li {
    flex: 1;
    text-align: center;
    color:#FFB5B1;
   }
  }
 
  .days {
   display: flex;
   flex-wrap: wrap;
   li {
    // flex: 1;
    font-size: px2rem(30);
    text-align: center;
    margin-top: px2rem(10);
    line-height: px2rem(60);
    text-align: center;
    width: 14%;
    margin: 4px 0;
    position: relative;
    .biqoji{
        background-color: red;
        position: absolute;
        width: 4px;
        height: 4px;
        bottom: 0;
        border-radius: 4px;
        
    }
    .active1{
        color: red;
    }
    .active {
     display: inline-block;
     padding: 1px 2px;
     color: #fff;
     border-radius: 50%;
     background-color: #fa6854;
    }
 
    .other-month {
     color: #333;
    }
   }
  }
 
 }
  .contmsg{
      padding: 10px;
      h3{
          font-size:16px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(110,110,110,1);
      }
      .msgbox{
          display: flex;
          flex-wrap: wrap;
        //   width: 100%;
          li{
            // width: 33%;
            margin: 0 2px;
            text-align: center;
            background-color: white;
            margin-bottom: 10px;
            border-radius: 5px;
            .pricename{
                .price{
                    color: #D42828;
                    font-size: 14px;
                }
            }
              img{
                width: 114px;
                height: 108px;
              }
          }
      }
  }
</style>