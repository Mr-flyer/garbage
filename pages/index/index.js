//index.js
import { setStorage, getStorage, saveTokens } from '../../utils/storageSyncTool';
Page({
  data: {
    canUse: getApp().globalData.canUse,
    nvabarData: {
      "navigationBarTextStyle": "white", // 胶囊主题 white || black
      "navigationBarTitleText": "垃圾分类问答", //  导航栏标题文本
      // navigationBarBackgroundColor: 'aqua', // 导航栏背景色
      // statusBgColor: '', // 状态栏背景色
      // showPre: true, // 是否只展示返回键 默认 false
      hideCapsule: true, // 是否隐藏胶囊
    },
    active: 0,  // 当前选中tab
  },
  onLoad: function(optons) {
    getApp().watch(needUpdate => {
      console.log('----------', needUpdate);
      this.setData({ needUpdate })
    })
  },
  onShareAppMessage() {
    return {
        title: '来测测你是什么垃圾',
        desc: '来测测你是什么垃圾',
        path: '/pages/index/index'
    }
  },
  // 切换页脚 tabber 时
  onChangeTabbar(event) {
    if(event.detail === 2) {
      this.setData({
        nvabarData: {
          "navigationBarTextStyle": "white", // 胶囊主题 white || black
          "navigationBarTitleText": "个人中心", //  导航栏标题文本
          hideCapsule: true, // 是否隐藏胶囊
        }
      })
    }else {
      this.setData({
        nvabarData: {
          "navigationBarTextStyle": "white", // 胶囊主题 white || black
          "navigationBarTitleText": "垃圾分类问答", //  导航栏标题文本
          hideCapsule: true, // 是否隐藏胶囊
        }
      })
    }
    if(event.detail === 1) {
      if(getStorage('isUpdata').need_update) {
        getApp().globalData.needUpdate = true;
      }else {
        wx.navigateTo({
          url: '/answer/index/index'
        })
      }
    }else {
      this.setData({ active: event.detail });
    }
  },
  handGetUserInfo({detail}) {
    getApp()._getUserInfo(detail)
  }
})