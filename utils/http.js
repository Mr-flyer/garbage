import { baseUrl } from '../config';
import { saveTokens, getToken, removeToken } from './token';
import Toast from '../miniprogram_npm/@vant/weapp/toast/toast';

// 需自定义错误提示状态码的文本
const errCodeArr = [10010, 3]
const tips = {
  1: '出错啦',
  2: '登录出错',
  3: '用户信息未上传'
};
const updateTokenCodeArr = [10040, 10050, 10000]
class HTTP {
  request({url, data = {}, method = 'GET', isLogin = false, useLocalToken = false, refreshToken = false}) {
    return new Promise((resolve, reject) => {
      // 是否使用小程序备份 token， 注：备份 token 最少要登录过一次才会有记录
      // 特殊情况：若首页有使用备份token的请求，需在 `上传用户信息内从新上传`
      // 因为首次进来 并在请求登录接口前 拉取备份 token，此时还是空的
      let accessToken = useLocalToken ? getApp().globalData.token.accessToken : getToken('access_token');
      // let refreshToken = useLocalToken ? token.refreshToken : getToken('access_token');
      // 如果没有accessToken 且 不是登录接口, 直接登录
      if (!isLogin && !accessToken) return this.login(url, data, method, resolve, reject, useLocalToken);
      // 登录则无需token，
      let header = isLogin ? {} : {
        'Content-Type': 'application/json',
        'Authorization': refreshToken || accessToken // `refreshToken`为 双token模式下更新token所需参数
      }
      wx.request({
        url: baseUrl + url, header, method, data,
        success: ({ data, statusCode }) => { // 请求发送成功，并成功接收到服务器返回数据
          // 校验返回数据是否为对象
          const isObj = Object.prototype.toString.call(data).slice(8,-1) === "Object"
          // 校验 数据是否异常（即网络状态码已 2开头 表示数据正常）
          const flag = ''.startsWith.call(statusCode, 2)
          if(isObj) { // 服务器返回数据正常
            // 格式化 接口状态码字段名，用于后续统一错误处理
            this._formatResponseData(data, {errCode: 'code', errMsg: 'msg'})
          }else { // 服务器返回数据异常 -- 如 404则返回空页面字符，而非数据对象
            data = { errCode: 1, errMsg: '数据异常！！'}
          }
          // token 失效 中断后续操作，从新登陆 --- 注：此处不会进入 reject 抛出异常
          if(updateTokenCodeArr.includes(data.errCode)) {
            // 此时本地已存储过 备份token能取到，无需传入useLocalToken，用于标识再次请求，需区分开头的 this.login
            return this.login( url, data, method, resolve, reject )
          }
          // flag -- 返回网络数据格式正确， errCode -- 返回API数据正常
          flag && !data.errCode ? resolve(data) : reject(data)
        },
        fail: err => reject(err) // 请求发送失败 -- 例如请求超时
      })
    })
    .catch(err => { // 统一错误处理
      if(!errCodeArr.includes(err.errCode)) this._showError(err)
      return Promise.reject(err) // 注：此处直接 返回结果 会在后续调用直接进入 then(),若想进入 catch() 则应返回 Promise.reject(err)
    })
  }
  /**
   * 登录、授权、获取token
   * @param {*} options // 因token失效 而请求失败的请求参数，用于后续从新发送请求
   */
  login(url, data, method, resolve, reject, useLocalToken) {
    removeToken(); // 1. 删除token
    return new Promise((success, fail) => wx.login({ success, fail }))
    .then(({code}) => {  // 2. 通过微信接口获取 code
      if(!code) return reject({errCode: 2})
      return this.request({
        url: `api/v2/user/login`,
        data: { code }, method: "POST", isLogin: true 
      })
    })
    .then(res => { // 3. 通过code 向后台换取 token
      const { token: access_token, need_update, need_oauth } = res.data
      // 小程序 缓存本地 token -- 备份
      getApp().globalData.token = { accessToken: `jwt ${access_token}` }
      // 是否需从新上传用户信息
      if(need_update) {
        wx.getSetting({ success: res => {
          const flag = res.authSetting['scope.userInfo'] // 判断用户是否已授权
          Toast.clear() // 关闭 loading 弹窗
          if(flag) { // 已授权 则静默上传
            wx.getUserInfo({
              success(res) { getApp()._getUserInfo(res) }
            })
          }else { // 未授权则开启自定义弹窗
            getApp().globalData.needUpdate = !flag
          }
        }})
        // 若当前接口使用的是备份token，则从新发起请求，注：需额外传递`useLocalToken`字段
        // 此处只会在 首次进入小程序 调用的接口需要 使用备份token时才会触发，即只会触发一次
        if(useLocalToken) resolve && resolve(this.request({ url, data, method, useLocalToken }))
        // 注：由于排行榜等板块必须获取用户信息才能展示，则未上传用户信息中断操作
        return reject ? reject({errCode: 3}) : Promise.reject({errCode: 3})
      }
      // Storage 保存token --- 需用户上传信息后保存
      saveTokens(access_token); 
      // 是否需要双授权 ============================================================ start
      if(need_oauth) {  
        // 1. 格式化授权页所需参数
        const redirectUrl = getCurrentPageUrlWithArgs() || '/pages/index/index';
        // 2. 传递参数
        this.request({
          url: `api/v2/user/oauth_uuid`,
          method: 'POST', data: { redirectUrl }
        }).then(newRes => {
          // 3. 从新跳转 并带上 Uid
          wx.redirectTo({
            url: `/pages/auth/index?oauth_uuid=${newRes.data.oauth_uuid}`
          })
        })
      }
      // ================================================== end
      // 从新发送之前因 token 失效的请求
      resolve && resolve(this.request({ url, data, method }))
      if(!resolve) return res
    }).catch(err => reject ? reject(err) : Promise.reject(err)) // 捕获并抛出此前异常 包括`api/v2/user/login`
  }
  // 通过 refreshToken 静默更新 access_token
  refreshToken(url, data, method, resolve) {
    const refreshToken = getToken('refresh_token');
    options.refreshToken = refreshToken
    this.request({ url: `api/v2/user/refresh_token` })
    .then(res => {
      const { access_token, refresh_token } = res.data.result
      saveTokens(access_token, refresh_token)
      // 从新发送之前因 token 失效的请求
      resolve && resolve(this.request({ url, data, method, refreshToken }))
    })
  }
  // 错误提示
  _showError(options = {}) {
    const { errCode, errMsg } = options
    let title = errMsg || tips[errCode] // 优先使用 后端返回的错误信息
    if(errMsg && errMsg.includes('fail timeout')) title = "请求超时，请稍后再试"
    wx.showToast({ title, icon: 'none', duration: 2000 })
  }
  /**
   * 格式化响应提示参数
   * @param {object} data // 网络响应数据
   * @param {object} param1 
   */
  _formatResponseData(data, {errCode, errMsg}) {
    if(errCode && !data.hasOwnProperty('errCode')) // 统一错误码字段名为：errCode
    data['errCode'] = typeof data[errCode] === "number" ? data[errCode] : 1; 
    if(errMsg && !data.hasOwnProperty('errMsg')) // 统一错误提示信息为：errMsg
    data['errMsg'] = data[errMsg];
    [errCode, errMsg].map( v => delete data[v]) // 移除旧属性
  }
}
export default HTTP;