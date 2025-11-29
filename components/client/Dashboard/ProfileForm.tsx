'use client';
import { Button } from '@/components/ui/button';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v3';
import { AvatarUser } from '../Avatar/AvatarUser';
import TextField from '@/components/hookFormCustom/TextField';
import { Form } from '@/components/ui/form';
import { CandidateService } from '@/services/candidate.services';
import { toast } from 'sonner';
import { EmployerService } from '@/services/employer.services';
import { CustomImage } from '../Images/CustomImage';
import { cn } from '@/lib/utils';
import { isEmployer } from '@/utils';

const profileSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email address'),
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
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);

  const roleEmployer = isEmployer(currentUser?.role);
  console.log('roleEmployer', roleEmployer);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: currentUser?.email ?? '',
      role: currentUser?.role === 'EMPLOYER' ? 'EMPLOYER' : 'CANDIDATE',
      userName: currentUser?.userName ?? '',
      avatar: undefined,
    },
  });

  const getMyCompany = async () => {
    try {
      const res = await EmployerService.getMyCompany();
      if (res.data) {
        setPreview(res.data.logoUrl);
        setPreviewBanner(res.data.bannerUrl);
      }
    } catch (error) {
      console.log('error', error);
      toast.error('You have not created a company yet');
    } finally {
    }
  };

  const getMyProfile = async () => {
    try {
      const res = await CandidateService.getMyProfile();
      setPreview(res.data.avatarUrl);
    } catch (error) {
      console.log('e', error);
    }
  };

  useEffect(() => {
    if (currentUser?.role === 'EMPLOYER') {
      getMyCompany();
    } else {
      getMyProfile();
    }
  }, []);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      if (!data.avatar) {
        return toast.error('Vui lòng chọn ảnh trước khi lưu');
      }
      await CandidateService.uploadAvatar(data.avatar);
      toast.success('Cập nhật ảnh đại diện thành công');
      setIsEditing(false);
    } catch (error) {
      console.error('Upload avatar error:', error);
      toast.error('Cập nhật ảnh thất bại');
    }
  };

  const onChangeAvar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('avatar', file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  console.log('previewBanner', previewBanner);

  return (
    <Form {...form}>
      <div className="flex items-center gap-4 justify-center flex-col">
        <div className={cn('relative', roleEmployer ? ' w-full h-[200px]' : '')}>
          {roleEmployer && (
            <CustomImage
              key={previewBanner}
              src={previewBanner ?? ''}
              alt="avatar"
              className="w-full h-[200px]"
              classNameImage="object-cover"
            />
          )}
          <div
            className={cn(
              'w-30 h-30',
              roleEmployer ? 'absolute right-1/2 translate-x-1/2 bottom-[-50px]' : 'relative'
            )}
          >
            <AvatarUser
              className="w-30 h-30 rounded-full border"
              src={preview ?? ''}
              classNameImage="object-cover"
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
                  disabled={form.formState.isSubmitting}
                  {...form.register('avatar' as const)}
                  onChange={onChangeAvar}
                />
              </label>
            )}
          </div>
        </div>

        {roleEmployer && <div className="mt-[50px]"></div>}

        {currentUser?.role !== 'EMPLOYER' && (
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <Button type="button" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {form.formState.isSubmitting ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  disabled={form.formState.isSubmitting}
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
        )}
      </div>

      <TextField label="Email" disabled placeholder="Email" control={form.control} name="email" />

      <TextField
        label="Username"
        disabled
        placeholder="Tên đăng nhập"
        control={form.control}
        name="userName"
      />
      <TextField label="Role" disabled placeholder="Role" control={form.control} name="role" />
    </Form>
  );
};

export default ProfileForm;
