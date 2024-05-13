// 用户类型，登录使用
interface UserLogin {
  username: string;
  password: string;
}

// 用户类型，注册使用
interface UserCreate extends UserLogin {
  email: string;
  invite_code: string;
}

// 本地存储的用户数据，不含密码
interface UserLocal {
  id: string;
  username: string;
  email: string;
  invite_code: string;
  is_active: boolean;
}

// 登录后，从后端返回的数据结构
interface UserReturn extends UserLocal {
  token: string;
}
