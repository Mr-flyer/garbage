// pages/userCenter/userCollect/userCollect.js
import specialModel from '../../../models/special';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  data: {
    canUse: getApp().globalData.canUse,
    nvabarData: {
      "navigationBarTextStyle": "white", // 胶囊主题 white || black
      "navigationBarTitleText": "我的收藏", //  导航栏标题文本
      "navigationBarBackground": "rgba(67, 193, 120, 1) radial-gradient(farthest-side at 0% 0%, #c0fcc6 0%, transparent 80%)", // 导航栏背景色
      // statusBgColor: "", // 状态栏背景色
      // showPre: true, // 是否只展示返回键 默认 false
    },
    refreshing: false, // 监听设为 true 时 ==> 触发refresh事件
    refreshed: false, // true ==> 收起下拉刷新，可多次设置为true（即便原来已经是true了）
    initPage: 1,
    dataLists: [],
    loading: true,
  },
  onLoad: function () {
    // 获取页脚 loadMore组件 实例对象
    // this.data.tabsArr.forEach((el, key) => {
    //   el.loadMoreView = this.selectAllComponents(".loadMoreView")[key];
    //   el.page = this.data.initPage; el.dataLists = [];
    // });
    Toast.loading({ message: '加载中...', duration: 0 })
    this.data.page = this.data.initPage
    this.loadMoreView = this.selectComponent("#loadMoreView");
    this.loadData();
  },
  // pullDownRefresh组件下拉刷新
  onPullDownRefresh() {
    // this.data.tabsArr[this.data.curTabIndex].page = this.data.initPage
    // this.loadData(this.data.curTabIndex)
    this.data.page = this.data.initPage
    this.loadData(this.data.page)
  },

  // scroll-view组件触底事件 -- 主动触发 loadmore组件
  onReachBottom() {
    // let { tabsArr, curTabIndex } = this.data
    // let activeTab = tabsArr[curTabIndex]
    // activeTab.loadMoreView.loadMore(curTabIndex) 
    this.loadMoreView.loadMore() 
  },
  // 加载数据 curTabIndex = this.data.initPage
  loadData(page = this.data.initPage) {
    let { initPage } = this.data
    // 获取当前tab 相关参数
    // let activeTab = this.data.tabsArr[curTabIndex]
    // specialModel.getList(activeTab.viewType, activeTab.page)
    specialModel.getUserCollect({page})
      .then(({ data: curData, next }) => {
        this._finally(); Toast.clear();
        let { dataLists } = this.data
        // let { datas: curData, curPage, pageCount } = data
        // 若为首页则直接替换
        dataLists = this.data.page === initPage ? curData : dataLists.concat(curData)
        this.setData({
          dataLists: dataLists, 
          refreshed: true,
        })
        this.loadMoreView.loadMoreComplete({ curPage: page, next })
      }).catch(err => {
        this._finally()
        // 加载出错 且非第一页则展示 从新加载当前页按钮
        if (this.data.page != initPage) {
          this.loadMoreView.loadMoreFail()
        }
      })
  },
  // loadmore组件加载更多事件 --- 实际触底触发事件
  loadMoreListener() {
    console.log('实际触底事件');
    // let { tabsArr, curTabIndex } = this.data
    // tabsArr[curTabIndex].page++;
    // this.loadData(curTabIndex)
    this.loadData(this.data.page++)
  },
  // 加载失败 --- 点击从新加载
  clickLoadMore() {
    // this.loadData(this.data.curTabIndex)
    this.loadData(this.data.page)
  },
  _finally() {
    if(this.data.loading) { 
      this.setData({ loading: false })
      // Toast.clear();
    }
  }
})