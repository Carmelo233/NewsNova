const app = getApp();

Page({
  data: {
    openid: '',
    nickName: '请登录',
    avatar: "/image/head.png",
    islog: false,
  },
  onLoad() {
    // 尝试从本地存储中获取登录状态（token）
    my.getStorage({
      key: 'userInfo', // 假设这是您存储token的key
      success: (res) => {
        // console.log(res);
        if (res.data) {
          this.setUserinfo(res.data);
        }
      }
    });
  },


  // 处理登录错误
  handleLoginError() {
    my.showToast({
      type: 'fail',
      content: '登录失败，请重试',
      duration: 2000,
    });
    this.setData({
      islog: false,
    });
  },

  // // 尝试登录
  // tryToLogin() {
  //   // 使用auth_base能静默登录
  //   my.getAuthCode({
  //     scopes: 'auth_base',
  //     success: (res) => {
  //       this.getAndStoreUserinfo(res.authCode);
  //       console.log("得到authCode:", res.authCode);
  //     }
  //   });
  // },

  // // 获取并存储用户信息-------页面加载启动
  // getAndStoreUserinfo(authCode) {
  //   my.request({
  //     url: '您的服务端地址，用以将authCode换取用户信息和token',
  //     data: {
  //       authCode: authCode,
  //     },
  //     success: (res) => {
  //       if (res.statusCode === 200) {
  //         my.setStorage({
  //           key: 'userToken',
  //           data: res.data.token,
  //         });
  //         this.setUserinfo(res.data.userInfo);
  //       } else {
  //         // 处理错误情况
  //         console.error('获取用户信息失败:', res);
  //       }
  //     },
  //     fail: (err) => {
  //       console.error('请求失败:', err);
  //     },
  //   });
  // },
  setUserinfo(userInfo) {
    this.setData({
      nickName: userInfo.nickName, // 确保从服务端返回的信息中有这些字段
      avatar: userInfo.avatar,
      openid: userInfo.openId,
      islog: true,
    });
    app.globalData.isLoggedin = true;
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
      });
    }
  },
  getOpenUserInfo() {
    my.getOpenUserInfo({
      success: (res) => {
        this.setUserinfo(res);
        console.log(res);
        my.setStorage({
          key: 'userInfo',
          data: res,
        });
      },
      fail: (err) => {
        this.handleLoginError()
      }
    });
  }
});
