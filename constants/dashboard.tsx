import { GoStack } from 'react-icons/go';
import { Router } from './router';
import {
  Bell,
  Bookmark,
  BriefcaseBusiness,
  CirclePlus,
  Heart,
  Layers,
  Settings,
} from 'lucide-react';

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
  title: 'Employer Dashboard',
  items: [
    {
      title: 'Overview',
      link: Router.DASHBOARD.OVERVIEW,
      icon: <GoStack />,
    },
    {
      title: 'Post A Job',
      link: Router.DASHBOARD.POST_A_JOB,
      icon: <CirclePlus />,
    },
    {
      title: 'My Jobs',
      link: Router.DASHBOARD.MY_JOBS,
      icon: <Bell />,
    },
    {
      title: 'Save Candidates',
      link: Router.DASHBOARD.SAVE_CANDIDATES,
      icon: <Bookmark />,
    },
    {
      title: 'Setting',
      link: Router.DASHBOARD.SETTING,
      icon: <Settings />,
    },
  ],
};
