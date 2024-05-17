import React, { FC, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { user_input_warning } from '@/consts/notice';

interface IProps {
  messages: Message[];
}

const ChatList: FC<IProps> = ({ messages }) => {
  const virtuosoRef = React.createRef<VirtuosoHandle>();

  // 渲染文本, 将文本中的 ** 加粗, 换行符转换为 <br />
  const renderCleanHtml = (content: string) => {
    if (content === user_input_warning) {
      return `<p class="text-red-500 font-bold">${user_input_warning}</p>`;
    }
    const rawHtml = marked(content) as string;
    // 转换成内联 html之前，先处理一下来自服务器的内容，避免有漏网的不安全字符
    const res = DOMPurify.sanitize(rawHtml);
    return res || `<p class="text-red-500 font-bold">${user_input_warning}</p>`;
  };

  // 如果最后一条信息是来自用户的，那么就提示用户，大师正在思考，等一会
  const list = useMemo(() => {
    const message = messages[messages.length - 1];
    if (message.sender_type === 1) {
      return [
        ...messages,
        {
          id: '-1',
          tag_id: message.tag_id,
          sender_type: 0,
          type: 'text',
          content: '大师正在思考中，请稍后...',
          created_at: dayjs().toISOString(),
          updated_at: dayjs().toISOString(),
        },
      ];
    }
    return messages;
  }, [messages]);

  useEffect(() => {
    // 手动滚动到底部
    virtuosoRef.current?.scrollToIndex({
      index: 'LAST',
      align: 'end',
      behavior: 'smooth',
    });
    // 这里只监听外部数据的变化，不能监听内部产生的数据
  }, [messages.length, virtuosoRef]);

  return (
    <div className='space-y-2 overflow-y-auto w-full h-full'>
      <Virtuoso
        ref={virtuosoRef}
        data={list}
        totalCount={list.length}
        initialTopMostItemIndex={list.length - 1} // 设置初始滚动位置
        overscan={10} // 多渲染的数量，避免过早被移出 dom 树
        itemContent={(idx, item) => {
          return (
            <div className={'py-2 flex space-x-2 w-full pr-12'} key={item.id}>
              <div className='w-10 flex-grow-0 flex-shrink-0 text-right pr-0.5'>
                {item.sender_type == 0 ? '大师:' : '我:'}
              </div>
              <div className='space-y-2'>
                <div className='text-sm text-gray-500'>
                  {dayjs(item.updated_at).format('YYYY-MM-DD HH:mm:ss')}
                </div>
                {item.type === 'mp3' ? (
                  <div className='w-96'>
                    <AudioPlayer
                      className='w-24'
                      src={item.content}
                      showJumpControls={false}
                      showFilledVolume={true}
                    />
                  </div>
                ) : (
                  <div
                    className='prose max-w-none'
                    dangerouslySetInnerHTML={{ __html: renderCleanHtml(item.content) }}
                  />
                )}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default ChatList;
