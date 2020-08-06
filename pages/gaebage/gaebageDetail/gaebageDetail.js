// pages/gaebageSearch/gaebageDetail/gaebageDetail.js
import specialModel from '../../../models/special';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
import toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  data: {
    navBarHeight: getApp().globalData.statusBarHeight + getApp().globalData.titleBarHeight,
    canUse: getApp().globalData.canUse,
    nvabarData: {
      "navigationBarTextStyle": "white", // 胶囊主题 white || black
      "navigationBarTitleText": "垃圾详情", //  导航栏标题文本
      navigationBarBackground: 'rgba(67, 193, 120, 1)', // 导航栏背景色
      // statusBgColor: '', // 状态栏背景色
      // showPre: true, // 是否只展示返回键 默认 false
      // hideCapsule: true, // 是否隐藏胶囊
    },
    showAddKeywordPop: false, // 添加词库弹窗
    autosize: { minHeight: 144 }, // 
    // garbageId: 10, // 垃圾分类ID
    // is_collect: true, // 是否已收藏
    dmData: [{
        id: 17303,
        content: "国际巨星党妹",
        headimgurl: "https://wx.qlogo.cn/mmopen/vi_32/06N0qHLkICIjb58b3MM0Wwsxccw98LKRjx5cGMQhvXpbicdzVHT4dAVpicwBglhjAXQibibsDJodPGJJWRxcl9DCibA/132",
      },
      {
        id: 17307,
        content: "Lucky",
        headimgurl: "https://wx.qlogo.cn/mmopen/vi_32/06N0qHLkICIjb58b3MM0Wwsxccw98LKRjx5cGMQhvXpbicdzVHT4dAVpicwBglhjAXQibibsDJodPGJJWRxcl9DCibA/132",
      },
      {
        id: 17309,
        content: "Me",
        headimgurl: "https://wx.qlogo.cn/mmopen/vi_32/06N0qHLkICIjb58b3MM0Wwsxccw98LKRjx5cGMQhvXpbicdzVHT4dAVpicwBglhjAXQibibsDJodPGJJWRxcl9DCibA/132",
      },
      {
        id: 17314,
        content: "犬来八荒",
        headimgurl: "https://wx.qlogo.cn/mmopen/vi_32/06N0qHLkICIjb58b3MM0Wwsxccw98LKRjx5cGMQhvXpbicdzVHT4dAVpicwBglhjAXQibibsDJodPGJJWRxcl9DCibA/132",
      }
    ], // 弹幕数据
    loading: true, // 为true 代表首次进入，未加载完成不展示页面
    collect_num: 0,
    comment_num: 0,
    keyword: '',
    garbageId: '',
    
    refreshing: false, // 监听设为 true 时 ==> 触发refresh事件
    refreshed: false, // true ==> 收起下拉刷新，可多次设置为true（即便原来已经是true了）
    curTabIndex: 0, // 当前选中tab索引
    initPage: 1, // 初始page
    pageSize: 20,
    tabsArr: [ // tab项列表
      { viewType: 'article', name: 'article', dataLists: [] },
      // { viewType: 'project', name: 'project', },
    ],
  },
  /**
   * 
   * @param {*} keyword 搜索关键字 
   * @param {garbageId} keyword 垃圾ID 
   */
  onLoad: function({ keyword, garbageId }) {
    Toast.loading({ message: '加载中...', duration: 0 })
    this.setData({ keyword })
    if(garbageId) {
      this.data.tabsArr[0].garbageId = garbageId
      this.setData({ garbageId, isGargabeInfo: true });
      this._initGarbageInfo(garbageId);
    } // 传入垃圾id 为拉取垃圾详情
    else {
      // this.data.tabsArr[0].keyword = garbageId
      this._initSearchData(keyword)
    } // 传入关键字 则为搜索垃圾// 获取页脚 loadMore组件 实例对象
    this.data.tabsArr.forEach((el, key) => {
      el.loadMoreView = this.selectAllComponents(".loadMoreView")[key];
      el.garbageId = garbageId;
      el.page = this.data.initPage; el.dataLists = [];
    });
    // this.loadData();
  },
  // tab项切换时
  onChange({detail}) {
    this.setData({ curTabIndex: detail.name })
    if(!this.data.tabsArr[detail.name].dataLists.length) {
      this.loadData(this.data.curTabIndex)
    }
  },
  // 下拉刷新 -- pullDownRefresh组件
  onPullDownRefresh() {
    this.data.tabsArr[this.data.curTabIndex].page = this.data.initPage
    this.loadData(this.data.curTabIndex)
  },

  // 触底事件 -- scroll-view组件 主动触发 loadmore组件
  onReachBottom() {
    let { tabsArr, curTabIndex } = this.data
    let activeTab = tabsArr[curTabIndex]
    activeTab.loadMoreView.loadMore() 
  },
  /**
   * 加载数据
   * @param {number} curTabIndex 当前选中tab索引
   */
  loadData(curTabIndex = this.data.curTabIndex, curPage = this.data.initPage) {
    let { initPage, pageSize } = this.data
    // 获取当前tab 相关参数
    let activeTab = this.data.tabsArr[curTabIndex]
    return new Promise((resolve, reject) => {
      specialModel.getCommentsList(activeTab.garbageId, activeTab.page)
        .then(({count, data: curData}) => {
          const pageCount = Math.ceil(count/pageSize)
          console.log(`总页数：${pageCount}`, `当前页数据：`, curData);
          // return false
          let { dataLists } = activeTab
          // let { datas: curData, curPage, pageCount } = data
          // 若为首页则直接替换
          dataLists = activeTab.page === initPage ? curData : dataLists.concat(curData)
          this.setData({
            [`tabsArr[${curTabIndex}].dataLists`]: dataLists, 
            refreshed: true,
            comment_num: count
          })
          activeTab.loadMoreView.loadMoreComplete({ curPage, pageCount })
          resolve()
        }).catch(err => {
          // 加载出错 且非第一页则展示 从新加载当前页按钮
          if (activeTab.page != initPage) {
            activeTab.loadMoreView.loadMoreFail()
          }
          reject(err)
        })
    })
  },
  // 实际上拉触底触发事件 -- loadmore组件加载更多事件
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
  onShareAppMessage() {
    if(this.data.garbageId) {
      return {
        title: '来测测你是什么垃圾',
        desc: '来测测你是什么垃圾',
        path: `/pages/gaebage/gaebageDetail/gaebageDetail?garbageId=${this.data.garbageId}`
      }
    }else {
      return {
        title: '来测测你是什么垃圾',
        desc: '来测测你是什么垃圾',
        path: `/pages/gaebage/gaebageDetail/gaebageDetail?keyword=${this.data.keyword}`
      }
    }
  },
  // 拉取垃圾详情
  async _initGarbageInfo(garbageId) {
    // 垃圾概要
    let p1 = specialModel.getGarbageDetail(garbageId)
    .then(({data}) => data).catch(err => err)
    // 评论列表
    let p2 = this.loadData()
    // let p2 = specialModel.getCommentsList(garbageId)
    // .then(({data}) => {
    //   // 设置弹幕
    //   this._setDM(data.slice(0, 5))
    //   return { commentList: data }
    // }).catch(err => err)
    Promise.all([p1, p2]).then(res => {
      Toast.clear();
      let newData = res.filter(v => v && !v.errCode)
      this.setData({
        ...newData[0], loading: false
      })
      let keyName = "category.guidance";
      let temp = this.data.category.guidance
      this.setData({
        [keyName]: temp.replace(/(<img[\s\S]+?)/ig, '<img style="width:100%;margin:0 auto;"')
      })
    })
  },
  //#region -- 搜索
  async _initSearchData(searchKayword) {
    let { data: garbageInfo } = await specialModel.getGarbageSearch(searchKayword)
    this.setData({ keyword: searchKayword })
    // console.log('垃圾id', garbageInfo.id);
    if(!garbageInfo.id) {
      Toast.clear()
      return this.setData({
        garbageId: null, loading: false,
        'absArr[0].dataLists': []
      })
    }
    // let { data: commentList } = await specialModel.getCommentsList(garbageInfo.id)
    this.data.tabsArr[0].garbageId = garbageInfo.id
    this.loadData().then(() => {
      Toast.clear()
      // this._setDM(commentList.slice(0, 5))
      this.setData({
        ...garbageInfo, 
        // commentList,
        collect_num: this._coutNum(garbageInfo.collect_num),
        comment_num: garbageInfo.comment_num,
        garbageId: garbageInfo.id, loading: false
      })
    })
  },
  // 点击搜索
  handSearch({detail}) {
    let searchKayword = typeof detail === 'string' ? detail : this.data.searchKayword;
    if(searchKayword && searchKayword!=undefined) {
      this._initSearchData(searchKayword)
    }else {
      wx.showToast({
        title: '请输入搜索名称',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 存储搜索关键字
  searchChange({detail}) { this.data.searchKayword = detail },
  //#endregion

  // 点击收藏
  async handCollect() {
    let { garbageId } = this.data
    garbageId && await specialModel.addUserCollect(garbageId)
    let collect_num = this.data.collect_num +1;
    this.setData({ is_collect: true, collect_num: this._coutNum(collect_num) })
  },

  //#region -- 评论
  // 评论列表

  // 发布评论
  async handComment({detail}) {
    let commentKayword = typeof detail === 'string' ? detail : this.data.commentKayword
    let { garbageId } = this.data
    await specialModel.pushUserComments({content: commentKayword}, garbageId)
    Toast({
      position: 'bottom', message: '评论发布成功！',
      selector: '#van-toasttips'
    });
    this.setData({ commentKayword: '' })
    // 更新评论列表
    let { data: commentList } = await specialModel.getCommentsList(garbageId)
    this.setData({ commentList })
    this._setDM(commentList.slice(0, 5))
  },
  // 本地缓存评论关键字
  commentChange({detail}) { this.data.commentKayword = detail },
  //#endregion
  
  //#region -- 添加垃圾词库弹窗
  // 添加垃圾词库弹窗 --- 关闭
  closeKeywordPop() { this.setData({ showAddKeywordPop: false }) },
  // 添加垃圾词库弹窗 --- 开启
  openKeywordPop() { 
    wx.navigateTo({
      url: `/pages/gaebage/gaebageAdd/gaebageAdd?keyword=${this.data.keyword}`
    })
  },
  // 添加垃圾词库弹窗 --- 提交
  async formSubmit({detail}) {
    // console.log('表单提交', detail.value);
    await specialModel.setUserLexicon(detail.value)
    this.setData({
      lexicon_name: "", lexicon_desc: "",
      checkedRadio: "", showAddKeywordPop: false
    })
    Toast({
      position: 'top', message: '词库添加成功！',
      selector: '#van-toasttips'
    });
  },
  // formReset() {
  //   this.setData({
  //     lexicon_name: "", lexicon_desc: "",
  //     checkedRadio: "", showAddKeywordPop: false
  //   })
  // },
  _handRadio({detail}) {
    this.setData({ checkedRadio: detail })
  },  
  //#endregion
  
  // 前往垃圾分类页
  handGarbageType({detail}) {
    wx.navigateTo({
      url: `/pages/gaebage/gaebageType/gaebageType?gaebageTypeId=${detail}`
    })
  },
  // 初始化弹幕
  _setDM(dmData) {
    // 处理弹幕参数
    const dmArr = [];
    const _b = dmData;
    for (let i = 0; i < _b.length; i++) {
      const time = Math.floor(Math.random() * 10);
      const second = Math.floor(Math.random() * 60);
      const _time = time < 6 ? 6 + i : time + i;
      const top = Math.floor(Math.random() * 80) + 2;
      const _p = {
        id: _b[i].id,
        content: _b[i].content,
        avatar: _b[i].headimgurl  ,
        top,
        second,
        time: _time,
      };
      dmArr.push(_p);
    }
    this.setData({
      dmData: dmArr
    });
  },
  _coutNum(e) {
    if (e > 1000 && e < 10000) {
      e = (e / 1000).toFixed(1) + 'k'
    }
    if (e > 10000) {
      e = (e / 10000).toFixed(1) + 'W'
    }
    return e
  },
})