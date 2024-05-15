import { request } from '@/core/ajax';

export const getMessagesService = async (tag_id: string) => {
  return await request<Message[]>({ name: 'messages', id: tag_id });
};

export const createMessageService = async (data: MessageCreate) => {
  return await request<Message, MessageCreate>({ name: 'createMessage', data });
};

export const deleteMessageService = async (id: string, tag_id: string) => {
  return await request<Message>({ name: 'delMessage', id: `${tag_id}/${id}` });
};
