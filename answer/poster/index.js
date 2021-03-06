import { host } from '../../env';
import { getStorage } from '../../utils/storageSyncTool';
Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'white', // 胶囊主题 white || black
            navigationBarTitleText: '海报分享', //  导航栏标题文本
        },
        posterUrl: ''
    },
    onLoad(options) {
        if(options.record_id && getStorage('isUpdata').user_id) {
            this.setData({
                posterUrl: `${host}static/share/index.html#/?record_id=${options.record_id}&user_id=${getStorage('isUpdata').user_id}`
            })
        }
    }
})