const {
    statusBarHeight, // 状态栏高度
    titleBarHeight  // 标题栏高度
} = getApp().globalData;
import special from '../../models/special.js';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'white', // 胶囊主题 white || black
            navigationBarTitleText: '垃圾分类问答', //  导航栏标题文本
        },
        showRedEnvelopes: false,
        score: 0,
        record_id: '',
        is_success: false,
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
            is_success: options.is_success,
            is_pay: options.is_pay,
            score: options.score,
            price: options.price,
            record_id: options.record_id
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
        let _that = this;
        wx.showLoading({
            mask: true,
            title: '加载中...',
        });
        special.getAnswerInfo().then((res) => {
            wx.hideLoading();
            if(res.data.answer_count <= 0) {
                wx.showToast({
                    title: '今日答题次数已用完',
                    icon: 'none',
                    duration: 2000
                })
            }else {
                wx.redirectTo({
                    url: '/answer/answer/index'
                })
            }
        })
        .catch(()=>{
            wx.hideLoading();
        })
    },
    // 生成海报
    createPosterBtn() {
        wx.navigateTo({
            url: `/answer/poster/index?record_id=${this.data.record_id}`
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