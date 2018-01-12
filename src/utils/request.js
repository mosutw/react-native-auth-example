const qs = require('qs');

const BASE_URL = 'http://localhost:8080';
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json;charset=utf-8'
};

/**
 * 请求 API 接口
 *
 * @param {Object} options
 * @param {string} options.url - 接口地址
 * @param {string} options.method - 请求类型
 * @param {Object} options.headers - 请求头
 * @param {Object} options.params - url 参数
 * @param {Object} options.data - 请求体数据
 */
export default function request({ url, method, headers, params, data }) {
  let isOk;
  url = BASE_URL + url;
  if (params) {
    url = url + paramsSerializer(params);
  }
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers: { ...DEFAULT_HEADERS, ...headers },
      body: JSON.stringify(data)
    })
      .then(response => {
        isOk = !!response.ok;
        return response.json();
      })
      .then(responseData => {
        if (isOk && responseData.status === 'success') {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

/**
 * 请求参数序列化
 *
 * @param {Object} params - 请求参数
 * @returns {string}
 */
function paramsSerializer(params) {
  return qs.stringify(params, { arrayFormat: 'brackets' });
}