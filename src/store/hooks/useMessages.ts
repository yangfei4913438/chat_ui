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

  // 防止重复的异常
  function removeDuplicates(arr: Message[]) {
    // 使用reduce方法和一个对象来跟踪遇到的type和url组合
    return arr.reduce((unique, currentObj) => {
      // 检查当前对象的type和content是否已经存在于unique对象中
      const isDuplicate = Object.keys(unique).some((key) => {
        // 创建一个唯一键，由type和content组成
        const uniqueKey = `${currentObj.type}-${currentObj.content}`;
        // 如果unique对象中已经存在这个键，说明是重复的
        return key === uniqueKey;
      });

      // 如果当前对象不是重复的，将其添加到unique数组中
      if (!isDuplicate) {
        const uniqueKey = `${currentObj.type}-${currentObj.content}`;
        unique[uniqueKey] = currentObj;
      }
      return unique;
    }, {} as any);
  }

  // 设置新的用户数据
  const setMessages = (data: Message[]) => {
    // 数据去重
    const res = Object.values<Message>(removeDuplicates(data));
    // 设置数据
    dispatch(storeActions.messages.setMessages(res));
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
