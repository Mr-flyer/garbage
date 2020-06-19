import special from '../../models/special.js';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'black', // 胶囊主题 white || black
            navigationBarTitleText: '小答题', //  导航栏标题文本
            navigationBarBackgroundColor: 'white'
        },
        is_url: 0,
        knowInfo: '',
        url: ''
    },
    onLoad(options) {
        if(options.id) {
            let _that = this;
            Toast.loading({message: '加载中...', forbidClick: true, duration: 0})
            special.getKnowledgeDetail(options.id).then((res) => {
              Toast.clear()
                _that.setData({
                    is_url: res.data.is_url,
                    url: res.data.url
                })
                if(res.data.is_url == 0) {
                    _that.setData({
                        knowInfo: res.data.content
                    })
                }
            })
        }else {
            Toast('无小答题详情');
        }
    }
})