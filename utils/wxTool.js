// 自定义路由跳转
const goNavigate = (e, obj) => {
  let { url, disable } = obj || e.currentTarget.dataset
  if(disable) return wx.showModal({
    title: '提示',
    content: '敬请期待',
    showCancel: false, // 隐藏取消按钮
    // duration: 2000
  })
  // 校验当前用户是否已授权
  wx.getSetting({
    success({authSetting}) {
      // 未授权 则开启自定义授权弹窗
      getApp().globalData.needUpdate = !authSetting['scope.userInfo']
      if(authSetting['scope.userInfo']) {
        wx.navigateTo({ url, success: res => Promise.resolve(res) })
      }
    }
  })
}
// 获取二维码携带参数
const getScene = (scene = "") => {
  if (scene == "") return {}
  let res = {}
  let params = decodeURIComponent(scene).split("&")
  params.forEach(item => {
    let pram = item.split("=")
    res[pram[0]] = pram[1]
  })
  return res
}

module.exports = {
  goNavigate, getScene
}