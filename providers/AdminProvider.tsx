'use client';
import AdminLoginPage from '@/app/(admin)/admin/login/page';
import { ROLE_USER } from '@/constants';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import React from 'react';

interface IAdminProviderProps {
  children: React.ReactNode;
}

const AdminProvider: React.FC<IAdminProviderProps> = ({ children }) => {
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);

  if (currentUser?.role === ROLE_USER.ADMIN) {
    return <>{children}</>;
  }

  return <AdminLoginPage />;
};

export default AdminProvider;
