'use client';
import { SelectField } from '@/components/hookFormCustom/SelectField';
import TextField from '@/components/hookFormCustom/TextField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus, Link } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod/v3';
import CvItem from './CvItem';
import GlassCardBase from '../Cards/GlassCardBase';
import { useState } from 'react';
import DialogAddCV from './DialogAddCV';

const formSchema = z.object({
  experience: z.string().nonempty('Experience is required'),
  education: z.string().nonempty('Education is required'),
  personalWebsite: z.string().url('Invalid URL').optional(),
});

type FormData = z.infer<typeof formSchema>;

const DashboardSettingPersonal = () => {
  const [isShowDialogAddCV, setIsShowDialogAddCV] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience: '',
      education: '',
      personalWebsite: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log('data', data);
  };

  return (
    <div>
      <h1 className="text-[18px] font-[500] mt-[32px] mb-[18px]">Basic Information</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-[16px]">
            <SelectField
              name="experience"
              label="Experience"
              options={[
                { value: '<1', label: '< 1 year' },
                { value: '1-3', label: '1-3 year' },
                { value: '3-5', label: '3-5 year' },
                { value: '>5', label: '> 5 year' },
              ]}
              register={form.register}
              setValue={form.setValue}
              error={form.formState.errors.experience}
            />
            <SelectField
              name="education"
              label="Education"
              options={[
                { value: 'highschool', label: 'High School' },
                { value: 'bachelor', label: "Bachelor's Degree" },
                { value: 'master', label: "Master's Degree" },
                { value: 'phd', label: 'PhD' },
              ]}
              register={form.register}
              setValue={form.setValue}
              error={form.formState.errors.education}
            />
          </div>
          <TextField
            control={form.control}
            label="Personal Website"
            name="personalWebsite"
            startIcon={<Link size={20} color="#fff" />}
            placeholder="Website url..."
            className="bg-transparent"
            classNameLabel="!text-white"
            isActiveBorderRedError
          />

          <Button type="submit" size={'lg'}>
            <span>Save & Change</span>
          </Button>
        </form>
      </Form>
      <h1 className="text-[18px] font-[500] mt-[32px] mb-[18px]">Your Cv/Resume</h1>
      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-[16px]">
        {Array.from({ length: 3 }, (_, i) => (
          <CvItem key={i} size="3.5 MB" title="My Resume" />
        ))}
        <GlassCardBase className="flex flex-row items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setIsShowDialogAddCV(true)}
          >
            <CirclePlus className="text-blue-500" size={32} />
            <div>
              <h1 className="font-semibold text-[14px]">Add Cv/Resume</h1>
              <span className="text-[12px] text-gray-400">Browse file or drop here. only pdf</span>
            </div>
          </div>
        </GlassCardBase>
      </div>
      <DialogAddCV isShow={isShowDialogAddCV} setIsShow={setIsShowDialogAddCV} />
    </div>
  );
};

export default DashboardSettingPersonal;
