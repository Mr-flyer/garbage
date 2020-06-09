// components/load-more/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hasMore: {
      type: Boolean,
      value: false
    },
    // 加载中的显示文本
    loadingText: {
      type: String,
      value: '加载中...'
    },
    // 加载失败的显示文本
    failText: {
      type: String,
      value: '加载失败, 请点击重试!'
    },
    // 没有更多后的显示文本, 无文本提示 则隐藏加载更多控件
    finishText: {
      type: String,
      value: '没有更多数据了'
    },
    // 列表渲染延时, 默认为 500 ms, 我在开发工具中测试列表渲染速度时快时慢, 可根据实际使用中界面复杂度自行调整
    // ps 如果能监听setData() 渲染结束的话则可以不需要延时 
    listRenderingDelay: {
      type: Number,
      value: 500
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showThis: false,
    text: '',
    showIcon: false,
    isLoading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 加载更多的入口方法
     * 直接在page中使用时请在onReachBottom() 方法中调用这个方法, 并实现loadMoreListener方法去获取数据
     */
    loadMore() {
      let { hasMore, isLoading } = this.data
      // hasMore 当前是否 存在下一页 且 不是首页（首页为页面初始化，无需展示 loadmore）
      // isLoading 当前是否已经处于 loadmore 中
      if (!hasMore || isLoading) return
      // 开启 loadmore
      this.setData({ isLoading: true })
      // 向外暴露当前事件
      this.triggerEvent('loadMoreListener')
    },
    // 加载完成, 传入hasMore 
    loadMoreComplete(data) {
      // 注：此处需传入当前页数、总页数，组件才能正常工作
      // 当前页数小于总页数 且 非首页则展示 
      let hasMore = data.curPage < data.pageCount && data.pageCount != 1,
        { loadingText, finishText, listRenderingDelay } = this.properties,
        text = '', showThis = false, showIcon = false; // 初始状态值
      
      showThis = hasMore || finishText.length > 0 // 注：此处 finishText.length > 0 代表 末页提示文本为空时隐藏组件
      showIcon = hasMore // loading 状态
      text = hasMore ? loadingText : finishText
      
      this.setData({ hasMore, text, showIcon, showThis })
      //界面渲染延迟, 避免列表还未渲染完成就再次触发 loadMore 方法
      setTimeout(() => {
        this.setData({ isLoading: false })
      }, listRenderingDelay)
    },
    // 加载失败
    loadMoreFail() {
      let { failText: text, listRenderingDelay } = this.properties
      this.setData({ showIcon: false, text })

      //界面渲染延迟, 避免列表还未渲染完成就再次触发 loadMore 方法
      setTimeout(() => {
        this.setData({ isLoading: false })
      }, listRenderingDelay)
    },
    //点击 loadmore 控件时触发, 只有加载失败时才会进入页面回调方法
    clickLoadMore: function () {
      let { text } = this.data
      let { failText, loadingText } = this.properties
      if (text != failText) return  // 若正常加载，中断后续代码执行
      this.setData({ showIcon: true, text: loadingText, isLoading: true })
      this.triggerEvent('clickLoadMore')
    }
  }
})