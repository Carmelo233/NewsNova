Page({
  data: {
    lishi:[
      '历史记录1',
      '历史记录2',
      '历史记录3',
      '历史记录4',
      '历史记录5',
      '历史记录6XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    ],
    inputValue : ""
  },
  onLoad() {},
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      });
    }
  },
  inputConfirm(e){
    // console.log(e.detail.value);
    this.setData({
      inputValue: e.detail.value,
    });
    my.navigateTo({
      url: '/pages/schres/schres?id=1',
      success: function(res) {
        // 通过 eventChannel 向 B 页面传送数据
        res.eventChannel.emit('sort', { 
          data: e.detail.value
        })
      }
  })
  },
  bindKeyInput(e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },
});
