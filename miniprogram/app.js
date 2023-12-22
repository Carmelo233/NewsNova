
App({
  globalData: {
    isLoggedin: false,
    openid: '',
  },

  onLaunch(options) {
    
  },

  onShow(options) {
    my.getAuthCode({
      scopes: 'auth_base',
      success: (res) => {
        // console.log("得到authCode:", res.authCode);
        my.request({
          url: 'http://112.74.176.236:9300/newsnova/pass-code',
          data: {
            auth_code: res.authCode,
          },
          success: (res) => {
            console.log("登录成功",res);
          },
          fail: (err) => {
            console.error('fail: ', JSON.stringify(err));
          }
        });
      }
    });

  },
});
