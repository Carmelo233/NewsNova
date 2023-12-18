Page({
  data: {
    shoucang: [
      {
        "id": 2,
        "uid": "userid",
        "title": "本轮巴以冲突已致双方超1.73万人死亡",
        "abstractText": "以色列国防军在加沙地带持续进行军事行动，打击巴勒斯坦伊斯兰抵抗运动（哈马斯）的火箭弹发射器和武器库。以军空袭了学校和城市，并与哈马斯武装人员发生交火。通信和互联网服务完全中断。据加沙地带卫生部门统计，截至目前，本轮冲突已导致超过1.73万人死亡。",
        "url": "https://www.cnr.cn/china/news/20231205/t20231205_526508092.shtml",
        "engine": "2",
        "liked": true,
        "browsedTime": "2023-12-11T00:54:23",
        "likedTime": "2023-12-11T01:07:12"
      }
    ]
  },
  onLoad() {
    my.showLoading({
      content: '加载中...',
    });
    var that = this;
    // 使用my.request发送请求
    my.request({
      url: 'your-backend-api-url/collections',
      method: 'POST',
      success: function (res) {
        that.setData({
          shoucang: res.data
        })
      },
      fail: function (error) {
        my.alert({
          content: "加载失败"
        })
        console.error('fail: ', JSON.stringify(error));
      },
      complete: function (res) {
        my.hideLoading();
      },
    });
  },
  cathchConfirm(e) {
    var index = e.currentTarget.dataset.index;
    var cathchshoucang = this.data.shoucang[index];
    // console.log(this.data.shoucang[e.currentTarget.dataset.index]);
    var that = this;
    my.request({
      url: 'http://localhost:9300/newsnova/browse',
      method: 'POST',
      data: {
        "uid": null,
        "title": cathchshoucang.title,
        "abstractText": cathchshoucang.abstractText,
        "url": cathchshoucang.url,
        "engine": cathchshoucang.engine,
        "id": cathchshoucang.id
      },
      // 更新浏览状态
      success: function (res) {
        var _shoucang = that.data.shoucang;
        _shoucang[index].id = res.data;
        that.setData({
          shoucang: _shoucang
        })
      },
    })
    my.navigateTo({
      url: '/pages/summer/summer',
      success: function (res) {
        that.setData({
          chickIndex: index
        })
        // 通过 eventChannel 向 B 页面传送数据
        res.eventChannel.emit('seachres', {
          summary: cathchshoucang.abstractText,
          title: cathchshoucang.title,
          url: cathchshoucang.url,
          id: cathchshoucang.id,
          index: index,
          liked: cathchshoucang.liked
        })
      }
    })
  },
  changeColl(_liked) {
    var _shoucang = this.data.shoucang;
    _shoucang[this.data.chickIndex].liked = _liked;
    this.setData({
      shoucang: _shoucang
    })
    console.log("更改上一页参数：", this.data.shoucang);
  }
  // outcollect() {
  //   my.request({
  //     url: '取消收藏',
  //     method: 'POST',
  //     data: {
  //       id: 0
  //     },
  //     success: function (res) {
  //     },
  //     fail: function (error) {
  //       console.error('fail: ', JSON.stringify(error));
  //     },
  //     complete: function (res) {
  //       my.hideLoading();
  //     },
  //   })
  // },
  // toggleCollect: function (e) {
  //   var index = e.currentTarget.dataset.index;
  //   var updatedShoucang = this.data.shoucang; // take a copy of the shoucang array

  //   updatedShoucang[index].liked = !updatedShoucang[index].liked;

  //   this.setData({
  //     shoucang: updatedShoucang,
  //   });
  //   my.request({
  //     url: 'http://localhost:9300/newsnova/set-like', 
  //     method: 'POST',
  //     data:{
  //       id: updatedShoucang[index].id
  //     },
  //     success: function (res) {
  //     },
  //     fail: function (error) {
  //       console.error('fail: ', JSON.stringify(error));
  //     }
  //   })
  //   // console.log(this.data.shoucang);
  // },


});
