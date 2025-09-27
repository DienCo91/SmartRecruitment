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
};
