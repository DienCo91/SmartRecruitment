'use client';

import { GlassDialog } from '@/components/client/Dialogs/GlassDialog';
import TextField from '@/components/hookFormCustom/TextField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Router } from '@/constants';
import { setCurrentUser } from '@/lib/features/auth/authSlice';
import { setLoading } from '@/lib/features/common/commonSlice';
import { auth } from '@/lib/firebase';
import { useAppDispatch } from '@/lib/hooks';
import { AuthService } from '@/services/auth.service';
import { isEmployer } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';
import { z } from 'zod/v3';

const formSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email address' }),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        'Password must be at least 8 chars, include uppercase, lowercase, number and special char',
    }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [role, setRole] = useState<string>('Employer');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (searchParams.get('error') === 'unauthorized') {
      toast.error('Please login to access this page');
    }
  }, [searchParams]);

  const onSubmit = async (data: FormValues) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        router.push(Router.VERIFY_EMAIL);
        return;
      }

      const res = await AuthService.login();
      dispatch(setCurrentUser(res.data));
      const isRoleEmployer = isEmployer(res.data.role);

      if (isRoleEmployer) {
        return router.replace(Router.ACCOUNT_SETUP);
      }

      router.replace(Router.HOME);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Wrong email or password');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateUserRole = async () => {
    try {
      dispatch(setLoading(true));
      const res = await AuthService.oauth2(role);
      dispatch(setCurrentUser(res.data));
      router.replace(Router.HOME);
    } catch (error) {
      console.error(error);
      toast.error('Failed to login with Google');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = async () => {
    setIsOpen(false);
    try {
      dispatch(setLoading(true));
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const res = await AuthService.oauth2();

      dispatch(setCurrentUser(res.data));
      router.replace(Router.HOME);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } } | undefined;
      if (err?.response?.data?.message === 'Role is required.') {
        setIsOpen(true);
        return;
      }
      console.error(error);
      toast.error('Failed to login with Google');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="flex flex-col mb-[20px]">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-[14px] text-muted-foreground mt-[8px]">
          Don’t have account?
          <Link href={Router.AUTH.REGISTER} className="text-blue-primary hover:underline ml-[8px]">
            Create Account
          </Link>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            control={form.control}
            name="email"
            placeholder="Email address"
            type="email"
            className="placeholder:text-gray"
          />
          <TextField
            control={form.control}
            name="password"
            placeholder="Password"
            type="password"
            className="placeholder:text-gray"
          />

          <div className="w-full text-right">
            <Link
              href={Router.FORGOT_PASSWORD}
              className="text-blue-primary hover:underline text-[14px] "
            >
              Forgot password
            </Link>
          </div>

          <Button type="submit" className="w-full bg-blue-primary hover:bg-[#2787f5]">
            Sign In →
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-[12px] my-[12px]">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={handleGoogleLogin}>
          <FcGoogle />
          Sign in with Google
        </Button>
      </div>

      <GlassDialog
        size="sm"
        onClose={() => setIsOpen(false)}
        title={<p className="my-[16px]">Chọn loại người dùng trước khi bắt đầu</p>}
        open={isOpen}
        contentClassName="pb-[16px]"
      >
        <div className=" text-white">
          <Select defaultValue="Employer" value={role} onValueChange={setRole}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type:</SelectLabel>
                <SelectItem value="Employer">Employer</SelectItem>
                <SelectItem value="Candidate">Candidate</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={handleUpdateUserRole} className="w-full mt-4">
            Submit
          </Button>
        </div>
      </GlassDialog>
    </>
  );
};

export default LoginPage;
