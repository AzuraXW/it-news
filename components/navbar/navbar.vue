<template>
	<view class="navbar-wrapper">
		<view class="navbar">
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<view class="navbar-content" :style="{
				width: navbarWidht + 'px',
				height: navbarHeight + 'px',
			}">
				<view class="navbar-search">
					<view class="navbar-search-icon">
						<uni-icons type="search"></uni-icons>
					</view>
					<view class="navbar-search-text">
						uni-app、vue
					</view>
				</view>
			</view>
		</view>
		<view :style="{height: fillHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		name:"navbar",
		data() {
			return {
				statusBarHeight: 0,
				navbarHeight: 45,
				navbarWidht: 0,
				fillHeight: 45
			};
		},
		created() {
			// 设置状态栏高度
			const systemInfo = uni.getSystemInfoSync()
			this.statusBarHeight = systemInfo.statusBarHeight
			this.navbarWidht = systemInfo.screenWidth
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.navbarHeight = (menuButtonInfo.bottom - systemInfo.statusBarHeight)
			+ (menuButtonInfo.top - systemInfo.statusBarHeight)

			this.navbarWidht = menuButtonInfo.left
			this.fillHeight = this.navbarHeight + this.statusBarHeight
			// #endif
		}
	}
</script>

<style lang="scss">
.navbar-wrapper{
	.navbar{
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		background-color: $mk-base-color;
		.navbar-content{
			padding: 0 15px;
			height: 45px;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			.navbar-search{
				display: flex;
				align-items: center;
				padding: 0 15px;
				width: 100%;
				height: 30px;
				border-radius: 30px;
				background-color: #fff;
				.navbar-search-icon{
					margin-right: 5px;
				}
				.navbar-search-text{
					font-size: 12px;
					color: #666;
				}
			}
		}
	}
}
</style>
