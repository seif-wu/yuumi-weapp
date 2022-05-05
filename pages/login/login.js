import { px2rpx, callback2promise } from '../../utils/util';
import api from '../../utils/api';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    safeBottomHeight: px2rpx(app.globalData.safeBottomHeight),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.loginButtonAnimation();
  },

  /**
   * 登录按钮入场动画
   */
  loginButtonAnimation: function () {
    this.animate(".action-box", [
      { translateY: 1200, scale: [0.7, 0.7], opacity: 0.7, offset: 0 },
      { translateY: 0, scale: [0.7, 0.7], opacity: 0.7 , offset: 0.8 },
      { scale: [1, 1], opacity: 1, offset: 1},
    ], 1500)
  },

  tapLogin: async function () {
    const infoRes = await callback2promise(wx.getUserProfile)({
      lang: 'zh_CN',
      desc: '您的信息将用于登录或创建用户',
    });

    // 拒绝授权时暂不处理
    if (!infoRes.errMsg) {
      return;
    }

    const wxLoginRes = await callback2promise(wx.login)();

    const payload = {
      avatar_url: infoRes.userInfo.avatarUrl,
      name: infoRes.userInfo.nickName,
      js_code: wxLoginRes.code,
    }

    const { response, error } = await api.post({
      url: '/api/v1/weapp/auth',
      body: payload
    })

    if (error) {
      // TODO 提示登录失败
      return
    }

    await callback2promise(wx.setStorage)({
      key: "access_token",
      data: response.access_token,
    });

    wx.navigateBack({
      delta: 1
    });
  },
});
