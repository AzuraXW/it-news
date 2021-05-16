<template>
	<view class="home">
		<navbar></navbar>
		<tab
		:list="navbarList"
		:swiperActiveIndex="currentSwiperIndex"
		@switchTab="onSwitchTab"
		></tab>
		<list
		class="home-list"
		:tab-list="navbarList"
		:tabActiveIndex="currentTabIndex"
		@swiperChange="onSwiperChange"
		></list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				// 导航列表
				navbarList: [],
				// 当前swiper-item的索引
				currentSwiperIndex: 0,
				// 当前导航的索引
				currentTabIndex: 0
			}
		},
		async onLoad() {
			await this.getNavbatList()
			uni.$on('tableChange', () => {
				this.getNavbatList()
				this.currentTabIndex = 0
			})
		},
		methods: {
			// 获取tab数据
			async getNavbatList () {
				const { data: { data } } = await this.$api.getLabel()
				data.unshift({
					name: '全部'
				})
				this.navbarList = data
			},
			onSwitchTab (args) {
				this.currentTabIndex = args[1]
			},
			// swiper切换事件处理
			onSwiperChange (current) {
				this.currentSwiperIndex = current
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
	}
	.home{
		display: flex;
		flex-direction: column;
		flex: 1;
		.cards{
			padding: 15px;
		}
		.home-list{
			flex: 1;
		}
	}
</style>
