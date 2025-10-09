'use client';

import TextField from '@/components/hookFormCustom/TextField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';

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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        router.push('/verify-email');
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
      console.error('Login error:', JSON.stringify(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      dispatch(setLoading(true));
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const res = await AuthService.oauth2();
      dispatch(setCurrentUser(res.data));
      router.replace(Router.HOME);
    } catch (error) {
      console.error(error);
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
          <Link href="/register" className="text-blue-primary hover:underline ml-[8px]">
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
              href={'/forgot-password'}
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
    </>
  );
};

export default LoginPage;
