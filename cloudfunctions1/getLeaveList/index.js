// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const {
    id
  } = event;
  if (id) {
    const result = await db.collection("leaveList").doc(id).get()
    result.code = 200
    return result
  } else {
    let result = await db.collection("leaveList").get();
    const list = result.data.filter(v => v.userInfo.openId === wxContext.OPENID);
    if (list.length > 0) {
      return {
        data: list,
        code: 200 
      };
    } else {
      return {
        data: [],
        code: 201 // 数据为空时返回201
      }
    }
  }
}