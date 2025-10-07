'use client';

import { CandidateCard } from '@/components/client/Candidates/CandidateCard';
import { GlassCard } from '@/components/client/Cards/GlassCard';
import { CustomCheckboxGroup } from '@/components/client/CheckboxGroup/CustomCheckboxGroup';
import { CustomCollapsible } from '@/components/client/Collapsibles/CustomCollapsible';
import { FilterCandidate } from '@/components/client/Filters/FilterCandidate';
import { CustomRadioGroup } from '@/components/client/RadioGroup/CustomRadioGroup';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  jobLevels as candidateLevel,
  educations,
  experiences,
  genders,
} from '@/constants/mockedData';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as _ from 'lodash';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';

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
  const handleFilter = (key: keyof Filter, value: Filter[typeof key]) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const [candidates, setCandiadtes] = useState<number[]>(_.range(0, 10, 1));
  const getCandidates = async () => {
    setTimeout(() => setCandiadtes(prev => [...prev, ..._.range(0, 6, 1)]), 2000);
  };

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

              {/* Candidate level */}
              <CustomCollapsible
                title={
                  <div className="flex items-baseline text-sm font-medium space-x-1">
                    <span>Level ứng viên</span>
                  </div>
                }
              >
                <div className="mt-3"></div>
                <CustomRadioGroup
                  options={candidateLevel}
                  value={filters.candidateLevel}
                  onValueChange={val => handleFilter('candidateLevel', val)}
                />
              </CustomCollapsible>
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
              next={getCandidates}
              hasMore={true}
              loader={<LoadingCircle />}
            >
              {candidates.map((item, i) => (
                <CandidateCard key={i} />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default CandidatePage;
