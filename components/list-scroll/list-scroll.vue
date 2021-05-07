<template>
	<view class="scroll">
		<scroll-view scroll-y="true" class="list-scroll" @scrolltolower="onScrollBottom">
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"list-scroll",
		data() {
			return {
				
			};
		},
		methods: {
			onScrollBottom () {
				let parent = this.$parent
				while (parent.$options.name !== 'list') {
					parent = parent.$parent
				}
				parent.loadMore()
			}
		}
	}
</script>

<style lang="scss">
.scroll{
	flex: 1;
	height: 100%;
	overflow: hidden;
	box-sizing: border-box;
	.list-scroll{
		height: 100%;
		box-sizing: border-box;
	}
}
</style>
