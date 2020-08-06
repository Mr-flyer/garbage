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
        content: '',
        phone:  '',
        phoneErrMsg: '',
        setTimeer: ''
    },
    onLoad(options) {
        
    },
    onUnload() {
        clearTimeout(this.data.setTimeer);
    },
    feedbackSub() {
        let _that = this;
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
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        special.postFeedback({
            title: this.data.title,
            content: this.data.content,
            phone: this.data.phone
        })
        .then((res) => {
            wx.hideLoading();
            wx.showToast({
                title: '意见反馈成功',
                icon: 'none',
                duration: 2000
            })
            _that.data.setTimeer = setTimeout(()=>{
                wx.navigateBack({
                    delta: 1
                })
            },2000)
        })
        .catch(()=>{
            wx.hideLoading();
        })
    },
    // 验证手机号
    checkPhone(phone) {
        if(!(/^1[3456789]\d{9}$/.test(phone))){ 
            return false; 
        }
        return true;
    }
})