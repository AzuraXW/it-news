'use strict';
const db = uniCloud.database()
const $ = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event
	// 获取用户信息
	let is_likes = null;
	let userinfo = await db.collection('user').doc(user_id).get()
	let article_likes_ids = userinfo.data[0].article_likes_ids
	let actFunc = null
	if (article_likes_ids.includes(article_id)) {
		actFunc = $.pull(article_id)
		is_likes = false
	} else {
		actFunc = $.addToSet(article_id)
		is_likes = true
	}
	
	await db.collection('user').doc(user_id).update({
		article_likes_ids: actFunc
	})

	//返回数据给客户端
	return {
		code: 200,
		msg: is_likes ? '收藏成功' : '取消收藏',
		is_likes,
		userinfo
	}
};
