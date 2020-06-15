// components/staticIcon/staticIcon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currtStatus: Number,
    tips: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusObj: [
      { imgUrl: './source/succ_add@2x.png', txt: '添加成功',},
      { imgUrl: './source/empty_answer@2x.png', txt: '您还没有答对的分类哦！',},
      { imgUrl: './source/empty_collect@2x.png', txt: '您还没有收藏哦！',},
      { imgUrl: './source/empty_discuss@2x.png', txt: '您还没有评论哦！',},
      { imgUrl: './source/empty_keyword@2x.png', txt: '您还没有添加词库哦！',},
    ]
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
