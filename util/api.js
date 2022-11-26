let ajaxTimes = 0
// const log = require('./log.js');
// let Authorization = wx.getStorageSync('Authorization');
// let userInfo = wx.getStorageSync('userInfo') || false
// let Authorization = "000";
// 统一接口处理
wx.api = {
  // get请求
  async AllRequest(data, name) {
    return get(name, data);
  },
// get请求
  async getRequest(data, name) {
    return get(name, data);
  },
  // post请求
  async PostRequest(data, name, id) {
    return post(name, data, id);
  },
}

// request请求
function get(name, data = {}, isLogin) {
  // 拦截除登录接口以外，没有令牌的接口
  // if (!Authorization) {
  //   console.log("--- 被拦截了", url, Authorization)
  //   wx.stopPullDownRefresh()
  //   return;
  // }
  ajaxTimes++
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name,
      data,
    }).then(res => {
      // wx.setStorageSync('openid', res.result.openid);
      resolve(res.result);
     
    }).catch(err => {
      // log.warn('网络异常：', 'url:', url, '参数：', data, '返回数据：', res.data, 'method: GET,ContentType:默认', '用户数据：', userInfo);
      reject(err);
      wx.showToast({
        title: '调用接口失败，请联系工作人员',
      });
    console.log(err,'失败原因：先排查接口地址是否写错或服务端出错');
    }).finally(() => {
      ajaxTimes--
      if (ajaxTimes === 0) {
        wx.hideLoading()
        // wx.stopPullDownRefresh()
      }
      // const accountInfo = wx.getAccountInfoSync();
      // log.setFilterMsg(accountInfo.miniProgram.version);
    })
  }).catch((error) => {
    wx.showToast({
      title: error.message,
    })
    return
  });
}
// request请求
function post(name, data = {}, id) {
  // 拦截除登录接口以外，没有令牌的接口
  // if (!Authorization) {
  //   console.log("--- 被拦截了", url, Authorization)
  //   wx.stopPullDownRefresh()
  //   return;
  // }
  ajaxTimes++
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name,
      data: {
        data,
        id,
      },
    }).then(res => {
      // wx.setStorageSync('openid', res.result.openid);
      // console.log(res.result, 'addLeave res.data')
      resolve(res.result);
     
    }).catch(err => {
      // log.warn('网络异常：', 'url:', url, '参数：', data, '返回数据：', res.data, 'method: GET,ContentType:默认', '用户数据：', userInfo);
      reject(err);
      wx.showToast({
        title: '调用接口失败，请联系工作人员',
      });
    console.log(err,'失败原因：先排查接口地址是否写错或服务端出错');
    }).finally(() => {
      ajaxTimes--
      if (ajaxTimes === 0) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
      // const accountInfo = wx.getAccountInfoSync();
      // log.setFilterMsg(accountInfo.miniProgram.version);
    })
  }).catch((error) => {
    wx.showToast({
      title: error.message,
    })
    return
  });
}

