Component({
	properties: {
		emptyText: {
			type: String,
			value: ''
		}
	},
	data: {
		emptyShow: false
	},
	methods: {
		getShowValue(val) {
			if(val instanceof Array) {
				if(val.length <= 0) {
					this.setData({
						emptyShow: true
					})
				}else {
					this.setData({
						emptyShow: false
					})
				}
			}
		}
	}
})