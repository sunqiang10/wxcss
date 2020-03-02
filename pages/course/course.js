// pages/course/course.js
const app = getApp()
Page({
  data: {
    src: '',
    selected: true,
    selected1: false,
    showView: false,
    courseSubmitTxt: '立即报名',
    courseId:-1
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
    if (that.data.courseId < 0) {
      // 失败弹出框
      wx.showToast({
        title: 'id不正确，查询数据失败！',
        icon: 'none',
        duration: 2000
      })
    } else {
      // 调用后端
      wx.request({
        url: serverUrl + '/wx/getVidoesListByCourseId?id=' + that.data.courseId
          + '&openId=' + app.openid,
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.hideLoading();
          if (res.data.ok == 1) {
            if (res.data.info.length>0){
              var jsonArr = [];
              var list = res.data.info
              var buyCourseList = res.data.buyCourseList;
              var buyType =0;
              for (var i = 0; buyCourseList!=null && i < buyCourseList.length; i++) {
                if(buyCourseList[i].buyType==1){
                  buyType=1;
                  that.setData({
                    courseSubmitTxt: '开始学习'
                  })                
                  break
                }
              }
              for (var i = 0; i < list.length; i++) {
                var privce = list[i].videoPrice.toFixed(2);
                if (buyType==1){
                  privce ='已购买';
                }
                jsonArr.push({
                  id: list[i].id,
                  title: list[i].videoTitle,
                  videoDesc: list[i].videoDesc,
                  createTime: list[i].createTime,
                  videoPrice: privce,
                  url: app.serverUrl + "" + list[i].coverPath
                });
              }
              var first = list[0].videoCourse;
              privce = first.coursePrice.toFixed(2)
              if (buyType == 1) {
                privce = '已购买';
              }
              that.setData({
                src: serverUrl + first.coverPath,
                id: first.id,
                courseName: first.courseName,
                courseCount: list.length,
                createTime: list[0].createTime,
                content: first.content,
                coursePrice: privce,
                note: jsonArr
              })
            }
           
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
  },
  tab1Selected: function (e) {
    var that = this;
    this.setData({
      selected1: false,
      selected: true
    })
  },

  tab2selected: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  btnclick: function () {
    var that = this;
    if (that.data.courseSubmitTxt =='开始学习'){
      wx.redirectTo({
        url: '../course/courseInfo?courseId=' + that.data.courseId
      })
    }else{
      console.log(app.userInfo);      
      if (that.data.coursePrice > 0) {
        that.setData({
          showView: (true)
        })
      }else{
        wx.redirectTo({
          url: '../course/courseInfo?courseId=' + that.data.courseId
        })
      }
    }
  },
  payConfirmBtnclick: function () {
    var that = this;
    var nickName = ""
    var avatarUrl = ""
    if (app.userInfo!=null && typeof (app.userInfo) != 'undefined') {
      nickName = app.userInfo.nickName
      avatarUrl = app.userInfo.avatarUrl
    }
    if (typeof (app.openid) == 'undefined') {
      wx.showToast({
        title: '请重新进入小程序并且授权微信登录！',
        icon: 'none',
        duration: 1000
      })
    }
    wx.showToast({
      title: '支付成功',
      icon: 'none',
      duration: 1000
    })
    this.setData({
      showView: (false)
    })
    wx.request({
      url: app.serverUrl + '/wx/buyCourse?openId='
        + app.openid
        + '&courseId=' + that.data.courseId
        + '&nickName=' + nickName
        + '&avatarUrl=' + avatarUrl,
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.showToast({
          title: res.data.info,
          icon: 'none',
          duration: 1000
        })
        wx.redirectTo({
          url: '../course/course?courseId=' + that.data.courseId
        })
      }, error: function (res) {
        wx.showToast({
          title: res,
          icon: 'none',
          duration: 1000
        })
        wx.redirectTo({
          url: '../course/course?courseId=' + that.data.courseId
        })
      }
    });
  },
  payCancelBtnclick: function () {
    this.setData({
      showView: (false)
    })
  },
  viewClick: function (e) {
    var that = this;
    if (that.data.courseSubmitTxt == '开始学习') {
      wx.redirectTo({
        url: '../course/courseInfo?videoId=' + e.currentTarget.dataset['index']
      })
    } else {
      console.log(app.userInfo);    
      if (that.data.coursePrice > 0) {
        that.setData({
          showView: (true)
        })
      } else {
        wx.redirectTo({
          url: '../course/courseInfo?videoId=' + e.currentTarget.dataset['index']
        })
      }
    }
  }
})
