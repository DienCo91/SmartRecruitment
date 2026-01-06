'use client';

import { CandidateCard } from '@/components/client/Candidates/CandidateCard';
import { GlassCard } from '@/components/client/Cards/GlassCard';
import { CustomCheckboxGroup } from '@/components/client/CheckboxGroup/CustomCheckboxGroup';
import { CustomCollapsible } from '@/components/client/Collapsibles/CustomCollapsible';
import { FilterCandidate } from '@/components/client/Filters/FilterCandidate';
import { CustomRadioGroup } from '@/components/client/RadioGroup/CustomRadioGroup';
import { Separator } from '@/components/ui/separator';

import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { educations, experiences, genders } from '@/constants/mockedData';
import { CandidateService } from '@/services/candidate.services';
import { Candidate } from '@/types';
import _ from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'sonner';

const CandidatePage = () => {
  const initFilter = {
    experience: '',
    educations: [] as string[],
    gender: '',
  };
  type Filter = typeof initFilter;
  const [filters, setFilters] = useState<Filter>(initFilter);

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();

  const handleFilter = (key: keyof Filter, value: Filter[typeof key]) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const fetchCandidates = useCallback(
    async (pageNumber = 1) => {
      setLoading(true);
      try {
        const query = _.omitBy(
          {
            page: pageNumber,
            keyword: params.get('keyword') ?? undefined,
            location: params.get('location') ?? undefined,
            experienceLevel: filters.experience,
            educationLevels: filters.educations,
            gender: filters.gender ?? undefined,
          },
          _.isNil
        );
        const res = await CandidateService.getAllCandidate(
          query as Record<string, string | number>
        );
        const newData = res.data.content;

        setCandidates(prev => (pageNumber === 1 ? newData : [...prev, ...newData]));
        setHasMore(!res.data.last);
        setPage(pageNumber);
      } catch (err) {
        console.error(err);
        toast.error('Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    },
    [params, filters]
  );

  useEffect(() => {
    fetchCandidates(1);
  }, [fetchCandidates]);

  const handleClearFilter = () => {
    setFilters(initFilter);
  };

  return (
    <div>
      <FilterCandidate handleClearFilter={handleClearFilter} />
      <GlassCard title="" className="mt-[60px]">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-4 mt-3">
            <GlassCard title="" classContentName="p-0" className="col-span-4 hover:bg-transparent ">
              {/* Experiences */}
              <CustomCollapsible
                title={
                  <div className="flex items-baseline text-sm font-medium space-x-1">
                    <span>Kinh nghiệm</span>
                  </div>
                }
              >
                <div className="mt-3"></div>
                <CustomRadioGroup
                  options={experiences}
                  value={filters.experience}
                  onValueChange={val => handleFilter('experience', val)}
                />
              </CustomCollapsible>
              <Separator className="bg-gray-500 my-2" />

              {/* Educations */}
              <CustomCollapsible
                title={
                  <div className="flex items-baseline text-sm font-medium space-x-1">
                    <span>Học vấn</span>
                  </div>
                }
              >
                <div className="mt-3"></div>
                <CustomCheckboxGroup
                  options={educations}
                  values={filters.educations}
                  onCheckedValues={vals => handleFilter('educations', vals)}
                />
              </CustomCollapsible>
              <Separator className="bg-gray-500 my-2" />

              {/* Gender */}
              <CustomCollapsible
                title={
                  <div className="flex items-baseline text-sm font-medium space-x-1">
                    <span>Giới tính</span>
                  </div>
                }
              >
                <div className="mt-3"></div>
                <CustomRadioGroup
                  options={genders}
                  value={filters.gender}
                  onValueChange={val => handleFilter('gender', val)}
                />
              </CustomCollapsible>
            </GlassCard>
          </div>

          <div
            id="scrollable-candidates"
            className="col-span-12 md:col-span-8 h-[1000px] overflow-y-auto"
          >
            {loading ? (
              <LoadingCircle />
            ) : !Boolean(candidates.length) ? (
              <div className="text-center py-10 text-gray-400">Không có ứng viên nào phù hợp</div>
            ) : (
              <InfiniteScroll
                scrollableTarget="scrollable-candidates"
                dataLength={candidates.length}
                next={() => fetchCandidates(page + 1)}
                hasMore={hasMore}
                loader={<LoadingCircle />}
              >
                {candidates.map(item => (
                  <CandidateCard key={item.id} candidate={item} />
                ))}
              </InfiniteScroll>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default CandidatePage;
