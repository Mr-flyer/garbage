Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'white', // 胶囊主题 white || black
            navigationBarTitleText: '排行榜', //  导航栏标题文本
        },
        active: 0,
        topHeight: 0
    },
    onLoad() {
        let _that = this;
        var query = wx.createSelectorQuery();
        query.select('#ranking').boundingClientRect(function(rect) {
            _that.setData({
                topHeight: rect.height
            })
        }).exec();
    },
    rankingItem(e) {
        this.setData({
            active: e.currentTarget.dataset.id
        })
    }
})