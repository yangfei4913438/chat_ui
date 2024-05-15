import { messagesActions, tagsActions, userInfoActions } from '@/store/slices';

// 导出所有的 action 方法
export default {
  userInfo: userInfoActions,
  tags: tagsActions,
  messages: messagesActions,
};
