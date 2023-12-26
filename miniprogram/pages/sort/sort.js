Page({
  data: {
    lishi: [
      {
        "id": 4,
        "uid": "userid",
        "keyword": "国庆节"
      },
      {
        "id": 3,
        "uid": "userid",
        "keyword": "巴以冲突"
      }
    ],
    inputValue: "",
    engine: "0",
    engines: [
      { name: '央广网', val: "0" },
      { name: '腾讯新闻', val: "2" },
      { name: '搜狐新闻', val: "4" },
    ],

  },
  onLoad() {
    // this.getlishiList();
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      });
    }
  },
  cathchConfirm(e) {
    var cathchlishi = this.data.lishi[e.currentTarget.dataset.index];
    // console.log(this.data.lishi[e.currentTarget.dataset.index]);
    this.setData({
      inputValue: cathchlishi.keyword,
    });
    this.inputConfirm();
  },

  inputConfirm() {
    var that = this;
    my.navigateTo({
      url: '/pages/schres/schres',
      success: function (res) {
        // 通过 eventChannel 向 B 页面传送数据
        res.eventChannel.emit('sort', {
          inputValue: that.data.inputValue,
          engine: that.data.engine
        })
      }
    })
  },

  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },

  chooseEngine(e) {
    var chosen = this.data.engines[e.detail.value].val;
    this.setData({ engine: chosen, showDropdown: false });
    console.log("当前搜索引擎：", this.data.engine);
  },

  deleteItem(e) { 
    const index = e.currentTarget.dataset.index;
    const lishi = this.data.lishi;

    // 从服务器删除Item
    my.request({
      url: 'http://112.74.176.236:9300/newsnova/delete-search-record',
      method: 'POST',
      data: { 
        id: this.data.lishi[index].id 
      }, 
      success: function (res) {
        console.log("delete 某条历史搜索",res);
      },
      fail: function (error) {
        my.showToast({
          content: "删除失败"
        });
        console.error('fail: ', JSON.stringify(error));
      }
    });
    
    // 删除特定索引的历史项目
    lishi.splice(index, 1);
    
    // 更新lishi数据并重新渲染列表
    this.setData({
      lishi: lishi
    });
  },

  removeall() {
    my.request({
      url: 'http://112.74.176.236:9300/newsnova/delete-all-record',
      method: 'POST',
      success: function (res) {
        console.log("removeall lishi success");
      },
      fail: function (error) {
        my.alert({
          content: "删除失败"
        })
        console.error('fail: ', JSON.stringify(error));
      },
    })
  },

  getlishiList() {
    var that = this;
    my.request({
      url: 'http://112.74.176.236:9300/newsnova/get-history-search',
      method: 'POST',
      success: function (res) {
        that.setData({
          lishi: res.data.data
        })
        console.log(that.data.lishi);
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
  }
});
