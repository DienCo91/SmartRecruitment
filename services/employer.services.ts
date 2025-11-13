import { CreateJob, UpdateCompanyInfo } from '@/types';
import http from '.';

const endpointPrefix = '/api/employer';

export const EmployerService = {
  async createJob(data: CreateJob) {
    const res = await http.post(`${endpointPrefix}/job`, data);
    return res.data;
  },

  async updateCompanyInfo(data: UpdateCompanyInfo, logo: File, banner: File) {
    const formData = new FormData();

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    // append the files
    formData.append('logo', logo);
    formData.append('banner', banner);

    const res = await http.post(`${endpointPrefix}/company/setup-info`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data;
  },

  async getMyCompany() {
    const res = await http.get(`${endpointPrefix}/company/me`);
    return res.data;
  },

  async saveCandidate(candidateId: number) {
    const res = await http.post(`${endpointPrefix}/saved-candidates/${candidateId}`);
    return res.data;
  },

  async unSaveCandidate(candidateId: number) {
    const res = await http.delete(`${endpointPrefix}/saved-candidates/${candidateId}`);
    return res.data;
  },
  async getMyJobs(page: number, size: number, jobStatus?: string) {
    const params: Record<string, string | number> = { page, size };
    if (jobStatus && jobStatus !== 'ALL') params.jobStatus = jobStatus;

    const res = await http.get(`${endpointPrefix}/jobs`, { params });
    return res.data;
  },

  async getAllCvByJob(page: number, size: number, jobId: string) {
    const params: Record<string, string | number> = { page, size, jobId };

    const res = await http.get(`${endpointPrefix}/job/${jobId}/applications`, { params });
    return res.data;
  },
};
