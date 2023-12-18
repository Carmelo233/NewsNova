Page({
  data: {
    chickindex: -1,
    engine: null,
    listlen: 5,
    inputValue: "",
    reslist: [{
      "summary": "以色列国防军在加沙地带持续进行军事行动，打击巴勒斯坦伊斯兰抵抗运动（哈马斯）的火箭弹发射器和武器库。以军空袭了学校和城市，并与哈马斯武装人员发生交火。通信和互联网服务完全中断。据加沙地带卫生部门统计，截至目前，本轮冲突已导致超过1.73万人死亡。",
      "title": "本轮巴以冲突已致双方超1.73万人死亡",
      "url": "https://www.cnr.cn/china/news/20231205/t20231205_526508092.shtml"
    },
    {
      "summary": "自10月7日以来，以色列对加沙地带的袭击导致15899人死亡，近42000人受伤。56家卫生机构被摧毁，加沙地带卫生系统完全瘫痪。加沙地带卫生部门呼吁保护医疗机构和人道主义团队。约旦河西岸有242人死亡。以色列方面称自己的死亡人数约为1200人。本轮冲突已导致巴以双方超1.73万人死亡。",
      "title": "本轮巴以冲突已致双方超1.73万人死亡",
      "url": "https://www.cnr.cn/newscenter/sq/20231204/t20231204_526507896.shtml"
    },
    {
      "summary": "以色列国防军进行了1万次空袭，导致加沙地带的死亡人数达到15523人，受伤人数达到41316人，其中70%为妇女和儿童。加沙地带70%的医院已经停止服务。美国官员透露，美国向以色列提供了约57000枚炮弹和约15000枚炸弹。美国一边呼吁避免平民伤亡，一边继续向以色列提供武器，这种做法引发质疑。",
      "title": "本轮巴以冲突已致加沙地带超1.55万人死亡  以军称对加沙已实施1万次空袭",
      "url": "https://www.cnr.cn/china/news/20231204/t20231204_526506877.shtml"
    },
    {
      "summary": "中国外交部发言人汪文斌表示，本轮巴以冲突导致大量平民伤亡和人道主义灾难，中国始终站在和平、公道和人类良知一边。作为安理会轮值主席国，中国积极推动安理会采取负责任和有意义的行动。中国发布了《中国关于解决巴以冲突的立场文件》，提出全面停火、保护平民、确保人道主义救援、加大外交斡旋和通过实施“两国方案”解决问题的五个建议。中国将继续与各方加强协调，努力消除冲突，重新启动和谈，推动全面、公正、持久解决巴以问题。",
      "title": "中方发布《中国关于解决巴以冲突的立场文件》  外交部介绍情况",
      "url": "https://www.cnr.cn/js2014/gj/20231130/t20231130_526504054.shtml"
    },
    {
      "summary": "巴以冲突导致严重的人道主义灾难，双方军事行动频繁，造成大量平民伤亡。国际社会呼吁停火，其中中国积极推动解决，发布了解决巴以冲突的立场文件，提出全面停火、保护平民、人道主义救援和通过“两国方案”寻求政治解决等建议。各方应加强协调，努力重启和谈，达成全面、公正、持久的解决方案。",
      "title": "total_summary_title111",
      "url": "http://total_summary111.com"
    }
    ]
  },
  onLoad() {
    var that = this;
    const eventChannel = that.getOpenerEventChannel();
    eventChannel.on('sort', data => {
      console.log(data);
      my.request({
        url: '搜索接口',
        method: 'POST',
        data: {
          keyword: that.data.inputValue,
          engine: 1,
        },
        dataType: 'json',
        success: function (res) {
          that.setData({
            reslist: res.data,
          })
          // 给数组每个对象加个liked&&id 属性
          var list = that.data.reslist;
          list.forEach(item => {
            item.liked = false;
            item.id = 0
          });
          that.setData({
            reslist: list,
            listlen: list.length//是否需要？
          })
        },
        fail: function (error) {
          console.error('fail: ', JSON.stringify(error));
          my.alert({
            title: '错误',
            content: '搜索失败'
          });
        },
        complete: function (res) {
          my.hideLoading();
        },
      });
    });
  },
  onShow() {
    // 自定义的bar
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0,
      });
    }
  },
  tourl(event) {
    console.log(event);
    const index = event.currentTarget.dataset.index;
    const url = this.data.reslist[index].url;
    // 使用encodeURIComponent确保URL参数没有问题
    const encodedUrl = encodeURIComponent(url);

    // 跳转至webViewPage，并传递url参数
    my.navigateTo({
      url: "../webViewPage/webViewPage?url=" + encodedUrl
    })
  },
  toggleCollect: function (e) {
    var index = e.currentTarget.dataset.index;
    var updatedReslist = this.data.reslist; // take a copy of the shoucang array

    updatedReslist[index].liked = !updatedReslist[index].liked;

    this.setData({
      reslist: updatedReslist,
    });
    my.request({
      url: 'http://localhost:9300/newsnova/set-like',
      method: 'POST',
      data: {
        id: updatedReslist[index].id
      },
      success: function (res) {
      },
      fail: function (error) {
        console.error('fail: ', JSON.stringify(error));
      }
    })
    // console.log(this.data.shoucang);
  },
  cathchConfirm(e) {
    var index = e.currentTarget.dataset.index;
    var cathchres = this.data.reslist[index];
    // console.log(this.data.lishi[e.currentTarget.dataset.index]);
    var that = this;


    my.request({
      url: 'http://localhost:9300/newsnova/browse',
      method: 'POST',
      data: {
        "uid": null,
        "title": cathchres.title,
        "abstractText": cathchres.summary,
        "url": cathchres.url,
        "engine": this.data.engine,
        "id": 0
      },
      // 更新浏览状态
      success: function (res) {
        var _reslist = that.data.reslist;
        _reslist[index].id = res.data;
        that.setData({
          reslist: _reslist
        })
      },
    })

    my.navigateTo({
      url: '/pages/summer/summer',
      success: function (res) {
        that.setData({
          chickindex: index
        })
        // 通过 eventChannel 向 B 页面传送数据
        res.eventChannel.emit('seachres', {
          summary: cathchres.summary,
          title: cathchres.title,
          url: cathchres.title,
          id: 0,
          index: index,
          liked: cathchres.liked
        })
      }
    })
  },
  changeColl(_liked) {
    var _reslist = this.data.reslist;
    _reslist[this.data.chickindex].liked = _liked;
    this.setData({
      reslist: _reslist
    })
    console.log("更改上一页参数：",this.data.reslist);
  }
});