import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

const http = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
  validateStatus: function (status) {
    // default : status >= 200 && status < 300
    return status >= 200 && status < 300 && status !== 202;
  },
  // cacheAdapterEnhancer 적용. 기본 캐시동작은 해제
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false }),
});

export const axiosGetCache = (url, params = {}, config = {}) => {
  config = {
    ...config,
    params,
  };
  return http.get(url, config);
};
