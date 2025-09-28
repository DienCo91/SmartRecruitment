'use client';
import QuillCustom, { QuillCustomRef } from '@/components/quill';
import { SelectField } from '@/components/HookFormCustom/SelectField';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinkIcon } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod/v3';
import ButtonAccountSetup from './button-account-setup';

interface IFoundingContent {
  goToNext: () => void;
  goToPrev: () => void;
}

const formSchema = z.object({
  organizationType: z.string().min(1, 'Organization Type is required'),
  industryTypes: z.string().min(1, 'Industry Type is required'),
  teamSize: z.string().min(1, 'Team Size is required'),
  yearOfEstablishment: z.string().min(1, 'Year of Establishment is required'),
  companyWebsite: z.string().url('Invalid URL').optional(),
});

type FormData = z.infer<typeof formSchema>;

const FoundingContent: React.FC<IFoundingContent> = ({ goToNext, goToPrev }) => {
  const editorRef = useRef<QuillCustomRef>(null);

  const {
    register,
    handleSubmit,
    setValue,
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
      console.log('🚀 ~ onSubmit ~ data:', data);
      goToNext();
    } else {
      return toast.error('Description must be at least 20 characters');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-[32px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectField
          name="organizationType"
          label="Organization Type"
          options={[
            { value: 'non-profit', label: 'Non-Profit' },
            { value: 'startup', label: 'Startup' },
            { value: 'corporation', label: 'Corporation' },
          ]}
          register={register}
          setValue={setValue}
          error={errors.organizationType}
        />

        <SelectField
          name="industryTypes"
          label="Industry Types"
          options={[
            { value: 'tech', label: 'Technology' },
            { value: 'healthcare', label: 'Healthcare' },
            { value: 'finance', label: 'Finance' },
          ]}
          register={register}
          setValue={setValue}
          error={errors.industryTypes}
        />

        <SelectField
          name="teamSize"
          label="Team Size"
          options={[
            { value: '1-10', label: '1-10' },
            { value: '11-50', label: '11-50' },
            { value: '51-200', label: '51-200' },
          ]}
          register={register}
          setValue={setValue}
          error={errors.teamSize}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="yearOfEstablishment" className="block text-sm font-medium mb-1">
            Year of Establishment
          </label>
          <div className="relative">
            <Input
              type="date"
              id="yearOfEstablishment"
              placeholder="dd/mm/yyyy"
              {...register('yearOfEstablishment')}
            />
          </div>
          {errors.yearOfEstablishment && (
            <p className="text-red-500 text-sm">{errors.yearOfEstablishment.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="companyWebsite" className="block text-sm font-medium mb-1">
            Company Website
          </label>
          <div className="relative">
            <Input
              type="url"
              id="companyWebsite"
              placeholder="Website url..."
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
        <h1 className="mb-[8px] text-sm font-medium">Company Vision</h1>
        <QuillCustom ref={editorRef} />
      </div>

      <div>
        <ButtonAccountSetup title="Previous" isPrevious type="button" onClick={goToPrev} />

        <ButtonAccountSetup title="Save & Next" className="ml-[8px]" type="submit" />
      </div>
    </form>
  );
};

export default FoundingContent;
