export const Router = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  USER: {
    PROFILE: (username: string) => `/profile/${username}`,
    SAVED_JOB: '/saved-job',
    APPLIED_JOB: '/applied-job',
  },
  HOME: '/',
  JOB: {
    DETAIL: (slug: string) => `/jobs/${slug}`,
  },
  FIND_COMPANY: {
    DETAIL: (id: string) => `/company/${id}`,
  },
  ACCOUNT_SETUP: '/account-setup',
  DASHBOARD: {
    OVERVIEW: '/dashboard',
    APPLIED_JOBS: '/dashboard/applied-jobs',
    FAVORITE_JOBS: '/dashboard/favorite-jobs',
    JOB_ALERT: '/dashboard/job-alert',
    POST_A_JOB: '/dashboard/post-a-job',
    MY_JOBS: '/dashboard/my-jobs',
    SAVE_CANDIDATES: '/dashboard/save-candidates',
    SETTING: '/dashboard/setting',
  },
};
