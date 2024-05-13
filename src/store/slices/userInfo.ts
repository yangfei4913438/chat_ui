import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 默认值
const initState: UserLocal = {
  id: '',
  username: '',
  email: '',
  invite_code: '',
  is_active: false,
};

export const userInfoSlice = createSlice({
  name: 'userInfo', // 模块名称
  initialState: initState, // 初始值
  reducers: {
    // 这里的state类型，必须显示的声明
    setUserInfo: (state: UserLocal, action: PayloadAction<UserLocal>) => {
      return action.payload;
    },
    // 登出就是重置
    resetUserInfo: () => initState,
  },
});

// 导出 action 方法
export const userInfoActions = userInfoSlice.actions;

// 导出 reducer
export const userInfoReducer = userInfoSlice.reducer;
