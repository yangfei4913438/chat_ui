import { useLayoutEffect } from 'react';

import { cacheKeys } from '@/consts/cache';
import { route_full_path } from '@/consts/routes';
import localCache from '@/core/cache';
import useProjectRoute from '@/hooks/useProjectRoute';

const useJwt = () => {
  const { goToRoute, isLoginPage, isRegisterPage, isHomePage, isChatPage } = useProjectRoute();

  /**
   * 是否已经登录
   * 存在token，就表示当前用户已经登录了。
   * 这里不需要校验 token 是否合法，请求后端的时候，后端会校验 token 的合法性。在 http 请求的时候，自动处理无效 token 的问题。
   */
  const alreadyLogged = !!localCache.getItem(cacheKeys.token);

  // 不需要等到页面渲染完成，直接就阻塞执行了
  useLayoutEffect(() => {
    // 当前是首页，不需要登录
    if (!alreadyLogged && isHomePage) {
      return;
    }

    // 没有登录，当前不是登录页，也不是注册页
    if (!alreadyLogged && !isLoginPage && !isRegisterPage) {
      // 跳转登录页
      return goToRoute(route_full_path.login);
    }

    // 已经登录，直接去对话页面
    if (alreadyLogged && !isChatPage) {
      // 跳转到对话列表
      return goToRoute(route_full_path.chat);
    }
  }, [alreadyLogged, goToRoute, isChatPage, isHomePage, isLoginPage, isRegisterPage]);
};

export default useJwt;
