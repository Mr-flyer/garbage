// pages/gaebageSearch/gaebageDetail/gaebageDetail.js
import specialModel from '../../../models/special';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  data: {
    navBarHeight: getApp().globalData.statusBarHeight + getApp().globalData.titleBarHeight,
    canUse: getApp().globalData.canUse,
    nvabarData: {
      "navigationBarTextStyle": "white", // 胶囊主题 white || black
      "navigationBarTitleText": "垃圾详情", //  导航栏标题文本
      // navigationBarBackgroundColor: 'aqua', // 导航栏背景色
      // statusBgColor: '', // 状态栏背景色
      // showPre: true, // 是否只展示返回键 默认 false
      // hideCapsule: true, // 是否隐藏胶囊
    },
    garbageTypeImg: [
      '/static/images/common/garbage_blue@2x.png',
      '/static/images/common/garbage_yellow@2x.png',
      '/static/images/common/garbage_red@2x.png',
      '/static/images/common/garbage_gray@2x.png',
    ], // 垃圾分类数据
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
  },
  onLoad: function({ keyword, garbageId }) {
    Toast.loading({ message: '加载中...', duration: 0 })
    if(garbageId) {
      console.log('详情id', garbageId);
      this.setData({ garbageId, isGargabeInfo: true });
      this._initGarbageInfo(garbageId);
    } // 传入垃圾id 为拉取垃圾详情
    else {
      console.log('搜索关键字', keyword);
      this._initSearchData(keyword)
    } // 传入关键字 则为搜索垃圾
  },
  // 拉取垃圾详情
  async _initGarbageInfo(garbageId) {
    // 垃圾概要
    let p1 = specialModel.getGarbageDetail(garbageId)
    .then(({data}) => data).catch(err => err)
    // 评论列表
    let p2 = specialModel.getCommentsList(garbageId)
    .then(({data}) => {
      // 设置弹幕
      this._setDM(data.slice(0, 5))
      return { commentList: data }
    }).catch(err => err)
    Promise.all([p1, p2]).then(res => {
      Toast.clear()
      let newData = res.filter(v => !v.errCode)
      this.setData({
        ...newData[0], ...newData[1], loading: false
      })
    })
    // .catch(() => this.setData({ loading: false }))
  },
  //#region -- 搜索
  async _initSearchData(searchKayword) {
    // Toast.loading({duration: 0})
    let { data: garbageInfo } = await specialModel.getGarbageSearch(searchKayword)
    if(!garbageInfo.id) {
      Toast.clear()
      return this.setData({
        garbageId: null, loading: false
      })
    }
    let { data: commentList } = await specialModel.getCommentsList(garbageInfo.id)
    // console.log(garbageInfo, commentList);
    Toast.clear()
    this._setDM(commentList.slice(0, 5))
    this.setData({
      ...garbageInfo, commentList,
      garbageId: garbageInfo.id, loading: false
    })
  },
  // 点击搜索
  handSearch({detail}) {
    let searchKayword = typeof detail === 'string' ? detail : this.data.searchKayword
    this._initSearchData(searchKayword)
  },
  // 存储搜索关键字
  searchChange({detail}) { this.data.searchKayword = detail },
  //#endregion

  // 点击收藏
  async handCollect() {
    let { garbageId } = this.data
    garbageId && await specialModel.addUserCollect(garbageId)
    this.setData({ is_collect: true })
  },
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
  
  //#region -- 添加垃圾词库弹窗
  // 添加垃圾词库弹窗 --- 关闭
  closeKeywordPop() { this.setData({ showAddKeywordPop: false }) },
  // 添加垃圾词库弹窗 --- 开启
  // openKeywordPop() { this.setData({ showAddKeywordPop: true }) },
  openKeywordPop() { 
    wx.navigateTo({
      url: '/pages/gaebage/gaebageAdd/gaebageAdd'
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
})