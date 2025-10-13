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
  FIND_CANDIDATE: {
    LIST: '/candidate',
  },
  FIND_COMPANY: {
    LIST: '/company',
    DETAIL: (id: string) => `/company/${id}`,
  },
  FORGOT_PASSWORD: '/forgot-password',
  BLOGS: '/blogs',
  VERIFY_EMAIL: '/verify-email',
  ACCOUNT_SETUP: '/account-setup',
  DASHBOARD: {
    OVERVIEW: '/dashboard',
    APPLIED_JOBS: '/dashboard/applied-jobs',
    FAVORITE_JOBS: '/dashboard/favorite-jobs',
    JOB_ALERT: '/dashboard/job-alert',
    POST_A_JOB: '/dashboard/post-a-job',
    MY_JOBS: '/dashboard/my-jobs',
    VIEW_APPLICATIONS: (id: string) => `/dashboard/view-applications/${id}`,
    SAVE_CANDIDATES: '/dashboard/save-candidates',
    SETTING: '/dashboard/setting',
  },
  CONGRATULATIONS: '/congratulations',
  CHANGE_PASSWORD: '/change-password',
  ACTION: '/action',
};

export const ROUTER_GUESS = [
  Router.AUTH.LOGIN,
  Router.AUTH.REGISTER,
  Router.HOME,
  Router.VERIFY_EMAIL,
  Router.FORGOT_PASSWORD,
  Router.CHANGE_PASSWORD,
  Router.ACTION,
];
export const ROUTER_CANDIDATE = [
  Router.HOME,
  Router.JOB.DETAIL,
  Router.FIND_COMPANY.DETAIL,
  Router.FIND_COMPANY.LIST,
  Router.ACCOUNT_SETUP,
  Router.DASHBOARD.OVERVIEW,
  Router.DASHBOARD.APPLIED_JOBS,
  Router.DASHBOARD.JOB_ALERT,
  Router.DASHBOARD.SETTING,
  Router.DASHBOARD.FAVORITE_JOBS,
  Router.VERIFY_EMAIL,
];

export const ROUTER_EMPLOYER = [
  Router.HOME,
  Router.JOB.DETAIL,
  Router.FIND_CANDIDATE.LIST,
  Router.ACCOUNT_SETUP,
  Router.DASHBOARD.OVERVIEW,
  Router.DASHBOARD.POST_A_JOB,
  Router.DASHBOARD.MY_JOBS,
  Router.DASHBOARD.SETTING,
  Router.DASHBOARD.SAVE_CANDIDATES,
  Router.VERIFY_EMAIL,
];
