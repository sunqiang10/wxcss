//index.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgWidth: 0, 
    imgHeight: 0,
    note: [],
    array1: ['初级教程', '中级教程', '高级教程'],
    chooseValues: [0, 0, 0],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var serverUrl = app.serverUrl;
    // 调用后端
    wx.request({
      url: serverUrl + '/wx/getVidoesList',
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.ok == 1) {
          var jsonArr = [];
          var list = res.data.info
          for (var k = 0;  k<3; k++)
          {
            for (var i = 0; i < list.length; i++) {
              jsonArr.push({
                id: list[i].id,
                title: list[i].videoTitle,
                videoDesc: list[i].videoDesc,
                createTime: list[i].createTime,
                url: app.serverUrl+""+list[i].coverPath
              });
            }        
          }  
          that.setData({
            note: jsonArr
          })
          console.log(that.data);
        } else {
          // 失败弹出框
          wx.showToast({
            title: res.data.info,
            icon: 'none',
            duration: 3000
          })
        }
      }
    })
  },
  bindPickerChange: function (e) {
    var i = e.currentTarget.dataset.index //获取错误图片循环的下标
    this.data.chooseValues[i] = e.detail.value
    this.setData({
      chooseValues: this.data.chooseValues
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