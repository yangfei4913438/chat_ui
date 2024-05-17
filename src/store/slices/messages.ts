import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 默认值
const initState: Message[] = [];

// 这里只会存当前会话的消息，因为切换会话的时候，会获取最新的消息，本地缓存没有意义
export const messagesSlice = createSlice({
  name: 'messages', // 模块名称
  initialState: initState, // 初始值
  reducers: {
    // 这里的state类型，必须显示的声明
    setMessages: (state: Message[], action: PayloadAction<Message[]>) => {
      return action.payload;
    },
    appendMessage: (state: Message[], action: PayloadAction<Message>) => {
      return [...state, action.payload];
    },
    appendMessages: (state: Message[], action: PayloadAction<Message[]>) => {
      return [...state, ...action.payload];
    },
    updateMessage: (state: Message[], action: PayloadAction<Message>) => {
      return state
        .map((message) => {
          if (
            message.change_id === action.payload.change_id &&
            message.type === action.payload.type
          ) {
            return action.payload;
          }
          return message;
        })
        .filter((m) => m.id !== '-1');
    },
    // 登出就是重置
    resetMessages: () => initState,
  },
});

// 导出 action 方法
export const messagesActions = messagesSlice.actions;

// 导出 reducer
export const messagesReducer = messagesSlice.reducer;
