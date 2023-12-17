Page({
  data: {
    lishi:[
      {
        "id": 4,
        "uid": "userid",
        "keyword": "国庆节"
      },
      {
        "id": 3,
        "uid": "userid",
        "keyword": "巴以冲突"
      }],
    inputValue : "",
    engine : 0,
    showEngineSelect: false, // 控制选择按钮框的显示
    engines: ["百度", "谷歌", "必应"], // 搜索引擎选项列表
  },
  onLoad() {},
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      });
    }
  },
  cathchConfirm(e){
    var cathchlishi = this.data.lishi[e.currentTarget.dataset.index];
    // console.log(this.data.lishi[e.currentTarget.dataset.index]);
    this.setData({
      inputValue: cathchlishi.keyword,
    });
    this.inputConfirm();
  },

  inputConfirm(){
    var that = this;
    my.navigateTo({
      url: '/pages/schres/schres',
      success: function(res) {
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
  toggleEngineSelect() {
    this.setData({
      showEngineSelect: !this.data.showEngineSelect,
    });
  },
  selectEngine(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      engine: index,
      showEngineSelect: false,
    });
  },
});
