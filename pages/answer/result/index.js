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
        showRedEnvelopes: true,
        isOpen: false,
        isPrize: false
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
            url: '/pages/answer/ranking/index'
        })
    },
    // 查看奖励
    redEnvelopesBtn() {
        wx.navigateTo({
            url: '/pages/answer/redEnvelopes/index'
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
            url: '/pages/answer/poster/index'
        })
    },
    // 开红包
    openRedEn() {
        if(!this.data.isOpen) {
            this.setData({
                isOpen: true
            })
        }
        setTimeout(() => {
            this.setData({
                isPrize: true
            })
        }, 1500);
    }
})