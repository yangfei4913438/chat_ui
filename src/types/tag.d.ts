// 聊天标签
interface TagCreate {
  name: string; // 聊天标签名称
  pin: boolean; // 是否置顶
  user_id: string; // 聊天标签所属用户 ID
}

// 后端返回
interface Tag extends TagCreate {
  id: string; // 聊天标签 ID
}

// 更新标签
interface TagUpdate {
  id: string; // 聊天标签 ID
  user_id: string; // 聊天标签所属用户 ID
  name?: string; // 聊天标签名称
  pin?: boolean; // 是否置顶
}
