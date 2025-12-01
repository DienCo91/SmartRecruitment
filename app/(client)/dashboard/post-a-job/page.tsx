'use client';
import DashboardFormPostJob from '@/components/client/Dashboard/DashboardFormPostJob';
import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';

const PostAJob = () => {
  return (
    <div>
      <DashboardHeader title="Đăng tin tuyển dụng" />
      <DashboardFormPostJob />
    </div>
  );
};

export default PostAJob;
