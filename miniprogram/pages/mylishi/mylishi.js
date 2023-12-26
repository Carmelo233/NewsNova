Page({
  data: {
    chickIndex: -1,
    lishi: [
      {
        "id": 3,
        "uid": "userid",
        "title": "本轮巴以冲突已致加沙地带超1.55万人死亡  以军称对加沙已实施1万次空袭",
        "abstractText": "以色列国防军进行了1万次空袭，导致加沙地带的死亡人数达到15523人，受伤人数达到41316人，其中70%为妇女和儿童。加沙地带70%的医院已经停止服务。美国官员透露，美国向以色列提供了约57000枚炮弹和约15000枚炸弹。美国一边呼吁避免平民伤亡，一边继续向以色列提供武器，这种做法引发质疑。",
        "url": "https://www.cnr.cn/china/news/20231204/t20231204_526506877.shtml",
        "engine": "2",
        "liked": false,
        "browsedTime": "2023-12-11T01:42:26",
        "likedTime": null
      },
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
    }
    );
    var that = this;
    // 使用my.request发送请求
    my.request({
      url: 'http://112.74.176.236:9300/newsnova/get-history-browse',
      method: 'POST',
      success: function (res) {
        that.setData({
          lishi: res.data.data
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
    var cathchlishi = this.data.lishi[index];
    // console.log(this.data.lishi[e.currentTarget.dataset.index]);
    var that = this;
    my.request({
      url: 'http://112.74.176.236:9300/newsnova/browse',
      method: 'POST',
      data: {
        "uid": null,
        "title": cathchlishi.title,
        "abstractText": cathchlishi.abstractText,
        "url": cathchlishi.url,
        "engine": cathchlishi.engine,
        "id": cathchlishi.id
      },
      // 更新浏览状态
      success: function (res) {
        var _lishi = that.data.lishi;
        _lishi[index].id = res.data;
        that.setData({
          lishi: _lishi
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
          summary: cathchlishi.abstractText,
          title: cathchlishi.title,
          url: cathchlishi.url,
          id: cathchlishi.id,
          index: index,
          liked: cathchlishi.liked
        })
      }
    })
  },
  changeColl(_liked) {
    var _lishi = this.data.lishi;
    _lishi[this.data.chickIndex].liked = _liked;
    this.setData({
      lishi: _lishi
    })
    console.log("更改上一页参数：",this.data.lishi);
  }
});
