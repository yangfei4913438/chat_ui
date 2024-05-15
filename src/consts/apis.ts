// http方法类型
export type RestfulType = 'get' | 'post' | 'put' | 'patch' | 'delete';

// 配置key的类型
export type ConfigKeyType =
  | 'userInfo'
  | 'register'
  | 'login'
  | 'tags'
  | 'createTag'
  | 'delTag'
  | 'updateTag'
  | 'messages'
  | 'createMessage'
  | 'delMessage';

interface ConfigObject {
  // restful 方法
  method: RestfulType;
  // 路由
  url: string;
  // 是否需要拼接路径ID参数
  needId: boolean;
}

// 配置对象的类型
type ApiConfigType = { [T in ConfigKeyType]: ConfigObject };

// api 配置
export const apiConfig: ApiConfigType = {
  // 获取用户信息
  userInfo: {
    method: 'get',
    url: '/api/user/info',
    needId: false,
  },
  // 注册
  register: {
    method: 'post',
    url: '/api/register',
    needId: false,
  },
  // 登录
  login: {
    method: 'post',
    url: '/api/login',
    needId: false,
  },
  // 获取聊天标签列表
  tags: {
    method: 'get',
    url: '/api/tags',
    needId: false,
  },
  // 创建聊天标签
  createTag: {
    method: 'post',
    url: '/api/tag',
    needId: false,
  },
  // 删除聊天标签
  delTag: {
    method: 'delete',
    url: '/api/tag',
    needId: true,
  },
  // 更新聊天标签
  updateTag: {
    method: 'put',
    url: '/api/tag',
    needId: false,
  },
  // 获取聊天消息列表
  messages: {
    method: 'get',
    url: '/api/messages',
    needId: true,
  },
  // 创建聊天消息
  createMessage: {
    method: 'post',
    url: '/api/message',
    needId: false,
  },
  // 删除聊天消息
  delMessage: {
    method: 'delete',
    url: '/api/message',
    needId: true,
  },
};
