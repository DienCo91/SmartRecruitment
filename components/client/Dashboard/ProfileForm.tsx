'use client';
import { Button } from '@/components/ui/button';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v3';
import { AvatarUser } from '../Avatar/AvatarUser';
import TextField from '@/components/hookFormCustom/TextField';
import { Form } from '@/components/ui/form';

const profileSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email address'),
  // fullName: z.string().min(2, 'Họ tên ít nhất 2 ký tự'),
  userName: z.string().min(3, 'Username ít nhất 3 ký tự'),
  role: z.enum(['CANDIDATE', 'EMPLOYER']),
  avatar: z
    .instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, 'Max size is 5MB.')
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png formats are supported'
    ),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileForm: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: currentUser?.email ?? '',
      // fullName: currentUser?.fullName ?? '',
      role: currentUser?.role === 'EMPLOYER' ? 'EMPLOYER' : 'CANDIDATE',
      userName: currentUser?.userName ?? '',
      avatar: undefined,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    console.log(data);
  };

  const onChangeAvar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('avatar', file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="flex items-center gap-4 justify-center flex-col">
          <div className="relative w-24 h-24">
            <AvatarUser
              className="w-24 h-24 rounded-full object-cover border"
              src={preview ?? ''}
            />

            {isEditing && (
              <label
                className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow flex items-center justify-center"
                title="Upload avatar"
              >
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...form.register('avatar' as const)}
                  onChange={onChangeAvar}
                />
              </label>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <Button type="button" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            ) : (
              <>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setPreview(null);
                    setIsEditing(false);
                  }}
                  className="text-[#00000071]"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>

        <TextField label="Email" disabled placeholder="Email" control={form.control} name="email" />

        {/* <TextField
          label="Full Name"
          disabled={!isEditing}
          placeholder="Họ và tên"
          control={form.control}
          name="fullName"
        /> */}

        <TextField
          label="Username"
          disabled={!isEditing}
          placeholder="Tên đăng nhập"
          control={form.control}
          name="userName"
        />
        <TextField label="Role" disabled placeholder="Role" control={form.control} name="role" />
      </form>
    </Form>
  );
};

export default ProfileForm;
