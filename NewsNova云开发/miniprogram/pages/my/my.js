const app = getApp();

Page({
  data: {
    nickName: '请登录/注册',
    avatar: "/image/head.png",
    islog: false,
  },
  onLoad() {
    this.setData({
      islog: app.globalData.isLoggedin,
    }),
      // 小程序前端请求获取authCode
    my.getAuthCode({
      scopes: 'auth_base',
      success: (res) => {
        let authCode = res.authCode;
        console.log(authCode);
      }
    });

  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
      });
    }
    this.setData({
      isLoggedin: app.globalData.isLoggedin
    });
  },
  getAuthCode() {
    my.getAuthCode({
      scopes: 'auth_user',
      success: res => {
        const authCode = res.authCode;
        console.log("auCode: " + authCode);
        // 在服务端获取用户信息
        my.request({
          url: '服务器地址todo',
          data: {
            authCode,
          },
          success(res) {
            app.globalData.isLoggedin = true;
            this.setData({
              islog: true
            })
            console.log(res)
          }
        })
      },
      fail: err => {
        console.log('my.getAuthCode 调用失败', err)
        my.alert({
          title: "您取消了登录",
          content: "请重新登录"
        })
        this.setData({
          islog: false
        })
      }
    });
  },
  getOpenUserInfo() {
    this.getAuthCode();
    my.getOpenUserInfo({
      success: (res) => {
        let userInfo = JSON.parse(res.response).response;
        console.log(res);
        this.setData({
          nickName: res.nickName,
          avatar: res.avatar,
          islog: true
        })
      },
      fail: (err) => {
        console.log(err)
      }
    });
  }
});
