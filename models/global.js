// import HTTP from '../utils/http';
import wxRequest from '../utils/wx-request';

class globalModel extends wxRequest {
  constructor() {
    super() // 致此 this才有效
  }
  // 上传用户信息
  userUpdate(data) {
    return this.request({
      subUrl: `api/v1/user/userinfo`,
      method: 'POST', data,
    })
  }
}

export default new globalModel();