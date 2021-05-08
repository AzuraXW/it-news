'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		searchWords
	} = event

	// 获取用户信息，以及收藏数组
	let userinfo = await db.collection('user').doc(user_id).get()
	let article_likes_ids = userinfo.data[0].article_likes_ids
	console.log(new RegExp(searchWords, 'g'))
	// 查询
	let list = await db.collection('article')
	.aggregate()
	.match({
		title: new RegExp(searchWords, 'g')
	})
	.addFields({
		is_likes: $.in(['$_id', article_likes_ids])
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
