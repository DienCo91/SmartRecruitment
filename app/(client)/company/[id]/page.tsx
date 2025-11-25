'use client';

import { GlassCard } from '@/components/client/Cards/GlassCard';
import CompanyDetailContact from '@/components/client/FindCompany/CompanyDetailContact';
import CompanyDetailFollow from '@/components/client/FindCompany/CompanyDetailFollow';
import CompanyDetailOverview from '@/components/client/FindCompany/CompanyDetailOverview';
import CompanyDetailPosition from '@/components/client/FindCompany/CompanyDetailPosition';
import ContentCompanyDetail from '@/components/client/FindCompany/ContentCompanyDetail';
import { CustomImage } from '@/components/client/Images/CustomImage';
import { Button } from '@/components/ui/button';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppDispatch } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { CandidateService } from '@/services/candidate.services';
import { CompanyService } from '@/services/company.services';
import type { CompanyDetail } from '@/types';
import { CircleX, Plus } from 'lucide-react';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'sonner';

const CompanyPositionDetail = (props: PageProps<'/company/[id]'>) => {
  const dispatch = useAppDispatch();
  const { id } = use(props.params);
  const [company, setCompany] = useState<CompanyDetail | null>(null);
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

  useEffect(() => {
    if (id) getCompanyDetail();
  }, [id]);

  const handleToggleFollowCompany = async () => {
    try {
      dispatch(setLoading(true));
      if (company?.isFavorite) {
        await CandidateService.unfollowCompany(id);
      } else await CandidateService.followCompany(id);

      setCompany(prev => (prev ? { ...prev, isFavorite: !company?.isFavorite } : null));
      toast.success(`${company?.isFavorite ? 'Unfollow' : 'Follow'} company successfully!`);
    } catch (error) {
      console.error('Error following company:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!company) return;

  return (
    <div className="w-full scroll-smooth relative">
      <CustomImage
        src={company.bannerUrl}
        alt="thumbnail"
        className="h-[320px] w-full absolute top-[-320px] z-10 rounded-none"
        classNameImage="object-cover"
      />
      <GlassCard
        className="mt-[320px] relative z-0 hover:translate-y-[0] rounded-t-none"
        title={
          <div className="flex flex-1 items-center w-full relative ">
            <CustomImage
              src={company.logoUrl}
              alt="thumbnail"
              className=" h-[80px] w-[80px] border-0 shadow-none"
              classNameImage="object-cover p-0"
            />
            <div className="ml-[16px] flex flex-1 flex-col">
              <h1 className="mb-[8px] text-[20px] font-bold">{company.name}</h1>
              <span className="opacity-[0.8] text-[14px]">{company.industryType}</span>
            </div>
          </div>
        }
        action={
          <div className="flex space-x-[16px]">
            <Button
              className={cn(
                'flex bg-blue-primary hover:bg-white text-white hover:text-blue-primary cursor-pointer ',
                company.isFavorite && 'bg-red-500 hover:bg-red-400 hover:text-white'
              )}
              onClick={handleToggleFollowCompany}
            >
              <>
                <span className="mr-[12px]">{company.isFavorite ? 'Unfollow' : 'Follow'}</span>
                {company.isFavorite ? <CircleX size={16} /> : <Plus size={16} />}
              </>
            </Button>
            <Button
              asChild
              className="flex bg-[#c5defb] text-blue-primary hover:bg-blue-primary hover:text-white"
            >
              <Link href={'#open-position'}>
                <span className="mr-[12px]">View Open Position</span>
                <FaArrowRight />
              </Link>
            </Button>
          </div>
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

      <CompanyDetailPosition companyId={company.id} />
    </div>
  );
};

export default CompanyPositionDetail;
