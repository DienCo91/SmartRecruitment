'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import z from 'zod';
import TextField from '../components/TextField';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const formSchema = z
  .object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
    fullname: z.string().min(3, { message: 'Full name must be at least 3 characters' }),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm Password must be at least 6 characters' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type FormValues = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log('User registered:', userCredential.user);
      await sendEmailVerification(userCredential.user);
      router.push('/verify-email');
    } catch (error) {
      console.error('Register error:', error);
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Create account</h1>
          <div className="flex text-[14px] text-muted-foreground mt-[8px]">
            <h2>Already have account?</h2>
            <Link href={'/login'} className="ml-1 hover:underline text-blue-primary">
              Login
            </Link>
          </div>
        </div>

        <Select>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Employers" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type:</SelectLabel>
              <SelectItem value="light">Employers</SelectItem>
              <SelectItem value="dark">Company</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex space-x-[20px]">
            <TextField control={form.control} name="fullname" placeholder="Full Name" type="text" />
            <TextField control={form.control} name="username" placeholder="Username" type="text" />
          </div>
          <TextField control={form.control} name="email" placeholder="Email address" type="email" />

          <TextField
            control={form.control}
            name="password"
            placeholder="Password"
            type="password"
          />
          <TextField
            control={form.control}
            name="confirmPassword"
            placeholder="Confirm Password"
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
    </>
  );
};

export default RegisterPage;
