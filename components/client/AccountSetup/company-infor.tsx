'use client';

import QuillCustom, { QuillCustomRef } from '@/components/quill';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@radix-ui/react-separator';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod/v3';
import ButtonAccountSetup from './button-account-setup';
import UploadInfo from './upload-info';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants';
import { toast } from 'sonner';
import { DataSubmitFormProps } from './AccountSetupTabView';

interface ICompanyInfo {
  goToNext: (values?: Partial<DataSubmitFormProps>) => void;
  initValue: DataSubmitFormProps;
  hasInitData: boolean;
}

const formSchema = z.object({
  nameCompany: z
    .string()
    .nonempty('Name Company is required')
    .min(3, 'Name Company must be at least 3 characters'),
  logo: z
    .instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, 'Max size is 5MB.')
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png formats are supported'
    ),
  banner: z
    .instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, 'Max size is 5MB.')
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png formats are supported'
    ),
});
type FormValues = z.infer<typeof formSchema>;

const CompanyInfo: React.FC<ICompanyInfo> = ({ goToNext, initValue, hasInitData }) => {
  const editorRef = useRef<QuillCustomRef>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameCompany: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    if (editorRef.current?.getValue() && editorRef.current.getValue().length > 20) {
      goToNext({
        nameCompany: data.nameCompany,
        description: editorRef.current.getValue(),
        banner: data.banner,
        logo: data.logo,
      });
    } else {
      return toast.error('Description must be at least 20 characters');
    }
  };

  console.log('description', initValue.description);
  return (
    <div className="mt-[32px]">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <span className="text-[18px] font-[500]">Logo & Banner </span>
        <div className="flex mt-[16px]">
          <Controller
            name="logo"
            control={form.control}
            render={({ field }) => (
              <div className="w-[30%]">
                <UploadInfo
                  initImage={initValue.logo as string}
                  title="Logo công ty"
                  desc="A photo larger than 400 pixels work best. Max 5 MB."
                  classNameDropWrap="border-[2px] border-dashed"
                  onChange={file => field.onChange(file)}
                  value={field.value}
                />
                {form.formState.errors.logo && (
                  <span className="text-[12px] text-red-500">
                    {form.formState.errors.logo.message as string}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="banner"
            control={form.control}
            render={({ field }) => (
              <div className="w-[70%] ml-[16px]">
                <UploadInfo
                  initImage={initValue.banner as string}
                  title="Banner công ty"
                  desc="Banner images 1520x400. Supported JPEG, PNG. Max 5 MB."
                  onChange={file => field.onChange(file)}
                  value={field.value}
                />
                {form.formState.errors.banner && (
                  <span className="text-[12px] text-red-500">
                    {form.formState.errors.banner.message as string}
                  </span>
                )}
              </div>
            )}
          />
        </div>
        <Separator className="h-[1px] my-[20px] bg-[#E4E5E8]" />

        <div>
          <h1>Tên công ty</h1>
          <Input
            type="text"
            value={form.watch('nameCompany') || initValue.nameCompany}
            placeholder="Company name ..."
            className="rounded-[6px] p-[8px] mt-[8px]"
            {...form.register('nameCompany')}
          />
          <span className="text-[12px] text-[#FF0000]">
            {form.formState.errors.nameCompany?.message}
          </span>
        </div>

        <div className="mt-[20px]">
          <h1 className="mb-[8px]">Về chúng tôi</h1>
          <QuillCustom ref={editorRef} initValue={initValue.description} />
        </div>

        {!hasInitData && <ButtonAccountSetup title="Save & Next" type="submit" />}
      </form>
    </div>
  );
};

export default CompanyInfo;
