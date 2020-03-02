// pages/user/login.js
const app = getApp()

Page({
  data: {
  },

  onLoad: function (params) {
  },

  // 登录  
  doLogin: function (e) {
    // var me = this;
    var formObject = e.detail.value;
    var username = formObject.username;
    var password = formObject.password;
    // 简单验证
    if (username.length == 0 || password.length == 0) {
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none',
        duration: 3000
      })
    } else {
      var serverUrl = app.serverUrl;
      wx.showLoading({
        title: '请等待...',
      });
      // 调用后端
      wx.request({
        url: serverUrl + '/user/login',
        method: "POST",
        data: {
          userName: username,
          passWord: password
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          wx.hideLoading();
          if (res.data.ok == 1) {
            // 登录成功跳转 
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            });
            app.userInfo = res.data.info;
            // 页面跳转
            wx.redirectTo({
              url: '../index/index',
            })
          } else{
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
  },

  goRegistPage: function () {
    wx.redirectTo({
      url: '../user/regist',
    })
  }
})