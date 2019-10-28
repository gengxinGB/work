<template>
    <div class="sendartcile">
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h3>发布文章</h3>
            <span @click="send">发布</span>
        </div>

        <div class="msgbox">
            <input type="text" placeholder="请输入文章标题" v-model.trim="titlemsg">
    <textarea name="" id="" cols="30" rows="10" placeholder="请输入文章的内容" v-model.trim="articlemsg"></textarea>
    <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"  accept="image/*"/>
    <div class="add" @click="chooseType">
    <div class="add-image" align="center">
        <i class="mui-icon mui-icon-camera"></i> 
        <p class="font13">添加图片</p>
    </div>

    <div class="add-img" v-show="imgList.length">
    <p class="font14">图片(最多6张，还可上传<span v-text="6-imgList.length"></span>张)</p>
    <ul class="img-list">
        <li v-for="(url,index) in imgList" :key="index">
            <!-- <img class="del" src="../assets/newimg/shezhi.png" @click.stop="delImg(index)"/>  -->
            <i class="del" @click.stop="delImg(index)"> x </i>
            <!-- //del删除样式，icon字体图标需要自己找哦 -->
            <img class="imglist" :src="url.file.src">
        </li>
    </ul>
</div>

</div>
        </div>

        

    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
             showFace: false,
             imgList: [],
             size: 0,
             limit:6, //限制图片上传的数量
             tempImgs:[],
            //  文章标题
            titlemsg:"",
            // 文章内容
            articlemsg:""

        }
    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
          chooseType() {
                document.getElementById("upload_file").click();
            },
            fileChange(el) {
                if (!el.target.files[0].size) return;
                this.fileList(el.target);
                el.target.value = ""
            },
            fileList(fileList) {
                let files = fileList.files;
                for (let i = 0; i < files.length; i++) {
                    //判断是否为文件夹
                    if (files[i].type != "") {
                        this.fileAdd(files[i]);
                    } else {
                        //文件夹处理
                        this.folders(fileList.items[i]);
                    }
                }
            },
            //文件夹处理
            folders(files) {
                let _this = this;
                //判断是否为原生file
                if (files.kind) {
                    files = files.webkitGetAsEntry();
                }
                files.createReader().readEntries(function (file) {
                    for (let i = 0; i < file.length; i++) {
                        if (file[i].isFile) {
                            _this.foldersAdd(file[i]);
                        } else {
                            _this.folders(file[i]);
                        }
                    }
                });

            },
            foldersAdd(entry) {
                let _this = this;
                entry.file(function (file) {
                    _this.fileAdd(file)
                })
            },
            fileAdd(file) {
                if (this.limit !== undefined) this.limit--;
                if (this.limit !== undefined && this.limit < 0) return;
                //总大小
                this.size = this.size + file.size;
                //判断是否为图片文件
                if (file.type.indexOf("image") == -1) {
                    alert(" 请选择图片文件");
                } else {
                    let reader = new FileReader();
                    let image = new Image();
                    let _this = this;
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        file.src = this.result;
                        image.onload = function(){
                            let width = image.width;
                            let height = image.height;
                            file.width = width;
                            file.height = height;
                            _this.imgList.push({
                                file
                            });
                            console.log( _this.imgList);
                        };
                        image.src= file.src;
                    }
                }
            },
            delImg(index) {
                this.size = this.size - this.imgList[index].file.size;//总大小
                this.imgList.splice(index, 1);
                if (this.limit !== undefined) this.limit = 6-this.imgList.length;
            },
            displayImg() {

            },
            // 点击发布按钮的事件
            send:function(){
                if(this.titlemsg==""){
                    Toast({
                      message: "请输入文章标题",
                      duration: 500
                    });
                }else if(this.articlemsg==""){
                    Toast({
                      message: "请输入文章内容",
                      duration: 500
                    });
                }else{
                    var arr=[]
                    for(var i=0;i<this.imgList.length;i++){
                        arr.push(this.imgList[i].file.src.split(",")[1])
                    }
                     console.log(arr)
                    
                     if(arr.length==0){
                         arr=""
                     }else{
                        arr=JSON.stringify(arr)
                     }
                    //  console.log(arr)
                     
                    //  console.log(arr)

                    var data={
                        title:this.titlemsg,
                        content :this.articlemsg,
                        picBase64StrList:arr  
                    }


                  this.axios.post("discovery/publishArticle",this.qs.stringify(data)).then(response=>{
                      console.log(response)
                      if(response.data.success==true){
                         Toast({
                              message: "发表文章成功",
                              duration: 500
                            });
                            this.$router.go(-1)
                      }
                  })
                }
            }
        
    },
}
</script>
<style lang="scss" scoped>
    .sendartcile{
        padding-top: 45px;
        .header{
            width: 100%;
            height: 45px;
            background-color: #FFB7B7;
            position: fixed;
            top: 0;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            i{
                line-height: 45px;
                color: #fff;
            }
            h3{
                font-size:18px;
                font-family:PingFangSC;
                font-weight:600;
                color:rgba(255,255,255,1);
                line-height: 45px;
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
            background-color: #fff;
            margin: 5px;
        }
         .app-bg >>>img{
        width: 100%;
        height: 100%;
        -webkit-transform: scale(1.03);
        -moz-transform: scale(1.03);
        -ms-transform: scale(1.03);
        -o-transform: scale(1.03);
        transform: scale(1.03);
    }
    textarea {
        padding: 10px;
    }

    .text-length {
        font-size: 14px;
        z-index: 999;
        width: 100%;
        text-align: right;
        margin-bottom: 10px;
        color: #e4e4e4;
    }

    .warning {
        color: #fe9900;
    }

    .add-img {
        width: 100%;
        padding: 10px;
    }

    .add-img p {
        color: #999;
    }

    .mui-content {
        padding-bottom: 60px;
    }

    .mui-content .idea {
        margin-top: 8px;
        background-color: #FFFFFF;
    }

    .good-item {
        text-align: center;
        width: 33%;
        max-width: 100%;
        overflow: hidden;
        padding-right: 10px;
        padding-bottom: 10px;
        float: left;
    }

    .good-item span {
        font-size: 15px;
        height: 30px;
        line-height: 30px;
        border-radius: 50px;
        display: block;
        width: 100%;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border: 1px solid #CCCCCC;
    }

    .mui-table {
        padding-top: 10px;
        color: #333;
        padding-left: calc(0.5% + 10px);
    }

    .h-line-behind {
        line-height: 40px;
        padding-left: 10px;
    }

    .question {
        border: 0;
        margin-bottom: 10px;
    }

    .add {
        display: inline-block;
        margin-bottom: 20px;
    }

    .add-image {
        padding-top: 15px;
        margin-left: 10px;
        width: 80px;
        top: 20px;
        height: 80px;
        border: 1px dashed rgba(0, 0, 0, .2);
    }

    .add-image .icon-camera {
        font-size: 24px;
    }

    .good-item .choose {
        color: #fff;
        background-color: #87582E;
        color: #FFF;
        border: 0;
    }

    .mui-btn-block {
        border: 0;
        border-radius: 0;
        background-color: #87582E;
        color: #fff;
        margin-bottom: 0;
        bottom: 0;
    }

    .mui-buttom {
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 999;

    }

    /*九宫格*/
    .img-list {
        overflow: hidden;
    }

    .img-list > li {
        float: left;
        width: 32%;
        text-align: center;
        // padding-top: 31%;
        height: 80px;
        margin-left: 1%;
        margin-top: 1%;
        position: relative;
    }
    .img-list > li> .imglist{
      width: 60px;
      // height: 50px;
      height: 60px;
    }

    .img-list > li > div {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .img-list > li > div .app-bg {
        width: 100%;
        height: 100%;
    }

    .mui-fullscreen {
        z-index: 9999;
    }

    .del {
        position: absolute;
        // font-weight: 900;
        width: 18px;
        height: 18px;
        background-color: #333;
        color: white;
        top: 0;
        right: 0;
        z-index: 999;
        text-align: center;
        line-height: 18px;
        border-radius: 18px;
    }
    }
</style>