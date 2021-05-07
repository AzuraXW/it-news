<template>
	<list-scroll>
		<list-card
		v-for="item in list"
		:mode="item.mode"
		:item="item"
		></list-card>
		<uni-load-more  v-if="loadingVisible" :status="loading" iconType="show"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		name:"list-item",
		props: {
			list: {
				type: Array,
				default: []
			},
			load: {
				type: Object
			}
		},
		computed: {
			loading () {
				return this.load ? this.load.loading : 'loading'
			},
			loadingVisible () {
				return this.list.length === 0 || this.list.length >= 6
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
