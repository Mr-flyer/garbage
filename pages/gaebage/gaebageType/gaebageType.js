// pages/gaebage/gaebageType/gaebageType.js
import specialModel from '../../../models/special';
Page({
  data: {
    canUse: getApp().globalData.canUse,
    nvabarData: {
      navigationBarTextStyle: 'black', // 胶囊主题 white || black
      navigationBarTitleText: '垃圾分类', //  导航栏标题文本
      // navigationBarBackgroundColor: 'aqua', // 导航栏背景色
      // statusBgColor: '', // 状态栏背景色
      // showPre: true, // 是否只展示返回键 默认 false
    },
  },
  onLoad: function() {
    // 垃圾列表
    specialModel.getGarbageList({category: 1})
    .then(({data}) => {
      this.setData({
        garbageTypelist: data
      })
    })
    specialModel.getGarbageCategorysInfo(2)
    .then(({data}) => {
      console.log(data);
      this.setData({
        ...data
      })
    })
    getApp().watch(needUpdate => {
      console.log('----------', needUpdate);
      this.setData({ needUpdate })
    })
  }
})