import { Outlet, useNavigate } from 'react-router-dom';
import Header from '@/components/header';
import { useEffect } from 'react';
import { setNavigate } from '@/core/navigation';
import useJwt from '@/hooks/useJwt';

const Layout = () => {
  useJwt();
  const navigate = useNavigate();

  // 页面根路由
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <div className={'relative min-h-screen overflow-hidden bg-gray-100'}>
      <div className='h-header fixed left-0 top-0 z-50 w-screen bg-black px-16 shadow-xl'>
        <Header />
      </div>
      <div className='mt-header h-body overflow-scroll text-gray-900'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
