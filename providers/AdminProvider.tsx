'use client';
import AdminLoginPage from '@/app/(admin)/admin/login/page';
import { ROLE_USER } from '@/constants';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import React from 'react';
import { TanstackQueryProvider } from './TanstackQueryProvider';

interface IAdminProviderProps {
  children: React.ReactNode;
}

const AdminProvider: React.FC<IAdminProviderProps> = ({ children }) => {
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);

  if (currentUser?.role === ROLE_USER.ADMIN) {
    return (
      <>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </>
    );
  }

  return <AdminLoginPage />;
};

export default AdminProvider;
