// pages/appHome/index/index.js
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    navBarHeight: getApp().globalData.statusBarHeight + getApp().globalData.titleBarHeight,
    radio: 1
  },
  handChangeRadio({detail}) {
    // console.log(detail);
    this.setData({ radio: detail })
  }
})