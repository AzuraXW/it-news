<template>
	<swiper class="home-swiper" :current="tabActiveIndex" @change="onSwiperChange">
		<swiper-item
		class="swiper-item"
		v-for="(item, index) in tabList">
			<list-item :list="cacheListData[index]"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		name:"list",
		props: {
			// 首页头部所有导航列表
			tabList: {
				type: Array,
				default: []
			},
			// 首页头部被激活导航的索引
			tabActiveIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				cacheListData: {}
			};
		},
		watch: {
			tabList() {
				this.getList(this.tabActiveIndex)
			}
		},
		methods: {
			onSwiperChange (e) {
				// 获取到当前swiper-item的索引
				const { current } = e.detail
				// 向父组件传递索引
				this.$emit('swiperChange', current)
				// 切换时重新获取数据
				this.getList(current)
			},
			async getList (current) {
				const { data: article } = await this.$api.getList({
					classify: this.tabList[current].name
				})
				this.$set(this.cacheListData, current, article)
			}
		},
		components: {
			listItem
		}
	}
</script>

<style lang="scss">
.home-swiper{
	height: 100%;
	.swiper-item{
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
		.list-scroll{
			height: 100%;
			overflow: hidden;
		}
	}
}
</style>
