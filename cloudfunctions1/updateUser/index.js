// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.data,'data')
  const {data, id} = event;
  let result = await db.collection("User").doc(id).update({
    data,
	 })
	 if(result.stats.updated){
		return {result, code: 200}
	 }
}