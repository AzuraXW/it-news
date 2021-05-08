import debounce from './debounce.js'
import { getSearch } from '../common/api/list.js'

const search = debounce(async function (searchWords, callback) {
	uni.showLoading({
		title: '搜索中...'
	})
	const res = await getSearch({
		searchWords
	})
	uni.hideLoading()
	callback(res)

}, 1000, true)

export default search