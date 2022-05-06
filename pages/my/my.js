import api from '../../utils/api';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.fetchCurrentUser();
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 阻止默认滚动事件
   */
  handleTouchMove: function () { },

  /**
   * 处理登录逻辑
   */
  handleLogin: async function () {

  },

  /**
   * 请求当前用户
   */
  fetchCurrentUser: async function () {
    const { response, error, status } = await api.get({
      url: '/api/v1/weapp/user',
    });

    if (status === 401) {
      wx.redirectTo({
        url: '/pages/login/login?redirect=/pages/my/my'
      });
      return;
    }

    if (error) {
      // TODO 跳转到出错页面
      wx.showToast({
        title: '出错了',
        icon: 'fail',
        duration: 2000
      })
      return;
    }

    this.setData({
      user: response.data,
    });

    app.globalData.currentUser = response;
  }
})
