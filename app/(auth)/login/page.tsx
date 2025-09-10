'use client';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';
import TextField from '../components/TextField';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      console.log('User', user);

      if (!user.emailVerified) {
        router.push('/verify-email');
        return;
      }

      toast.success('Login successfully');

      // TODO: handle user info in database
    } catch (error) {
      console.error('Login error:', JSON.stringify(error));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('User Info:', result.user);
      toast.success('Login successfully');
      // TODO: handle user info in database
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col">
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
          <TextField control={form.control} name="email" placeholder="Email address" type="email" />
          <TextField
            control={form.control}
            name="password"
            placeholder="Password"
            type="password"
          />

          <div className="w-full text-right">
            <Link href="/register" className="text-blue-primary hover:underline text-[14px]">
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
