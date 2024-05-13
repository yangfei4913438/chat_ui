// 每一个聊天标签的聊天记录
interface Message {
  msg_id: string; // 聊天消息 ID
  msg_type: 'text' | 'mp3'; // 消息类型
  msg_content: string; // 消息内容, 文本或者音频地址
}

// 聊天标签
interface ChatTag {
  tag_id: string; // 聊天标签 ID
  tag_name: string; // 聊天标签名称
  tag_messages: Message[]; // 聊天记录
}
