// pages/appUser/index/index.js
import specialModel from '../../../models/special';
let { _getUserInfo } = getApp()
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
      specialModel.getUserOutline()
      .then(({data}) => {
        wx.hideLoading()
        Object.assign(this.data, data)
        numDH();
      })
      .catch(()=>{
        wx.hideLoading()
      })

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
            answerCount: that._coutNum(that.data.answer),
            discussCount: that._coutNum(that.data.comment),
            collectCount: that._coutNum(that.data.collect),
            lexiconCount: that._coutNum(that.data.lexicon)
          })
        }
      }
    },
    moved: function () {},
    detached: function () {},
  },
  methods: {
    getuserinfo({
      detail
    }) {
      _getUserInfo(detail)
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
    // 敬请期待
    otherFun(e) {
      switch (e.currentTarget.dataset.cap) {
        case '0':
          wx.navigateTo({
            url: `/pages/userCenter/feedback/feedback`
          })
          break;
        case '1': 
          this.comingSoon();
          break;
        case '2': 
          this.comingSoon();
          break;
        case '3': 
          this.comingSoon();
          break;
      }
    },
    // 敬请期待
    comingSoon() {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '敬请期待',
        success (res) {
          if (res.confirm) {
          } else if (res.cancel) {
          }
        }
      })
    }
  }
})