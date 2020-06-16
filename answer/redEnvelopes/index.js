Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'white', // 胶囊主题 white || black
            navigationBarBackground: 'linear-gradient(90deg,rgba(82,201,132,1) 0%,rgba(67,193,120,1) 100%)',
            navigationBarTitleText: '收到的红包', //  导航栏标题文本
        }
    },
    rankingItem(e) {
        this.setData({
            active: e.currentTarget.dataset.id
        })
    }
})