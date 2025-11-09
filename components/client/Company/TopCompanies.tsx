'use client';

import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { CompanyService } from '@/services/company.services';
import { Pagination, TopCompany } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { GlassCard } from '../Cards/GlassCard';
import { CustomPagination } from '../Paginations/CustomPagination';
import { CompanyCard } from './CompanyCard';
import { useAppSelector } from '@/lib/hooks';

export function TopCompanies() {
  const [loading, setLoading] = useState<boolean>(false);
  const [topCompanies, setTopCompanies] = useState<TopCompany[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 6,
  });
  const filter = useAppSelector(state => state.filter);

  const fetchAllCompany = useCallback(async () => {
    try {
      setLoading(true);
      const { data: companies, meta } = await CompanyService.getAllCompanies({
        page: pagination.page,
        size: pagination.limit,
        keyword: filter.keyword,
        location: filter.location,
      });

      setTopCompanies(companies);
      setPagination(meta);
    } catch (e) {
      console.error(e);
      toast.error('Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  }, [filter.keyword, filter.location, pagination.limit, pagination.page]);

  useEffect(() => {
    fetchAllCompany();
  }, [fetchAllCompany]);

  return (
    <GlassCard
      icon="🕋"
      title="Top công ty"
      className="mt-5"
      footer={
        !loading && (
          <>
            <CustomPagination
              className="w-full"
              curPage={pagination.page ?? 1}
              totalPage={pagination.totalPages ?? 6}
              onPageChange={page => {
                setPagination(prev => ({ ...prev, current: page }));
              }}
            />
          </>
        )
      }
    >
      {loading ? (
        <LoadingCircle />
      ) : Boolean(topCompanies.length) ? (
        <div className="grid grid-cols-2 gap-3">
          {topCompanies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <p>Không có top công ty nào.</p>
      )}
    </GlassCard>
  );
}
