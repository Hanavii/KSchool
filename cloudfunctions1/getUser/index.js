// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let result = await db.collection("User").get();
    const list = result.data.filter(v => v.userInfo.openId === wxContext.OPENID);
    if (list.length > 0) {
      return {
        data: list[0],
        code: 200 
      };
    } else {
      return {
        data: [],
        code: 201 
      }
    }
}