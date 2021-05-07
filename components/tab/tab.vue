<template>
	<view class="tab">
		<scroll-view scroll-x class="tab-scroll">
			<view class="tab-scroll__box">
				<view 
				:class="{
					item: true,
					active: activeIndex === index
				}"
				v-for="(item, index) in list"
				:key="item._id"
				@click="switchTab(item, index)"
				>
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-scroll__icon">
			<uni-icons type="gear" size="25"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tab",
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			// 外部swiper滚动项的索引
			swiperActiveIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				activeIndex: 0
			};
		},
		methods: {
			// 点击tab
			switchTab (item, index) {
				if (index === this.activeIndex) return
				this.activeIndex = index
				this.$emit('switchTab', [item, index])
			}
		},
		watch: {
			swiperActiveIndex (newVal, oldVal) {
				this.activeIndex = newVal
				this.$emit('switchTab', [this.list[newVal], newVal])
			}
		}
	}
</script>

<style lang="scss">
.tab{
	border-bottom: 1px #ccc solid;
	background-color: #fff;
	display: flex;
	align-items: center;
	.tab-scroll{
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		.tab-scroll__box{
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
			height: 45px;
			.item{
				flex-shrink: 0;
				padding: 0 10px;
				font-size: 14px;
				color: #333;
				&.active{
					color: $mk-base-color;
				}
			}
		}
	}
	.tab-scroll__icon{
		width: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		&::before{
			content: '';
			display: block;
			position:absolute;
			left: 0;
			height: 30px;
			border-left: 1px #ddd solid;
		}
	}
}
</style>
