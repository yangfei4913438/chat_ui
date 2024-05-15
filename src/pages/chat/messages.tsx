import React, { useEffect } from 'react';
import useTags from '@/store/hooks/useTags';
import useRequest from 'ahooks/es/useRequest';
import { useToast } from '@/components/ui/use-toast';
import { getMessagesService } from '@/services/message';
import localCache from '@/core/cache';
import { cacheKeys } from '@/consts/cache';
import useMessages from '@/store/hooks/useMessages';
import MessageInput from '@/pages/chat/messageInput';
import ChatList from '@/pages/chat/chatList';

const Messages = ({ tid }: { tid: string | null }) => {
  const { tags } = useTags();
  const { toast } = useToast();
  const { messages, setMessages } = useMessages();

  const renderNull = () => {
    if (tags.length === 0) {
      return <div className='h-full flex items-center justify-center'>开启一个会话吧！</div>;
    }
    return null;
  };

  const renderMessages = () => {
    if (tags.length === 0) {
      return null;
    }
    if (tid) {
      if (messages.length === 0) {
        return <div className='h-full flex items-center justify-center'>暂无消息</div>;
      }
      return <ChatList />;
    }
    return <div className='h-full flex items-center justify-center'>选择一个会话吧！</div>;
  };

  const titleName = tags.find((tag) => tag.id == tid)?.name;

  console.log('tags:', tags);

  const { run, loading } = useRequest(
    async (id: string) => {
      return await getMessagesService(id);
    },
    {
      manual: true,
      ready: !!tid,
      onSuccess: (data) => {
        console.log('发起了一次请求，成功');
        console.log('data:', data);
        setMessages(data);
      },
      onError: ({ data: { detail } }: any) => {
        toast({
          variant: 'error',
          description: detail,
        });
      },
    }
  );

  useEffect(() => {
    const token = localCache.getItem(cacheKeys.token);
    if (token && !!tid) {
      run(String(tid));
    }
  }, [run, tid]);

  return (
    <>
      <div className='p-4 h-header flex-shrink-0 flex-grow-0 border-b text-xl font-bold'>
        {titleName}
      </div>
      <div className='px-4 flex-1 overflow-hidden py-4 w-full'>
        {renderNull()}
        {renderMessages()}
      </div>
      <div className='w-full px-4 flex-shrink-0 flex-grow-0'>
        {tid && <MessageInput tid={tid} />}
      </div>
    </>
  );
};

export default Messages;
