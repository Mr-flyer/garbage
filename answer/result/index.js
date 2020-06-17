const {
    statusBarHeight, // 状态栏高度
    titleBarHeight  // 标题栏高度
} = getApp().globalData;
Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'white', // 胶囊主题 white || black
            navigationBarTitleText: '你是什么垃圾', //  导航栏标题文本
        },
        showFollow: false,
        showRedEnvelopes: false,
        score: 0,
        is_pay: false,
        isOpen: false,
        isParse: false,
        price: 0
    },
    onLoad(options) {
        if(options.is_success == 'true') {
            this.setData({
                showRedEnvelopes: true,
            })
        }
        this.setData({
            is_pay: options.is_pay,
            score: options.score,
            price: options.price
        })
    },
    handleTap() {},
    onClickHide() {
        this.setData({
            showFollow: false
        })
    },
    onClickHideRE() {
        this.setData({
            showRedEnvelopes: false
        })
    },
    // 查看排行
    rankingListBtn() {
        wx.navigateTo({
            url: '/answer/ranking/index'
        })
    },
    // 查看奖励
    redEnvelopesBtn() {
        wx.navigateTo({
            url: '/answer/redEnvelopes/index'
        })
    },
    // 继续挑战
    continueChallengeBtn() {
        wx.navigateBack({
            delta: 1
        })
    },
    // 生成海报
    createPosterBtn() {
        wx.navigateTo({
            url: '/answer/poster/index'
        })
    },
    // 开红包
    openRedEn() {
        if(!this.data.isParse) {
            this.setData({
                isParse: true
            })
        }
        setTimeout(() => {
            this.setData({
                isOpen: true
            })
        }, 1500);
    }
})