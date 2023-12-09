Page({
  data: {
    inputValue : ""
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    // 通过监听 PageA_Data 事件，接收 A 页面传过来的数据。
    eventChannel.on('PageA_Data', data => {
      console.log(data); // { "data": "hi～ 我是 pageA" }
    });
  },
  onShow() {
    // 自定义的bar
     if (typeof this.getTabBar === 'function' && this.getTabBar()) {
       this.getTabBar().setData({
         selected: 0,
       });
     }
   }
});
