import http from '.';

const dashboardPrefix = '/api/admin/dashboard';
const candidatePrefix = '/api/admin/candidates';

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

export const AdminService = {
  // === DASHBOARD ===
  async getDashboard() {
    const res = await http.get(`${dashboardPrefix}/stats`);
    return res.data;
  },

  // === GET CANDIDATES LIST ===
  async getCandidates(params: PaginationParams) {
    const res = await http.get(candidatePrefix, { params });
    return res.data;
  },

  // === GET CANDIDATE DETAIL ===
  async getCandidateDetail(candidateId: number) {
    const res = await http.get(`${candidatePrefix}/${candidateId}`);
    return res.data;
  },

  // === DEACTIVATE CANDIDATE ===
  async deactivateCandidate(candidateId: number) {
    const res = await http.delete(`${candidatePrefix}/${candidateId}/deactivate`);
    return res.data;
  },

  // === ACTIVATE CANDIDATE ===
  async activateCandidate(candidateId: number) {
    const res = await http.post(`${candidatePrefix}/${candidateId}/activate`);
    return res.data;
  },
};
