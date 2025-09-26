import { IRegister } from '@/types';
import http from '.';

const endpointPrefix = '/api/auth';

export const AuthService = {
  async login() {
    const res = await http.post(`${endpointPrefix}/login`);
    return res.data;
  },
  async register(data: IRegister) {
    const res = await http.post(`${endpointPrefix}/register`, data, { skipAuth: true });
    return res.data;
  },

  async oauth2() {
    const res = await http.post(`${endpointPrefix}/callback`);
    return res.data;
  },
};
