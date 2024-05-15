import { request } from '@/core/ajax';

export const getTagsService = async () => {
  return await request<Tag[]>({ name: 'tags' });
};

export const createTagService = async (data: TagCreate) => {
  return await request<Tag, TagCreate>({ name: 'createTag', data });
};

export const updateTagService = async (data: TagUpdate) => {
  return await request<Tag, TagUpdate>({ name: 'updateTag', data });
};

export const deleteTagService = async (id: string) => {
  return await request<Tag>({ name: 'delTag', id });
};
