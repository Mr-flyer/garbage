// pages/userCenter/userLexicon/userLexicon.js
import specialModel from '../../../models/special';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  data: {
    navBarHeight: getApp().globalData.statusBarHeight + getApp().globalData.titleBarHeight,
    canUse: getApp().globalData.canUse,
    nvabarData: {
      navigationBarTextStyle: 'white', // 胶囊主题 white || black
      navigationBarTitleText: '我的词库', //  导航栏标题文本
      navigationBarBackground: 'rgba(67, 193, 120, 1) radial-gradient(farthest-side at 0% 0%, #c0fcc6 0%, transparent 80%)', // 导航栏背景色
      // statusBgColor: '', // 状态栏背景色
      // showPre: true, // 是否只展示返回键 默认 false
    },
    isEmpty: true,
    refreshing: false, // 监听设为 true 时 ==> 触发refresh事件
    refreshed: false, // true ==> 收起下拉刷新，可多次设置为true（即便原来已经是true了）
    curTabIndex: 0,
    initPage: 1, // 初始page
    tabsArr: [ // tab项列表
      { viewType: 'article', name: '已发布', status: 1 },
      { viewType: 'project', name: '审核中', status: 0 },
      { viewType: 'project', name: '未通过', status: 2 },
    ],
  },
  onLoad: function () {
    Toast.loading({ message: '加载中...', duration: 0 })
    // 获取页脚 loadMore组件 实例对象
    this.data.tabsArr.forEach((el, key) => {
      el.loadMoreView = this.selectAllComponents(".loadMoreView")[key];
      el.page = this.data.initPage; el.dataLists = [];
      el.loading = true;
    });
    this.loadData();
  },
  onChange({detail}) {
    this.setData({ curTabIndex: detail.name })
    if(this.data.tabsArr[detail.name].loading) {
      this.loadData(this.data.curTabIndex)
      Toast.loading({ message: '加载中...', duration: 0 })
    }
    // if(!this.data.tabsArr[detail.name].dataLists.length) {
    //   this.loadData(this.data.curTabIndex)
    // }
  },
  // pullDownRefresh组件下拉刷新
  onPullDownRefresh() {
    this.data.tabsArr[this.data.curTabIndex].page = this.data.initPage
    this.loadData(this.data.curTabIndex)
  },

  // scroll-view组件触底事件 -- 主动触发 loadmore组件
  onReachBottom() {
    let { tabsArr, curTabIndex } = this.data
    let activeTab = tabsArr[curTabIndex]
    activeTab.loadMoreView.loadMore() 
  },
  // 加载数据
  loadData(curTabIndex = this.data.curTabIndex, showLoading) {
    let { initPage } = this.data
    // 获取当前tab 相关参数
    let activeTab = this.data.tabsArr[curTabIndex]
    specialModel.getLexiconList({ status: activeTab.status, page: activeTab.page})
      .then(({ data: curData, next }) => {
        this._finally()
        let { dataLists } = activeTab
        // let { datas: curData, curPage, pageCount } = data
        // 若为首页则直接替换
        dataLists = activeTab.page === initPage ? curData : dataLists.concat(curData)
        this.setData({
          [`tabsArr[${curTabIndex}].dataLists`]: dataLists, 
          refreshed: true, curTabIndex
        })
        activeTab.loadMoreView.loadMoreComplete({ curPage: activeTab.page, next })
      }).catch(err => {
        this._finally()
        // 加载出错 且非第一页则展示 从新加载当前页按钮
        if (activeTab.page != initPage) {
          activeTab.loadMoreView.loadMoreFail()
        }
      })
  },
  // loadmore组件加载更多事件 --- 实际触底触发事件
  loadMoreListener() {
    console.log('实际触底事件');
    let { tabsArr, curTabIndex } = this.data
    tabsArr[curTabIndex].page++;
    this.loadData(curTabIndex)
  },
  // 加载失败 --- 点击从新加载
  clickLoadMore() {
    this.loadData(this.data.curTabIndex)
  },
  _finally() {
    let { curTabIndex, tabsArr } = this.data
    if(tabsArr[curTabIndex].loading) {
      this.setData({ [`tabsArr[${curTabIndex}].loading`]: false })
      Toast.clear();
    }
  }
})