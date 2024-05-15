import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 默认值
const initState: Tag[] = [];

export const tagsSlice = createSlice({
  name: 'tags', // 模块名称
  initialState: initState, // 初始值
  reducers: {
    // 这里的state类型，必须显示的声明
    setTags: (state: Tag[], action: PayloadAction<Tag[]>) => {
      return action.payload;
    },
    // 登出就是重置
    resetTags: () => initState,
  },
});

// 导出 action 方法
export const tagsActions = tagsSlice.actions;

// 导出 reducer
export const tagsReducer = tagsSlice.reducer;
