<template>
	<view class="search-page">
		<navbar :isSearch="true" @input="onSearch" v-model="searchWords"></navbar>
		<!-- 搜索历史 -->
		<view class="search-history" v-if="isHistory">
			<view class="search-history__header">
				<text>搜索历史</text>
				<text class="clean-text" @click="$store.commit('cleanHistorys')">清空</text>
			</view>
			<view class="search-history__content">
				<view
				v-for="(item,index) in searchHistorys"
				:key="index" class="tag"
				@click="openHistory(item)">
					{{item}}
				</view>
				<view class="no-data" v-if="searchHistorys.length === 0">
					没有搜索历史
				</view>
			</view>
		</view>
		<!-- 搜索结果 -->
		<view class="search-results" v-else>
			<list-scroll v-if="searchResults.length > 0">
				<list-card
				v-for="item in searchResults"
				:mode="item.mode"
				:item="item"
				@click="setHistory"
				></list-card>
			</list-scroll>
			<view class="no-data" v-else>
				没有搜索结果
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import search from '../../utils/search.js'
	export default {
		data() {
			return {
				isHistory: true,
				searchResults: [],
				searchWords: ''
			};
		},
		methods: {
			// 搜索
			async onSearch (value) {
				if (value === '') {
					uni.hideLoading()
					this.isHistory = true
					return
				}
				this.isHistory = false
				const _self = this
				search(value, function(res) {
					// 这里因为要防抖，所以只能通过callback拿到返回值
					console.log(res)
					_self.searchResults = res.data
				})
			},
			setHistory () {
				this.$store.commit('setSearchHistorys', this.searchWords)
			},
			openHistory (searchWords) {
				// 当点击记录时，设置搜索关键字，并且发起搜索
				this.searchWords = searchWords
				this.onSearch(this.searchWords)
			}
		},
		mounted() {
		},
		computed: {
			...mapState(['searchHistorys'])
		}
	}
</script>

<style lang="scss">
.no-data{
	width: 100%;
	min-height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	color: #999;
}
.search-history{
	.search-history__header{
		border-bottom: 1px solid #ccc;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text{
			display: block;
			padding: 10px 20px;
			font-size: 14px;
		}
		.clean-text{
			color: red;
		}
	}
	.search-history__content{
		padding: 10px;
		display: flex;
		flex-wrap: wrap;
		.tag{
			padding: 5px 10px;
			border-radius: 5px;
			border: 1px solid green;
			margin: 0 20px 10px 0;
		}
		
	}
}
</style>
