import { request } from '@/core/ajax';

// 获取用户信息
export async function getUserInfoServices() {
  return await request<UserLocal>({ name: 'userInfo' });
}

// 注册新用户
export async function userRegisterServices(data: UserCreate) {
  return await request<UserLocal, UserCreate>({ name: 'register', data });
}

// 用户登录
export async function userLoginServices(data: UserLogin) {
  return await request<UserReturn, UserLogin>({ name: 'login', data });
}
