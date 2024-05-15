import { useDispatch, useSelector } from 'react-redux';

import { ReduxStoreType } from '@/store';
import storeActions from '@/store/actions';

// 用户信息相关的数据处理
const useTags = () => {
  // 取出redux中的数据，第一个泛型是整个store的导出类型，第二个是目标命名空间的类型
  const tags = useSelector<ReduxStoreType, Tag[]>((state) => state.tags);

  // redux 的 action 调用方法
  const dispatch = useDispatch();

  // 设置新的用户数据
  const setTags = (data: Tag[]) => {
    dispatch(storeActions.tags.setTags(data));
  };

  // 重置用户数据为默认值
  const resetTags = () => {
    dispatch(storeActions.tags.resetTags());
  };

  // 返回
  return {
    tags,
    setTags,
    resetTags,
  };
};

export default useTags;
