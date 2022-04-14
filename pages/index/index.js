import api from '../../utils/api';
import config from '../../config';

const app = getApp();
const { baseUrl } = config;

Page({
  data: {
    navBarHeight: app.globalData.navBarHeight,
    // 趋势列表
    trends: [],
    // 热门列表
    popularMovies: [],
    //
    popularTv: [],
    //
    nowPlayingMovies: [],
  },

  onLoad() {
    this.fetchTrends();
    this.fetchPopularMovies();
    this.fetchPopularTv();
    this.fetchNowPlayingMovies();
  },

  fetchTrends: async function () {
    const { response, error } = await api.get({
      url: '/tmdb/api/trending/movie,tv/day'
    });

    if (error) {
      return;
    }

    const { results = [] } = response;
    this.setData({
      trends: results.map((result) => {
        return {
          ...result,
          poster_path: baseUrl + '/tmdb/image' + result.poster_path,
        }
      }),
    });
  },

  fetchPopularMovies: async function () {
    const { response, error } = await api.get({
      url: '/tmdb/api/movie/popular'
    });

    if (error) {
      return;
    }

    const { results = [] } = response;
    this.setData({
      popularMovies: results.map((result) => {
        return {
          ...result,
          poster_path: baseUrl + '/tmdb/image' + result.poster_path,
        }
      }),
    });
  },

  fetchPopularTv: async function () {
    const { response, error } = await api.get({
      url: '/tmdb/api/tv/popular'
    });

    if (error) {
      return;
    }

    const { results = [] } = response;
    this.setData({
      popularTv: results.map((result) => {
        return {
          ...result,
          poster_path: baseUrl + '/tmdb/image' + result.poster_path,
        }
      }),
    });
  },

  fetchNowPlayingMovies: async function () {
    const { response, error } = await api.get({
      url: '/tmdb/api/movie/now_playing',
    });

    if (error) {
      return;
    }

    const { results = [] } = response;
    this.setData({
      nowPlayingMovies: results.map((result) => {
        return {
          ...result,
          backdrop_path: baseUrl + '/tmdb/image' + result.backdrop_path,
          poster_path: baseUrl + '/tmdb/image' + result.poster_path,
        }
      }),
    });
  },
})
