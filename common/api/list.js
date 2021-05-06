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
