'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const { classify } = event
	let list = await db.collection('article')
	.aggregate()
	.match({
		classify
	})
	.project({
		content: false
	})
	.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '获取数据成功',
		data: list.data
	}
};
