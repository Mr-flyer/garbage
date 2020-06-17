// pages/userCenter/userAnswer/userAnswer.js
import specialModel from '../../../models/special';
Page({
  data: {
    canUse: getApp().globalData.canUse,
    nvabarData: {
      navigationBarTextStyle: 'black', // 胶囊主题 white || black
      navigationBarTitleText: '我的答题', //  导航栏标题文本
      // navigationBarBackgroundColor: 'aqua', // 导航栏背景色
      // statusBgColor: '', // 状态栏背景色
      // showPre: true, // 是否只展示返回键 默认 false
    },
    num01: 120,
    activeNames: ['1'],
  },
  onLoad: async function() {
    let { data: garbageTypes } = await specialModel.getGarbageCategorys()
    let { data: answerList } = await specialModel.getUserAnswer()
    garbageTypes.forEach(el => {
      el.answerList = answerList.filter(v => v.category === el.id)
    });
    console.log(garbageTypes);
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
})