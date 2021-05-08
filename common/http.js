
export default function http (options) {
	const data = {
		user_id: '608e55967115bc000163dcf5',
		...options.data
	}
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: options.url,
			data
		}).then((res) => {
			if (res.result.code === 200) {
				resolve(res.result)
			} else {
				reject(res.result)
			}
		}).catch(err => {
			reject(err)
		})
	})
}
