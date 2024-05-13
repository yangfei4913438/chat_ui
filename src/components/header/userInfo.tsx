import useRequest from 'ahooks/es/useRequest';
import { useCallback, useMemo } from 'react';
import { UserRound, Loader } from 'lucide-react';
import { route_full_path } from '@/consts/routes';
import localCache from '@/core/cache';
import useProjectRoute from '@/hooks/useProjectRoute';
import { getUserInfoServices } from '@/services/user';
import useUserInfo from '@/store/hooks/useUserInfo';
import { Button } from '@/components/ui/button';

const UserInfo = () => {
  const { Link, goToRoute, alreadyLogged } = useProjectRoute();

  const { setUserInfo, userInfo, resetUserInfo } = useUserInfo();

  // 当用户数据不存在的时候，自动发起用户数据的请求
  const { loading: loadUserInfoLoading, run: loadUserInfo } = useRequest(
    async () => {
      return await getUserInfoServices();
    },
    {
      ready: alreadyLogged && !userInfo.username,
      onSuccess: (data) => {
        // 更新用户数据
        setUserInfo(data);
      },
    }
  );

  const logoutHandler = useCallback(() => {
    localCache.clear();
    resetUserInfo();
    goToRoute(route_full_path.home);
  }, [goToRoute, resetUserInfo]);

  const User = useMemo(
    () => (
      <div className='flex items-center'>
        <span className='prose-sm flex items-center text-white'>
          <UserRound />
          {userInfo.username}
        </span>
        <Button variant='link' onClick={logoutHandler}>
          退出
        </Button>
      </div>
    ),
    [logoutHandler, userInfo.username]
  );

  const Login = useMemo(() => {
    if (loadUserInfoLoading) {
      return <Loader />;
    }
    return (
      <Link
        to={route_full_path.login}
        className='prose-sm text-lg text-primary decoration-transparent'
      >
        登录
      </Link>
    );
  }, [Link, loadUserInfoLoading]);

  if (userInfo.username) {
    return User;
  }
  return Login;
};

export default UserInfo;
