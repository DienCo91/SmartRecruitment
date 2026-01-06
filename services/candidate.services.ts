import {
  UpdateBasicInformation,
  UpdateContactInfo,
  UpdateDetailInfo,
  UpdateSocialLinks,
} from '@/types';
import http from '.';

const endpointPrefix = '/api/candidate';

export const CandidateService = {
  async updateBasicInfo(data: UpdateBasicInformation) {
    const res = await http.patch(`${endpointPrefix}/profile/basic-info`, data);
    return res.data;
  },
  async updateDetailInfo(data: UpdateDetailInfo) {
    const res = await http.patch(`${endpointPrefix}/profile/info-detail`, data);
    return res.data;
  },

  async updateSocialLinks(data: UpdateSocialLinks) {
    const res = await http.patch(`${endpointPrefix}/profile/social-links`, data.socialLinks);
    return res.data;
  },

  async updateContactInfo(data: UpdateContactInfo) {
    const res = await http.patch(`${endpointPrefix}/profile/contact-info`, data);
    return res.data;
  },
  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);

    const res = await http.post(`${endpointPrefix}/profile/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  async getAllCandidate(params?: Record<string, string | number>) {
    const res = await http.get(`/api/employer/candidates`, { params });
    return res.data;
  },
  async getCandidateDetail(id: number) {
    const res = await http.get(`/api/employer/candidate-detail/${id}`);
    return res.data;
  },

  async followCompany(companyId: string) {
    const res = await http.post(`${endpointPrefix}/save-company/${companyId}`);
    return res.data;
  },
  async unfollowCompany(companyId: string) {
    const res = await http.delete(`${endpointPrefix}/save-company/${companyId}`);
    return res.data;
  },

  async followJob(jobId: string) {
    const res = await http.post(`${endpointPrefix}/jobs/follow/${jobId}`);
    return res.data;
  },

  async unfollowJob(jobId: string) {
    const res = await http.delete(`${endpointPrefix}/jobs/unfollow/${jobId}`);
    return res.data;
  },

  async applyJob(payload: { jobId: string; resumeId: string; coverLetter: string }) {
    const res = await http.post(`${endpointPrefix}/jobs/apply`, payload);
    return res.data;
  },

  async getJobIdsFavorite() {
    const res = await http.get(`${endpointPrefix}/jobs/favorites`);
    return res.data;
  },

  async getApplyJob(page = 1, size = 10, keyword?: string, status?: string) {
    const params: Record<string, string | number> = { page, size };
    if (keyword) params.keyword = keyword;
    if (status) params.status = status;

    const res = await http.get(`${endpointPrefix}/jobs/applied-jobs`, { params });
    return res.data;
  },

  async getFavoriteJob(page = 1, size = 10, keyword?: string, status?: string) {
    const params: Record<string, string | number> = { page, size };
    if (keyword) params.keyword = keyword;
    if (status) params.status = status;

    const res = await http.get(`${endpointPrefix}/jobs/favorite-jobs`, { params });
    return res.data;
  },

  async getMyProfile() {
    const res = await http.get(`${endpointPrefix}/profile/me`);
    return res.data;
  },

  async getCandidateStat({ id }: { id: string }) {
    const res = await http.get(`${endpointPrefix}/profile/${id}/stat`);
    return res.data;
  },
};
