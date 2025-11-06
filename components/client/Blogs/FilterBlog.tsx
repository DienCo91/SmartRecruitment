import { CustomInput } from '@/components/Inputs/CustomInput';
import { Separator } from '@/components/ui/separator';
import { categoriesBlog } from '@/constants/mockedData';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GlassCard } from '../Cards/GlassCard';
import { CustomCheckboxGroup } from '../CheckboxGroup/CustomCheckboxGroup';
import { CustomCollapsible } from '../Collapsibles/CustomCollapsible';

export function FilterBlog() {
  const initFilter = {
    keyword: '',
    categoryBlog: [''],
  };
  type Filter = typeof initFilter;
  const [filters, setFilters] = useState<Filter>(initFilter);
  const router = useRouter();

  const handleFilter = (key: keyof Filter, value: Filter[typeof key]) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const handleSearch = (e: { key: string }) => {
    if (e.key === 'Enter') {
      const params = new URLSearchParams(window.location.search);
      params.set('keyword', filters.keyword);
      if (!filters.keyword) params.delete('keyword');
      router.push(`/blogs?${params.toString()}`);
    }
  };

  return (
    <GlassCard title="" classContentName="px-0">
      <div className="flex flex-col">
        <div className="font-semibold text-lg">
          <h3 className="mb-3">Tìm kiếm bài viết</h3>
          <CustomInput
            startIcon={<SearchIcon size={18} />}
            placeholder="Nhập tên blog"
            className="focus-within:ring-0 border-0 bg-white/10"
            value={filters.keyword}
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
            options={categoriesBlog}
            values={filters.categoryBlog}
            onCheckedValues={vals => handleFilter('categoryBlog', vals)}
          />
        </CustomCollapsible>
      </div>
    </GlassCard>
  );
}
