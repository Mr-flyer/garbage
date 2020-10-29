/*
 * @Author: your name
 * @Date: 2020-10-27 14:37:19
 * @LastEditTime: 2020-10-29 14:24:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \code\components\basicDiscuss\basicDiscuss.js
 */
// components/basicDiscuss/basicDiscuss.js
import dayjs from '../../utils/dayjs';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    discussItem: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  observers: {
    discussItem() {
      let curTime = this.data.discussItem.time
      let txt = ''
      if(dayjs(curTime).add(300, 'second') > dayjs()) {
        txt = '片刻之前'
      }else if(dayjs(curTime).add(60, 'minute') > dayjs()) {
        txt = `${dayjs().diff(dayjs(curTime), 'minute')}分钟前`
      }else if(dayjs(curTime).add(24, 'hour') > dayjs()) {
        txt = `${dayjs().diff(dayjs(curTime), 'hour')}小时前`
      }else if(dayjs(curTime).add(1, 'month') > dayjs()) {
        txt = `${Math.floor(dayjs().diff(dayjs(curTime), 'hour') / 24)}天前`
      }else {
        txt = dayjs(curTime).format('YYYY-MM-DD HH:mm')
      }
      this.setData({ timeTxt: txt })
    }
  },
  lifetimes: {
    attached: function() {
      let { headimgurl, sex } = this.data.discussItem
      // 0 未知、 1 男、 2 女
      this.data.sex = `/static/images/common/avatar_${sex != 2 ?'boy' : 'girl'}@2x.png`
      this.setData({
        "discussItem.headimgurl": headimgurl || this.data.sex
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    // 图片加载失败时 --- 头像
    _imageErr() {
      this.setData({
        "discussItem.headimgurl": this.data.sex
      })
    }
  }
})
