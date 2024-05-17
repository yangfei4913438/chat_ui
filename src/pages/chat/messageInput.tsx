import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useWebSocket } from 'ahooks';
import { Send } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import localCache from '@/core/cache';
import cache from '@/core/cache';
import { cacheKeys } from '@/consts/cache';
import useMessages from '@/store/hooks/useMessages';
import { createMessageService, updateMessageService } from '@/services/message';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ai_return_tips, user_input_warning } from '@/consts/notice';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

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

interface IProps {
  messages: Message[];
  tid: string;
}

const MessageInput: FC<IProps> = ({ tid, messages }) => {
  const { updateMessage, pushMessage, pushMessages } = useMessages();
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

  const { mutate } = useMutation({
    mutationFn: async (data: MessageCreate) => await createMessageService(data),
    retry: 0,
  });

  const { mutate: mutate2 } = useMutation({
    mutationFn: async (data: MessageCreate) => await createMessageService(data),
    retry: 0,
  });

  const { mutate: mutate3 } = useMutation({
    mutationFn: async (data: MessageUpdate) => await updateMessageService(data),
    retry: 0,
  });

  useEffect(() => {
    if (!latestMessage) return;
    const { id, url, message } = JSON.parse(latestMessage.data);
    console.log('url:', url, ' message:', message);

    // 不存在，自动往后台追加数据
    const existText =
      messages.filter((m) => String(m.change_id) === id && m.type === 'text').length > 0;
    const existMp3 =
      messages.filter((m) => String(m.change_id) === id && m.type === 'mp3').length > 0;
    if (!existMp3 && url) {
      pushMessage({
        id,
        change_id: id,
        tag_id: tid,
        type: 'mp3',
        sender_type: 0,
        content: url,
        created_at: dayjs().toISOString(),
        updated_at: dayjs().toISOString(),
      });
      mutate(
        {
          type: 'mp3',
          tag_id: tid + '',
          sender_type: 0,
          content: url,
        },
        {
          onSuccess: (data) => {
            updateMessage({ ...data, change_id: id });
          },
        }
      );
    }
    if (!existText && message) {
      // 新的直接添加
      pushMessage({
        id,
        change_id: id,
        tag_id: tid,
        type: 'text',
        sender_type: 0,
        content: message,
        created_at: dayjs().toISOString(),
        updated_at: dayjs().toISOString(),
      });
      mutate2(
        {
          type: 'text',
          tag_id: tid + '',
          sender_type: 0,
          content: message,
        },
        {
          onSuccess: (data) => {
            updateMessage({ ...data, change_id: id });
          },
        }
      );
    }

    // 如果内容存在，直接追加
    if (message && existText) {
      const data = messages.find((m) => String(m.change_id) === id && m.type === 'text')!;
      console.log('追加回答。。。');
      const content = data.content + message;
      updateMessage({ ...data, content });
      // 更新后台数据
      mutate3({
        id: data.id,
        content,
      });
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
    // 二次过滤，移除特殊符号
    const send_data = cleanVal.replace(/<[^>]*>/g, '');
    // 生成唯一 ID
    const id = uuidv4();
    // 先追加一条记录
    pushMessages([
      {
        id,
        change_id: id,
        tag_id: tid,
        type: 'text',
        sender_type: 0,
        content: send_data || user_input_warning,
        created_at: dayjs().toISOString(),
        updated_at: dayjs().toISOString(),
      },
      {
        id: '-1',
        tag_id: tid,
        sender_type: 0,
        type: 'text',
        content: '大师正在思考中，请稍后...',
        created_at: dayjs().toISOString(),
        updated_at: dayjs().toISOString(),
      },
    ]);
    // 发送请求
    mutate2(
      { type: 'text', tag_id: tid + '', sender_type: 1, content: send_data || user_input_warning },
      {
        onSuccess: (data) => {
          // 更新完成，拿正式数据替换临时数据
          updateMessage({ ...data, change_id: id });
          // 发送新数据
          if (!send_data) {
            sendMessage(ai_return_tips);
          } else {
            sendMessage(send_data);
          }
          // 清空输入框
          setVal('');
        },
      }
    );
  }, [val, pushMessages, tid, mutate2, updateMessage, sendMessage]);

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
