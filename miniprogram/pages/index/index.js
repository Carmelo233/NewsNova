Page({
   data:{
    ConTenttest:[1,2,3,4,5,6,7,8]
   },
   toSort(){
    
   },
   onShow() {
    // 自定义的bar
     if (typeof this.getTabBar === 'function' && this.getTabBar()) {
       this.getTabBar().setData({
         selected: 0,
       });
     }
   },
   
});