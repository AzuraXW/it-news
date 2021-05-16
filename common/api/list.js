import http from '../http.js'

export function getLabel (data) {
	return http({
		url: 'get_label',
		data
	})
}

export function getList (data) {
	return http({
		url: 'get_list',
		data
	})
}

export function up (data) {
	return http({
		url: 'update_likes',
		data
	})
}

export function getSearch (data) {
	return http({
		url: 'get_search',
		data
	})
}

export function updateLabels (data) {
	return http({
		url: 'update_labels',
		data
	})
}
