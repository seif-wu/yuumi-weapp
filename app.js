App({
  globalData: {
    // 导航栏高度
    navBarHeight: 0,
    // 胶囊距右方间距（方保持左、右间距一致）
    menuRight: 0,
    // 胶囊距底部间距（保持底部间距一致）
    menuButton: 0,
    // 胶囊高度（自定义内容可与胶囊高度保证一致）
    menuHeight: 0,
    // 当前用户
    currentUser: null,
  },
  onLaunch() {
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuButton = menuButtonInfo.top - systemInfo.statusBarHeight;
    this.globalData.menuHeight = menuButtonInfo.height;
  },
})
