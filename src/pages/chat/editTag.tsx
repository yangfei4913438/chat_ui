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

import { PenLine } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { updateTagService } from '@/services/tag';
import useProjectRoute from '@/hooks/useProjectRoute';
import cache from '@/core/cache';
import { useToast } from '@/components/ui/use-toast';

const EditTag = (tag: Tag) => {
  const { reFresh } = useProjectRoute();
  const { toast } = useToast();
  const [val, setVal] = useState(tag.name);

  const handleContinue = async () => {
    console.log('当前的输入内容：', val);
    if (val.trim() === tag.name) return;
    try {
      const data = await updateTagService({ ...tag, name: val.trim() });
      if (data) {
        console.log('更新成功');
        setVal('');
        // 更新本地缓存的 id 为新的标签 id
        cache.setItem('tag_id', data.id);
        // 刷新页面, 系统会自动选择新的标签
        reFresh();
      }
    } catch (e: any) {
      setVal('');
      toast({
        variant: 'error',
        description: e?.data?.detail || '异常的错误，请稍后再试',
      });
    }
  };

  const handleCancel = () => {
    setVal('');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className='cursor-pointer'>
          <PenLine size={14} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className={'w-1/2 min-w-1/2'}>
        <AlertDialogHeader>
          <AlertDialogTitle>请输入新的标签名称</AlertDialogTitle>
          <AlertDialogDescription>
            提交后将会修改当前的标签名称，内容就是你输入的内容。请不要输入重复的标签名称。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <Input
            placeholder={'请输入新的标签名称'}
            value={val}
            onChange={(event) => setVal(event.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>取消</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>确定</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditTag;
