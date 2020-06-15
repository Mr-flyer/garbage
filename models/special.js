import HTTP from '../utils/wx-request';
import { getStorage } from '../utils/storageSyncTool';

class SpecialModel extends HTTP {
  // 所有分类
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
  // 热门关键词
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
  getCommentsList(garbageId) {
    return this.request({
      subUrl: `api/v1/garbage/comments/${garbageId}`
    })
  }
  // 发布评论
  pushUserComments(data, garbageId) {
    return this.request({
      subUrl: `api/v1/garbage/comment/${garbageId}`,
      method: 'POST', data
    })
  }
  // 添加收藏
  addUserCollect(garbageId) {
    return this.request({
      subUrl: `api/v1/garbage/collect/${garbageId}`,
      method: 'PSOT'
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
  getLexiconList() {
    return this.request({
      subUrl: `api/v1/garbage/user_lexicon`,
    })
  }
  /**
   * 测试接口
   * @param {string} viewType article | project
   * @param {number} page 第一页为 0
   */
  getList = (viewType, page) => this.request({
    url: `https://www.wanandroid.com/${1}/list/${page}/json`,
    isLogin: true,
  })
}

export default new SpecialModel();