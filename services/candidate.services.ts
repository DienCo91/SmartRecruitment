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
    const res = await http.get(`/api/candidates`, { params });
    return res.data;
  },
  async getCandidateDetail(id: number) {
    const res = await http.get(`/api/candidate-detail/${id}`);
    return res.data;
  },

  async followCompany(companyId: string) {
    const res = await http.post(`${endpointPrefix}/save-company/${companyId}`);
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
};
