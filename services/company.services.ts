import http from '.';

const endpointPrefix = '/api';

export const CompanyService = {
  async getAllCompanies(params?: {
    keyword?: string;
    location?: string;
    organizationType?: string;
    industryType?: string;
    teamSize?: string;
    foundedIn?: number;
    page?: number;
    size?: number;
  }) {
    const res = await http.get(`${endpointPrefix}/companies`, { params });
    return res.data;
  },

  async getCompanyById(companyId: string) {
    const res = await http.get(`${endpointPrefix}/company/${companyId}`);
    return res.data;
  },
};
