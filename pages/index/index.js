//index.js
Page({
  data: {
    canUse: getApp().globalData.canUse,
    nvabarData: {
      "navigationBarTextStyle": "white", // 胶囊主题 white || black
      "navigationBarTitleText": "你是什么垃圾", //  导航栏标题文本
      // navigationBarBackgroundColor: 'aqua', // 导航栏背景色
      // statusBgColor: '', // 状态栏背景色
      // showPre: true, // 是否只展示返回键 默认 false
      // hideCapsule: true, // 是否隐藏胶囊
    },
    active: 0,  // 当前选中tab
  },
  onLoad: function() {
    getApp().watch(needUpdate => {
      console.log('----------', needUpdate);
      this.setData({ needUpdate })
    })
  },
  // 切换页脚 tabber 时
  onChangeTabbar(event) {
    // this.setData({ active: event.detail });
    if(event.detail === 1) {
      wx.navigateTo({
        url: '/answer/index/index'
      })
    }else {
      this.setData({ active: event.detail });
    }
  },
  handGetUserInfo({detail}) {
    getApp()._getUserInfo(detail)
  }
})