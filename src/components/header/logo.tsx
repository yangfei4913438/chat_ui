import React, { FC } from 'react';
import logo from '@/assets/stars-logo.svg';
import { route_full_path } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';

const Logo: FC = () => {
  const { Link } = useProjectRoute();

  return (
    <section className={'flex h-full w-52 items-center justify-start'}>
      <Link to={route_full_path.home} title={'星星问卷'} className='decoration-transparent'>
        <div className='flex items-center space-x-1'>
          <img src={logo} alt={'星星问卷'} className='h-5 w-5' />
          <span className={'prose-2xl text-white'}>星星命理</span>
        </div>
      </Link>
    </section>
  );
};

export default Logo;
