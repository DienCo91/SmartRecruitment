'use client';

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
import { setCurrentUser } from '@/lib/features/auth/authSlice';
import { setLoading } from '@/lib/features/common/commonSlice';
import { auth } from '@/lib/firebase';
import { useAppDispatch } from '@/lib/hooks';
import { AuthService } from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithCustomToken,
  signInWithPopup,
} from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';
import z from 'zod/v3';
import TextField from '../../../components/hookFormCustom/TextField';
import { Router } from '@/constants';
import { GlassDialog } from '@/components/client/Dialogs/GlassDialog';
import { ValidatorZod } from '@/helpers/zod/validator';

const formSchema = z
  .object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
    // fullname: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email address' }),
    password: ValidatorZod.password,
    confirmPassword: ValidatorZod.password,
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type FormValues = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [role, setRole] = useState('Candidate');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // fullname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    dispatch(setLoading(true));
    try {
      const res = await AuthService.register({
        // fullName: data.fullname,
        userName: data.username,
        email: data.email,
        role: role.toUpperCase(),
        password: data.password,
      });

      await signInWithCustomToken(auth, res.data.firebaseCustomToken);

      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        router.push(Router.VERIFY_EMAIL);
      }
    } catch (error) {
      console.error('Register error:', error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Error');
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
      toast.error('Failed to login with Google ');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-[20px]">
        <div>
          <h1 className="text-2xl font-semibold">Create account</h1>
          <div className="flex text-[14px] text-muted-foreground mt-[8px] flex-wrap">
            <h2>Already have account?</h2>
            <Link href={Router.AUTH.LOGIN} className="ml-1 hover:underline text-blue-primary">
              Login
            </Link>
          </div>
        </div>

        <Select defaultValue="Candidate" value={role} onValueChange={setRole}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Candidate" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type:</SelectLabel>
              <SelectItem value="Employer">Employer</SelectItem>
              <SelectItem value="Candidate">Candidate</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[16px]">
          <div className="flex space-x-[20px]">
            {/* <TextField
              className="placeholder:text-gray"
              control={form.control}
              name="fullname"
              placeholder="Full Name"
              type="text"
            /> */}
            <TextField
              className="placeholder:text-gray"
              control={form.control}
              name="username"
              placeholder="Username"
              type="text"
            />
          </div>
          <TextField
            className="placeholder:text-gray"
            control={form.control}
            name="email"
            placeholder="Email address"
            type="email"
          />

          <TextField
            control={form.control}
            name="password"
            placeholder="Password"
            type="password"
            className="placeholder:text-gray"
          />
          <TextField
            control={form.control}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="placeholder:text-gray"
            type="password"
          />
          <Button type="submit" className="w-full bg-blue-primary hover:bg-[#2787f5] mt-[32px]">
            Create Account →
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

export default RegisterPage;
