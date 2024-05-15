import { useDispatch, useSelector } from 'react-redux';

import { ReduxStoreType } from '@/store';
import storeActions from '@/store/actions';
import dayjs from 'dayjs';

// 用户信息相关的数据处理
const useMessages = () => {
  // 取出redux中的数据，第一个泛型是整个store的导出类型，第二个是目标命名空间的类型
  const messages = useSelector<ReduxStoreType, Message[]>((state) => state.messages);

  // redux 的 action 调用方法
  const dispatch = useDispatch();

  // 设置新的用户数据
  const setMessages = (data: Message[]) => {
    dispatch(storeActions.messages.setMessages(data));
  };

  // 临时显示
  const tempShow = (tag_id: string, data: Message) => {
    const list = messages.filter((m) => m.id !== '-1');
    dispatch(
      storeActions.messages.setMessages([
        ...list,
        data,
        {
          id: '-1',
          tag_id: tag_id,
          sender_type: 0,
          type: 'text',
          content: '大师正在思考中，请稍后...',
          created_at: dayjs().toISOString(),
          updated_at: dayjs().toISOString(),
        },
      ])
    ); // 临时测试
  };

  // 推送一条消息到消息列表
  const pushMessage = (data: Message) => {
    const list = messages.filter((m) => m.id !== '-1');
    dispatch(storeActions.messages.setMessages([...list, data]));
  };

  // 重置用户数据为默认值
  const resetMessages = () => {
    dispatch(storeActions.messages.resetMessages());
  };

  // 返回
  return {
    messages,
    tempShow,
    pushMessage,
    setMessages,
    resetMessages,
  };
};

export default useMessages;
