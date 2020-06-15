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
    specialModel.getGarbageCategorys()
    .then((res) => {
      // console.log(res)
    }).catch((err) => {
      // console.log(err);
    });
    getApp().watch(needUpdate => {
      console.log('----------', needUpdate);
      this.setData({ needUpdate })
    })
  }
})