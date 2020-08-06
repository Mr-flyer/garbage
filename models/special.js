import HTTP from '../utils/wx-request';
import { getStorage } from '../utils/storageSyncTool';

class SpecialModel extends HTTP {
  // 所有分类 ===============
  getGarbageCategorys() {
    return this.request({
      subUrl: `api/v1/garbage/categorys`,
    })
  }
  // 垃圾列表
  getGarbageList(data) {
    return this.request({
      subUrl: `api/v1/garbage/garbages`,
      data
    })
  }
  // 热门关键词  ===============
  getGarbageKeyword() {
    return this.request({
      subUrl: `api/v1/garbage/hot_keyword`,
    })
  }
  // 搜索
  getGarbageSearch(keyword) {
    return this.request({
      subUrl: `api/v1/garbage/search?text=${keyword}`
    })
  }
  // 评论列表
  getCommentsList(garbageId, page=1, pageSize=20) {
    return this.request({
      subUrl: `api/v1/garbage/comments/${garbageId}?page=${page}&page_size=${pageSize}`
    })
  }
  // 发布评论
  pushUserComments(data, garbageId) {
    return this.request({
      subUrl: `api/v1/garbage/comment/${garbageId}`,
      method: 'POST', data
    })
  }
  // 我的评论
  getUserDiscuss(data) {
    return this.request({
      subUrl: `api/v1/garbage/comment/`,
      data
    })
  }
  // 添加收藏
  addUserCollect(garbageId) {
    return this.request({
      subUrl: `api/v1/garbage/collect/${garbageId}`,
      method: 'POST'
    })
  }
  // 我的收藏
  getUserCollect(data) {
    return this.request({
      subUrl: `api/v1/garbage/collect/`,
      data
    })
  }
  // 用户自定义词汇
  setUserLexicon(data) {
    return this.request({
      subUrl: `api/v1/garbage/user_lexicon`,
      method: 'POST', data
    })
  }
  // 我的词汇 0:审核中 1:已发布  2：未通过
  getLexiconList(data) {
    return this.request({
      subUrl: `api/v1/garbage/user_lexicon`,
      data
    })
  }
  // 垃圾类型信息 -- 分类详情
  getGarbageCategorysInfo(GarbageId) {
    return this.request({
      subUrl: `api/v1/garbage/category/${GarbageId}`
    })
  }
  // 我的答题
  getUserAnswer() {
    return this.request({
      subUrl: `api/v1/answer/`,
    })
  }
  // 垃圾详情 -- 同搜索
  getGarbageDetail(garbageId) {
    return this.request({
      subUrl: `api/v1/garbage/garbage/${garbageId}`
    })
  }
  // 我的数据概要 --- 个人中心
  getUserOutline() {
    return this.request({
      subUrl: `api/v1/garbage/data_column`
    })
  }
  // 我的答题概要
  getUserAnswerOutline() {
    return this.request({
      subUrl: `api/v1/answer/self_rank`
    })
  }
  /**
   * 测试接口
   * @param {string} viewType article | project
   * @param {number} page 第一页为 0
   */
  getList = (viewType, page) => this.request({
    url: `https://www.wanandroid.com/${viewType}/list/${page}/json`,
    isLogin: true,
  })

  /**
   * author--zhl
   */
  // 答题首页
  getAnswerInfo() {
    return this.request({
      subUrl: `api/v1/answer/index`
    })
  }
  // 题库
  getAnswerList() {
    return this.request({
      subUrl: `api/v1/answer/questions`
    })
  }
  // 提交答题
  postAnswer(data) {
    return this.request({
      subUrl: `api/v1/answer/`,
      method: 'POST',
      data
    })
  }
  // 红包记录
  getRedEnvelopesList(page, pageSize) {
    return this.request({
      subUrl: `api/v1/answer/pay_record?page=${page}&page_size=${pageSize}`
    })
  }
  // 知识列表
  getKnowledgeList(page, pageSize) {
    return this.request({
      subUrl: `api/v1/answer/knowledges?page=${page}&page_size=${pageSize}`
    })
  }
  // 知识详情
  getKnowledgeDetail(id) {
    return this.request({
      subUrl: `api/v1/answer/knowledge/${id}`
    })
  }
  // 分享海报
  getPosterInfo(id) {
    return this.request({
      subUrl: `api/v1/answer/poster/${id}`
    })
  }
  // 全部排行
  getRankingList(id) {
    return this.request({
      subUrl: `api/v1/answer/rank`
    })
  }
  // 好友排行
  getFriendRankingList(id) {
    return this.request({
      subUrl: `api/v1/answer/friend_rank`
    })
  }
  /** 
   * end
   */
  
}

export default new SpecialModel();