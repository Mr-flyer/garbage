// pages/appHome/index/index.js
Page({
  data: {
    radio: 1
  },
  handChangeRadio({detail}) {
    // console.log(detail);
    this.setData({ radio: detail })
  }
})