<template>
	<swiper class="home-swiper" :current="tabActiveIndex" @change="onSwiperChange">
		<swiper-item
		class="swiper-item"
		v-for="(item, index) in tabList">
			<list-item :list="cacheListData[index] || []" :load="loadInfo[index]"></list-item>
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
				cacheListData: {},
				pageSize: 6,
				loadInfo: {}
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
				if (!this.cacheListData[current] || this.cacheListData[current].length === 0) {
					this.getList(current)
				}
			},
			async getList (current) {
				if (!this.loadInfo[current]) {
					this.$set(this.loadInfo, current, {
						page: 1,
						loading: 'loading'
					})
				} else {
					this.loadInfo[current].page++;
				}
				const { data: article } = await this.$api.getList({
					user_id: '608e55967115bc000163dcf5',
					classify: this.tabList[current].name,
					page: this.loadInfo[current].page,
					pageSize: 6
				})
				if (article.length === 0) {
					this.loadInfo[current].loading = 'noMore';
					return
				}
				if (!this.cacheListData[current] || this.cacheListData[current].length === 0) {
					this.$set(this.cacheListData, current, article)
				} else {
					this.cacheListData[current].push(...article)
				}
			},
			loadMore () {
				if (this.loadInfo[this.tabActiveIndex].loading === 'noMore') return
				this.getList(this.tabActiveIndex)
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
