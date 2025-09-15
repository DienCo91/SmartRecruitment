'use client';
import QuillCustom, { QuillCustomRef } from '@/components/quill';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinkIcon } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
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
    console.log(data);
    goToNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-[32px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="organizationType" className="block text-sm font-medium mb-1">
            Organization Type
          </label>
          <Select {...register('organizationType')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="non-profit">Non-Profit</SelectItem>
              <SelectItem value="startup">Startup</SelectItem>
              <SelectItem value="corporation">Corporation</SelectItem>
            </SelectContent>
          </Select>
          {errors.organizationType && (
            <p className="text-red-500 text-sm">{errors.organizationType.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="industryTypes" className="block text-sm font-medium mb-1">
            Industry Types
          </label>
          <Select {...register('industryTypes')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
          {errors.industryTypes && (
            <p className="text-red-500 text-sm">{errors.industryTypes.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="teamSize" className="block text-sm font-medium mb-1">
            Team Size
          </label>
          <Select {...register('teamSize')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10</SelectItem>
              <SelectItem value="11-50">11-50</SelectItem>
              <SelectItem value="51-200">51-200</SelectItem>
            </SelectContent>
          </Select>
          {errors.teamSize && <p className="text-red-500 text-sm">{errors.teamSize.message}</p>}
        </div>
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
