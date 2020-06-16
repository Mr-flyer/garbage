const {
    statusBarHeight, // 状态栏高度
    titleBarHeight  // 标题栏高度
} = getApp().globalData;
import special from '../../models/special.js';
Page({
    data: {
        canUse: getApp().globalData.canUse,
        nvabarData: {
            navigationBarTextStyle: 'white', // 胶囊主题 white || black
            navigationBarTitleText: '你是什么垃圾', //  导航栏标题文本
        },
        answerList: [],
        answerIndex: 0,
        checkList: [
            {
                "icon": '../images/answer/harmful_icon.png',
                "activeIcon": '../images/answer/harmful_active_icon.png',
                "name": '有害垃圾'
            },
            {
                "icon": '../images/answer/recover_icon.png',
                "activeIcon": '../images/answer/recover_active_icon.png',
                "name": '可回收物'
            },
            {
                "icon": '../images/answer/wet_icon.png',
                "activeIcon": '../images/answer/wet_active_icon.png',
                "name": '湿垃圾'
            },
            {
                "icon": '../images/answer/shield_icon.png',
                "activeIcon": '../images/answer/shield_active_icon.png',
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
        special.getAnswerList().then((res) => {
            _that.setData({
                showLoading: false,
                answerList: res.data.questions
            })
        })
    },
    handleTap() {},
    checkClassify(e) {
        this.setData({
            checkIndex: e.currentTarget.dataset.checkindex
        })
        wx.navigateTo({
            url: '/answer/result/index'
        })
    },
    onClickHide() {
        this.setData({
            show: false
        })
    }
})