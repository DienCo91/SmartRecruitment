'use client';

import DashboardChangePassword from '@/components/client/Dashboard/DashboardChangePassword';
import ProfileForm from '@/components/client/Dashboard/ProfileForm';
import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { isEmployer, isLoginWithOAuth2 } from '@/utils';
import { Bell, BellRing, Bookmark } from 'lucide-react';

const INFO_CARD_CANDIDATE = [
  {
    title: 'Applied Jobs',
    value: 598,
    icon: <Bell className="text-blue-600" />,
    color: '#E7F0FA',
  },
  {
    title: 'Favorite jobs',
    value: 238,
    icon: <Bookmark className="text-orange-500" />,
    color: '#FFF6E6',
  },
  {
    title: 'Job Alerts',
    value: 45,
    icon: <BellRing className="text-green-600" />,
    color: '#E7F6EA',
  },
];

const INFO_CARD_EMPLOYER = [
  {
    title: 'Open Jobs',
    value: 598,
    icon: <Bell className="text-blue-600" />,
    color: '#E7F0FA',
  },
  {
    title: 'Saved Candidates',
    value: 238,
    icon: <Bookmark className="text-orange-500" />,
    color: '#FFF6E6',
  },
];

const DashBoardOverView = () => {
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);
  const canChangePassword = !isLoginWithOAuth2();

  if (!currentUser) return null;

  const data = isEmployer(currentUser.role) ? INFO_CARD_EMPLOYER : INFO_CARD_CANDIDATE;

  return (
    <>
      <h1 className="font-bold text-[18px] text-white">Xin Chào {currentUser?.userName} !</h1>
      <span className="text-white opacity-60 text-[14px]">
        Đây là các hoạt động hàng ngày và cảnh báo công việc của bạn
      </span>

      <div className="grid grid-cols-3 gap-4 my-[24px]">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex p-[24px] rounded-lg justify-between items-center text-black"
            style={{ backgroundColor: item.color }}
          >
            <div>
              <h1 className="text-[24px] font-bold">{item.value}</h1>
              <span className="font-[400] text-[18px] ">{item.title}</span>
            </div>
            <div className="bg-white p-[16px] rounded-md shadow-sm">{item.icon}</div>
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
