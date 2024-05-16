import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useWebSocket } from 'ahooks';
import { Send } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import localCache from '@/core/cache';
import cache from '@/core/cache';
import { cacheKeys } from '@/consts/cache';
import useMessages from '@/store/hooks/useMessages';
import { createMessageService } from '@/services/message';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ai_return_tips, user_input_warning } from '@/consts/notice';

const statusMap = {
  0: '连接中',
  1: '已连接',
  2: '关闭中',
  3: '已关闭',
};

enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

const MessageInput = ({ tid }: { tid: string }) => {
  const { pushMessage, tempShow } = useMessages();
  const token = localCache.getItem(cacheKeys.token);
  const [val, setVal] = useState<string>('');

  const ws_url = useMemo(() => {
    let url = `wss://${window.location.host}/ws/${token}/${tid}`;
    // 使用Vite时检查是否为开发环境
    if (import.meta.env && import.meta.env.DEV) {
      url = `ws://0.0.0.0:8000/ws/${token}/${tid}`;
    }
    return url;
  }, [tid, token]);

  const { latestMessage, sendMessage, disconnect, readyState, connect } = useWebSocket(ws_url);

  // 获取本地缓存的 tag_id
  const local_id = cache.getItem('tag_id');

  const { mutate: mutate1 } = useMutation({
    mutationFn: async (data: MessageCreate) => await createMessageService(data),
    onSuccess: (data) => {
      console.log('收到数据:', data);
      pushMessage(data);
    },
  });

  const { mutate: mutate2 } = useMutation({
    mutationFn: async (data: MessageCreate) => await createMessageService(data),
  });

  useEffect(() => {
    if (!latestMessage) return;
    const { url, message } = JSON.parse(latestMessage.data);
    console.log('url:', url, ' message:', message);
    if (url) {
      mutate1({ type: 'mp3', tag_id: tid + '', sender_type: 0, content: url });
    } else {
      mutate1({ type: 'text', tag_id: tid + '', sender_type: 0, content: message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestMessage]);

  useEffect(() => {
    if (tid == local_id) {
      console.log('开始连接');
      connect();
    }

    return () => {
      console.log('组件卸载，关闭连接');
      disconnect();
    };
  }, [connect, disconnect, local_id, tid]);

  const handleSend = useCallback(() => {
    // 将输入的内容转换成安全的内容，再发送给服务端
    const cleanVal = DOMPurify.sanitize(val);
    // 二次过滤，清楚特殊符号
    const send_data = cleanVal.replace(/<[^>]*>/g, '');
    // 发送请求
    mutate2(
      { type: 'text', tag_id: tid + '', sender_type: 1, content: send_data || user_input_warning },
      {
        onSuccess: (data) => {
          tempShow(tid, data);
          if (!send_data) {
            sendMessage(ai_return_tips);
          } else {
            sendMessage(send_data);
          }
          setVal('');
        },
      }
    );
  }, [mutate2, sendMessage, tempShow, tid, val]);

  return (
    <div className={'h-full flex space-x-2 w-full'}>
      <div className='flex-1'>
        <Textarea
          className=''
          disabled={readyState !== ReadyState.Open}
          value={val}
          onChange={(event) => setVal(event.target.value)}
        />
      </div>
      <div className='space-y-2 flex flex-col items-center flex-grow-0 flex-shrink-0'>
        <div>{statusMap[readyState]}</div>
        <Button
          size={'sm'}
          className='w-16'
          disabled={readyState !== ReadyState.Open}
          onClick={handleSend}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(MessageInput);
