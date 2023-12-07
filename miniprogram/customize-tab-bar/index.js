Component({
  data: {
    selected: null,
    list:[
      {
        "activeIcon": "/image/home_fill.png",
        "icon": "/image/主页1.png",
        "pagePath": "/pages/index/index",
        "name": "热榜"
      },
      {
        "pagePath":"/pages/sort/sort",
        "name":"搜索"
      },
      {
        "activeIcon": "/image/个人2.png",
        "icon":"/image/个人1.png",
        "pagePath": "/pages/my/my",
        "name": "个人"
      }
    ],
  },
  methods: {
    tap(e) {
      const { index,url } = e.currentTarget.dataset;
      console.log(e.currentTarget.dataset);
      if(this.data.selected == index || index == undefined) return; 
      console.log("转到"+url);
      my.switchTab({
        url: url
      });
    },
  }

});