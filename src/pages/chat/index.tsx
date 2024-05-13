import { useTitle } from 'ahooks';
import { useEffect } from 'react';
import localCache from '@/core/cache';
import { cacheKeys } from '@/consts/cache';
import { route_full_path } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const Chat = () => {
  // 设置页面标题
  useTitle('星星命理 - 对话');

  const { goToRoute } = useProjectRoute();

  useEffect(() => {
    const token = localCache.getItem(cacheKeys.token);
    if (!token) {
      // 跳转登录页
      return goToRoute(route_full_path.login);
    }
  }, [goToRoute]);

  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
};

export default Chat;
