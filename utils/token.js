/**
 * 存储双 token
 * @param {*} accessToken // 用于接口请求
 * @param {*} refreshToken // 用于静默更新 token
 */
export function saveTokens(accessToken, refreshToken) {
    accessToken && wx.setStorageSync('access_token', `jwt ${accessToken}`)
    refreshToken && wx.setStorageSync('refresh_token', `Bearer ${refreshToken}`)
}
/**
 * 获取指定 token
 * @param {*} tokenKey 
 */
export function getToken(tokenKey) {
    return wx.getStorageSync(tokenKey)
}
/**
 * 删除双 token
 */
export function removeToken() {
    wx.removeStorageSync('access_token');
    wx.removeStorageSync('refresh_token');
}