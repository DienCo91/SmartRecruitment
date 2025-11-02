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
import { useEffect, useState } from 'react';
import DialogAddCV from './DialogAddCV';
import { educations, experiences } from '@/constants/mockedData';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setLoading } from '@/lib/features/common/commonSlice';
import { RootState } from '@/lib/store';
import { CandidateService } from '@/services/candidate.services';
import { toast } from 'sonner';
import { ApplicationServices } from '@/services/application.services';

const formSchema = z.object({
  experience: z.string().nonempty('Experience is required'),
  headline: z.string().nonempty('Headline is required'),
  education: z.string().nonempty('Education is required'),
  personalWebsite: z
    .string()
    .optional()
    .refine(
      val => {
        if (!val) return true;
        try {
          const url = val.startsWith('http') ? val : `https://${val}`;
          new URL(url);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Invalid URL' }
    ),
  fullName: z.string().min(2, 'Họ tên ít nhất 3 ký tự'),
});

type FormData = z.infer<typeof formSchema>;

export interface ICvItem {
  title: string;
  size: number;
  id: string;
}

const DashboardSettingPersonal = () => {
  const dispatch = useAppDispatch();
  const [isShowDialogAddCV, setIsShowDialogAddCV] = useState<boolean>(false);
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);
  const [listCv, setListCv] = useState<ICvItem[]>([]);

  const getMyCV = async () => {
    try {
      const res = await ApplicationServices.getMyCV();
      setListCv(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getMyCV();
    }
  }, [currentUser]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experience: '',
      education: '',
      personalWebsite: '',
      headline: '',
      fullName: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      dispatch(setLoading(true));
      const res = await CandidateService.updateBasicInfo({
        headline: data.headline,
        experienceLevel: data.experience,
        educationLevel: data.education,
        personalWebsite: data.personalWebsite,
        fullName: data.fullName,
      });
      toast.success('Update basic info successfully');
      console.log('res', res);
    } catch (error) {
      console.log(error);
      toast.error('Update basic info failed');
    } finally {
      dispatch(setLoading(false));

      console.log('done');
    }
  };

  return (
    <div>
      <h1 className="text-[18px] font-[500] mt-[32px] mb-[18px]">Basic Information</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {currentUser?.role === 'CANDIDATE' && (
            <TextField
              label="Full Name"
              placeholder="Họ và tên"
              control={form.control}
              name="fullName"
              className="bg-transparent"
              classNameLabel="!text-white"
              isActiveBorderRedError
            />
          )}
          <TextField
            control={form.control}
            label="Title/headline"
            name="headline"
            placeholder="Title/headline..."
            className="bg-transparent"
            classNameLabel="!text-white"
            isActiveBorderRedError
          />
          <div className="grid grid-cols-2 gap-[16px]">
            <SelectField
              value={form.getValues('experience')}
              name="experience"
              label="Experience"
              options={experiences}
              register={form.register}
              setValue={form.setValue}
              error={form.formState.errors.experience}
            />
            <SelectField
              value={form.getValues('education')}
              name="education"
              label="Education"
              options={educations}
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
        {listCv.map(item => (
          <CvItem key={item.id} size={`${(item?.size).toFixed(2)} MB`} title={item.title} />
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
      <DialogAddCV
        isShow={isShowDialogAddCV}
        setIsShow={setIsShowDialogAddCV}
        setListCv={setListCv}
      />
    </div>
  );
};

export default DashboardSettingPersonal;
