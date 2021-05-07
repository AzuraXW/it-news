'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const { 
		classify,
		page = 1,
		pageSize = 6
	} = event
	let match = {}
	if (classify !== '全部') {
		match = {
			classify
		}
	}
	let list = await db.collection('article')
	.aggregate()
	.match(match)
	.skip(pageSize * (page - 1))
	.limit(pageSize)
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
