'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Link from 'next/link';
import { Router } from '@/constants';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(
        'We’ve emailed you instructions for setting your password, if an account exists. You should receive them shortly.'
      );
    } catch (error) {
      console.log(JSON.stringify(error));
      toast.error(
        'Send Email Failed, please check your email or try again later. If the problem persists, please contact us.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center">Forgot Password</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-[16px]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleForgotPassword} disabled={loading || !email}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          <Link href={Router.AUTH.LOGIN}>
            <Button className=" text-black w-full" variant={'outline'}>
              Back to Login
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForgotPassword;
