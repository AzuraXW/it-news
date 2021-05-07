<template>
	<view class="collection-btn" @click.stop="collection(article_id)">
		<uni-icons :type="iconType" size="20" class="icon" color="#bca73f"></uni-icons>
	</view>
</template>

<script>
	export default {
		name:"likes",
		props: {
			article_id: {
				type: String
			},
			likes: {
				type: Boolean
			}
		},
		data() {
			return {
				isLikes: false
			};
		},
		created() {
			this.isLikes = this.likes
		},
		methods: {
			async collection (article_id, user_id = '608e55967115bc000163dcf5') {
				uni.showLoading()
				const res = await this.$api.up({					article_id,
					user_id
				})
				uni.hideLoading()
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
				this.isLikes = res.is_likes
			}
		},
		computed: {
			iconType () {
				return this.isLikes ? 'heart-filled' : 'heart'
			}
		}
	}
</script>

<style lang="scss">
</style>
