import { useTitle } from 'ahooks';
import React, { useEffect, useMemo } from 'react';
import localCache from '@/core/cache';
import cache from '@/core/cache';
import { cacheKeys } from '@/consts/cache';
import { route_full_path } from '@/consts/routes';
import useProjectRoute from '@/hooks/useProjectRoute';
import useTags from '@/store/hooks/useTags';
import { getTagsService } from '@/services/tag';
import { useToast } from '@/components/ui/use-toast';

import Tags from '@/pages/chat/tags';
import useRequest from 'ahooks/es/useRequest';
import Messages from '@/pages/chat/messages';
import { useParams } from 'react-router-dom';
import NewTag from '@/pages/chat/newTag';

const Chat = () => {
  // 设置页面标题
  useTitle('星星命理 - 对话');
  const { toast } = useToast();
  const { setTags, tags } = useTags();
  const { goToRoute } = useProjectRoute();
  const { id } = useParams();

  // 获取本地缓存的 tag_id
  const local_id = cache.getItem('tag_id');

  const tid = useMemo(() => {
    if (tags.length === 0) {
      console.log('标签列表为空');
      return null;
    }
    if (!id) {
      console.log('id 为空, 返回本地 id');
      return local_id;
    }
    const exist = tags.filter((tag) => tag.id == id).length > 0;
    if (exist) {
      cache.setItem('tag_id', id);
      return id;
    }
    return local_id;
  }, [id, local_id, tags]);

  const { run, loading } = useRequest(
    async () => {
      return await getTagsService();
    },
    {
      manual: true,
      onSuccess: (data) => {
        console.log('发起了一次请求，成功');
        setTags(data);
      },
      onError: ({ data: { detail } }: any) => {
        toast({
          variant: 'error',
          description: detail,
        });
      },
      onFinally: () => {
        console.log('发起了一次请求, 结束');
      },
    }
  );

  useEffect(() => {
    const token = localCache.getItem(cacheKeys.token);
    if (token) {
      run();
    }
  }, [run]);

  useEffect(() => {
    const token = localCache.getItem(cacheKeys.token);
    if (!token) {
      // 跳转登录页
      return goToRoute(route_full_path.login);
    }
  }, [goToRoute]);

  return (
    <div className='h-full flex space-x-4'>
      <div className='flex flex-col pt-4 pl-4 w-72 flex-shrink-0 flex-grow-0 h-full overflow-hidden'>
        <NewTag />
        <Tags tid={tid} />
      </div>
      <section className='bg-white w-full h-full flex flex-col shadow-lg pb-4'>
        <Messages tid={tid} />
      </section>
    </div>
  );
};

export default React.memo(Chat);
