import { host } from '../env';
import getErrorMessage from './expectionalError';
import {
  getAccessToken, getStorage, setStorage,
  clearToken, saveTokens
} from './storageSyncTool';
import Toast from '../miniprogram_npm/@vant/weapp/toast/toast';
// 无需展示错误提示的状态码
const hideErrCodeArr = [404, 10000]
// roken 失效错误码
const updateTokenCodeArr = [403, 10040, 10050, 10000]
class wxRequest {
  // constructor() {}
  request({url, subUrl, data = {}, method = 'GET', isLogin = false, isNeedUserInfo}) {
    return new Promise((resolve, reject) => {
      let accessToken = getAccessToken()
      let { need_update } = getStorage('isUpdata')
      let options = Object.assign({}, {
        url: url || host + subUrl, data, method, 
        header: isLogin ? {} : {
          "Content-Type": "application/json",
          "Authorization": accessToken
        }
      })
      if(isNeedUserInfo && need_update) return getApp().globalData.needUpdate = need_update
      if(!isLogin && !accessToken) return resolve(this._login(options))
      wx.request({
        ...options,
        success: ({data, statusCode, errMsg}) => {
          let isStatusOk =  "".startsWith.call(statusCode, 2)
          let isDataOk = Object.prototype.toString.call(data).slice(8,-1) === "Object"
          // 返回数据正常 始终以业务错误码为准
          if(isDataOk) this._formatResponseData(data, statusCode, {errCodeKey: 'code', errMsgKey: 'msg'})
          // 返回数据异常 以请求的基本错误码为准
          else if(!isStatusOk) data = { statusCode, errMsg }
          // token失效
          if(!isLogin && updateTokenCodeArr.includes(data.errCode) || updateTokenCodeArr.includes(data.statusCode)) {
            return resolve(this._login(options))
          }
          // isStatusOk -- 网络码正常，data.errCode -- 业务码正常
          isStatusOk && !data.errCode ? resolve(data) : reject(data)
        },
        fail: err => reject(err)
      })
    })
    .catch(err => {
      Toast.clear();
      if(!hideErrCodeArr.includes(err.errCode)) Toast({message: getErrorMessage(err).description})
      // wx.showToast({ title: getErrorMessage(err).description, icon: 'none', duration: 2000 })
      return Promise.reject(err)
    })
  }
  // 从新登陆
  _login(options) {
    return this._getToken().then(({data}) => {
      let { token: access_token, need_update } = data
      saveTokens(access_token);
      // 是否上传用户信息
      if(need_update) return this._getNeedUpdata(options)
      // 从新发送因token失效的请求
      return Promise.resolve(this.request(options))
    })
  }
  // 更新用户信息
  _getNeedUpdata(options) {
    return wx.getSetting().then(({authSetting}) => {
      // 用户已授权 静默上传用户信息
      if(authSetting['scope.userInfo']) return wx.getUserInfo()
      // 未授权则开启自定义授权弹窗
      else getApp().globalData.needUpdate = true
    })
    .then(res => res && getApp()._getUserInfo(res))
    .then(() => this.request(options))
  }
  // 获取token
  _getToken() {
    clearToken();
    return new Promise((success, fail) => wx.login({success, fail}))
    .then(({code}) => this.request({
      // subUrl: `api/v1/user/login`,
      subUrl: `api/v1/user/test_token`,
      data: { code }, method: "GET", isLogin: true 
    }))
  }
  // 统一 返回的业务数据 key值
  _formatResponseData(data, statusCode, {errCodeKey, errMsgKey}) {
    if(errCodeKey && !data.hasOwnProperty('errCode')) // 统一错误码字段名为：errCode
    data['errCode'] = data[errCodeKey]; 
    if(!data.errCode) data['statusCode'] = statusCode
    if(errMsgKey && !data.hasOwnProperty('errMsg')) // 统一错误提示信息为：errMsg
    data['errMsg'] = data[errMsgKey];
    [errCodeKey, errMsgKey].map( v => delete data[v]) // 移除旧属性
  }
}

export default wxRequest;