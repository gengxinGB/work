
<template>
	<div class="geolocation">
		 <!-- <h1>Current location is:</h1> 
		 <h2>Longitude:{{location.longitude}}</h2>
		 <h2>Latitude:{{location.latitude}}</h2>
        <h2>{{city}}</h2> -->
	</div>
</template>
 
<script>
	import LocationSdk from "../../commons/location-sdk.js";
    import { send } from "q";
	export default {
		name: "GeoLocation",
		data() {
			return {
				location: {
                    // 经度
                    longitude:"-1",
                    // 纬度
					latitude:"-1"
                },
                city:""
			};
		},
		// created() {
			
		// },
		created: function() {
            console.log("start to get location now.");
            // console.log(res)
			let self = this;
			LocationSdk.getLocation({
				success: res => {
                    console.log("current location is:" + res);
                    self.location = res;
					console.log(this.location)
					 this.sendapi()
				},
				error: res => {
					console.log("failed to get location:" + res);
					self.location = {
						//  longitude:"32.046764",
						//  latitude:"118.736105"
						longitude:"-1",
						latitude:"-1"
					};
				}
            });
            // this.axios.get("http://api.map.baidu.com/reverse_geocoding/v3/?ak=8AxZDuCHACGEIzHKhZYuVqGTs5t7QMNL&output=json&coordtype=wgs84ll&location=32.046764,118.736105").then(response=>{
            //     console.log(response)
            // })
        },
        methods: {
            //发送百度api
            sendapi:function(){
				//  alert(this.location.longitude)
				//  alert(this.location.latitude)
                this.$http.jsonp("http://api.map.baidu.com/reverse_geocoding/v3/?ak=8AxZDuCHACGEIzHKhZYuVqGTs5t7QMNL&output=json&coordtype=wgs84ll&location="+this.location.latitude+","+this.location.longitude+"").then(response=>{
                    console.log(response)
					console.log(response.data.result.addressComponent.city)
					// alert(1111111111)
					this.city=response.data.result.addressComponent.city
					// 存储到vuex中
				   this.$store.commit("setcityname",this.city)
				   localStorage.setItem("cityname",this.city)
					// alert(this.city+"999999999")
					// 开始发送数据
					// this.sendparent()
                })
            },
           
        },
	};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.geolocation {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
 
	.geolocation h1,
	.geolocation h2 {
		width: 100%;
	}
</style>