'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChangePassword from '../change-password/page';
import { useEffect, useState } from 'react';
import { applyActionCode } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';
import { Router } from '@/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FirebaseActionPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');

  if (!mode || !oobCode) {
    return (
      <Card className="p-10 text-center">
        <CardHeader>
          <CardTitle>Invalid action link</CardTitle>
          <Button>
            <Link href={Router.AUTH.LOGIN}>Return Login</Link>
          </Button>
        </CardHeader>
      </Card>
    );
  }

  switch (mode) {
    case 'resetPassword':
      return <ChangePassword oobCode={oobCode} />;
    case 'verifyEmail':
      return <VerifyEmail oobCode={oobCode} />;
    default:
      return (
        <Card className="p-10 text-center">
          <CardHeader>
            <CardTitle>Unsupported action type</CardTitle>
            <Button>
              <Link href={Router.AUTH.LOGIN}>Return Login</Link>
            </Button>
          </CardHeader>
        </Card>
      );
  }
}

interface VerifyEmailPageProps {
  oobCode: string;
}

const VerifyEmail = ({ oobCode }: VerifyEmailPageProps) => {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const verify = async () => {
    try {
      await applyActionCode(auth, oobCode);
      setStatus('success');
      toast.success('Your email has been verified!');
    } catch (error) {
      console.error('Email verification failed:', error);
      setStatus('error');
      toast.error('Verification link is invalid or expired.');
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <Card className="max-w-md mx-auto mt-20 text-center">
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
      </CardHeader>
      <CardContent>
        {status === 'loading' && <p>Verifying your email, please wait...</p>}
        {status === 'success' && (
          <>
            <p className="text-green-600 mb-4">Email verified successfully!</p>
            <Button onClick={() => router.replace(Router.AUTH.LOGIN)}>Go to Login</Button>
          </>
        )}
        {status === 'error' && (
          <>
            <p className="text-red-600 mb-4">Invalid or expired verification link.</p>
            <Button onClick={() => router.replace(Router.AUTH.LOGIN)}>Go to Login</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
