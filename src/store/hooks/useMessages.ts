import { useDispatch } from 'react-redux';

import storeActions from '@/store/actions';

// 用户信息相关的数据处理
const useMessages = () => {
  // redux 的 action 调用方法
  const dispatch = useDispatch();

  // 设置新的用户数据
  const setMessages = (data: Message[]) => {
    // 设置数据
    dispatch(storeActions.messages.setMessages(data));
  };

  // 推送一条消息到消息列表
  const pushMessage = (data: Message) => {
    dispatch(storeActions.messages.appendMessage(data));
  };

  // 更新消息
  const updateMessage = (data: Message) => {
    dispatch(storeActions.messages.updateMessage(data));
  };

  // 重置用户数据为默认值
  const resetMessages = () => {
    dispatch(storeActions.messages.resetMessages());
  };

  // 返回
  return {
    updateMessage,
    pushMessage,
    setMessages,
    resetMessages,
  };
};

export default useMessages;
