import http from '.';

const endpointPrefix = '/api';

export const JobServices = {
  async getJobs({
    page = 1,
    size = 10,
    keyword,
    location,
    categoryId,
    minSalary,
    maxSalary,
    experienceLevel,
    educationLevels,
    jobTypes,
  }: {
    page?: number;
    size?: number;
    keyword?: string;
    location?: string;
    categoryId?: string;
    minSalary?: number;
    maxSalary?: number;
    experienceLevel?: string;
    educationLevels?: string[];
    jobTypes?: string[];
  } = {}) {
    const params = new URLSearchParams();

    // pagination
    params.append('page', String(page));
    params.append('size', String(size));

    // optional filters
    if (keyword) params.append('keyword', keyword);
    if (location) params.append('location', location);
    if (categoryId) params.append('categoryId', categoryId);
    if (minSalary) params.append('minSalary', String(minSalary));
    if (maxSalary) params.append('maxSalary', String(maxSalary));
    if (experienceLevel) params.append('experienceLevel', experienceLevel);
    if (educationLevels?.length)
      educationLevels.forEach(level => params.append('educationLevels', level));
    if (jobTypes?.length) jobTypes.forEach(type => params.append('jobTypes', type));

    const res = await http.get(`${endpointPrefix}/jobs?${params.toString()}`);
    return res.data;
  },

  async getJobBySlug(slug: string) {
    const res = await http.get(`${endpointPrefix}/job/${slug}`);
    return res.data;
  },

  async getFavoriteJobIds() {
    const res = await http.get(`${endpointPrefix}/candidate/jobs/favorites`);
    return res.data;
  },
};
