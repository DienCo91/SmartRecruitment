'use client';
import TextField from '@/components/HookFormCustom/TextField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ValidatorZod } from '@/helpers/zod/validator';
import { useLogout } from '@/hooks/useLogout';
import { setLoading } from '@/lib/features/common/commonSlice';
import { auth } from '@/lib/firebase';
import { useAppDispatch } from '@/lib/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod/v3';

const accountSettingSchema = z
  .object({
    currentPassword: ValidatorZod.password,
    newPassword: ValidatorZod.password,
    confirmPassword: ValidatorZod.password,
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type FormValues = z.infer<typeof accountSettingSchema>;

const DashboardChangePassword = () => {
  const logout = useLogout();
  const dispatch = useAppDispatch();
  const form = useForm<FormValues>({
    resolver: zodResolver(accountSettingSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleSubmitForm = async (data: FormValues) => {
    dispatch(setLoading(true));
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        throw new Error('User not logged in');
      }

      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, data.currentPassword);

      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, data.newPassword);

      toast.success('Updated password successfully');
      logout();
    } catch (error) {
      console.log('Error updating password:', error);
      toast.error('Error updating password');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className="mt-[32px]">
        <h1 className="mb-[32px] font-bold">Change Password</h1>
        <div className="grid grid-cols-1 gap-[16px]">
          <TextField
            control={form.control}
            name="currentPassword"
            label="Current Password"
            type="password"
          />
          <TextField
            control={form.control}
            name="newPassword"
            label="New Password"
            type="password"
          />
          <TextField
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
          />
        </div>
        <Button type="submit" size={'lg'} className="mt-[32px]">
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default DashboardChangePassword;
