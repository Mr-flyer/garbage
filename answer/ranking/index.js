import special from '../../models/special.js';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
let emptyView;
Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'white', // 胶囊主题 white || black
            navigationBarTitleText: '排行榜', //  导航栏标题文本
        },
        scrollTop: 0,
        active: 0,
        topHeight: 0,
        next_level: '',
        allRankingList: [],
        allSelfRanking: '',
        firendsRankingList: [],
        firendSelfRanking: ''
    },
    onLoad() {
        let _that = this;
        emptyView = this.selectComponent("#emptyView");
        var query = wx.createSelectorQuery();
        query.select('#ranking').boundingClientRect(function(rect) {
            _that.setData({
                topHeight: rect.height
            })
        }).exec();
        wx.showLoading({
            mask: true,
            title: '加载中...',
        });
        Promise.all([
            special.getRankingList().then((res) => {
                _that.setData({
                    next_level: res.data.next_level,
                    allRankingList: res.data.rank,
                    allSelfRanking: res.data.self_info
                })
                _that.isShowEmpty();
            }), 
            special.getFriendRankingList().then((res) => {
                _that.setData({
                    firendsRankingList: res.data.rank,
                    firendSelfRanking: res.data.self_info
                })
                _that.isShowEmpty();
            })
        ])
        .then((res)=>{
            wx.hideLoading();
        })
        .catch(()=>{
            wx.hideLoading();
        })
    },
    rankingItem(e) {
        this.setData({
            active: e.currentTarget.dataset.id,
            scrollTop: 0
        })
        this.isShowEmpty();
    },
    isShowEmpty() {
        if(this.data.active==0) emptyView.getShowValue(this.data.firendsRankingList);
        else emptyView.getShowValue(this.data.allRankingList);
    }
})