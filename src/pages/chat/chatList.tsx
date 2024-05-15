import React, { useEffect, useRef } from 'react';
import useMessages from '@/store/hooks/useMessages';
import dayjs from 'dayjs';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const ChatList = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const { messages } = useMessages();

  // 当messages更新时，滚动到底部
  useEffect(() => {
    if (listRef.current) {
      const listElement = listRef.current;
      // 找到最后一个子元素
      const lastChild = listElement.lastElementChild;
      if (lastChild) {
        // 使用scrollIntoView将最后一个子元素滚动到视图中
        lastChild.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  // 渲染文本, 将文本中的 ** 加粗, 换行符转换为 <br />
  const renderText = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line.split('**').map((part, index) => {
          if (index % 2 === 1) {
            // 如果是加粗的部分
            return <strong key={index}>{part.replace('**', '')}</strong>;
          } else {
            // 如果是普通文本部分
            return part;
          }
        })}
        {index < content.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div ref={listRef} className='space-y-2 overflow-y-auto w-full h-full'>
      {messages.map((m) => (
        <div className={'py-2 flex space-x-2 w-full'} key={m.id}>
          <div className='w-10 flex-grow-0 flex-shrink-0 text-right pr-0.5'>
            {m.sender_type == 0 ? '大师:' : '我:'}
          </div>
          <div className='space-y-2'>
            <div className='text-sm text-gray-500'>
              {dayjs(m.updated_at).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            {m.type === 'mp3' ? (
              <div className='w-96'>
                <AudioPlayer
                  className='w-24'
                  src={m.content}
                  showJumpControls={false}
                  showFilledVolume={true}
                />
              </div>
            ) : (
              <div>{renderText(m.content)}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
