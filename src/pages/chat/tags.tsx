import React, { MouseEvent } from 'react';
import { Bot, BotMessageSquare, Pin, PinOff } from 'lucide-react';
import useTags from '@/store/hooks/useTags';
import { cn } from '@/lib/utils';
import cache from '@/core/cache';
import useProjectRoute from '@/hooks/useProjectRoute';
import { updateTagService } from '@/services/tag';
import useUserInfo from '@/store/hooks/useUserInfo';
import EditTag from '@/pages/chat/editTag';
import DelTag from '@/pages/chat/delTag';

const Tags = ({ tid }: { tid: string | null }) => {
  const { tags } = useTags();
  const { userInfo } = useUserInfo();
  const { Link, reFresh } = useProjectRoute();

  const handleTagClick = (event: MouseEvent, id: string) => {
    if (String(tid) === String(id)) {
      event.preventDefault();
      console.log('相同的 ID 不跳转');
      return;
    }
    cache.setItem('tag_id', id);
  };

  const handlePinClick = async (id: string, pin: boolean) => {
    const res = await updateTagService({ id, user_id: userInfo.id, pin });
    if (res) {
      console.log('更新成功');
      reFresh();
    }
  };

  return (
    <div className='space-y-2 flex-1 overflow-y-auto'>
      {tags.map((tag) => (
        <Link
          to={`/chat/${tag.id}`}
          className={cn(
            'shadow rounded-md p-2 border border-gray-300 bg-white cursor-default',
            'hover:bg-gray-100 flex items-center justify-between space-x-2',
            { 'bg-gray-100': String(tid) === String(tag.id) }
          )}
          onClick={(event) => handleTagClick(event, tag.id)}
          key={tag.id}
        >
          <div className='flex-1 group/bot flex items-center space-x-1 overflow-hidden'>
            <div
              className={cn('', 'group-hover/bot:hidden w-5', {
                hidden: String(tid) === String(tag.id),
              })}
            >
              <Bot size={20} />
            </div>
            <div
              className={cn('group-hover/bot:block hidden w-5', {
                block: String(tid) === String(tag.id),
              })}
            >
              <BotMessageSquare size={20} />
            </div>
            <div className={'flex-1 truncate text-sm'}>{tag.name}</div>
          </div>
          <div
            className={'text-sm flex-grow-0 flex-shrink-0 flex items-center space-x-2'}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <div className='cursor-pointer' onClick={() => handlePinClick(tag.id, !tag.pin)}>
              {tag.pin ? <Pin size={14} /> : <PinOff size={14} />}
            </div>
            <DelTag tag_id={tag.id} />
            <EditTag id={tag.id} name={tag.name} pin={tag.pin} user_id={tag.user_id} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default React.memo(Tags);
