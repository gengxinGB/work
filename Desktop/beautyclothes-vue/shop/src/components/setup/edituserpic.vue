<template>
    <div class="edituserpicbox">
        <div class="header">
            <i class="mui-icon mui-icon-back" @click="bank"></i>
            <h4>修改头像</h4>
            <span @click="save"> 保存</span>
        </div>
        <div class="msgbox">
            <input @change="fileChange($event)" type="file" id="upload_file"  style="display: none"  accept="image/*"/>
            <div class="dianji" @click="fileup">
                 <i class="mui-icon mui-icon-camera"></i> 
                  <p class="font13">添加图片</p>
            </div>
            <ul class="imgbox" v-show="imgList.length">
              <li v-for="(url,index) in imgList" :key="index">
            <!-- <i class="del" @click.stop="delImg(index)"> x </i> -->
            <!-- //del删除样式，icon字体图标需要自己找哦 -->
              <img class="imglist" :src="url.file.src">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            imgList:[],
            limit:1
        }
    },
    methods: {
        bank:function(){
            this.$router.go(-1)
        },
        // 点击保存头像
        save:function(){
            if(this.imgList.length==0){
                Toast({
                  message: '请先上传头像',
                  duration: 500
                });
                return
            }
            var headPicBase64Str=this.imgList[0].file.src.split(",")[1]
            console.log(headPicBase64Str)
            var data={
                headPicBase64Str:headPicBase64Str
            }
            this.axios.post('cusPersonalCenter/updateHeadPic',this.qs.stringify(data)).then(response=>{
                console.log(response)
                if(response.data.success==true){
                    Toast({
                         message: '修改成功',
                          duration: 500
                    })
                    this.$router.go(-1)
                }else if(response.data.success==false){
                     Toast({
                          message: response.data.errorMsg,
                          duration: 500
                    })
                }
                
             })

        },


        fileup:function(){     
              document.getElementById('upload_file').click();
        },
         fileChange(el) {
             console.log(el)
             if (!el.target.files[0].size) return;

             this.fileList(el.target);
             el.target.value = ''
             
         },
             fileList(fileList) {
                let files = fileList.files;
                for (let i = 0; i < files.length; i++) {
                    //判断是否为文件夹
                    if (files[i].type != '') {
                        this.fileAdd(files[i]);
                    } else {
                        //文件夹处理
                        this.folders(fileList.items[i]);
                    }
                }
            },
                foldersAdd(entry) {
                let _this = this;
                entry.file(function (file) {
                    _this.fileAdd(file)
                })
            },
                 fileAdd(file) {
               this.imgList=[]
                if (this.limit !== undefined && this.limit < 0) return;
               
                //总大小
                this.size = this.size + file.size;
                //判断是否为图片文件
                if (file.type.indexOf('image') == -1) {
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
            }
    },
}
</script>
<style lang="scss" scoped>
    .edituserpicbox{
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
            background-color: #ffffff;
            height: 400px;
            padding: 10px;
            .dianji{
                text-align: center;
            }
            .imgbox{
                li{
                    list-style: none;
                    width: 160px;
                    height: 160px;
                    border-radius: 160px;
                    // text-align: center;
                    margin: auto;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                        // margin: auto;
                    }
                }
            }
        }
    }
</style>