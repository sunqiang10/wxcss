const app = getApp()
Page({
  data: {
    src: '',
    id:0,
    videoTitle: '',
    videoDesc: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var serverUrl = app.serverUrl;
    var id=-1;

    if (typeof (options.id) != 'undefined') {
      id = options.id;
    }
    if (id<0){
      // 失败弹出框
      wx.showToast({
        title: 'id不正确，查询数据失败！',
        icon: 'none',
        duration: 2000
      })
    }else{
      // 调用后端
      wx.request({
        url: serverUrl + '/wx/getVidoesById?id=' + id,
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.hideLoading();
          if (res.data.ok == 1) {
            that.setData({
              src: app.sUrl + res.data.info.videoPath,
              courseId: res.data.info.videoCourse.id,
              videoTitle: res.data.info.videoCourse.courseName,
              videoDesc: res.data.info.videoCourse.content.substring(0, 20),
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
    }  
  }
})