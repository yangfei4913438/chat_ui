import { useRequest } from 'ahooks';
import { getTagsService } from '@/services/tag';
import localCache from '@/core/cache';
import { cacheKeys } from '@/consts/cache';
import { useToast } from '@/components/ui/use-toast';
import useTags from '@/store/hooks/useTags';

const useTagsInit = () => {
  const { toast } = useToast();
  const { setTags } = useTags();

  useRequest(
    async () => {
      return await getTagsService();
    },
    {
      ready: !!localCache.getItem(cacheKeys.token),
      onSuccess: (data) => {
        // 记录用户信息到内存
        setTags(data);
      },
      onError: ({ data: { detail } }: any) => {
        toast({
          variant: 'error',
          description: detail,
        });
      },
    }
  );
};

export default useTagsInit;
