//app.js
App({
  serverUrl: "https://kpx.35i5.com",
  sUrl: "https://kpx.35i5.com",
  // serverUrl: "https://127.0.0.1:8443",
  // sUrl: "http://127.0.0.1:8080",
  userInfo: null,
  onLaunch: function () {
    var that =this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    that.openid = wx.getStorageSync('openid') || []
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //请求自己后台获取用户openid
        if (typeof (that.openid) == 'undefined' || that.openid.length<=0) {
          wx.request({
            url: this.serverUrl +"/wx/wechat",
            data: {
              code: res.code
            },
            success: function (response) {
              if (response.data.ok==1){
                var openid = JSON.parse(response.data.info).openid
                console.log('请求获取openid:' + openid);
                if (typeof (openid) != 'undefined') {
                  //可以把openid存到本地，方便以后调用
                  wx.setStorageSync('openid', openid);
                  that.openid = openid;
                }
              }else{
                // 失败弹出框
                wx.showToast({
                  title: res.data.info,
                  icon: 'none',
                  duration: 3000
                })
              } 
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})