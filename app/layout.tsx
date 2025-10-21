import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import StoreProvider from './StoreProvider';
import LoadingOverlay from '@/layout/loading-global';
import ProtectedRoute from '@/layout/ProtectedRoute';
import ThemeWrapper from '@/layout/theme-wrapper';
import { ThemeProvider } from '@/contexts/theme';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hệ thống tuyển dụng thông minh',
  description: 'Đồ án tốt nghiệp',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <ProtectedRoute>
            {children}
            <LoadingOverlay />
            <Toaster richColors theme="light" />
          </ProtectedRoute>
        </StoreProvider>
      </body>
    </ThemeProvider>
  );
}
