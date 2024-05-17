// 创建消息
interface MessageCreate {
  tag_id: string; // 聊天标签 ID
  type: 'text' | 'mp3'; // 消息类型
  content: string; // 消息内容, 文本或者音频地址
  sender_type: number; // 发送人类型
}

interface Message extends MessageCreate {
  id: string; // 聊天消息 ID
  created_at: string; // 消息创建时间
  updated_at: string; // 消息更新时间
  change_id?: string | null; // 临时匹配的 ID，文本追加使用
}

interface MessageUpdate {
  id: string; // 聊天消息 ID,
  content: string; // 文本消息内容，音频不需要更新
}

// 服务端的对话消息，有内存处理，这里的消息，本质上是被用户看到的历史消息记录
