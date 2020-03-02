// pages/course/courseInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    courseId:-1,
    videoId:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var serverUrl = app.serverUrl;

    if (typeof (options.courseId) != 'undefined') {
      that.setData({
        courseId: options.courseId
      })    
    }
    if (typeof (options.videoId) != 'undefined') {
      that.setData({
        videoId: options.videoId
      })    
    }
    if (that.data.videoId>0) {
      wx.request({
        url: serverUrl + '/wx/getVidoesListByVideosID?id=' + that.data.videoId
          + '&openId=' + app.openid,
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {    
          if (res.data && res.data.ok==1){
            that.setData({
              src: app.sUrl + res.data.info.videoPath
            })
          }                
        }
      })
    }
    if (that.data.courseId > 0){
      wx.request({
        url: serverUrl + '/wx/getVidoesListByCourseId?id=' + that.data.courseId
          + '&openId=' + app.openid,
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {        
          var list = res.data.info
          that.setData({
            src: app.sUrl + list[0].videoPath
          })
        }
      })
    }
  },
  btnclick: function () {
    var that =this;
    wx.redirectTo({
      url: '../course/course?courseId=' + that.data.courseId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})