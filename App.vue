<script>
	export default {
		globalData: {
			shopCartGoodsList: []
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style >
	/*每个页面公共css */
	view,scroll-view,text {
	  box-sizing: border-box;
	  -webkit-box-sizing: border-box;
	}
	page {
	  font-size: 28rpx;
	}
	body,uni-page-body {
		height: 100%;
	}
	.container {
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: space-between;
	  padding: 200rpx 0;
	  box-sizing: border-box;
	} 
	image {
	  width: auto;
	  height: auto;
	}
	.font12 {
	  font-size: 24rpx;
	}
	.ml10 {
		margin-left: 20rpx;
	}
	.ml15 {
		margin-left: 30rpx;
	}
	.mt10 {
		margin-top: 20rpx;
	}
	.mb10 {
		margin-bottom: 20rpx;
	}
</style>
