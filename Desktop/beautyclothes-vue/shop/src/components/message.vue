<template>
    <div class='messadebox'>
       <div class="header">
           <div class="headertop">
               <span>消息</span>
               <img src="../assets/newimg/shezhi.png" alt="">
           </div>
           <p class="noreadingmsg">7条消息未读</p>
           <div class="middlemsg">
               <ul class="smallingbox">
                   <li> <img src="../assets/newimg/点赞.png" alt="">
                    <p>点赞</p>
                    </li>
                   <li>
                       <img src="../assets/newimg/评论.png" alt="">
                       <p>评论</p>
                   </li>
                   <li>
                       <img src="../assets/newimg/推荐.png" alt="">
                       <p>推荐</p>
                   </li>
               </ul>
           </div>
       </div>

       <div class="container">
        
        <ul>
            <li class="list-item " v-for="(item,index) in list " :key="index" :data-type="activeSwiper == index ? 1 : 0">
                <div class="list-box" @touchstart.capture="touchStart" :data-index="index" @touchend.capture="touchEnd" @click="skip">
                    <img class="list-img" src="../assets/img/goodsinfopic1.jpg" alt="">
                    <div class="list-content">
                        <p class="title">{{item.title}}</p>
                        <p class="tips">{{item.tips}}</p>
                        <p class="time">{{item.time}}</p>
                    </div>
                </div>
                <div class="delete" @click="deleteItem" :data-index="index">删除</div>
            </li>
        </ul>
    </div>
    </div>
</template>
<script>
 export default{
		data () {
			return {
				list : [
					{
						title : 'Chrome更新了' ,
						imgUrl : './static/images/Chrome.png' ,
						tips : '不再支持Flash视频播放' ,
						time : '上午 8:30'
					},
					{
						title : '电影新资讯' ,
						imgUrl : './static/images/Sina.png' ,
						tips : '电影《红海行动》上映以来票房暴涨，很多国人表示对国产电影有了新的改观' ,
						time : '上午 12:00'
					},
                    {
						title : '聚焦两会·共筑中国梦' ,
						imgUrl : './static/images/video.png' ,
						tips : '习近平代表的两会故事' ,
						time : '下午 17:45'
                    },
                    {
						title : '微信团队' ,
						imgUrl : './static/images/Wechat.png' ,
						tips : '您的帐号有异常登录，如非本人操作，请及时修改密码' ,
						time : '昨天'
                    }
				],
				startX : 0,
				endX : 0,
                activeSwiper: -1, //当前活动的滑块
			}
		},
		methods : {
			//跳转
			skip(){
				if( this.checkSlide() ){
					this.activeSwiper = -1;
                }else{
                    // alert('You click the slide!')
                    this.$router.push({path:'/chatpage'})
                }
			},
			//滑动开始
			touchStart(e){
				this.startX = e.touches[0].clientX;
			},
			//滑动结束
			touchEnd(e){
				this.endX = e.changedTouches[0].clientX;
				if(this.startX - this.endX > 30){
					this.activeSwiper = e.currentTarget.dataset.index;
				}
				if(this.startX - this.endX < -30){
					this.activeSwiper = -1;
				}
				this.startX = 0;
				this.endX = 0;
			},
            //判断当前是否有滑块处于滑动状态
            checkSlide(){
				return this.activeSwiper > -1;
            },
			//删除
			deleteItem(e){
				let index = e.currentTarget.dataset.index;
				this.activeSwiper = -1;
				this.list.splice(index,1);
			}
		}
    }
</script>
<style lang="scss" scoped>
    .messadebox{
        // margin: 17px;
        // width: 100%;
         overflow: hidden;
        .header{
            width: 100%;
            height: 143px;
            background-color: #FFB7B7;
            padding: 10px;
            position: relative;
            .headertop{
                display: flex;
                justify-content: space-between;
                // margin-top: 20px;
                img{
                    width: 28px;
                    height: 28px;
                    vertical-align:middle;
                }
                span{
                    font-size: 20px;
                    color:rgba(255,255,255,1);
                }
            }
            .noreadingmsg{
                font-size:14px;
                color:rgba(255,255,255,1);
            }
            .middlemsg{
                position: absolute;
                width:342px;
                height:96px;
                background:rgba(255,255,255,1);
                box-shadow:0px 2px 6px 0px rgba(0,0,0,0.1);
                border-radius:10px;
                bottom: -25px;
                left: 50%;
                transform: translateX(-50%);
                .smallingbox{
                    display: flex;
                    width: 100%;
                    text-align: center;
                    margin-top: 20px;
                    li{
                        width: 33.33%;
                        img{
                            width: 50px;
                            height: 50px;
                        }
                    }
                }
            }
        }

    .container{
        margin-top: 35px;
    }
    .page-title{
        text-align: center;
        font-size: 17px;
        padding: 10px 15px;
        position: relative;
       
    }
    .page-title:after{
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #ccc;
        color: #ccc;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        z-index: 2;
    }
    .list-item{
        position: relative;
        height: 63px;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        margin-bottom: 6px;
    }
    .list-item[data-type="0"]{
        transform: translate3d(0,0,0);
    }
    .list-item[data-type="1"]{
        transform: translate3d(-2rem,0,0);
    }
    .list-item:after{
        content: " ";
        position: absolute;
        left: 0.2rem;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #ccc;
        color: #ccc;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        z-index: 2;
    }
    .list-box{
        // padding: 0.2rem;
        width: 100%;
        height: 65px;
        background: #fff;
        display: flex;
        align-items: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        justify-content: flex-end;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 6px;
        left: 0;
        font-size: 0;
        padding: 5px 16px;
        // margin-bottom: 6px;
        p{
            margin: 0;
            padding: 0;
        }
    }
    .list-item .list-img{
        display: block;
        width: 51px;
        height:51px;
        border-radius: 51px;
    }
    .list-item .list-content{
        padding: 0.1rem 0 0.1rem 0.2rem;
        position: relative;
        flex: 1;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        overflow: hidden;
    }
    .list-item .title{
        display: block;
        color:#4D4D4D;
        font-family:PingFang-SC;
        overflow: hidden;
        font-size: 16px;
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .list-item .tips{
        display: block;
        overflow: hidden;
        line-height: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size:12px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(129,129,129,1);
    }
    .list-item .time{
        display: block;
        font-size: 12px;
        position: absolute;
        right: 0;
        top: 0.1rem;
        color: #666;
    }
    .list-item .delete{
        width: 2rem;
        height: 100%;
        background: #ff4949;
        font-size: 17px;
        color: #fff;
        text-align: center;
        line-height: 63px;
        position: absolute;
        top:0;
        right: -2rem;
    }

    }
</style>
