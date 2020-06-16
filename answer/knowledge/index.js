const {
    statusBarHeight, // 状态栏高度
    titleBarHeight  // 标题栏高度
} = getApp().globalData;
Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'black', // 胶囊主题 white || black
            navigationBarTitleText: '小答题', //  导航栏标题文本
            navigationBarBackgroundColor: 'white'
        }
    },
    onLoad() {
        this.setData({ statusBarHeight, titleBarHeight })
    }
})