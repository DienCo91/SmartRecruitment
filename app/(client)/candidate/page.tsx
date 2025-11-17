/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { CandidateCard } from '@/components/client/Candidates/CandidateCard';
import { GlassCard } from '@/components/client/Cards/GlassCard';
import { CustomCheckboxGroup } from '@/components/client/CheckboxGroup/CustomCheckboxGroup';
import { CustomCollapsible } from '@/components/client/Collapsibles/CustomCollapsible';
import { FilterCandidate } from '@/components/client/Filters/FilterCandidate';
import { CustomRadioGroup } from '@/components/client/RadioGroup/CustomRadioGroup';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import _ from 'lodash';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { CandidateService } from '@/services/candidate.services';
import { educations, experiences, genders } from '@/constants/mockedData';
import { useSearchParams } from 'next/navigation';

const CandidatePage = () => {
  const initFilter = {
    locationRadius: 5,
    candidateLevel: 'midLevel',
    experience: '1-2Year',
    education: ['graduation'],
    gender: 'male',
  };
  type Filter = typeof initFilter;
  const [filters, setFilters] = useState<Filter>(initFilter);

  const [candidates, setCandidates] = useState<[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const handleFilter = (key: keyof Filter, value: Filter[typeof key]) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const getCandidates = async (pageNumber = 1) => {
    if (loading) return;
    setLoading(true);
    try {
      const params = _.omitBy(
        {
          page: pageNumber,
          keyword: searchParams.get('keyword') || undefined,
          // size: 10,
          location: 'hanoi',
          // category: '',
          // experienceLevel: filters.experience,
          // educationLevels: filters.education,
          // gender: filters.gender,
        },
        _.isNil
      );

      const res = await CandidateService.getAllCandidate(params as Record<string, string | number>);
      const newData = res.data.content;

      setCandidates(prev => (pageNumber === 1 ? newData : [...prev, ...newData]));
      setHasMore(!res.data.last);
      setPage(pageNumber);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCandidates(1);
  }, [filters]);

  return (
    <div>
      <FilterCandidate />
      <GlassCard title="" className="mt-[60px]">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-4 mt-3">
            <GlassCard title="" classContentName="p-0" className="col-span-4 hover:bg-transparent ">
              {/* Radius */}
              <CustomCollapsible
                title={
                  <div className="flex items-baseline text-sm font-medium space-x-1">
                    <span>Bán kính:</span>
                    <span>{filters.locationRadius} Km</span>
                  </div>
                }
              >
                <div className="mt-3"></div>
                <Slider
                  defaultValue={[filters.locationRadius]}
                  max={50}
                  step={1}
                  onValueChange={(vals: number[]) => handleFilter('locationRadius', vals[0])}
                  className="[&_[data-slot=slider-range]]:bg-[#1d2954]"
                />
              </CustomCollapsible>
              <Separator className="bg-gray-500 my-2" />

              <Separator className="bg-gray-500 my-2" />

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
                  values={filters.education}
                  onCheckedValues={vals => handleFilter('education', vals)}
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

          <div id="scrollable-candidates" className="col-span-8 h-[1000px] overflow-y-auto">
            <InfiniteScroll
              scrollableTarget="scrollable-candidates"
              dataLength={candidates.length}
              next={() => getCandidates(page + 1)}
              hasMore={hasMore}
              loader={<LoadingCircle />}
            >
              {candidates.map((item, i) => (
                <CandidateCard key={i} candidate={item} />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default CandidatePage;
