import special from '../../models/special.js';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
    data: {
        is_url: 0,
        knowInfo: '',
        url: '',
        knowledgeId: ''
    },
    onUnload() {
    },
    onLoad(options) {
        if(options.id) {
            this.setData({
                knowledgeId: options.id
            })
            let _that = this;
            Toast.loading({
                duration: 0,
                forbidClick: true,
                message: '加载中...',
            });
            special.getKnowledgeDetail(options.id).then((res) => {
                _that.setData({
                    is_url: res.data.is_url,
                    url: decodeURIComponent(res.data.url),
                    knowInfo: res.data.content.replace(/(<img[\s\S]+?)/ig, '<img style="width:100%;margin:0 auto;"')
                })
            })
        }else {
            Toast('无小知识详情');
        }
    },
    onShareAppMessage() {
        return {
            title: '来测测你是什么垃圾',
            desc: '垃圾分类小知识',
            path: `/answer/knowledgeDetail/index?id=${this.data.knowledgeId}`
        }
    }
})