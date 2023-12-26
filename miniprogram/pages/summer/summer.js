Page({
  data: {
    summary: "以色列国防军在加沙地带持续进行军事行动，打击巴勒斯坦伊斯兰抵抗运动（哈马斯）的火箭弹发射器和武器库。以军空袭了学校和城市，并与哈马斯武装人员发生交火。通信和互联网服务完全中断。据加沙地带卫生部门统计，截至目前，本轮冲突已导致超过1.73万人死亡。",
    title: "本轮巴以冲突已致双方超1.73万人死亡",
    url: "https://www.cnr.cn/china/news/20231205/t20231205_526508092.shtml",
    liked: false,
    id: 0,
    index: -1
  },
  onLoad() {
    var that = this;
    const eventChannel = that.getOpenerEventChannel();
    eventChannel.on('seachres', data => {
      console.log("点开摘要", data);
      that.setData({
        summary: data.summary,
        title: data.title,
        url: data.url,
        id: data.id,
        index: data.index,
        liked: data.liked
      })
    });
    console.log(this.data);
  },
  toggleCollect: function (e) {
    this.setData({
      liked: !this.data.liked,
    });
    var pages = getCurrentPages();
    // 上一页面栈
    var prevPage = pages[pages.length - 2];
    // 上以页面的Data数据
    console.log(prevPage.data);
    // 调用上一页函数,更新liked状态
    prevPage.changeColl(this.data.liked);
    // 收藏/取消收藏
    var that = this;
    my.request({
      url: 'http://112.74.176.236:9300/newsnova/set-like',
      method: 'POST',
      data: {
        id: this.data.id
      },
      success: function (res) {
        this.setData({
          liked: !that.data.liked,
        });
        var pages = getCurrentPages();
        // 上一页面栈
        var prevPage = pages[pages.length - 2];
        // 调用上一页函数,更新liked状态
        prevPage.changeColl(this.data.liked);
      },
      fail: function (error) {
        console.error('fail: ', JSON.stringify(error));
      }
    })
    // console.log(this.data.shoucang);
  },
  
  tourl(event) {
    const url = this.data.url;
    // 使用encodeURIComponent确保URL参数没有问题
    const encodedUrl = encodeURIComponent(url);

    // 跳转至webViewPage，并传递url参数
    my.navigateTo({
      url: "../webViewPage/webViewPage?url=" + encodedUrl
    })
  },
});
