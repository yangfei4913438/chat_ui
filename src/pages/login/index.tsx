import masterzhou from '@/assets/masterzhou.png';
import { useRequest, useTitle } from 'ahooks';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { userLoginServices } from '@/services/user';
import localCache from '@/core/cache';
import { cacheKeys } from '@/consts/cache';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import useUserInfo from '@/store/hooks/useUserInfo';
import { useToast } from '@/components/ui/use-toast';
import useProjectRoute from '@/hooks/useProjectRoute';
import { route_full_path } from '@/consts/routes';

const Login = () => {
  // 设置页面标题
  useTitle('星星命理 - 登录');
  const { toast } = useToast();
  const { setUserInfo } = useUserInfo();
  const { goToRoute } = useProjectRoute();
  const [remember, setRemember] = useState(false);

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: '用户名最少需要 2 个字符.',
    }),
    password: z.string().min(6, {
      message: '密码最少需要 6 个字符.',
    }),
    remember: z.boolean(),
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
  });

  const { run, loading } = useRequest(
    async (value: UserLogin) => {
      return await userLoginServices(value);
    },
    {
      manual: true,
      onSuccess: ({ token, ...userInfo }) => {
        // 记录token到浏览器
        localCache.setItem(cacheKeys.token, token, remember);
        // 记录用户信息到内存
        setUserInfo(userInfo);
        // 提示用户，然后跳转路由
        toast({
          variant: 'success',
          description: '登录成功',
        });
        setTimeout(() => {
          // 跳转到对话页面
          goToRoute(route_full_path.chat);
        }, 1000);
      },
      onError: ({ data: { detail } }: any) => {
        console.log('detail:', detail);
        toast({
          variant: 'error',
          description: detail,
        });
      },
    }
  );

  const onSubmit = async ({ remember, ...loginInfo }: z.infer<typeof FormSchema>) => {
    setRemember(remember);
    run(loginInfo);
  };

  const goToRegister = () => {
    goToRoute(route_full_path.register);
  };

  return (
    <main className='flex h-full items-center justify-center space-x-16 px-12 py-24'>
      <aside className='flex flex-1 justify-end'>
        <img src={masterzhou} alt={'星星命理'} className='rounded object-cover shadow-xl' />
      </aside>
      <section className={'flex h-full w-1/2 flex-shrink-0 flex-grow-0 items-center'}>
        <div className='-mt-12'>
          <h1 className='pb-4 text-3xl'>周大师欢迎您！</h1>
          <p className='prose-lg py-4'>
            欢迎来到星星命理，我是周大师，我将为您提供最专业的命理服务。
          </p>
          <p className='prose-lg pb-8'>请您先登录，登录后我才能为您提供服务。</p>

          <Form {...form}>
            <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name={'username'}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <Input placeholder={'请输入您的用户名'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={'password'}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>登录密码</FormLabel>
                    <FormControl>
                      <Input type={'password'} placeholder={'请输入您的登录密码'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={'remember'}
                control={form.control}
                render={({ field }) => (
                  <FormItem className='flex items-baseline space-x-2 rounded-md border border-gray-300 bg-white p-4'>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className='space-y-1'>
                      <FormLabel>记住我</FormLabel>
                      <FormDescription>下次不需要登录就可以直接使用</FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={loading} className='w-28'>
                登录
              </Button>
              <Button type={'button'} variant={'link'} onClick={goToRegister}>
                注册
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default Login;
