'use client';

import TextField from '@/components/hookFormCustom/TextField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Router } from '@/constants';
import { ValidatorZod } from '@/helpers/zod/validator';
import { setLoading } from '@/lib/features/common/commonSlice';
import { auth } from '@/lib/firebase';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod/v3';
import { useRouter } from 'next/navigation';

const formSchema = z
  .object({
    newPassword: ValidatorZod.password,
    confirmPassword: ValidatorZod.password,
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type FormValues = z.infer<typeof formSchema>;

interface ChangePasswordProps {
  oobCode: string;
}

const ChangePassword = ({ oobCode }: ChangePasswordProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoading = useAppSelector((state: RootState) => state.common.isLoading);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!oobCode) return;

    verifyPasswordResetCode(auth, oobCode)
      .then(() => {
        // Code is valid, do nothing
      })
      .catch(() => {
        toast.error('Invalid or expired reset link.');
        router.push('/');
      });
  }, [oobCode, router]);

  const onSubmit = async (data: FormValues) => {
    if (!oobCode) {
      toast.error('Missing reset code.');
      return;
    }

    try {
      dispatch(setLoading(true));
      await confirmPasswordReset(auth, oobCode, data.newPassword);

      toast.success('Password updated successfully!');
      form.reset();
      router.replace(Router.AUTH.LOGIN);
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center">Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[16px]">
            <TextField
              className="placeholder:text-gray"
              control={form.control}
              name="newPassword"
              placeholder="New password"
              type="password"
            />
            <TextField
              className="placeholder:text-gray"
              control={form.control}
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
            />

            <Button
              type="submit"
              className="w-full bg-blue-primary hover:bg-[#2787f5] mt-[32px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Updating...</span>
              ) : (
                <>
                  <span className="mr-[4px]">Change Password</span>
                  <ArrowRight />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChangePassword;
