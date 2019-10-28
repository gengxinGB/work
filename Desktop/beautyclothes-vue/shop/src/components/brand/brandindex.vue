<template>
    <div class="brandbox">
        <div class="headerbox"> <i class="mui-icon mui-icon-back" @click="bank"></i> <h4 class="title">品牌馆</h4> </div>
        <mt-index-list >
          <mt-index-section v-for="(item, index) in listmsg.segs" :key="index"  :index="item.initial">
              
              <div v-for="(s,index) in item.data" :key="index" class="listbox" @click="inbrandgoodsinfo(s.brandId)">
                  <img :src="s.brandLogo" alt="">
                <div class="bigbox">
                      <mt-cell :title="s.brandName">

                  </mt-cell>
                </div>
              </div>
            <!-- <mt-cell v-for="(s, index) in item.data" :key="index" :title="s.brandName">
                
            </mt-cell> -->
          </mt-index-section>
     </mt-index-list>
    </div>


</template>
<script>
export default {
    data() {
        return {
            brandlist:[],
            listmsg:[]
        }
    },
    created() {
        this.getbrandmsg()
    },
    methods: {
         // 点击返回上一层
            bank:function(){
                this.$router.go(-1)
            },

            // 点击进入店铺详情
            inbrandgoodsinfo:function(id){
                this.$router.push({path:'/brandgoodsinfo',query:{brandId:id}})
            },

         //获取品牌详情
         getbrandmsg:function(){
            this.axios.get('cusBrandInfo/getAllBrands').then(respone=>{
                console.log(respone)
                this.brandlist=respone.data.data
                console.log(this.brandlist)
                   if(this.brandlist.length == 0) return;
              if (!String.prototype.localeCompare) return null;
              var letters = "*ABCDEFGHJKLMNOPQRSTWXYZ".split("");
              var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split("");
              var segs = []; // 存放数据
              var res = {};
              let curr;
              var re = /[^\u4e00-\u9fa5]/;//中文正则
              var pattern = new RegExp("[`\\-~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？12345678990]"); //特殊符号

              letters.filter((items, i) => {
                curr = {
                    initial: '', //字母
                    data: [] ,  //数据
                  };
                this.brandlist.map((v, index) => {
                  // 特殊字符
                  if (pattern.test(v.brandName[0])) {
                    if ((!zh[i - 1] || zh[i - 1].localeCompare(v.brandName) <= 0) && v.brandName.localeCompare(zh[i]) == -1) {
                      curr.data.push(v);
                    }
                  }
                  // 判断首个字是否是中文 
                  if (re.test(v.brandName[0])) {
                    // 英文 
                    if (v.brandName[0].toUpperCase() == items) {
                      curr.data.push(v);
                    }
                  } else {
                    // 中文
                    if ((!zh[i - 1] || zh[i - 1].localeCompare(v.brandName) <= 0) && v.brandName.localeCompare(zh[i]) == -1) {
                      curr.data.push(v);
                    }
                  }
                    
                })
                //  console.log(curr)
                  if ( curr.data.length) {
                    curr.initial = letters[i]
                    segs.push(curr);
                    curr.data.sort((a, b) => {
                      return a.brandName.localeCompare(b.brandName);
                    });             
                  }
              })
             
              res.segs = Array.from(new Set(segs)) //去重
              console.log(segs)
             
              this.listmsg=res
               console.log(this.listmsg);
            //   return res;
            })
         } 
    },
    computed:{
   
    }
}
</script>
<style lang="scss" scoped>
     *{
      padding: 0;
      margin: 0;
  }
    .brandbox{
        padding-top: 35px;
        .listbox{
            display: flex;
            // line-height: 100%;
            width: 100%;
             background-color: #fff;
          .bigbox{
              width: 100%;
          }
            img{
                // vertical-align: bottom;
                margin-top: 8px;
                width: 30px;
                height: 30px;
                border-radius: 30px;
            }
        }
          .headerbox{
            height: 35px;
            width: 100%;
            position: fixed;
            background-color:#FFB7B7;
            display: flex;
            top: 0;
            color: white;
            z-index: 99;
            i{
                line-height: 35px;
            }
            .title{
                // text-align: center;
                margin: auto;
                font-weight: normal;
            }
        }
     
    }
</style>