import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Trash2 } from 'lucide-react';
import React from 'react';
import { deleteTagService } from '@/services/tag';
import useProjectRoute from '@/hooks/useProjectRoute';
import cache from '@/core/cache';
import { useToast } from '@/components/ui/use-toast';
import useTags from '@/store/hooks/useTags';

const DelTag = ({ tag_id }: { tag_id: string }) => {
  const { reFresh } = useProjectRoute();
  const { toast } = useToast();
  const { tags } = useTags();

  const handleContinue = async () => {
    try {
      const data = await deleteTagService(tag_id);
      if (data) {
        console.log('删除成功');
        const list = tags.filter((tag) => tag.id !== tag_id);
        if (list.length > 0) {
          const tag = list[0];
          // 删除后，默认选中第一个标签
          cache.setItem('tag_id', tag.id);
        }
        // 刷新页面, 系统会自动选择新的标签
        reFresh();
      }
    } catch (e: any) {
      toast({
        variant: 'error',
        description: e?.data?.detail || '异常的错误，请稍后再试',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className='cursor-pointer'>
          <Trash2 size={14} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className={'w-1/2 min-w-1/2'}>
        <AlertDialogHeader>
          <AlertDialogTitle>确定要删除当前对话吗？</AlertDialogTitle>
          <AlertDialogDescription>删除后，对话将无法恢复，确定要删除吗？</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue} className='bg-destructive'>
            确定
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DelTag;
