// pages/appHome/index/index.js
import specialModel from '../../../models/special';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    navBarHeight: getApp().globalData.statusBarHeight + getApp().globalData.titleBarHeight,
    keywordList: []
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      specialModel.getGarbageKeyword()
      .then(({data}) => {
        this.setData({ keywordList: data })
      })
    },
    moved: function () { },
    detached: function () { },
  },
  methods: {
    handHotKeyword({target}) {
      let { txt } = target.dataset
      wx.navigateTo({
        url: `/pages/gaebage/gaebageDetail/gaebageDetail?keyword=${txt}`
      })
    }
  }
  // handChangeRadio({detail}) {
  //   // console.log(detail);
  //   this.setData({ radio: detail })
  // }
})