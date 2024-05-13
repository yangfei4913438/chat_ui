// 读取外部数据
import localCache from '@/core/cache';
import { cacheKeys } from '@/consts/cache';

const getSnapshot = () => {
  return localCache.getItem(cacheKeys.token);
};

const useToken = () => {
  return localCache.getItem(cacheKeys.token);
};
