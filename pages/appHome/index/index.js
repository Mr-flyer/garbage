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
        this.setData({ 
          keywordList: data.keywords,
          tips: data.tips
        })
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
    },
    // 前往垃圾分类页
    handGarbageType({detail}) {
      wx.navigateTo({
        url: `/pages/gaebage/gaebageType/gaebageType?gaebageTypeId=${detail}`
      })
    },
    //
    gotoSearchDetail({detail}) {
      let searchKayword = typeof detail === 'string' ? detail : this.data.searchKayword
      if(searchKayword && searchKayword!=undefined) {
        wx.navigateTo({
          url: `/pages/gaebage/gaebageDetail/gaebageDetail?keyword=${searchKayword}`
        })
      }else {
        wx.showToast({
          title: '请输入搜索名称',
          icon: 'none',
          duration: 2000
        })
      }
    },
    
    // 存储搜索关键字
    searchChange({detail}) {
      this.data.searchKayword = detail 
    },
  },
})