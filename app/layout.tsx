import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/theme';
import LoadingOverlay from '@/layout/loading-global';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';

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
          {/* - block wrap because flick UI
              - use middleware.ts for Authorization */}

          {/* <ProtectedRoute> */}
          {children}
          <LoadingOverlay />
          <Toaster richColors theme="light" />
          {/* </ProtectedRoute> */}
        </StoreProvider>
      </body>
    </ThemeProvider>
  );
}
