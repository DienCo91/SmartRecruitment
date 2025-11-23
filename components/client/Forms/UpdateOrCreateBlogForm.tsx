import { GlassCard } from '@/components/client/Cards/GlassCard';
import { CustomInput } from '@/components/Inputs/CustomInput';
import DragAndDropFileInput from '@/components/Inputs/DragAndDropFileInput';
import QuillCustom from '@/components/quill';
import { MultiSelect } from '@/components/Selectors/MultiSelect';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { BlogService } from '@/services/blog.service';
import { TagData, TOptions } from '@/types';
import { Blog, BlogCategory } from '@/types/blog';
import { useCallback, useEffect, useState } from 'react';
import { CustomImage } from '../Images/CustomImage';
import { PreviewImage } from '../Images/PreviewImage';

interface Props {
  blog?: Blog;
}

export function UpdateOrCreateBlogFrom({ blog }: Props) {
  const isUpdate = Boolean(blog);
  const [blogCategoryOptions, setBlogCategoryOptions] = useState<TOptions[]>([]);
  const [tagOptions, setTagOptions] = useState<TOptions[]>([]);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [tagNames, setTagNames] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File>();

  const fetchTags = useCallback(async () => {
    try {
      const tags = (await BlogService.getPopularTags()).data as TagData[];
      const options = tags.map(
        item => ({ value: item.name, label: item.name }) as unknown as TOptions
      );
      setTagOptions(options);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const fetchBlogCategories = useCallback(async () => {
    try {
      const categories = (await BlogService.getBlogCategories()).data as BlogCategory[];
      const options = categories.map(
        item => ({ value: item.id, label: item.name }) as unknown as TOptions
      );
      setBlogCategoryOptions(options);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchBlogCategories();
    fetchTags();
  }, [fetchBlogCategories, fetchTags]);

  return (
    <div className="grid grid-cols-12 gap-3">
      <GlassCard
        title={<p className="text-xl">{isUpdate ? 'Cập nhật bài viết' : 'Tạo bài viết mới'}</p>}
        className="col-span-8"
        action
      >
        <div className="space-y-2 mb-5">
          <p className="font-semibold text-lg">Tiêu đề</p>
          <CustomInput />
        </div>

        <div className="space-y-2 mb-5">
          <p className="font-semibold text-lg">Mô tả</p>
          <Textarea className="bg-white/20 min-h-[10rem] resize-none" maxLength={500} />
        </div>

        <Separator />
        <div className="space-y-2 mt-10">
          <p className="font-semibold text-lg text-center uppercase bg-white/10 rounded-md">
            Nội dung
          </p>
          <QuillCustom initValue={'haha'} />
        </div>
      </GlassCard>

      {/* right card */}
      <GlassCard
        title={
          <div className="space-x-3">
            <Button variant="outline" className="text-neutral-400" size="sm">
              Lưu nháp
            </Button>
            <Button size="sm" type="submit">
              Tạo yêu cầu phê duyệt
            </Button>
          </div>
        }
        className="col-span-4"
        action
      >
        <div className="space-y-2 mb-5">
          <p className="font-semibold text-lg">Danh mục bài viết</p>
          <MultiSelect
            options={blogCategoryOptions}
            values={categoryIds}
            onValueChange={setCategoryIds}
            placeholder="Chọn danh mục bài viết"
          />
        </div>

        <div className="space-y-2 mb-5">
          <p className="font-semibold text-lg">Tags</p>
          <MultiSelect
            options={tagOptions}
            values={tagNames}
            onValueChange={vals => setTagNames(vals)}
            placeholder="Gắn tag cho bài viết"
            inputPlaceholder="Nhập tag mới"
            itemClassName="rounded-full px-2"
            enableAddValueManual
          />
        </div>
        <Separator className="my-5" />

        <div className="space-y-2 mb-5">
          <p className="font-semibold text-lg">Thumbnail</p>
          <DragAndDropFileInput
            placeholder={
              thumbnail
                ? thumbnail.name
                : 'Kéo thả file vào đây hoặc click để chọn thumbnail cho blog'
            }
            onSelectFiles={files => setThumbnail(files[0])}
            accept="image/*"
          />
          {thumbnail && (
            <>
              <p className="font-semibold text-lg text-center">Xem trước</p>
              <PreviewImage fileImage={thumbnail} onRemoveFile={() => setThumbnail(undefined)} />
            </>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
