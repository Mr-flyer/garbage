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
    gaebageTypeId: ''
  }, 
  onLoad: async function({gaebageTypeId}) {
    this.setData({
      gaebageTypeId: gaebageTypeId
    })
    // 垃圾列表
    let p1 = specialModel.getGarbageList({category: gaebageTypeId})
      .then(({ data: garbageTypelist }) => ({ garbageTypelist }))
    // 分类详情
    let p2 = specialModel.getGarbageCategorysInfo(gaebageTypeId)
      .then(({data}) => data)
    // this.setData
    Promise.all([p1, p2]).then(res => {
      let newData = res.filter(v => !v.errCode)
      this.setData({
        ...newData[0], ...newData[1]
      })
      let temp = this.data.guidance;
      this.setData({
        guidance: temp.replace(/(<img[\s\S]+?)/ig, '<img style="width:100%;margin:0 auto;"')
      })
    })
    // getApp().watch(needUpdate => {
    //   console.log('----------', needUpdate);
    //   this.setData({ needUpdate })
    // })
  }, 
  onShareAppMessage() {
    return {
        title: '来测测你是什么垃圾',
        desc: '来测测你是什么垃圾',
        path: `/pages/gaebage/gaebageType/gaebageType?gaebageTypeId=${this.data.gaebageTypeId}`
    }
  }
})