import {
  Bell,
  Bookmark,
  BriefcaseBusiness,
  CirclePlus,
  Heart,
  Layers,
  LayersIcon,
  Settings,
} from 'lucide-react';
import { Router } from './router';

export const CANDIDATE_DASHBOARD = {
  title: 'Candidate Dashboard',
  items: [
    {
      title: 'Overview',
      link: Router.DASHBOARD.OVERVIEW,
      icon: <Layers />,
    },
    {
      title: 'Applied Jobs',
      link: Router.DASHBOARD.APPLIED_JOBS,
      icon: <BriefcaseBusiness />,
    },
    {
      title: 'Favorite Jobs',
      link: Router.DASHBOARD.FAVORITE_JOBS,
      icon: <Heart />,
    },
    {
      title: 'Job Alert',
      link: Router.DASHBOARD.JOB_ALERT,
      icon: <Bell />,
    },
    {
      title: 'Setting',
      link: Router.DASHBOARD.SETTING,
      icon: <Settings />,
    },
  ],
};

export const EMPLOYER_DASHBOARD = {
  title: 'Nhà tuyển dụng',
  items: [
    {
      title: 'Tổng quan',
      link: Router.DASHBOARD.OVERVIEW,
      icon: <LayersIcon size={22} />,
    },
    {
      title: 'Đăng tin tuyển dụng',
      link: Router.DASHBOARD.POST_A_JOB,
      icon: <CirclePlus />,
    },
    {
      title: 'Job đã đăng tải',
      link: Router.DASHBOARD.MY_JOBS,
      icon: <Bell />,
    },
    {
      title: 'Ứng viên đã lưu',
      link: Router.DASHBOARD.SAVE_CANDIDATES,
      icon: <Bookmark />,
    },
    {
      title: 'Cài đặt',
      link: Router.DASHBOARD.SETTING,
      icon: <Settings />,
    },
  ],
};
