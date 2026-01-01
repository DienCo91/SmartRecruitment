import { ISpecificationBlogManageParams } from '@/types/blog';
import http from '.';

const dashboardPrefix = '/api/admin/dashboard';
const candidatePrefix = '/api/admin/candidates';
const companyPrefix = '/api/admin/companies';
const blogPrefix = '/api/admin/blogs';

// === Types ===
export interface PaginationParams {
  email?: string;
  page?: number;
  size?: number;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// ===== CANDIDATE TYPES =====
export interface AdminCandidate {
  id: number;
  email: string;
  fullName: string;
  status: string;
}

export interface CandidateDetail {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  status: string;
}

// ===== COMPANY TYPES =====
export interface AdminCompany {
  id: number;
  email: string | null;
  name: string | null;
  isActive: boolean;
}

export interface CompanyDetail {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  website?: string | null;
  description?: string | null;
  isActive: boolean;
}

export const AdminService = {
  // === DASHBOARD ===
  async getDashboard() {
    const res = await http.get(`${dashboardPrefix}/stats`);
    return res.data;
  },

  // ========================
  //       CANDIDATES
  // ========================
  async getCandidates(params: PaginationParams) {
    const res = await http.get(candidatePrefix, { params });
    return res.data;
  },

  async getCandidateDetail(candidateId: number) {
    const res = await http.get(`${candidatePrefix}/${candidateId}`);
    return res.data;
  },

  async deactivateCandidate(candidateId: number) {
    const res = await http.delete(`${candidatePrefix}/${candidateId}/deactivate`);
    return res.data;
  },

  async activateCandidate(candidateId: number) {
    const res = await http.post(`${candidatePrefix}/${candidateId}/activate`);
    return res.data;
  },

  // ========================
  //         COMPANIES
  // ========================
  async getCompanies(params: PaginationParams) {
    const res = await http.get(companyPrefix, { params });
    return res.data;
  },

  async getCompanyDetail(companyId: number) {
    const res = await http.get(`${companyPrefix}/${companyId}`);
    return res.data;
  },

  async deactivateCompany(companyId: number) {
    const res = await http.delete(`${companyPrefix}/${companyId}/deactivate`);
    return res.data;
  },

  async activateCompany(companyId: number) {
    const res = await http.post(`${companyPrefix}/${companyId}/activate`);
    return res.data;
  },

  /* Admin Blog Manage */
  async getBlogs(params: ISpecificationBlogManageParams) {
    const res = await http.get(blogPrefix, { params });
    return res.data;
  },

  async deleteBlog(id: number) {
    const res = await http.delete(`${blogPrefix}/${id}`);
    return res.data;
  },

  async publishBlog(id: number) {
    const res = await http.patch(`${blogPrefix}/${id}/publish`);
    return res.data;
  },
};
