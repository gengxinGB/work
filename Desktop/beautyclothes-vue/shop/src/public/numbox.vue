<template>
  
            <div class="mui-numbox" data-numbox-min='1'>
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number"  ref="numbox"  readonly/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
			</div>   
</template>
<script>
import mui from '../assets/mui/js/mui.js'
export default {
   mounted() {
	    mui('.mui-numbox').numbox()
   },
 
   props:['convalue','goodsid']
  
   
}
</script>

<style lang="scss" scoped>

</style>
