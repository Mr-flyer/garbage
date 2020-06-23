// pages/userCenter/userAnswer/userAnswer.js
import specialModel from '../../../models/special';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  data: {
    canUse: getApp().globalData.canUse,
    nvabarData: {
      navigationBarTextStyle: 'black', // 胶囊主题 white || black
      navigationBarTitleText: '我的答题', //  导航栏标题文本
      navigationBarBackground: 'RGBA(245, 245, 245, 1)', // 导航栏背景色
      // statusBgColor: '', // 状态栏背景色
      // showPre: true, // 是否只展示返回键 默认 false
    },
    activeNames: ['1'],
    loading: true,
  },
  onLoad: async function() {
    Toast.loading({message: '加载中...', duration: 0})
    let { data: answerOutline } = await specialModel.getUserAnswerOutline()
    let { data: garbageTypes } = await specialModel.getGarbageCategorys()
    let { data: answerList } = await specialModel.getUserAnswer()
    garbageTypes.forEach(el => {
      el.answerList = answerList.filter(v => v.category === el.id)
    });
    Toast.clear()
    console.log(garbageTypes);
    answerOutline.score = this._coutNum(answerOutline.score)
    this.setData({
      garbageTypes, loading: false,
      ...answerOutline
    })
  },
  // 手风琴
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  // 点击前往答题
  gotoAnswer() {
    wx.navigateTo({
      url: `/answer/index/index`
    })
  },
  _coutNum(e) {
    if (e > 1000 && e < 10000) {
      e = (e / 1000).toFixed(1) + 'k'
    }
    if (e > 10000) {
      e = (e / 10000).toFixed(1) + 'W'
    }
    return e
  },
})