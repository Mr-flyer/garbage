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
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      let curTime = this.data.discussItem.time
      let txt = ''
      if(dayjs(curTime).add(60, 'second') > dayjs()) {
        txt = '片刻之前'
      }else if(dayjs(curTime).add(60, 'minute') > dayjs()) {
        txt = `${dayjs().diff(dayjs(curTime), 'minute')}分钟前`
      }else if(dayjs(curTime).add(24, 'hour') > dayjs()) {
        txt = `${dayjs().diff(dayjs(curTime), 'hour')}小时前`
      }else if(dayjs(curTime).add(1, 'month') > dayjs()) {
        txt = `${dayjs().diff(dayjs(curTime), 'hour')}天前`
      }else {
        txt = dayjs(curTime).format('YYYY-MM-DD HH:mm')
      }
      this.setData({ timeTxt: txt })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    
  }
})
