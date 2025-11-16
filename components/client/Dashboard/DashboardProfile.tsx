'use client';
import { CountrySelectField } from '@/components/hookFormCustom/CountrySelectField';
import { DatePickerField } from '@/components/hookFormCustom/DatePickerField';
import { SelectField } from '@/components/hookFormCustom/SelectField';
import QuillCustom, { QuillCustomRef } from '@/components/quill';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppDispatch } from '@/lib/hooks';
import { CandidateService } from '@/services/candidate.services';
import { ICandidateDetail } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod/v3';

const formSchema = z.object({
  nationality: z.string().nonempty('Nationality is required'),
  dateOfBirth: z.date({ required_error: 'Date of Birth is required' }),
  gender: z.string().nonempty('Gender is required'),
});

type FormValues = z.infer<typeof formSchema>;

const DashboardProfile = ({ data }: { data: ICandidateDetail | null }) => {
  const dispatch = useAppDispatch();
  const editorRef = useRef<QuillCustomRef>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nationality: data?.nationality || '',
      gender: data?.gender || '',
      dateOfBirth: data?.dateOfBirth ? new Date(data?.dateOfBirth) : new Date(),
    },
  });

  useEffect(() => {
    if (data?.biography) {
      editorRef.current?.setValue(data?.biography);
    }
  }, [data?.biography]);

  const onSubmit = async (data: FormValues) => {
    try {
      dispatch(setLoading(true));
      const res = await CandidateService.updateDetailInfo({
        biography: editorRef.current?.getValue() || '',
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        nationality: data.nationality.toUpperCase(),
      });
      toast.success('Update detail info successfully');
      console.log('res', res);
    } catch (error) {
      toast.error('Update detail info failed');
      console.log(error);
    } finally {
      dispatch(setLoading(false));

      console.log('done');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-[32px]">
        <div className="grid grid-cols-2 gap-[16px]">
          <CountrySelectField
            name="nationality"
            label="Quốc tịch"
            control={form.control}
            error={form.formState.errors.nationality?.message}
            className="w-full"
            value={form.getValues('nationality')}
          />

          <DatePickerField
            name="dateOfBirth"
            label="Sinh nhật"
            setValue={form.setValue}
            placeholder="Chọn nhày sinh nhật"
            value={form.getValues('dateOfBirth')}
            error={form.formState.errors.dateOfBirth}
          />

          <SelectField
            name="gender"
            label="Giới tính"
            value={form.getValues('gender')}
            options={[
              { value: 'MALE', label: 'Nam' },
              { value: 'FEMALE', label: 'Nữ' },
              { value: 'OTHERS', label: 'Khác' },
            ]}
            placeholder="Chọn giới tính"
            register={form.register}
            setValue={form.setValue}
            error={form.formState.errors.gender}
          />
        </div>
        <div className="mt-[20px]">
          <h1 className="mb-[8px] font-bold text-[14px]">Bio</h1>
          <QuillCustom
            ref={editorRef}
            placeholder="Write down your biography here. Let the employers know who you are..."
          />
        </div>

        <Button size={'lg'} type="submit">
          Save Change
        </Button>
      </form>
    </Form>
  );
};

export default DashboardProfile;
