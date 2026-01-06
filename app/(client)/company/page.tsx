'use client';

import GlassCardBase from '@/components/client/Cards/GlassCardBase';
import FilterCompany, { FilterCompanyRef } from '@/components/client/Filters/FilterCompany';
import { FilterCompanyHeader } from '@/components/client/Filters/FilterCompanyHeader';
import CompanyOpenPosition from '@/components/client/FindCompany/CompanyOpenPosition';
import { CompanyOpenPositionSkeleton } from '@/components/client/Skeletons/CompanyOpenPositionSkeleton';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { CompanyService } from '@/services/company.services';
import { CompanyItem } from '@/types';
import { getLabelLocationByValue } from '@/utils/common';
import { range } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface TypeFilterCompanyHeader {
  search?: string;
  location?: string;
  organizationTypes?: string;
  industryTypes?: string;
  teamSizes?: string;
  yearRange?: number;
}

const Company = () => {
  const refFilterCompany = useRef<FilterCompanyRef>(null);

  const [dataCompany, setDataCompany] = useState<CompanyItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const size = 10;

  const getCompany = async (pageNum = 1, filter?: TypeFilterCompanyHeader) => {
    try {
      const res = await CompanyService.getAllCompanies({
        page: pageNum,
        size,
        keyword: filter?.search,
        location: filter?.location,
        organizationType: filter?.organizationTypes,
        industryType: filter?.industryTypes,
        teamSize: filter?.teamSizes,
        foundedIn: filter?.yearRange,
      });

      const content = res?.data || [];

      setDataCompany(prev => (pageNum === 1 ? content : [...prev, ...content]));
      setHasMore(res?.meta.hasNext);
    } catch (error) {
      console.error('getCompany error', error);
    } finally {
      setIsFirstLoad(false);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  const handleSubmit = (data: TypeFilterCompanyHeader) => {
    setPage(1);
    const dataFilterSideBar = refFilterCompany.current?.getFilters();
    getCompany(1, {
      ...data,
      location: data?.location ? getLabelLocationByValue(data?.location) : '',
      industryTypes: dataFilterSideBar?.industryType,
      organizationTypes: dataFilterSideBar?.organizationType,
      teamSizes: dataFilterSideBar?.teamSize,
      yearRange: dataFilterSideBar?.year,
    });
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    await getCompany(nextPage);
    setPage(nextPage);
  };

  const handleClearFilter = () => {
    refFilterCompany.current?.clearFilters();
  };

  return (
    <div className="relative">
      <FilterCompanyHeader handleSubmit={handleSubmit} handleClearFilter={handleClearFilter} />

      <GlassCardBase className="grid grid-cols-12 mt-[60px]">
        <div className="col-span-12 lg:col-span-3 mr-3">
          <FilterCompany ref={refFilterCompany} />
        </div>

        <div
          id="scrollableCompany"
          className="col-span-12 lg:col-span-9 space-y-[16px] h-[80vh] overflow-auto pr-2"
        >
          {!isFirstLoad && dataCompany.length === 0 && (
            <div className="flex flex-col justify-center items-center py-20 text-gray-400">
              <p className="text-lg">Không tìm thấy công ty nào phù hợp</p>
            </div>
          )}

          <InfiniteScroll
            dataLength={dataCompany.length}
            next={fetchMoreData}
            hasMore={hasMore}
            scrollableTarget="scrollableCompany"
            className="space-y-[16px]"
            loader={
              <>
                {range(0, 10).map((_, key) => (
                  <CompanyOpenPositionSkeleton key={key} />
                ))}
              </>
            }
          >
            {dataCompany.map((item, index) => (
              <CompanyOpenPosition key={index} item={item} />
            ))}
          </InfiniteScroll>
        </div>
      </GlassCardBase>
    </div>
  );
};

export default Company;
