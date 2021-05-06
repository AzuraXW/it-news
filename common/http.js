export default function http (options) {
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: options.url,
			data: options.data
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
