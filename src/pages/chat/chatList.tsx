import React from 'react';
import useMessages from '@/store/hooks/useMessages';
import dayjs from 'dayjs';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Virtuoso } from 'react-virtuoso';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { user_input_warning } from '@/consts/notice';

const ChatList = () => {
  const { messages } = useMessages();

  // 渲染文本, 将文本中的 ** 加粗, 换行符转换为 <br />
  const renderCleanHtml = (content: string) => {
    if (content === user_input_warning) {
      return `<p class="text-red-500 font-bold">${user_input_warning}</p>`;
    }
    const rawHtml = marked(content.replace(/<[^>]*>/g, '')) as string;
    // 转换成内联 html之前，先处理一下来自服务器的内容，避免有漏网的不安全字符
    const res = DOMPurify.sanitize(rawHtml);
    return res || `<p class="text-red-500 font-bold">${user_input_warning}</p>`;
  };

  return (
    <div className='space-y-2 overflow-y-auto w-full h-full'>
      <Virtuoso
        data={messages}
        totalCount={messages.length}
        initialTopMostItemIndex={messages.length - 1} // 设置初始滚动位置
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
