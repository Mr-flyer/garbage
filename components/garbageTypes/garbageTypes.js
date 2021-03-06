// components/garbageTypes/garbageTypes.js
import specialModel from '../../models/special';
Component({
  behaviors: ['wx://form-field'],
  properties: {
    radioChecked: {
      type: Number,
    },
    isShowRadio: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    types: [{
        id: 1,
        name: '有害垃圾',
        icon: './source/garbage_red@2x.png'
      },
      {
        id: 2,
        name: '可回收物',
        icon: './source/garbage_blue@2x.png'
      },
      {
        id: 3,
        name: '湿垃圾',
        icon: './source/garbage_yellow@2x.png'
      },
      {
        id: 4,
        name: '干垃圾',
        icon: './source/garbage_gray@2x.png'
      },
    ]
  },
  // observers: {

  // },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { 
      specialModel.getGarbageCategorys()
      .then(({data}) => {
        this.setData({ types: data })
        // this.setData({ types: data.concat(this.data.types) })
      })
    },
    moved: function () { },
    detached: function () { },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击单选控件
    onChange(event) {
      this.setData({
        radioChecked: event.detail,
      });
    },
    // 点击垃圾区块
    onClick(event) {
      const {
        name
      } = event.currentTarget.dataset;
      this.setData({
        radioChecked: name,
      });
      this.triggerEvent('myevent',  name)
    },
  }
})