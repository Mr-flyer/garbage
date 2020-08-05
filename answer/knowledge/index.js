let loadMoreView, emptyView, page = 1;
import special from '../../models/special.js';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'black', // 胶囊主题 white || black
            navigationBarTitleText: '垃圾分类小知识', //  导航栏标题文本
            navigationBarBackgroundColor: 'white',
            navigationBarBackground: "white"
        },
        refreshing: false, // 监听设为 true 时 ==> 触发refresh事件
        refreshed: false, // true ==> 收起下拉刷新，可多次设置为true（即便原来已经是true了）
        knowledgeList: [],
    },
    onLoad() {
        page = 1;
        loadMoreView = this.selectComponent("#loadMoreView");
        emptyView = this.selectComponent("#emptyView");
        wx.showLoading({
            mask: true,
            title: '加载中...'
        })
        this.requestData();
    },
    onShareAppMessage() {
        return {
            title: '来测测你是什么垃圾',
            desc: '垃圾分类小知识',
            path: `/answer/knowledge/index`
        }
    },
    onPullDownRefresh() {
        page = 1;
        this.requestData();
    },
    /**
     * 页面上拉触底事件的组件内处理函数
     */
    onReachBottom() {
        loadMoreView.loadMore();
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
        special.getKnowledgeList(page, 10).then((res) => {
            let items;
            if(page == 1) {
                items = res.data;
            }else {
                items = this.data.knowledgeList;
                items = items.concat(res.data);
            }
            _that.setData({
                knowledgeList: items,
                refreshed: true
            })
            loadMoreView.loadMoreComplete({curPage: page, next: res.next});
            emptyView.getShowValue(_that.data.knowledgeList);
            wx.hideLoading();
        })
        .catch(()=>{
            wx.hideLoading();
            _that.setData({
                refreshed: true
            })
        })
    },
    knowledgeItem(e) {
        wx.navigateTo({
            url: `/answer/knowledgeDetail/index?id=${e.currentTarget.dataset.knowledgeid}`
        })
    }
})