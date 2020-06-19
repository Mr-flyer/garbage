// 运行环境配置文件

// 开发环境
const dev = {
  host: 'http://192.168.101.47:8001/',
  ws: 'wss://dev.qq.cn',
  h5: 'https://dev.qq.cn',
  label: 'dev',
}

// 测试环境
const test = {
  host: 'https://test.qq.cn',
  ws: 'wss://test.qq.cn',
  h5: 'https://test.qq.cn',
  label: 'test'
}

// 生产环境
const prod = {
  host: 'https://prod.qq.cn',
  ws: 'wss://prod.qq.cn',
  h5: 'https://prod.qq.cn',
  label: 'prod'
}

module.exports = {
  ...dev
}