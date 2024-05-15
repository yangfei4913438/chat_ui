import React from 'react';
import useMessages from '@/store/hooks/useMessages';
import dayjs from 'dayjs';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Virtuoso } from 'react-virtuoso';

const ChatList = () => {
  const { messages } = useMessages();

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
    <div className='space-y-2 overflow-y-auto w-full h-full'>
      <Virtuoso
        data={messages}
        totalCount={messages.length}
        initialTopMostItemIndex={messages.length - 1} // 设置初始滚动位置
        itemContent={(idx, item) => {
          return (
            <div className={'py-2 flex space-x-2 w-full'} key={item.id}>
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
                  <div>{renderText(item.content)}</div>
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
