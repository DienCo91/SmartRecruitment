import { Router } from '@/constants';
import { setCurrentUser } from '@/lib/features/auth/authSlice';
import { auth, authReady } from '@/lib/firebase';
import { store } from '@/lib/store';
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
    await authReady;

    const user = auth.currentUser;
    if (user && !config.skipAuth) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
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
      console.log('=====error.response======', error.response);
      originalRequest._retry = true;
      try {
        const token = await auth.currentUser?.getIdToken(true); // force refresh
        if (token) {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return http(originalRequest);
        }
        throw new Error('Refresh token failed');
      } catch (err) {
        console.error('Refresh token failed:', err);
        store.dispatch(setCurrentUser(null));
        // if (typeof window !== 'undefined') {
        window.location.href = Router.AUTH.LOGIN;
        // }
      }
    }

    return Promise.reject(error);
  }
);

export default http;
