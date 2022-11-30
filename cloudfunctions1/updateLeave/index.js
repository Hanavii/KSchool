// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let {data, id} = event;
  console.log(data,id,'leaveList')
  await db.collection("leaveList").doc(id).update({
    data,
   });
  return {id, code: 200};
}