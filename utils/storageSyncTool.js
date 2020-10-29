// 定义登录token的key(键名),在获取/存储的时候,通过这个key获取和存储
const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

const setStorage = (key, value) => {
  try {
    wx.setStorageSync(key, value)
    return true
  } catch (e) {
    return false
  }
}

const getStorage = (key) => {
  try {
    const value = wx.getStorageSync(key)
    return value
  } catch (e) {
    return false
  }
}

const clearStorage = key => {
  try {
    wx.clearStorageSync(key)
    return true
  } catch (e) {
    return false
  }
}

const saveTokens = (accessToken, refreshToken) => {
  return accessToken && setStorage(ACCESS_TOKEN_KEY, `${accessToken}`)
  || refreshToken && setStorage(REFRESH_TOKEN_KEY, `${refreshToken}`) 
}

const getAccessToken = () => {
  return getStorage(ACCESS_TOKEN_KEY)
}
const getRefreshToken = () => {
  return getStorage(ACCESS_TOKEN_KEY)
}

const clearToken = () => {
  return clearStorage(ACCESS_TOKEN_KEY) && clearStorage(REFRESH_TOKEN_KEY) 
}

module.exports = {
  saveTokens, clearToken,
  getAccessToken,
  getRefreshToken,
  getStorage,
  setStorage,
  clearStorage
}
