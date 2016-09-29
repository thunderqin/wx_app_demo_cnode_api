var util = require('../../utils/util.js')

Page({
  data:{
    hidden: false,
    articleList: [],
    tagList: [],
    page: 1,
  },
  onLoad: function (options) {
    this.fetchArticle();
    this.fetchTag();
  },
  fetchTag: function () {
    this.setData({
        hidden: false
    });

    wx.request({
        url: 'http://month.fe.sm.cn/api/tag',
        data: {
            page: this.data.page
        },
        success: (res) => {

            if(res.statusCode == 200 && res.data.data instanceof Array) {
                this.setData({
                    tagList: res.data.data
                });
            }

            this.setData({
                hidden: true
            });
            
        }
    })
  },
  fetchArticle: function () {
    this.setData({
        hidden: false
    });

    wx.request({
        url: 'http://month.fe.sm.cn/api/article',
        data: {
            page: this.data.page
        },
        success: (res) => {

            if(res.statusCode == 200 && res.data.data instanceof Array) {
                this.setData({
                    articleList: this.data.articleList.concat(res.data.data.map(function(item) {
                        item.create_time = util.formatTime(new Date(item.create_time));
                        return item;
                    }))
                });
            }

            this.setData({
                hidden: true
            });
            
        }
    })
  },
  lower: function (e) {
	    this.setData({
            page: this.data.page + 1
	    });

        this.fetchArticle();
  }
})