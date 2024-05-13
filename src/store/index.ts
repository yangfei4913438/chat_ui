import { configureStore } from '@reduxjs/toolkit';
import { userInfoReducer } from '@/store/slices';

// 导出的 redux store 类型
export interface ReduxStoreType {
  userInfo: UserLocal;
}

// 导出的 redux store 类型
export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
});
