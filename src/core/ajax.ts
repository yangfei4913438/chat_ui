import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

import { apiConfig, ConfigKeyType } from '@/consts/apis';
import { cacheKeys } from '@/consts/cache';
import localCache from '@/core/cache';

import { getNavigate } from './navigation';

/**
 * 创建 axios 实例
 * */
const instance = axios.create({
  timeout: 30 * 1000, // 30秒超时
});

/**
 * 配置异常重试
 * */
axiosRetry(instance, { retries: 3, retryDelay: (retryCount) => retryCount * 1000 });

// 返回数据都是对象
export type ResDataType = {
  [key: string]: any;
};

/**
 * 发起请求，统一拦截
 * */
instance.interceptors.request.use(
  (config) => {
    // Do something before the request is sent

    // 取出存储的token
    const token = localCache.getItem(cacheKeys.token);
    // 追加jwt的信息到头部
    config.headers['Authorization'] = token ? `Bearer ${token}` : '';

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

/**
 * 对返回体错误信息分类
 */
instance.interceptors.response.use(
  async ({ data }) => {
    // 返回数据
    return data;
  },
  ({ response }) => {
    // 上报异常错误信息，这里举例，所以只是打印错误
    console.error('axios exception:', response);
    const navigate = getNavigate();
    switch (response.status) {
      // 未授权, 只有未授权需要跳转到登录页面
      case 401:
        localCache.clear();
        return navigate('/login');
      default:
        // 请求的地方，自己决定是否处理异常
        return Promise.reject(response);
    }
  }
);

interface IRequestParam<D> {
  name: ConfigKeyType;
  data?: D;
  id?: string;
  axiosConfig?: AxiosRequestConfig;
}
export const request = <T, D = undefined>({
  name,
  data,
  id,
  axiosConfig,
}: IRequestParam<D | undefined>): Promise<T> => {
  const { url, method, needId } = apiConfig[name];

  // 判断是否需要拼接 url, 用于聊天页面
  const reqUrl = needId ? `${url}/${id}` : url;

  switch (method) {
    case 'get':
      return get<T>(reqUrl, axiosConfig);
    case 'delete':
      return del<T>(reqUrl, axiosConfig);
    case 'post':
      return post<T, D>(reqUrl, data!, axiosConfig);
    case 'patch':
      return patch<T, D>(reqUrl, data!, axiosConfig);
    case 'put':
      return put<T, D>(reqUrl, data!, axiosConfig);
    default:
      throw new Error(`未知的请求方法: ${method}`);
  }
};

export const get = <T>(url: string, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.get<T, any>(url, axiosConfig);
};

export const post = <T, D>(url: string, data: D, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.post<T, any, D>(url, data, axiosConfig);
};

export const put = <T, D>(url: string, data: D, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.put<T, any, D>(url, data, axiosConfig);
};

export const patch = <T, D>(url: string, data: D, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.patch<T, any, D>(url, data, axiosConfig);
};

export const del = <T>(url: string, axiosConfig?: AxiosRequestConfig): Promise<T> => {
  return instance.delete<T, any>(url, axiosConfig);
};
