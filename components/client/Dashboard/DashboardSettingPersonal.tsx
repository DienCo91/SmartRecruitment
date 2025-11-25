'use client';
import { SelectField } from '@/components/hookFormCustom/SelectField';
import TextField from '@/components/hookFormCustom/TextField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { educations, experiences } from '@/constants/mockedData';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { ApplicationServices } from '@/services/application.services';
import { CandidateService } from '@/services/candidate.services';
import { ICandidateDetail } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus, Link } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod/v3';
import GlassCardBase from '../Cards/GlassCardBase';
import CvItem from './CvItem';
import DialogAddCV from './DialogAddCV';
import { fi, is } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';

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

const DashboardSettingPersonal = ({ data }: { data: ICandidateDetail | null }) => {
  const dispatch = useAppDispatch();
  const [isShowDialogAddCV, setIsShowDialogAddCV] = useState<boolean>(false);
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);
  const [listCv, setListCv] = useState<ICvItem[]>([]);
  const [loadingLocal, setLoadingLocal] = useState(true);

  const getMyCV = async () => {
    setLoadingLocal(true);
    try {
      const res = await ApplicationServices.getMyCV();
      setListCv(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingLocal(false);
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
      experience: data?.experienceLevel || '',
      education: data?.educationLevel || '',
      personalWebsite: data?.personalWebsite || '',
      headline: data?.headline || '',
      fullName: data?.fullName || '',
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

  const onDelete = async (id: string) => {
    const newData = listCv.filter(item => item.id !== id);
    setListCv(newData);
  };

  return (
    <div>
      <h1 className="text-[18px] font-[500] mt-[32px] mb-[18px]">Thông tin cơ bản</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {currentUser?.role === 'CANDIDATE' && (
            <TextField
              label="Họ và tên"
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
            label="Giới thiệu ngắn"
            name="headline"
            placeholder="Nhập giới thiệu ngắn"
            className="bg-transparent"
            classNameLabel="!text-white"
            isActiveBorderRedError
          />
          <div className="grid grid-cols-2 gap-[16px]">
            <SelectField
              value={form.getValues('experience')}
              name="experience"
              label="Kinh nghiệm"
              placeholder="Chọn kinh nghiệm làm việc"
              options={experiences}
              register={form.register}
              setValue={form.setValue}
              error={form.formState.errors.experience}
            />
            <SelectField
              value={form.getValues('education')}
              name="education"
              label="Trình độ học vấn"
              placeholder="Chọn trình độ học vấn"
              options={educations}
              register={form.register}
              setValue={form.setValue}
              error={form.formState.errors.education}
            />
          </div>

          <TextField
            control={form.control}
            label="Website cá nhân"
            name="personalWebsite"
            startIcon={<Link size={20} color="#fff" />}
            placeholder="Nhập url"
            className="bg-transparent"
            classNameLabel="!text-white"
            isActiveBorderRedError
          />

          <Button type="submit" size={'lg'}>
            <span>Lưu thay đổi</span>
          </Button>
        </form>
      </Form>
      <h1 className="text-[18px] font-[500] mt-[32px] mb-[18px]">CV của bạn</h1>

      <div className="grid grid-cols-2 2xl:grid-cols-3 gap-[16px]">
        {loadingLocal &&
          Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="h-[78px] rounded-xl bg-white/60 backdrop-blur-lg" />
          ))}
        {!loadingLocal &&
          listCv.length > 0 &&
          listCv.map(item => (
            <CvItem
              key={item.id}
              size={`${(item?.size).toFixed(2)} MB`}
              title={item.title}
              id={item.id}
              onDelete={() => onDelete(item.id)}
              setListCv={setListCv}
            />
          ))}
        {!loadingLocal && (
          <GlassCardBase className="flex flex-row items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsShowDialogAddCV(true)}
            >
              <CirclePlus className="text-blue-500" size={32} />
              <div>
                <h1 className="font-semibold text-[14px]">Thêm CV</h1>
                <span className="text-[12px] text-gray-400">Chọn file tại đây (PDF)</span>
              </div>
            </div>
          </GlassCardBase>
        )}
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
