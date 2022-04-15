import api from '../../utils/api';
import config from '../../config';

const { baseUrl } = config;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl,
    record: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options = {}) {
    const { id } = options;
    this.fetchMovie(id);
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

  fetchMovie: async function (id, params = {}) {
    const { response, error } = await api.get({
      url: `/tmdb/api/movie/${id}`,
      params,
    });

    if (error) {
      return;
    }

    this.setData({
      record: {
        ...response,
        poster_path: baseUrl + '/tmdb/image' + response.poster_path,
        backdrop_path: baseUrl + '/tmdb/image' + response.backdrop_path,
      },
    });
  },
})