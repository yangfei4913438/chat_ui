// http方法类型
export type RestfulType = 'get' | 'post' | 'put' | 'patch' | 'delete';

// 配置key的类型
export type ConfigKeyType = 'userInfo' | 'register' | 'login';

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
};
