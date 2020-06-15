// pages/gaebageSearch/gaebageDetail/gaebageDetail.js
Page({
  data: {
    navBarHeight: getApp().globalData.statusBarHeight + getApp().globalData.titleBarHeight,
    isEmpty: true,
    showAddKeywordPop: false,
    autosize: { minHeight: 144 },
    desc: '' 
  },
  // 添加垃圾词库弹窗 --- 关闭
  closeKeywordPop() {
    this.setData({
      showAddKeywordPop: false,
    })
  },
  openKeywordPop() {
    this.setData({
      showAddKeywordPop: true
    })
  }
})