// 异常信息统一处理 主要分为三大块: 1.常见请求的基本错误码 2.业务相关的错误码 3.未识别的错误码
const HTTP_ERROR = {

  HTTP_DEFALUT_ERROR: new Map([
    [400, '请求参数错误'],
    [401, '请求要求用户的身份认证'],
    [403, '服务器拒绝执行此请求'],
    [404, '请求的资源无法找到'],
    [405, '请求中的方法被禁止'],
    [406, '服务器无法根据客户端请求的内容特性完成请求'],
    [407, '请求要求代理的身份认证'],
    [408, '请求超时'],
    [409, '请求存在冲突'],
    [410, '客户端请求的资源已经不存在'],
    [411, '服务器无法处理不带Content-Length的请求信息'],
    [412, '请求信息的先决条件错误'],
    [413, '请求的实体过大'],
    [414, '请求的URI过长'],
    [415, '无法处理请求附带的媒体格式'],
    [416, '无效的请求范围'],
    [417, '无法满足Expect的请求头信息'],
    [500, '服务器内部错误'],
    [501, '服务器不支持该请求功能'],
    [502, '请求失效'],
    [503, '服务器暂时的无法处理请求'],
    [504, '无法获取请求'],
    [505, 'http协议版本错误']
  ]),

  CUSTOM_ERROR: new Map([
    [404, '请求数据不存在'],
    [406, '登陆过期，请重登'],
    [200201, '乘客登录验证码发送失败'],
    [200202, '验证码已过期,请重新获取'],
    [200203, '短信验证码错误'],
    [200501, '临时code为空'],
    [200502, '参数配置错误'],

    [301001, '资源不可达'],
    [301002, '未查询出匹配数据'],
    [301003, '输入的城市在有效范围中'],
    [301004, '短信验证码错误'],
    [301003, '高德查询主机解析错误']
    // ....
  ])
}

const getErrorMessage = ({ statusCode, errMsg, errCode }) => {
  let err = {
    title: '未知错误',
    description: '系统发生未知的错误'
  }
  if(!statusCode && !errCode) {
    if(errMsg && errMsg.includes('fail timeout')) {
      err.title = '请求超时'
      err.description = '服务器繁忙，稍后再试'
    }
  } // 请求失败
  else if(statusCode && statusCode >= 400 && statusCode < 600) {
    err.title = (statusCode < 500) ? '请求错误' : '服务器错误'
    err.description = HTTP_ERROR.HTTP_DEFALUT_ERROR.get(statusCode)
  } // 异常但后台未告知 以网络异常码为准
  else if(errCode) {
    err.title = '后台系统错误'
    err.description = errMsg || HTTP_ERROR.CUSTOM_ERROR.get(errCode)
  } // 以后台业务异常码为准

  // let response = error.response.data
  // let err = {
  //   title: '未知错误',
  //   description: '系统发生未知的错误'
  // }
  // if (typeof response === 'string') {
  //   err.description = '服务器异常,请稍后重试'
  // } else if (error.response.status >= 400 && error.response.status < 600) {
  //   err.title = (error.response.status < 500) ? '请求错误' : '服务器错误'
  //   err.description = HTTP_ERROR.HTTP_DEFALUT_ERROR.get(error.response.status)
  // } else {
  //   err.code = response.status
  //   err.title = '后台系统错误'
  //   err.description = (response && 'status' in response && HTTP_ERROR.CUSTOM_ERROR.has(response.status)) ? HTTP_ERROR.CUSTOM_ERROR.get(response.status) : '操作失败,请稍后重试'
  // }

  return err
}

export default getErrorMessage