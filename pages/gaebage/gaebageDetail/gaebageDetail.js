// pages/gaebageSearch/gaebageDetail/gaebageDetail.js
import specialModel from '../../../models/special';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  data: {
    navBarHeight: getApp().globalData.statusBarHeight + getApp().globalData.titleBarHeight,
    isEmpty: true,
    garbageTypeImg: [
      '/static/images/common/garbage_blue@2x.png',
      '/static/images/common/garbage_yellow@2x.png',
      '/static/images/common/garbage_red@2x.png',
      '/static/images/common/garbage_gray@2x.png',
    ],
    showAddKeywordPop: false,
    autosize: { minHeight: 144 },
    desc: '',
    // garbageId: 1
  },
  onLoad: function() {
    this._initData('饭菜')
  },
  
  //#region -- 搜索
  async _initData(searchKayword) {
    Toast.loading({duration: 0})
    let { data: garbageInfo } = await specialModel.getGarbageSearch(searchKayword)
    let { data: commentList } = await specialModel.getCommentsList(garbageInfo.id)
    // console.log(garbageInfo, commentList);
    Toast.clear()
    this.setData({
      ...garbageInfo, commentList,
      garbageId: garbageInfo.id,
    })
  },
  // 点击搜索
  handSearch({detail}) {
    let searchKayword = typeof detail === 'string' ? detail : this.data.searchKayword
    this._initData(searchKayword)
  },
  // 存储搜索关键字
  searchChange({detail}) { this.data.searchKayword = detail },
  // 点击搜索
  handCollect() {
    let { garbageId } = this.data
    garbageId && specialModel.addUserCollect(garbageId)
    .then(() => {
      this.setData({ is_collect: true })
    })
  },
  //#endregion

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
    let { data: commentList } = await specialModel.getCommentsList(garbageId)
    this.setData({ commentList })
  },
  commentChange({detail}) { this.data.commentKayword = detail },
  // 添加垃圾词库弹窗 --- 关闭
  closeKeywordPop() {
    this.setData({
      showAddKeywordPop: false,
    })
  },
  openKeywordPop() {
    this.setData({
      showAddKeywordPop: true
    })
  },
})