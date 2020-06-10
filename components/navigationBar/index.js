// components/navigationBar/index.
const { 
  share, // 当前页是否为分享进入
  statusBarHeight, // 状态栏高度
  titleBarHeight  // 标题栏高度
} = getApp().globalData;
Component({
  properties: {
    navbarData: Object,

    // 导航栏背景色
    navigationBarBackground: {
      type: String,
      value: "transparent"
    },
    // 状态栏背景色
    statusBgColor: {
      type: String,
      value: "transparent"
    },
    // 标题栏胶囊主题色 -- 文本颜色同步
    navigationBarTextStyle: {
      type: String,
      value: 'white'
    },
    // 标题栏文本
    navigationBarTitleText: String,
    showPre: Boolean, // 是否展示返回键
    hideCapsule: Boolean, // 是否展示 `home` 键
  },
  observers: {
    'navbarData': function (targetData) {
      this.setData({ ...targetData }) 
    }
  },
  // 在组件实例进入页面节点树时执行
  attached: function () {
    this.setData({ share, statusBarHeight, titleBarHeight })
    this._setCapsuleImg();
  },
  methods: {
    // 根据主题设置胶囊图片
    _setCapsuleImg() {
      let { navigationBarTextStyle: color } = this.data,
        gobackImg = `images/goback@${color}.png`,
        gohomeImg = `images/gohome@${color}.png`;
      this.setData({
        gobackImg, gohomeImg
      })
    },
    // 返回上一页面
    _navback() {
      wx.navigateBack();
    },
    //返回到首页
    _backhome() {
      wx.redirectTo({ url: '/pages/index/index' })
    }
  }
})