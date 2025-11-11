import { CustomInput } from '@/components/Inputs/CustomInput';
import { Separator } from '@/components/ui/separator';
import { QueryType } from '@/constants';
import { BlogService } from '@/services/blog.service';
import { TOptions } from '@/types';
import { BlogCategory, ISpecificationParams } from '@/types/blog';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { GlassCard } from '../Cards/GlassCard';
import { CustomCheckboxGroup } from '../CheckboxGroup/CustomCheckboxGroup';
import { CustomCollapsible } from '../Collapsibles/CustomCollapsible';

export function FilterBlog() {
  const [filters, setFilters] = useState<ISpecificationParams>({ keyword: '', categoryIds: [] });
  const [categoriyOptions, setCategoryOptions] = useState<TOptions[]>([]);
  const router = useRouter();
  const params = new URLSearchParams(window.location.search);

  const handleFilter = (key: keyof ISpecificationParams, value: ISpecificationParams[typeof key]) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const handleSearch = (e: { key: string }) => {
    if (e.key === 'Enter' && filters) {
      params.set('keyword', filters.keyword!);
      if (!filters.keyword) params.delete('keyword');
      router.push(`/blogs?${params.toString()}`);
    }
  };

  const fetchBlogCategories = useCallback(async () => {
    const categories = (await BlogService.getBlogCategories()).data as BlogCategory[];
    const options = categories.map(item => ({
      value: String(item.id),
      label: item.name,
    })) as TOptions[];
    setCategoryOptions(options);
  }, []);

  useEffect(() => {
    fetchBlogCategories();
  }, [fetchBlogCategories]);

  const pushParam = useDebouncedCallback((categoryIds: number[]) => {
    params.delete(QueryType.QUERY_CATEGORY);
    categoryIds.forEach(id => {
      params.append(QueryType.QUERY_CATEGORY, String(id));
    });
    router.push(`/blogs?${params.toString()}`);
  }, 1000);

  useEffect(() => {
    pushParam(filters.categoryIds!);
  }, [filters.categoryIds, pushParam]);

  return (
    <GlassCard title="" classContentName="px-0">
      <div className="flex flex-col">
        <div className="font-semibold text-lg">
          <h3 className="mb-3">Tìm kiếm bài viết</h3>
          <CustomInput
            startIcon={<SearchIcon size={18} />}
            placeholder="Nhập tên blog"
            className="focus-within:ring-0 border-0 bg-white/10"
            value={filters?.keyword}
            onChange={e => handleFilter('keyword', e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <Separator className="bg-gray-500 my-8" />

        <CustomCollapsible
          title={<h3 className="mb-3 font-semibold text-lg">Danh mục bài viết</h3>}
        >
          <div className="mt-3" />
          <CustomCheckboxGroup
            options={categoriyOptions}
            values={filters?.categoryIds!.map(String)}
            onCheckedValues={vals => handleFilter('categoryIds', vals.map(Number))}
          />
        </CustomCollapsible>
      </div>
    </GlassCard>
  );
}
