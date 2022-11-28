
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const data = event;
  let result = await db.collection("file_collection").add({
    data,
   }).then();
   if(result._id) {
    result.code = 200 // 成功返回200
   } else {
    result.code = 400 // 参数错误返回400
    result.message = '参数错误'
   }
  return result;
}