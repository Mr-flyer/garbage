const {
    statusBarHeight, // 状态栏高度
    titleBarHeight  // 标题栏高度
} = getApp().globalData;
Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'white', // 胶囊主题 white || black
            navigationBarTitleText: '海报分享', //  导航栏标题文本
        }
    },
    onLoad() {
        this.setData({statusBarHeight, titleBarHeight });
    }
})