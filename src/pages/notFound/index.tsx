import { useTitle, useCountDown } from 'ahooks';
import { Button } from '@/components/ui/button';
import masterzhou from '@/assets/masterzhou.png';
import useProjectRoute from '@/hooks/useProjectRoute';
import { route_full_path } from '@/consts/routes';
import { useEffect, useState } from 'react';

const NotFound = () => {
  // 设置页面标题
  useTitle('星星命理 - 404');
  const [targetDate, setTargetDate] = useState<number>();
  const { goToRoute } = useProjectRoute();

  const handleClick = () => {
    goToRoute(route_full_path.home);
  };

  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      handleClick();
    },
  });

  useEffect(() => {
    setTargetDate(Date.now() + 10000);
  }, []);

  return (
    <article className='flex h-screen w-screen justify-center'>
      <div className='py-24 text-center'>
        <img src={masterzhou} alt={'星星命理'} className='scale-75 rounded-md shadow-xl' />
        <h2 className='-mt-8 text-2xl text-red-600'>小友，这里是未知之地，非常危险~！</h2>
        <p className='py-4 text-gray-500'>
          <span className='text-red-600'>{Math.round(countdown / 1000)}</span>
          秒后，老夫会自动送您返回首页，或者点击下面的按钮，立刻回到首页
        </p>
        <Button variant={'link'} onClick={handleClick}>
          回到首页
        </Button>
      </div>
    </article>
  );
};

export default NotFound;
