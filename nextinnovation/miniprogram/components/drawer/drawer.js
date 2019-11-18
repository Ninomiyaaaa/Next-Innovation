// components/drawer/drawer.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showDrawer: false,
  },

  lifetimes: {
    attached() {
      this.onGetUserInfo()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeDrawer() {
      this.setData({
        showDrawer: false
      })
    },

    onRightDrag(e) {
      if (e.changedTouches[0].clientX > 80) {
        this.setData({
          showDrawer: true
        })
      }
    },

    onTouchstart(e) {
      console.log('touch start')
      console.log(e)
    },

    onTouchend(e) {
      console.log('touch end')
      console.log(e)

    },

    onGetUserInfo() {
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                this.setData({
                  avatar: app.globalData.userInfo ? app.globalData.userInfo.avatarUrl : '',
                  nickName: app.globalData.userInfo ? app.globalData.userInfo.nickName : '',
                })
              }
            })
          }
        }
      })
    },
  }
})