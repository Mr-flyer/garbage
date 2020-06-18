const {
    statusBarHeight, // 状态栏高度
    titleBarHeight  // 标题栏高度
} = getApp().globalData;
import special from '../../models/special.js';
Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'white', // 胶囊主题 white || black
            navigationBarTitleText: '你是什么垃圾', //  导航栏标题文本
        },
        showRule: false,
        category_count: 0,
        total_answer: 0,
        answer_count: 0
    },
    onLoad() {
        this.setData({ statusBarHeight, titleBarHeight });
    },
    onShow() {
        let _that = this;
        wx.showLoading({
            title: '加载中',
        })
        special.getAnswerInfo().then((res) => {
            _that.setData({
                category_count: res.data.category_count,
                total_answer: res.data.total_answer,
                answer_count: res.data.answer_count,
            })
            wx.hideLoading();
        })
    },
    handleTap() {},
    onClickHide() {
        this.setData({
            showRule: false
        })
    },
    // 开始挑战
    startChallengeBtn() {
        if(this.data.answer_count >= this.data.total_answer) {
            wx.showToast({
                title: '今日答题次数已用完',
                icon: 'none',
                duration: 2000
            })
        }else {
            wx.navigateTo({
                url: '/answer/answer/index'
            })
        }
    },
    // 知识
    knowledgeBtn() {
        wx.navigateTo({
            url: '/answer/knowledge/index'
        })
    },
    // 排行
    rankingBtn() {
        wx.navigateTo({
            url: '/answer/ranking/index'
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
            url: '/answer/redEnvelopes/index'
        })
    }
})