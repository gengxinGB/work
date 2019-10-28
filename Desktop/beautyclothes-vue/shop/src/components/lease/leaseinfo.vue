<template>
  <div class="leaseinfobox">
    <div class="headerbox">
      <i class="mui-icon mui-icon-back" @click="bank"></i>
      <h4 class="title">{{title}}</h4>
    </div>
    <div id="nonebox">
      <div class="com">
        <ul>
          <li
            :class="{activetwo:activetwo==index}"
            v-for="(item,index) in sizelist"
            :key="index"
            @click="sizeactive(index,item.sizeName)"
          >{{item.sizeName}}</li>
        </ul>
      </div>
      <div class="com">
        <ul>
          <li
            :class="{activethree:activethree==index}"
            v-for="(item,index) in colorlist"
            :key="index"
            @click="coloractive(index,item.colorName)"
          >{{item.colorName}}</li>
        </ul>
      </div>
      <div class="com">
        <ul>
          <li
            :class="{activefour:activefour==index}"
            v-for="(item,index) in stylelist"
            :key="index"
            @click="styleactive(index,item.styleId)"
          >{{item.styleName}}</li>
        </ul>
      </div>
      <div class="Specifications">
        <span @click="getinfo">
          <i class="mui-icon-extra mui-icon-extra-filter"></i> 筛选
        </span>
        <span @click="reset">重置</span>
      </div>
    </div>

    <p class="desc" :class="searchBarFixed == true ? 'isFixed' :''">
      <span>
        价格
        <i
          @click="price('rentPrice',true,1)"
          class="mui-icon mui-icon-arrowthinup"
          :class="{active : active==1}"
        ></i>
        <i
          @click="price('rentPrice',false,2)"
          class="mui-icon mui-icon-arrowthindown"
          :class="{active : active==2}"
        ></i>
      </span>
      <span>
        销量
        <i
          @click="price('sale',true,3)"
          class="mui-icon mui-icon-arrowthinup"
          :class="{active : active==3}"
        ></i>
        <i
          @click="price('sale',false,4)"
          class="mui-icon mui-icon-arrowthindown"
          :class="{active : active==4}"
        ></i>
      </span>
    </p>

    <ul class="goodsinfo">
      <li v-for="(item,index) in arrlist" :key="index">
        <img class="biaoqian" :src="item.rentPicUrl" alt />
        <router-link :to="{path:'/lease/leasegoodsinfo',query:{productId:item.productId}}">
          <img :src="item.productPicUrl" alt />
          <div class="wordbox">
            <p class="msginfo">{{item.productName}}</p>
            <p class="canshu">
              <span
                class="sizeli"
                v-for="(smallitem,index) in item.colorList"
                :key="index"
              >{{smallitem.colorName}}</span>
            </p>
            <p class="canshu">
              <span
                class="sizeli"
                v-for="(smallitem,index) in item.sizeList"
                :key="index"
              >{{smallitem.sizeName}}</span>
            </p>

            <p class="dibumsg">
              <span class="price">￥{{item.rentPrice}}/天</span>
              <span class="paypeploe">{{item.sale}}人付款</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      arrlist: [],
      searchBarFixed: false,
      active: "",
      activetwo: -1,
      activethree: -1,
      activefour: -1,
      colorlist: [],
      sizelist: [],
      // style的集合
      stylelist: [],
      // 颜色的数据
      colorstr: "",
      // 尺寸数据
      sizestr: "",
      // 规格的数据
      styleId: "",
      // 选中的数据
      selectall: [],
      rentCategoryId: "",
      // 页面标题
      title: ""
    };
  },
  created() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    this.getleaseinfo();
    this.gethuigemsg();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 点击颜色选中
    coloractive: function(i, item) {
      // this.activethree=i
      // console.log(item)
      // this.colorstr=item
      // console.log(this.colorstr)
      if (this.activethree == i) {
        this.activethree = -1;
        this.colorstr = "";
        // console.log(this.colorstr);
      } else {
        this.activethree = i;
        this.colorstr = item;
        // console.log(this.colorstr);
      }
    },
    // 点击尺寸选中
    sizeactive: function(i, item) {
      // this.activetwo=i
      // console.log(item)
      // this.sizestr=item
      // console.log(this.sizestr)
      if (this.activetwo == i) {
        this.activetwo = -1;
        this.sizestr = "";
      } else {
        this.activetwo = i;
        this.sizestr = item;
      }
    },
    // 点击选中样式
    styleactive: function(i, id) {
      if (this.activefour == i) {
        this.activefour = -1;
        this.styleId = "";
        // console.log(this.styleId);
      } else {
        this.activefour = i;
        this.styleId = id;
        // console.log(this.styleId);
      }
    },

    // 点击获取数据信息接口
    getinfo: function() {
      //   console.log(this.rentCategoryId);
      var data = {
        colorName: this.colorstr,
        sizeName: this.sizestr,
        rentCategoryId: this.rentCategoryId,
        styleId: this.styleId
      };
      this.axios
        .post("cusRentCenter/rentScreen", this.qs.stringify(data))
        .then(response => {
          //   console.log(response);
          //   console.log(response.data.data);
          if (response.data.success == false) {
            Toast("请选择筛选条件");
          } else if (response.data.data.length == 0) {
            Toast("没有该规格的商品");
          } else {
            this.arrlist = response.data.data;
          }
        });
    },

    // 重置按钮的事件
    reset: function() {
      // 取消高亮选择
      this.activetwo = -1;
      this.activethree = -1;
      this.activefour = -1;
      // 获取的值也为空
      this.colorstr = "";
      this.sizestr = "";
      this.styleId = "";
      //   console.log(this.colorstr);
      this.getleaseinfo();
    },

    // 滑动监听事件
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = document.querySelector("#nonebox").offsetTop;
      //  console.log(offsetTop)
      //     console.log(scrollTop)
      if (scrollTop > offsetTop) {
        this.searchBarFixed = true;
        // this.msgshow=false
      } else {
        this.searchBarFixed = false;
      }
    },
    // 点击返回上一层
    bank: function() {
      this.$router.go(-1);
    },
    // 点击进行价格/销量排序
    price: function(a, e, name) {
      this.arrlist.sort(this.sortBy(a, e));
      this.active = name;
    },

    //封装的排序方法
    sortBy: function(attr, rev) {
      //第二个参数没有传递 默认升序排列
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
      }

      return function(a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      };
    },

    // 获取规格选项的信息
    gethuigemsg: function() {
      this.axios
        .get(
          "cusRentCenter/getSpecifications?rentCategoryId=" +
            this.rentCategoryId
        )
        .then(response => {
          //   console.log(response);
          //   颜色集合
          this.colorlist = response.data.data.colorList;
          // 尺寸集合
          this.sizelist = response.data.data.sizeList;
          // 样式的集合
          this.stylelist = response.data.data.styleList;
        });
    },

    //   获取租赁详情
    getleaseinfo: function() {
      this.rentCategoryId = this.$route.query.rentCategoryId;
      this.title = this.$route.query.name;
      // console.log(RentCategoryId)
      var data = {
        rentCategoryId: this.rentCategoryId
      };
      this.axios
        .post("cusRentCenter/getRentProByCategory", this.qs.stringify(data))
        .then(response => {
          //   console.log(response);
          this.arrlist = response.data.data;
          Indicator.close();
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.leaseinfobox {
  margin-top: 55px;
  .headerbox {
    height: 45px;
    width: 100%;
    position: fixed;
    background-color: #ffb7b7;
    display: flex;
    top: 0;
    z-index: 10;
    i {
      line-height: 45px;
      color: #fff;
    }
    .title {
      // text-align: center;
      margin: auto;
      color: #fff;
      font-weight: normal;
    }
  }
  .desc {
    width: 100%;
    text-align: center;
    font-size: 0;
    margin-bottom: 0;
    span {
      display: inline-block;
      width: 50%;
      background-color: #cccccc;
      font-size: 14px;
      i {
        font-weight: 700;
      }
      .active {
        color: red;
      }
    }
  }
  #nonebox {
    margin: 10px;
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
  }
  .com {
    box-sizing: border-box;
    width: 100%;
    //   border: 1px solid #000;
  }
  .com ul {
    width: auto;
    overflow-x: auto;
    white-space: nowrap;
    //   background-color: white;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 3px;
  }
  .com li {
    display: inline-block;
    //   border: 1px solid red;
    margin: 4px 6px;
    padding: 2px 8px;
    border-radius: 4px;
  }
  .com {
    .activetwo {
      background-color: skyblue;
    }
    .activethree {
      background-color: skyblue;
    }
    .activefour {
      background-color: skyblue;
    }
  }

  .Specifications {
    padding: 0 8px;
    display: flex;
    justify-content: space-between;
    i {
      font-size: 17px;
    }
  }

  .isFixed {
    position: fixed;
    background-color: #fff;
    top: 35px;
    right: 0;
    z-index: 999;
  }
  .goodsinfo {
    // width: 100%;
    display: flex;
    // flex-wrap: wrap;
    margin: 0 10px;
    padding: 0;
    box-sizing: border-box;
    li {
      width: 50%;
      margin: 0 12px;
      background-color: white;
      position: relative;
      //  text-align:justify;
      margin-bottom: 10px;
      border-radius: 10px;
      overflow: hidden;
      .biaoqian {
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        border-radius: 50px;
      }
      img {
        width: 100%;
        height: 180px;
      }
      .wordbox {
        padding: 0 10px;
        // border: 1px solid #cccccc;
        .msginfo {
          // height: 42px;
          margin-top: 3px;
          margin-bottom: 0;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: normal;
          //                    overflow:hidden;
          //                    display:-webkit-box; //将对象作为弹性伸缩盒子模型显示;
          //                    text-overflow:ellipsis;//溢出部分用省略号代替
          //                    -webkit-line-clamp:2; //设置文本显示两行
          //                    -webkit-box-orient:vertical;  //从上到下排列子元素;
          //                    white-space:normal;
        }
        .canshu {
          margin: 0;
          padding: 0;
          .sizeli {
            font-size: 12px;
            margin-left: 2px;
            color: #8f8f94;
          }
        }

        .dibumsg {
          .price {
            color: rgb(255, 80, 0);
          }
          .paypeploe {
            float: right;
          }
        }
      }
    }
  }
}
</style>