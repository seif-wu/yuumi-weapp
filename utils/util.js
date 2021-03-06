export const callback2promise = function (func) {
  return function (params = {}, needReject = false) {
    return new Promise((resolve, reject) => {
      func({
        ...params,
        success: (response) => {
          resolve(response);
        },
        fail: (error) => {
          if (needReject) {
            reject(error);
          } else {
            resolve(error);
          }
        },
      });
    });
  };
};

export const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const px2rpx = function (pxNumber) {
  const { screenWidth } = wx.getSystemInfoSync();
  return (750 / screenWidth) * pxNumber;
};
