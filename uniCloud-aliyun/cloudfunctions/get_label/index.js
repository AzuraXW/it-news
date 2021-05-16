'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const { 
		user_id,
		type
	} = event
	
	
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	
	let match = {}
	if (type !== 'all') {
		match = {
			current: true
		}
	}
	
	let list = await db.collection('label')
	.aggregate()
	.addFields({
		current: $.in(['$_id', $.ifNull([userinfo.label_ids, []])])
	})
	.match(match)
	.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '获取数据成功',
		data: list
	}
};
