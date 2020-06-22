import special from '../../models/special.js';
let loadMoreView, page = 1;
Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'white', // 胶囊主题 white || black
            navigationBarTitleText: '收到的红包', //  导航栏标题文本
            navigationBarBackground: 'linear-gradient(90deg,rgba(82,201,132,1) 0%,rgba(67,193,120,1) 100%)',
        },
        refreshing: false, // 监听设为 true 时 ==> 触发refresh事件
        refreshed: false, // true ==> 收起下拉刷新，可多次设置为true（即便原来已经是true了）
        redEnvelopesList: [],
        redEnvelopesCount: 0,
        redEnvelopesPrice: 0
    },
    onLoad() {
        // 获取列表底侧加载更多组件实例
        loadMoreView = this.selectComponent("#loadMoreView");
        page = 1;
        this.requestData();
    },
    onPullDownRefresh() {
        page = 1;
        this.requestData();
    },
    /**
     * 页面上拉触底事件的组件内处理函数
     */
    onReachBottom() {
        loadMoreView.loadMore()
    },
    /**
     * 页面上拉触底事件的实际处理函数 -- 由组件内部调用
     */
    loadMoreListener(e) {
        page++;
        this.requestData();
    },
    // 加载失败点击从新加载
    clickLoadMore(e) {
        this.requestData();
    },
    requestData() {
        let _that = this;
        special.getRedEnvelopesList(page, 20).then((res) => {
            let items;
            if(page == 1) {
                _that.setData({
                    redEnvelopesPrice: res.total_price/100,
                    redEnvelopesCount: res.count,
                })
                items = res.data;
            }else {
                items = this.data.redEnvelopesList;
                items = items.concat(res.data);
            }
            _that.setData({
                redEnvelopesList: items,
                refreshed: true
            })
            loadMoreView.loadMoreComplete({curPage: res.page, next: res.next});
        }).catch((err)=> {
        })
    },
    rankingItem(e) {
        this.setData({
            active: e.currentTarget.dataset.id
        })
    }
})