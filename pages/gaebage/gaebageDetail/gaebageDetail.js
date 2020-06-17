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
    // garbageId: 1
  },
  onLoad: function() {
    this._initData('杂草')
  },
  
  //#region -- 搜索
  async _initData(searchKayword) {
    Toast.loading({duration: 0})
    let { data: garbageInfo } = await specialModel.getGarbageSearch(searchKayword)
    if(!garbageInfo.id) return false
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
  },
  // 本地缓存评论关键字
  commentChange({detail}) { this.data.commentKayword = detail },
  
  //#region -- 添加垃圾词库弹窗
  // 添加垃圾词库弹窗 --- 关闭
  closeKeywordPop() { this.setData({ showAddKeywordPop: false }) },
  // 添加垃圾词库弹窗 --- 开启
  openKeywordPop() { this.setData({ showAddKeywordPop: true }) },
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
  }
  //#endregion
})