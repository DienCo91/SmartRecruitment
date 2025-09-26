import { auth } from '@/lib/firebase';
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

//handle request
http.interceptors.request.use(
  async config => {
    if (!config.skipAuth) {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

//handle response
http.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    //refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await auth.currentUser?.getIdToken(true); // force refresh
        if (token) {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return http(originalRequest);
        }
      } catch (err) {
        console.error('Refresh token failed:', err);
      }
    }

    return Promise.reject(error);
  }
);

export default http;
