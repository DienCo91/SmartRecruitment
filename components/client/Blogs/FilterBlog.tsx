import { CustomInput } from '@/components/Inputs/CustomInput';
import { Separator } from '@/components/ui/separator';
import { SearchIcon } from 'lucide-react';
import { CustomCollapsible } from '../Collapsibles/CustomCollapsible';
import { CustomCheckboxGroup } from '../CheckboxGroup/CustomCheckboxGroup';
import { useState } from 'react';
import { categoriesBlog } from '@/constants/mockedData';
import { GlassCard } from '../Cards/GlassCard';

export function FilterBlog() {
  const initFilter = {
    keyword: '',
    categoryBlog: [''],
  };
  type Filter = typeof initFilter;
  const [filters, setFilters] = useState<Filter>(initFilter);
  const handleFilter = (key: keyof Filter, value: Filter[typeof key]) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  return (
    <GlassCard title="" classContentName="px-0">
      <div className="flex flex-col">
        <div className="font-semibold text-lg">
          <h3 className="mb-3">Tìm kiếm bài viết</h3>
          <CustomInput
            startIcon={<SearchIcon size={18} />}
            placeholder="Nhập tên blog"
            className="focus-within:ring-0 border-0 bg-white/10"
            // value={filters.search}
            // onChange={e => handleFilter('search', e.target.value)}
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
