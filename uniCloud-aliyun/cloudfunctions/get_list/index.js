'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		classify,
		page = 1,
		pageSize = 6
	} = event
	let match = {}
	// 非 全部 分类才进行限制查询
	if (classify !== '全部') {
		match = {
			classify
		}
	}
	// 获取用户信息，以及收藏数组
	let userinfo = await db.collection('user').doc(user_id).get()
	let article_likes_ids = userinfo.data[0].article_likes_ids
	
	// 查询
	let list = await db.collection('article')
	.aggregate()
	.match(match)
	.addFields({
		is_likes: $.in(['$_id', article_likes_ids])
	})
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
