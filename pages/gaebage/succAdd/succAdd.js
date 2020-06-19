// pages/gaebageSearch/succAdd/succAdd.js
Page({
  data: {
    canUse: getApp().globalData.canUse,
    nvabarData: {
      navigationBarTextStyle: 'white', // 胶囊主题 white || black
      navigationBarTitleText: '添加成功', //  导航栏标题文本
      navigationBarBackground: 'rgba(67, 193, 120, 1) radial-gradient(farthest-side at 0% 0%, #c0fcc6 0%, transparent 80%)', // 导航栏背景色
      // statusBgColor: '', // 状态栏背景色
      // showPre: true, // 是否只展示返回键 默认 false
      // hideCapsule: true, // 是否隐藏胶囊
    },
  },
  gotoGarbage() {
    wx.navigateTo({
      url: `/pages/userCenter/userLexicon/userLexicon`
    })
  }
})