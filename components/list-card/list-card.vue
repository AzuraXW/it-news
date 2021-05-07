<template>
	<view class="list-wrapper">
		<view class="list-card" v-if="mode === 'base'">
			<view class="card-images">
				<image :src="item.cover[0]" mode="aspectFill" :lazy-load="true" fade-show></image>
			</view>
			<view class="card-content">
				<view class="card-title">
					<text>{{ item.title }}</text>
					<likes :article_id="item._id" :likes.sync="item.is_likes"></likes>
				</view>
				<view class="card-description">
					<view class="card-classification-tag">
						{{ item.classify }}
					</view>
					<view class="card-browse-count">
						{{ item.browse_count }} 浏览
					</view>
				</view>
			</view>
		</view>
		<view class="list-card mode-column" v-if="mode === 'column'">
			<view class="card-title">
				<text>{{ item.title }}</text>
				<likes :article_id="item._id" :likes.sync="item.is_likes"></likes>
			</view>
			<view class="card-content">
				<view class="card-images">
					<image :src="src" mode="aspectFill" v-for="(src, index) in item.cover.slice(0, 3)" :key="index" :lazy-load="true" fade-show></image>
				</view>
				<view class="card-description">
					<view class="card-classification-tag">
						{{ item.classify }}
					</view>
					<view class="card-browse-count">
						{{ item.browse_count }} 浏览
					</view>
				</view>
			</view>
		</view>
		<view class="list-card mode-large" v-if="mode === 'image'">
			<view class="card-images">
				<image :src="item.cover[0]" mode="aspectFill" :lazy-load="true" fade-show></image>
			</view>
			<view class="card-content">
				<view class="card-title">
					<text>{{ item.title }}</text>
					<likes :article_id="item._id" :likes.sync="item.is_likes"></likes>
				</view>
				<view class="card-description">
					<view class="card-classification-tag">
						{{ item.classify }}
					</view>
					<view class="card-browse-count">
						{{ item.browse_count }} 浏览
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"list-card",
		props: {
			mode: {
				type: String,
				default: 'default'
			},
			item: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.list-wrapper{
	/* margin-left: 15px;
	margin-right: 15px;
	&:not(:last-child){
		margin-bottom: 15px;
	} */
	padding: 15px;
	.list-card{
		padding: 10px;
		border-radius: 5px;
		box-shadow: 0 0 8px 2px #e8e0e0;
		display: flex;
		overflow: hidden;
		position: relative;
		.card-images{
			margin-right: 10px;
			image{
				width: 80px;
				height: 80px;
				display: block;
			}
		}
		.card-title{
			display: flex;
			text{
				flex: 1;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
		}
		.card-content{
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			.card-description{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				color: #999;
				.card-classification-tag{
					padding: 2px 8px;
					border-radius: 22px;
					border: 1px solid red;
				}
			}
		}
		&.mode-column{
			flex-direction: column;
			.card-images{
				display: flex;
				justify-content: space-between;
				margin: 15px 0;
				image{
					width: 30%;
					border-radius: 5px;
				}
			}
		}
		&.mode-large{
			flex-direction: column;
			.card-images{
				margin-right: 0;
				image{
					width: 100%
				}
			}
			.card-title{
				margin: 15px 0;
			}
		}
	}
}
</style>
