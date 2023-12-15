Component({
  data: {
    selected: null,
    list:[
      {
        "activeIcon": "/image/home_fill.png",
        "icon": "/image/home1.png",
        "pagePath": "/pages/index/index",
        "name": "热榜"
      },
      {
        "pagePath":"/pages/sort/sort",
        "name":"搜索"
      },
      {
        "activeIcon": "/image/my2.png",
        "icon":"/image/my1.png",
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