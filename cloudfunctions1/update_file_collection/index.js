// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.data,'data')
  let {data, id} = event;
  data.release_num += 1
  let result = await db.collection("file_collection").doc(id).update({
    data,
	 })
	 if(result.stats.updated){
		return {result, code: 200}
	 }
}