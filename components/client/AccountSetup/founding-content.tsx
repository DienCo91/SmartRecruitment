'use client';
import QuillCustom, { QuillCustomRef } from '@/components/quill';
import { SelectField } from '@/components/hookFormCustom/SelectField';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinkIcon } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod/v3';
import ButtonAccountSetup from './button-account-setup';
import { DataSubmitFormProps } from './AccountSetupTabView';
import { COMPANY_SIZE, INDUSTRY_TYPE, ORGANIZATION_TYPE } from '@/constants/company';

interface IFoundingContent {
  goToNext: (values?: Partial<DataSubmitFormProps>) => void;
  goToPrev: () => void;
  initValue: DataSubmitFormProps;
  hasInitData: boolean;
}

const formSchema = z.object({
  organizationType: z.string().min(1, 'Organization Type is required'),
  industryTypes: z.string().min(1, 'Industry Type is required'),
  teamSize: z.string().min(1, 'Team Size is required'),
  yearOfEstablishment: z.string().min(1, 'Year of Establishment is required'),
  companyWebsite: z.string().url('Invalid URL').optional(),
});

type FormData = z.infer<typeof formSchema>;

const FoundingContent: React.FC<IFoundingContent> = ({
  goToNext,
  goToPrev,
  initValue,
  hasInitData,
}) => {
  const editorRef = useRef<QuillCustomRef>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationType: '',
      industryTypes: '',
      teamSize: '',
      yearOfEstablishment: '',
      companyWebsite: '',
    },
  });

  const onSubmit = (data: FormData) => {
    if (editorRef.current?.getValue() && editorRef.current.getValue().length > 20) {
      const year = data.yearOfEstablishment.split('-')[0];
      goToNext({
        organizationType: data.organizationType,
        industryTypes: data.industryTypes,
        teamSize: data.teamSize,
        yearOfEstablishment: +year,
        companyWebsite: data.companyWebsite,
        companyVision: editorRef.current?.getValue(),
      });
    } else {
      return toast.error('Description must be at least 20 characters');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-[32px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField
          name="organizationType"
          label="Loại hình tổ chức"
          options={ORGANIZATION_TYPE}
          register={register}
          setValue={setValue}
          value={watch('organizationType') || initValue.organizationType}
          error={errors.organizationType}
        />

        <SelectField
          name="industryTypes"
          label="Loại ngành nghề"
          options={INDUSTRY_TYPE}
          register={register}
          setValue={setValue}
          value={watch('industryTypes') || initValue.industryTypes}
          error={errors.industryTypes}
        />

        <SelectField
          name="teamSize"
          label="Quy mô đội ngũ"
          options={COMPANY_SIZE}
          register={register}
          value={watch('teamSize') || initValue.teamSize}
          setValue={setValue}
          error={errors.teamSize}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="yearOfEstablishment" className="block text-sm font-medium mb-1">
            Năm thành lập
          </label>
          <div className="relative">
            <Input
              type={watch('yearOfEstablishment') ? 'date' : 'number'}
              id="yearOfEstablishment"
              placeholder="dd/mm/yyyy"
              value={
                !hasInitData ? String(watch('yearOfEstablishment')) : initValue.yearOfEstablishment
              }
              {...register('yearOfEstablishment')}
            />
          </div>
          {errors.yearOfEstablishment && (
            <p className="text-red-500 text-sm">{errors.yearOfEstablishment.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="companyWebsite" className="block text-sm font-medium mb-1">
            Website công ty
          </label>
          <div className="relative">
            <Input
              type="url"
              id="companyWebsite"
              placeholder="Website url..."
              value={watch('companyWebsite') || initValue.companyWebsite}
              {...register('companyWebsite')}
              className="pl-10"
            />
            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
          </div>
          {errors.companyWebsite && (
            <p className="text-red-500 text-sm">{errors.companyWebsite.message}</p>
          )}
        </div>
      </div>

      <div className="mt-[20px]">
        <h1 className="mb-[8px] text-sm font-medium">Tầm nhìn công ty</h1>
        <QuillCustom ref={editorRef} initValue={initValue.companyVision} />
      </div>

      {!hasInitData && (
        <div>
          <ButtonAccountSetup title="Previous" isPrevious type="button" onClick={goToPrev} />

          <ButtonAccountSetup title="Save & Next" className="ml-[8px]" type="submit" />
        </div>
      )}
    </form>
  );
};

export default FoundingContent;
