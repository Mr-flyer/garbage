import special from '../../../models/special.js';
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'white', // 胶囊主题 white || black
            navigationBarTitleText: '意见反馈', //  导航栏标题文本
            navigationBarBackground: 'linear-gradient(90deg,rgba(82,201,132,1) 0%,rgba(67,193,120,1) 100%)',
        },
        title: '',
        titleErrMsg: '',
        des: '',
        phone:  '',
        phoneErrMsg: ''
    },
    onLoad(options) {
        
    },
    feedbackSub() {
        if(!this.data.title) {
            this.setData({
                titleErrMsg: '请输入意见反馈'
            })
            return false;
        }else {
            this.setData({
                titleErrMsg: ''
            })
        }
        if(this.data.phone && !this.checkPhone(this.data.phone)) {
            this.setData({
                phoneErrMsg: '手机号格式错误'
            })
            return false;
        }else {
            this.setData({
                phoneErrMsg: ''
            })
        }
    },
    // 验证手机号
    checkPhone(phone) {
        if(!(/^1[3456789]\d{9}$/.test(phone))){ 
            return false; 
        }
        return true;
    }
})