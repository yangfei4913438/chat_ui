import { configureStore } from '@reduxjs/toolkit';
import { messagesReducer, tagsReducer, userInfoReducer } from '@/store/slices';

// 导出的 redux store 类型
export interface ReduxStoreType {
  userInfo: UserLocal;
  tags: Tag[];
  messages: Message[];
}

// 导出的 redux store 类型
export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
    tags: tagsReducer,
    messages: messagesReducer,
  },
});
