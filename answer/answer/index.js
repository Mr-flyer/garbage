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
        scrollTop: 0,
        record_id: '',
        setInter: null,
        setTimeer: null,
        answerList: [],
        answerIndex: 0,
        count_down: 10,
        countDown: 10,
        answer_list: [],
        checkList: [],
        show: false,             //遮罩层
        showLoading: true,
        answerOptionObj: ''
    },
    // onHide() {
    //     clearInterval(this.data.setInter);
    //     clearTimeout(this.data.setTimeer);
    // },
    onUnload() {
        clearInterval(this.data.setInter);
        clearTimeout(this.data.setTimeer);
    },
    onLoad() {
        let _that = this;
        this.setData({ statusBarHeight, titleBarHeight });
        Promise.all([
            special.getGarbageCategorys().then((res) => {
                _that.setData({
                    checkList: res.data
                })
            }),
            special.getAnswerList().then((res) => {
                _that.setData({
                    count_down: res.data.count_down,
                    record_id: res.data.record_id,
                    answerList: res.data.questions,
                    countDown: res.data.count_down
                })
                _that.countDownFun();
            }).catch((err)=>{
                if(err.errCode == 10030) {
                    wx.showToast({
                        title: '答题次数已用光',
                        icon: 'none',
                        duration: 2000
                    })
                    wx.navigateBack({
                        delta: 1
                    })
                }
            })
        ]).then(() => {
            _that.setData({
                showLoading: false
            })
        })
    },
    countDownFun() {
        let _that = this;
        let second = this.data.countDown;
        this.setData({
            setInter: setInterval(()=>{
                // 如果倒计时为0，清除定时器
                if(_that.data.countDown === 1) {
                    clearInterval(_that.data.setInter);
                    if(_that.data.answerList[_that.data.answerIndex]){
                        _that.setData({
                            ['answerList[' + _that.data.answerIndex + '].isClick']: -1,
                            ['answer_list[' + _that.data.answer_list.length + ']']: {"id":_that.data.answerList[_that.data.answerIndex].id,"choose":0},
                            answerOptionObj: _that.data.answerList[_that.data.answerIndex],
                            ['answerList[' + _that.data.answerIndex + '].selectStatus']: 2,
                            show: true
                        })
                        _that.isLastQuestion();
                    }
                }else{
                    _that.setData({
                        countDown: second--
                    })
                }
            },1000)
        })
    },
    /**
     * @method isLastQuestion--判断是否是最后一题
     */
    isLastQuestion() {
        let _that = this;
        if(this.data.answerIndex === this.data.answerList.length - 1){
            special.postAnswer({
                record_id: this.data.record_id,
                answer_data: this.data.answer_list
            }).then((res) => {
                _that.data.setTimeer = setTimeout(() => {
                    wx.redirectTo({
                        url: `/answer/result/index?record_id=${_that.data.record_id}&is_success=${res.data.is_success}&is_pay=${res.data.is_pay}&price=${res.data.price}&score=${res.data.score}`
                    })
                }, 2000)
            })
        }else {
            let index = this.data.answerIndex;
            this.data.setTimeer = setTimeout(() => {
                this.setData({
                    answerIndex: index + 1,
                    show: false,
                    countDown: this.data.count_down,
                    scrollTop: 0
                })
                this.countDownFun();
            }, 2000);
        }
    },
    handleTap() {},
    checkClassify(e) {
        clearInterval(this.data.setInter);
        if(!this.data.answerList[this.data.answerIndex].selectStatus) {
            this.setData({
                ['answerList[' + this.data.answerIndex + '].isClick']: e.currentTarget.dataset.checkindex,
                ['answer_list[' + this.data.answer_list.length + ']']: {"id":this.data.answerList[this.data.answerIndex].id,"choose":e.currentTarget.dataset.checkindex},
            })
            if(this.data.answerList[this.data.answerIndex].category == e.currentTarget.dataset.checkindex) {
                // 答题正确
                this.setData({
                    ['answerList[' + this.data.answerIndex + '].selectStatus']: 1,
                })
            }else {
                // 答题错误
                this.setData({
                    ['answerList[' + this.data.answerIndex + '].selectStatus']: 2,
                    answerOptionObj: this.data.answerList[this.data.answerIndex],
                    show: true
                })
            }
            this.isLastQuestion();
        }
    },
    onClickHide() {
        this.setData({
            show: false
        })
    }
})