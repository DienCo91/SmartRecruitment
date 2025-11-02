'use client';

import { GlassCard } from '@/components/client/Cards/GlassCard';
import CompanyDetailContact from '@/components/client/FindCompany/CompanyDetailContact';
import CompanyDetailFollow from '@/components/client/FindCompany/CompanyDetailFollow';
import CompanyDetailOverview from '@/components/client/FindCompany/CompanyDetailOverview';
import CompanyDetailPosition from '@/components/client/FindCompany/CompanyDetailPosition';
import ContentCompanyDetail from '@/components/client/FindCompany/ContentCompanyDetail';
import { Button } from '@/components/ui/button';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { CompanyService } from '@/services/company.services';
import type { CompanyDetail } from '@/types';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { FaArrowRight, FaYoutube } from 'react-icons/fa';

const CompanyPositionDetail = (props: PageProps<'/company/[id]'>) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(state => state.common.isLoading);
  const { id } = use(props.params);
  const [company, setCompany] = useState<CompanyDetail | null>(null);

  useEffect(() => {
    const getCompanyDetail = async () => {
      try {
        dispatch(setLoading(true));
        const res = await CompanyService.getCompanyById(id);
        setCompany(res.data);
      } catch (error) {
        console.error('Error fetching company detail:', error);
        setCompany(null);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (id) getCompanyDetail();
  }, [id]);

  if (!company || loading) return;

  return (
    <div className="w-full scroll-smooth">
      <GlassCard
        className="mt-10"
        title={
          <div className="flex flex-1 items-center w-full">
            <div className="bg-red-500 h-[48px] w-[48px] flex justify-center items-center rounded-md">
              <FaYoutube className="size-[20px] text-white" />
            </div>
            <div className="ml-[16px] flex flex-1 flex-col">
              <h1 className="mb-[8px] text-[20px] font-bold">{company.name}</h1>
              <span className="opacity-[0.8] text-[14px]">{company.industryType}</span>
            </div>
          </div>
        }
        action={
          <Button
            asChild
            className="flex bg-[#c5defb] text-blue-primary hover:bg-blue-primary hover:text-white"
          >
            <Link href={'#open-position'}>
              <span className="mr-[12px]">View Open Position</span>
              <FaArrowRight />
            </Link>
          </Button>
        }
      >
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-7 space-y-[40px]">
            <ContentCompanyDetail company={company} />
          </div>
          <div className="col-span-5 space-y-5">
            <CompanyDetailOverview company={company} />
            <CompanyDetailContact company={company} />
            <CompanyDetailFollow company={company} />
          </div>
        </div>
      </GlassCard>

      <CompanyDetailPosition />
    </div>
  );
};

export default CompanyPositionDetail;
