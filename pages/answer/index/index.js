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
        showRule: false
    },
    onLoad() {
        this.setData({ statusBarHeight, titleBarHeight })
    },
    handleTap() {},
    onClickHide() {
        this.setData({
            showRule: false
        })
    },
    // 开始挑战
    startChallengeBtn() {
        wx.navigateTo({
            url: '/pages/answer/answer/index'
        })
    },
    // 知识
    knowledgeBtn() {
        wx.navigateTo({
            url: '/pages/answer/knowledge/index'
        })
    },
    // 排行
    rankingBtn() {
        wx.navigateTo({
            url: '/pages/answer/ranking/index'
        })
    },
    // 规则
    rulesBtn() {
        this.setData({
            showRule: true
        })
    },
    // 红包
    redEnvelopesBtn() {
        wx.navigateTo({
            url: '/pages/answer/redEnvelopes/index'
        })
    }
})