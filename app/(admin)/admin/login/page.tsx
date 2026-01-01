'use client';

import TextField from '@/components/hookFormCustom/TextField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ValidatorZod } from '@/helpers/zod/validator';
import { setCurrentUser } from '@/lib/features/auth/authSlice';
import { setLoading } from '@/lib/features/common/commonSlice';
import { auth } from '@/lib/firebase';
import { useAppDispatch } from '@/lib/hooks';
import { AuthService } from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod/v3';

const formSchema = z.object({
  email: ValidatorZod.email,
  password: z.string().nonempty('Password is required'),
});

type FormValues = z.infer<typeof formSchema>;

const AdminLoginPage = () => {
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
      await signInWithEmailAndPassword(auth, data.email, data.password);

      const res = await AuthService.login();
      console.log(res.data);
      dispatch(setCurrentUser(res.data));
      router.replace('/admin');
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Wrong email or password');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl shadow-xl p-8 border border-white/10">
        <h1 className="text-3xl font-bold text-white text-center">Admin</h1>
        <p className="text-gray-400 mt-2 text-center">Sign in to manage the system</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <TextField
              control={form.control}
              name="email"
              placeholder="Admin Email"
              type="email"
              className="placeholder:text-gray-400 bg-[#0f172a] text-white"
            />
            <TextField
              control={form.control}
              name="password"
              placeholder="Password"
              type="password"
              className="placeholder:text-gray-400 bg-[#0f172a] text-white"
            />

            <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit">
              Sign In
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-400 text-sm hover:underline hover:text-white">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
