<template>
	<view class="navbar-wrapper" @click="goSearch">
		<view class="navbar">
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<view class="navbar-content"
			:style="{
				width: navbarWidht + 'px',
				height: navbarHeight + 'px',
			}"
			:class="{
				search: isSearch
			}"
			>
				<view class="back-btn" v-if="isSearch" @click="goBack()">
					<uni-icons type="arrowleft" size="22" color="#fff"></uni-icons>
				</view>
				<view class="navbar-search" v-if="!isSearch">
					<view class="navbar-search-icon">
						<uni-icons type="search"></uni-icons>
					</view>
					<view class="navbar-search-text">
						uni-app、vue
					</view>
				</view>
				<view class="navbar-search" v-else>
					<input
						type="text"
						placeholder="请输入搜索关键字"
						auto-focus
						class="search-input"
						v-model="val"
						@input="search"
					/>
				</view>
			</view>
		</view>
		<view :style="{height: fillHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		name:"navbar",
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			value: {
				type: String
			}
		},
		data() {
			return {
				statusBarHeight: 0,
				navbarHeight: 45,
				navbarWidht: 0,
				fillHeight: 45,
				val: ''
			};
		},
		watch: {
			// 监听外部搜索关键字的变化
			value (newVal) {
				this.val = newVal
			}
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
		},
		methods: {
			goSearch () {
				if (this.isSearch) return
				uni.navigateTo({
					url: '../../search/search'
				})
			},
			goBack () {
				uni.switchTab({
					url: '../../pages/tabbar/index/index'
				})
			},
			// 向父组件发送搜索的数据
			search (e) {
				const { value } = e.detail
				this.$emit('input', value)
			}
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
		z-index: 99;
		background-color: $mk-base-color;
		.navbar-content{
			padding: 0 15px;
			height: 45px;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			&.search{
				padding: 0;
				.navbar-search{
					margin-right: 10px;
					border-radius: 5px;
					.search-input{
						color: #aa9999;;
						font-size: 14px;
					}
				}
			}
			.back-btn{
				margin: 0 10px;
			}
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
