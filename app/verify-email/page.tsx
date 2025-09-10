'use client';

import { useEffect, useState } from 'react';
import { FcBriefcase } from 'react-icons/fc';
import { auth } from '@/lib/firebase';
import { sendEmailVerification } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEmailVerification } from '@/hooks';

const VerifyEmail = () => {
  const router = useRouter();
  const isVerify = useEmailVerification();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isVerify) {
      router.replace('/login');
      toast.success('Email verified successfully');
    }
  }, [isVerify]);

  const handleResend = async () => {
    if (!auth.currentUser) return;
    try {
      setLoading(true);
      await sendEmailVerification(auth.currentUser);
      setMessage('We’ve resent the verification email. Please check your inbox.');
    } catch (error) {
      console.log('🚀 ~ handleResend ~ error:', error);
      setMessage('Failed to resend verification email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <FcBriefcase className="mr-2 w-10 h-10" />
        <h1 className="text-2xl font-semibold">MyJob</h1>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Email Verification</h2>
          <p className="text-gray-600 mb-4">
            We’ve sent a verification link to{' '}
            <span className="font-medium">{auth.currentUser?.email}</span> to verify your email
            address and activate your account.
          </p>

          <div className="text-sm">
            <span className="text-gray-500">Didn’t receive the email?</span>
            <Button
              variant="link"
              onClick={handleResend}
              disabled={loading}
              className="ml-1 text-blue-600 hover:underline p-0 h-auto"
            >
              {loading ? 'Resending...' : 'Resend'}
            </Button>
          </div>

          {message && <p className="mt-3 text-sm text-blue-600">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
