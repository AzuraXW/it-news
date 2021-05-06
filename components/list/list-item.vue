<template>
	<list-scroll>
		<list-card
		v-for="item in list"
		:mode="item.mode"
		:item="item"
		></list-card>
	</list-scroll>
</template>

<script>
	export default {
		name:"list",
		props: {
			list: {
				type: Array,
				default: []
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
