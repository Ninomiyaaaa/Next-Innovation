// miniprogram/pages/homePage/homePage.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memoList: [],
    showLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _self = this
    setTimeout(function() {
      _self.setData({
        showLoading: true
      })
    },2000)
  },

  onClickHide() {
    this.setData({ show: false });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.onGetOpenid()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.loadData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onLongtap(e) {
    const _self = this
    wx.showModal({
      title: 'Wanna Delete?',
      content: 'Let\'s finish the job',
      success(res) {
        if (res.confirm) {
          db.collection('memos').doc(e.currentTarget.dataset.id).remove({
            success: function(res) {
              wx.showToast({
                title: 'Done',
                duration: 500,
                mask: true
              })
              setTimeout(function() {
                _self.loadData()
              }, 500)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  toPage(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        this.loadData()
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  loadData() {
    const _self = this
    wx.showLoading({
      title: 'Loading',
    })
    db.collection('memos').where({
      _openid: app.globalData.openid
    }).orderBy('createTime', 'desc').get({
      success: function(res) {
        for (const item of res.data) {
          const arr = item.content.split('&hc')
          for (let i = 0; i < arr.length; i++) {
            arr[i] = `<p>${arr[i]}</p>`
          }
          item.content = arr.join('')
        }

        _self.setData({
          memoList: res.data
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
      },
      fail: err => {
        console.log(err)
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  onTouchmove(){
    return false
  }

})