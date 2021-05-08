import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		searchHistorys: uni.getStorageSync('searchHistorys') || []
	},
	mutations: {
		setSearchHistorys (state, history) {
			if (state.searchHistorys.indexOf(history) >=0 ) return
			state.searchHistorys.unshift(history)
			uni.setStorageSync('searchHistorys', state.searchHistorys)
		},
		cleanHistorys (state) {
			state.searchHistorys = []
			uni.removeStorageSync('searchHistorys')
		}
	}
})

export default store