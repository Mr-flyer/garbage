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
        firendsRankingList: []
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
        Toast.loading({
            duration: 0,
            forbidClick: true,
            message: '加载中...',
        });
        Promise.all([
            special.getRankingList().then((res) => {
                _that.setData({
                    next_level: res.data.next_level,
                    allRankingList: res.data.rank
                })
                _that.isShowEmpty();
            }), 
            special.getFriendRankingList().then((res) => {
                _that.setData({
                    firendsRankingList: res.data.rank
                })
                _that.isShowEmpty();
            })
        ])
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