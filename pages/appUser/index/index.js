// pages/appUser/index/index.js
let {_getUserInfo} = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    navBarHeight: getApp().globalData.statusBarHeight + getApp().globalData.titleBarHeight,
    // canUse: getApp().globalData.canUse,
    // nvabarData: {
    //   "navigationBarTextStyle": "white", // 胶囊主题 white || black
    //   "navigationBarTitleText": "我的", //  导航栏标题文本
    //   // navigationBarBackground: 'rgba(67, 193, 120, 1) radial-gradient(farthest-side at 0% 0%, #c0fcc6 0%, transparent 80%)', // 导航栏背景色
    //   // statusBgColor: '', // 状态栏背景色
    //   // showPre: true, // 是否只展示返回键 默认 false
    // },
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { 
      let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            answerCount: i,
            discussCount: i,
            collectCount: i,
            lexiconCount: i,
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          answerCount: that._coutNum(3000),
          discussCount: that._coutNum(484),
          collectCount: that._coutNum(24000),
          lexiconCount: that._coutNum(100)
        })
      }
    }
    wx.hideLoading()
    },
    moved: function () { },
    detached: function () { },
  },
  methods: {
    getuserinfo({detail}) { _getUserInfo(detail) },
    _coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
  }
})