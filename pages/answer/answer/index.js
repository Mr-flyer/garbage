const {
    statusBarHeight, // 状态栏高度
    titleBarHeight  // 标题栏高度
} = getApp().globalData;
Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'white', // 胶囊主题 white || black
            navigationBarTitleText: '你是什么垃圾', //  导航栏标题文本
        },
        checkList: [
            {
                "icon": '../../../static/images/answer/harmful_icon.png',
                "activeIcon": '../../../static/images/answer/harmful_active_icon.png',
                "name": '有害垃圾'
            },
            {
                "icon": '../../../static/images/answer/recover_icon.png',
                "activeIcon": '../../../static/images/answer/recover_active_icon.png',
                "name": '可回收物'
            },
            {
                "icon": '../../../static/images/answer/wet_icon.png',
                "activeIcon": '../../../static/images/answer/wet_active_icon.png',
                "name": '湿垃圾'
            },
            {
                "icon": '../../../static/images/answer/shield_icon.png',
                "activeIcon": '../../../static/images/answer/shield_active_icon.png',
                "name": '干垃圾'
            }
        ],
        checkIndex: '',
        show: false,             //遮罩层
        showLoading: true
    },
    onLoad() {
        let _that = this;
        this.setData({ statusBarHeight, titleBarHeight });
        setTimeout(() => {
            _that.setData({
                showLoading: false
            })
        }, 2000)
    },
    handleTap() {},
    checkClassify(e) {
        this.setData({
            checkIndex: e.currentTarget.dataset.checkindex
        })
        wx.navigateTo({
            url: '/pages/answer/result/index'
        })
    },
    onClickHide() {
        this.setData({
            show: false
        })
    }
})