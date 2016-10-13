var util = require('../../utils/util.js');
var api = 'https://cnodejs.org/api/v1/topics';

Page({
  data:{
    hidden: false,
    articleList: [],
    tagList: ['all','ask','share','job','good'],
    page: 1,
    limit: 10,
    curtab: ''
  },
  onLoad: function (options) {
    this.fetchArticle('');
  },
//   fetchTag: function () {
//     this.setData({
//         hidden: false
//     });

//     wx.request({
//         url: 'http://month.fe.sm.cn/api/tag',
//         data: {
//             page: this.data.page
//         },
//         success: (res) => {

//             if(res.statusCode == 200 && res.data.data instanceof Array) {
//                 this.setData({
//                     tagList: res.data.data
//                 });
//             }

//             this.setData({
//                 hidden: true
//             });
            
//         }
//     })
//   },
  getTab: function(e){
      var tab = e.currentTarget.id;

      this.setData({curtab: tab});

      this.fetchArticle();
  },
  fetchArticle: function () {
    this.setData({
        hidden: false
    });

    wx.request({
        url: api,
        data: {
            page: this.data.page,
            tab: this.data.curtab,
            limit: this.data.limit
        },
        success: (res) => {

            this.setData({
                articleList: res.data.data
            })

            // if(res.statusCode == 200 && res.data.data instanceof Array) {
            //     this.setData({
            //         articleList: this.data.articleList.concat(res.data.data.map(function(item) {
            //             item.create_time = util.formatTime(new Date(item.create_time));
            //             return item;
            //         }))
            //     });
            // }
            console.log(res);

            this.setData({
                hidden: true
            });
            
        }
    })
  },
  lower: function (e) {
      console.log('lower');
	    // this.setData({
        //     page: this.data.page + 1
	    // });

        // this.fetchArticle();
  }
})