<template>
	<view class="label-setting">
		<skeleton :row="4" animate :loading="loading" title>
			<view>
				<view class="label-content">
					<view class="label-content__header">
						<text>我的标签</text>
						<text class="edit" @click="tagOperate">{{edit ? '保存' : '编辑'}}</text>
					</view>
					<view class="label_items">
						<view
						class="item"
						v-for="(item, index) in myTag"
						:key="item.id"
						>
							{{item.name}}
							<uni-icons type="clear" class="del-icon" color="red" v-show="edit" @click="clearTag(item, index)"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</skeleton>
		
		<skeleton :row="4" animate :loading="loading" title>
			<view>
				<view class="label-content">
					<view class="label-content__header">
						<text>推荐标签</text>
					</view>
					<view class="label_items">
						<view
						class="item"
						v-for="(item, index) in recommendTag"
						:key="item.id"
						@click="addTag(item, index)"
						>
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
		</skeleton>	
	</view>
</template>

<script>
	import skeleton from '../../components/xinyi-skeleton/skeleton.vue'
	export default {
		data() {
			return {
				edit: false,
				myTag: [],
				recommendTag: [],
				loading: true
			};
		},
		async created() {
			await this.getLabel()
			this.loading = false
		},
		methods: {
			async getLabel () {
				const { data: { data } } = await this.$api.getLabel({
					type: 'all'
				})
				this.myTag = data.filter((tag, index) => {
					return tag.current
				})
				this.recommendTag = data.filter((tag, index) => {
					return !tag.current
				})
			},
			// 删除标签
			clearTag (tag, index) {
				this.myTag.splice(index, 1)
				this.recommendTag.push(tag)
			},
			// 添加标签
			addTag (tag, index) {
				if (!this.edit) return
				this.myTag.push(tag)
				this.recommendTag.splice(index, 1)
			},
			//
			async tagOperate () {
				if (this.edit) {
					console.log(!this.edit)
					if (!this.edit) return
					// 更新用户的标签
					const label_ids = this.myTag.map((item) => {
						return item._id
					})
					uni.showLoading()
					const res = await this.$api.updateLabels({
						label_ids
					})
					uni.hideLoading()
					uni.showToast({
						title: '保存成功',
						icon: 'none'
					})
					uni.$emit('tableChange', label_ids)
				}
				this.edit = !this.edit
			}
		},
		components: {
			skeleton
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f5f5f5;
}
.label-setting{
	background-color: #fff;
	.label-content{
		.label-content__header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #f5f5f5;
			text{
				display: block;
				padding: 10px 20px;
				&.edit{
					color: red;
				}
			}
		}
		.label_items{
			display: flex;
			flex-wrap: wrap;
			padding: 20px;
			.item{
				position: relative;
				font-size: 14px;
				padding: 5px 10px;
				border-radius: 5px;
				border: 1px solid #555555;
				margin-right: 18px;
				margin-bottom: 18px;
				.del-icon{
					border: 10px solid transparent;
					position: absolute;
					right: 0px;
					top: 0px;
					transform: translate(50%, -50%);
				}
			}
		}
	}
}
</style>
