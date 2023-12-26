Page({
  data: {
    url: ''
  },
  onLoad: function (options) {
    this.setData({
      url: options.url
    });
    console.log("open url:",options);
  }
});