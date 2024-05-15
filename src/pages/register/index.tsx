import masterzhou from '@/assets/masterzhou.png';
import { useTitle, useRequest } from 'ahooks';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRegisterServices } from '@/services/user';
import useUserInfo from '@/store/hooks/useUserInfo';
import { useToast } from '@/components/ui/use-toast';
import useProjectRoute from '@/hooks/useProjectRoute';
import { route_full_path } from '@/consts/routes';

const Register = () => {
  // 设置页面标题
  useTitle('星星命理 - 登录');
  const { toast } = useToast();
  const { setUserInfo } = useUserInfo();
  const { goToRoute } = useProjectRoute();

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: '用户名最少需要 2 个字符.',
    }),
    nickname: z.string().min(2, {
      message: '昵称最少需要 2 个字符.',
    }),
    password: z.string().min(6, {
      message: '密码最少需要 6 个字符.',
    }),
    email: z.string(),
    invite_code: z.string().length(32, { message: '无效的邀请码' }),
  });

  const form = useForm<UserCreate>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      nickname: '',
      password: '',
      email: '',
      invite_code: '',
    },
  });

  const { run, loading } = useRequest(
    async (value: UserCreate) => {
      return await userRegisterServices(value);
    },
    {
      manual: true,
      onSuccess: () => {
        // 提示用户，然后跳转路由
        toast({
          variant: 'success',
          description: '注册成功',
        });
        setTimeout(() => {
          // 跳转到登录页面
          goToRoute(route_full_path.login);
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

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    run(data);
  };

  const goToLogin = () => {
    goToRoute(route_full_path.login);
  };

  return (
    <main className='flex h-full items-center justify-center space-x-16 px-12 py-24'>
      <aside className='flex flex-1 justify-end'>
        <img src={masterzhou} alt={'星星命理'} className='rounded object-cover shadow-xl' />
      </aside>
      <section className={'flex h-full w-1/2 flex-shrink-0 flex-grow-0 items-center'}>
        <div className=''>
          <h1 className='pb-4 text-3xl'>周大师欢迎您！</h1>
          <p className='prose-lg py-4'>
            欢迎来到星星命理，我是周大师，我将为您提供最专业的命理服务。
          </p>
          <p className='prose-lg pb-8'>请您先注册一个账号，以便我能记住您。</p>

          <Form {...form}>
            <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name={'username'}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center'>
                      用户名<span className='inline-block h-6 text-2xl text-red-600'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={'请输入您的用户名'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={'nickname'}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center'>
                      显示昵称<span className='inline-block h-6 text-2xl text-red-600'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={'请输入您的显示昵称'} {...field} />
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
                    <FormLabel className='flex items-center'>
                      登录密码<span className='inline-block h-6 text-2xl text-red-600'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type={'password'} placeholder={'请输入您的登录密码'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={'email'}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>电子邮件</FormLabel>
                    <FormControl>
                      <Input placeholder={'请输入你的电子邮件地址'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name={'invite_code'}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center'>
                      邀请码<span className='inline-block h-6 text-2xl text-red-600'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={'请输入你的邀请码'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' disabled={loading} className='w-28'>
                注册
              </Button>
              <Button type={'button'} variant={'link'} onClick={goToLogin}>
                登录
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default Register;
