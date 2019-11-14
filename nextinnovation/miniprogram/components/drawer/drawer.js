// components/drawer/drawer.js
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
    showDrawer: false
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
      console.log(e)
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
      
    }
  }
})