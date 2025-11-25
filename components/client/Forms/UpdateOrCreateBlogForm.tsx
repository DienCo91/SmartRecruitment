/* eslint-disable @typescript-eslint/no-unused-expressions */
import { GlassCard } from '@/components/client/Cards/GlassCard';
import { CustomInput } from '@/components/Inputs/CustomInput';
import DragAndDropFileInput from '@/components/Inputs/DragAndDropFileInput';
import QuillCustom, { QuillCustomRef } from '@/components/quill';
import { MultiSelect } from '@/components/Selectors/MultiSelect';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { BlogService } from '@/services/blog.service';
import { TagData, TOptions } from '@/types';
import { Blog, BlogCategory, BlogStatus, CreateOrUpdateBlog } from '@/types/blog';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PreviewImage } from '../Images/PreviewImage';
import _ from 'lodash';
import { slugify } from '@/common';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Router } from '@/constants';

interface Props {
  blog?: Blog;
}

export function UpdateOrCreateBlogFrom({ blog }: Props) {
  const [blogCategoryOptions, setBlogCategoryOptions] = useState<TOptions[]>([]);
  const [tagOptions, setTagOptions] = useState<TOptions[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const contentRef = useRef<QuillCustomRef>(null);
  const isUpdate = Boolean(blog);
  const [form, setForm] = useState<CreateOrUpdateBlog>({ title: '', content: '' });

  const handleChange = (key: keyof CreateOrUpdateBlog, value: CreateOrUpdateBlog[typeof key]) =>
    setForm(prev => ({ ...prev, [key]: value }));

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

  const handleSubmit = (status: BlogStatus) => {
    const data = _.assign(form, {
      slug: slugify(form.title),
      status: status,
      content: contentRef.current?.getValue(),
    });

    const formData = new FormData();
    formData.set('title', data.title);
    formData.set('slug', data.slug);
    data.description && formData.set('description', data.description);
    formData.set('content', data.content);
    formData.set('status', data.status);
    data.blogCategoryIds && formData.set('blogCategoryIds', data.blogCategoryIds.join(','));
    data.tags && formData.set('tags', data.tags.join(','));
    data.thumbnail && formData.set('thumbnail', data.thumbnail);

    try {
      setLoading(true);
      BlogService.createBlog(formData);
      router.push(Router.HOME);
    } catch (e) {
      console.log(e);
      toast.error('Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

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
          <CustomInput value={form.title} onChange={e => handleChange('title', e.target.value)} />
        </div>

        <div className="space-y-2 mb-5">
          <p className="font-semibold text-lg">Mô tả</p>
          <Textarea
            className="bg-white/20 min-h-[10rem] resize-none"
            maxLength={500}
            value={form.description}
            onChange={e => handleChange('description', e.target.value)}
          />
        </div>

        <Separator />
        <div className="space-y-2 mt-10">
          <p className="font-semibold text-lg text-center uppercase bg-white/10 rounded-md">
            Nội dung
          </p>
          <QuillCustom ref={contentRef} initValue={form.content} />
        </div>
      </GlassCard>

      {/* right card */}
      <GlassCard
        title={
          <div className="space-x-3">
            <Button
              variant="outline"
              className="text-neutral-400"
              size="sm"
              onClick={() => handleSubmit(BlogStatus.DRAFT)}
              disabled={loading}
            >
              Lưu nháp
            </Button>
            <Button
              size="sm"
              type="submit"
              onClick={() => handleSubmit(BlogStatus.REQUESTED)}
              disabled={loading}
            >
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
            values={form.blogCategoryIds?.map(String) ?? []}
            onValueChange={vals => handleChange('blogCategoryIds', vals)}
            placeholder="Chọn danh mục bài viết"
          />
        </div>

        <div className="space-y-2 mb-5">
          <p className="font-semibold text-lg">Tags</p>
          <MultiSelect
            options={tagOptions}
            values={form.tags ?? []}
            onValueChange={vals => handleChange('tags', vals)}
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
              form.thumbnail
                ? form.thumbnail.name
                : 'Kéo thả file vào đây hoặc click để chọn thumbnail cho blog'
            }
            onSelectFiles={files => handleChange('thumbnail', files[0])}
            accept="image/*"
          />
          {form.thumbnail && (
            <>
              <p className="font-semibold text-lg text-center">Xem trước</p>
              <PreviewImage
                fileImage={form.thumbnail}
                onRemoveFile={() => handleChange('thumbnail', undefined)}
              />
            </>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
