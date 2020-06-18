// pages/gaebage/gaebageAdd/gaebageAdd.js
import specialModel from '../../../models/special';
Page({
  data: {
    canUse: getApp().globalData.canUse,
    nvabarData: {
      "navigationBarTextStyle": "white", // 胶囊主题 white || black
      "navigationBarTitleText": "添加词库", //  导航栏标题文本
      navigationBarBackground: 'linear-gradient(90deg,rgba(82,201,132,1) 0%,rgba(67,193,120,1) 100%)', // 导航栏背景色
      // statusBgColor: '', // 状态栏背景色
      // showPre: true, // 是否只展示返回键 默认 false
      // hideCapsule: true, // 是否隐藏胶囊
    },
    autosize: {
      minHeight: 144
    }, // 
  },
  //#region -- 添加垃圾词库弹窗
  // 添加垃圾词库弹窗 --- 提交
  async formSubmit({
    detail
  }) {
    // console.log('表单提交', detail.value);
    await specialModel.setUserLexicon(detail.value)
    this.setData({
      lexicon_name: "",
      lexicon_desc: "",
      checkedRadio: "",
      showAddKeywordPop: false
    })
    wx.redirectTo({
      url: `/pages/gaebage/succAdd/succAdd`
    })
  },
  // formReset() {
  //   this.setData({
  //     lexicon_name: "", lexicon_desc: "",
  //     checkedRadio: "", showAddKeywordPop: false
  //   })
  // },
  _handRadio({
    detail
  }) {
    this.setData({
      checkedRadio: detail
    })
  },
  //#endregion

})