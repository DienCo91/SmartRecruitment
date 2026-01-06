'use client';

import DashboardChangePassword from '@/components/client/Dashboard/DashboardChangePassword';
import ProfileForm from '@/components/client/Dashboard/ProfileForm';
import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { CandidateService } from '@/services/candidate.services';
import { EmployerService } from '@/services/employer.services';
import { isEmployer, isLoginWithOAuth2 } from '@/utils';
import { getStatCandidate, getStatEmployer } from '@/utils/common';
import { useEffect, useState } from 'react';

interface DataStat {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const DashBoardOverView = () => {
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);
  const canChangePassword = !isLoginWithOAuth2();

  const [dataStat, setDataStat] = useState<DataStat[]>([]);

  const getDataStat = async () => {
    try {
      let data: DataStat[] = [];

      if (isEmployer(currentUser?.role)) {
        const res = await EmployerService.getEmployerStatistic();
        data = getStatEmployer({
          totalFollow: res.data.numberOfFollowedCandidates || 0,
          totalJob: res.data.numberOfOpenJobs || 0,
        });
      } else {
        const res = await CandidateService.getCandidateStat();
        data = getStatCandidate({
          totalApplied: res.data.numberOfAppliedJobs || 0,
          totalFavJob: res.data.numberOfFavoriteJobs || 0,
        });
      }
      setDataStat(data as DataStat[]);
    } catch (e) {
      console.log('e', e);
    } finally {
    }
  };

  useEffect(() => {
    getDataStat();
  }, []);

  if (!currentUser) return null;

  return (
    <>
      <h1 className="font-bold text-[18px] text-white">Xin Chào {currentUser?.userName} !</h1>
      <span className="text-white opacity-60 text-[14px]">
        Đây là các hoạt động hàng ngày và thông báo công việc của bạn
      </span>

      <div className="grid grid-cols-3 gap-4 my-[24px]">
        {dataStat.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap p-[24px] rounded-lg justify-between items-center text-black"
            style={{ backgroundColor: item.color }}
          >
            <div>
              <h1 className="text-[20px] font-bold">{item.value}</h1>
              <span className="font-[400] text-[16px] ">{item.title}</span>
            </div>
            <div className="bg-white p-[14px] rounded-md shadow-sm">{item.icon}</div>
          </div>
        ))}
      </div>
      <ProfileForm />
      {canChangePassword && isEmployer(currentUser.role) && (
        <>
          <Separator className="my-8 bg-gray-500" />
          <DashboardChangePassword />
        </>
      )}
    </>
  );
};

export default DashBoardOverView;
