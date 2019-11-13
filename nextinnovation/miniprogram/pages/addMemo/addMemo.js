// miniprogram/pages/addMemo/addMemo.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  onSubmit(e) {
    let content = e.detail.value.content
    if (!content) {
      wx.showToast({
        title: 'Please enter something',
        icon: 'none',
        duration: 1500,
        mask: true
      })
      return
    }

    content = content.split('\n').join('&hc')

    db.collection('memos').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          content,
          createTime: db.serverDate() 
        }
      })
      .then(res => {
        wx.navigateBack({

        })
      })
  }
})