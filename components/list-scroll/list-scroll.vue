<template>
	<view class="scroll">
		<scroll-view scroll-y="true" class="list-scroll">
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
