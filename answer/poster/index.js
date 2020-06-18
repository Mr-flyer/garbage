Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'white', // 胶囊主题 white || black
            navigationBarTitleText: '海报分享', //  导航栏标题文本
        },
        posterUrl: ''
    },
    onLoad(options) {
        if(options.record_id) {
            this.setData({
                posterUrl: `http://101.132.128.12/#/?record_id=${options.record_id}&user_id=1`
            })
        }
    }
})