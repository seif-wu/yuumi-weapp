import { callback2promise } from "./util";
import config from "../config";

const { baseUrl } = config;

const getAccessToken = () => {
  try {
    var value = wx.getStorageSync('access_token')
    return value || '';
  } catch (e) {
    return '';
  }
}

const request = async (options) => {
  const { url, header = {}, ...requestOptions } = options;
  const nextOptions = {
    ...requestOptions,
    url: baseUrl + url,
    header,
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    nextOptions['header']['Authorization'] = `Bearer ${accessToken}`;
  }

  return callback2promise(wx.request)(nextOptions, true)
    .then((response) => {
      // 此处相当于 wx.request 的 success, 只要是请求成功，不管什么状态码都会到这。
      // 所以需要自己判断是否成功
      if (response.statusCode >= 400) {
        // 当状态码大于 400 的时候定义为错误
        return { error: response.data, status: response.statusCode };
      }

      return { response: response.data, status: response.statusCode };
    })
    .catch(() => {
      return {
        error: {
          success: false,
          code: "418",
          message: "请求出错, 请稍后重试",
        },
        status: 418,
      };
    });
};

const getRequest = (options) => {
  const { params, ...requestOptions } = options;
  return request({
    ...requestOptions,
    method: "GET",
    data: params,
  });
};

const postRequest = (options) => {
  const { body, ...requestOptions } = options;
  return request({
    ...requestOptions,
    method: "POST",
    data: body,
  });
};

const putRequest = (options) => {
  const { body, ...requestOptions } = options;
  return request({
    ...requestOptions,
    method: "PUT",
    data: body,
  });
};

const deleteRequest = (options) => {
  const { params, ...requestOptions } = options;
  return request({
    ...requestOptions,
    method: "DELETE",
    data: params,
  });
};

export default {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};
