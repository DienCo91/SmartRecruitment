'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getIconSocialLink } from '@/utils/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io';
import { z } from 'zod/v3';
import { DataSubmitFormProps } from './AccountSetupTabView';
import ButtonAccountSetup from './button-account-setup';

const socialList = [
  { label: 'Facebook', value: 'FACEBOOK' },
  { label: 'Instagram', value: 'INSTAGRAM' },
  { label: 'X', value: 'X' },
  { label: 'Linkedin', value: 'LINKEDIN' },
  { label: 'Youtube', value: 'YOUTUBE' },
  { label: 'GitLab', value: 'GITLAB' },
  { label: 'GitHub', value: 'GITHUB' },
  { label: 'Protfolio', value: 'PORTFOLIO' },
];
interface ISocialMediaProfile {
  goToNext: (values?: Partial<DataSubmitFormProps>) => void;
  goToPrev: () => void;
  initValue: DataSubmitFormProps;
  hasInitData: boolean;
}

const socialLinkSchema = z.object({
  platformName: z.string().min(1, 'Platform is required'),
  url: z.string().nonempty('URL is required').url('Invalid URL'),
});

const formSchema = z.object({
  socialLinks: z.array(socialLinkSchema).min(1, 'At least one social link is required'),
});

type FormValues = z.infer<typeof formSchema>;

const SocialMediaProfile: React.FC<ISocialMediaProfile> = ({
  goToNext,
  goToPrev,
  initValue,
  hasInitData,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      socialLinks: [{ platformName: '', url: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  useEffect(() => {
    if (initValue?.socialLinks && initValue.socialLinks.length > 0) {
      reset({
        socialLinks: initValue.socialLinks.map(link => ({
          platformName: link.platformName || '',
          url: link.url || '',
        })),
      });
    }
  }, [initValue, reset]);

  const onSubmit = (data: FormValues) => {
    goToNext({ socialLinks: data.socialLinks });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id}>
          <h2 className="text-[14px] mb-[8px]">Liên kết {index + 1}</h2>
          <div className="flex">
            <div className="flex flex-1 items-center border-[1px] border-grey-primary rounded-[6px]">
              <Controller
                name={`socialLinks.${index}.platformName` as const}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className="w-[180px] border-0 shadow-none">
                      <SelectValue placeholder="Select Social" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Social</SelectLabel>
                        {socialList.map(item => (
                          <SelectItem key={item.value} value={item.value}>
                            <span className="flex items-center gap-2">
                              {getIconSocialLink(item.value)}
                              {item.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              <div className="w-[2px] h-[20px] bg-gray-200 mx-[20px]"></div>

              <Controller
                name={`socialLinks.${index}.url` as const}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Profile link/url..."
                    className="border-0 shadow-none focus-visible:ring-0"
                  />
                )}
              />
            </div>

            {fields.length > 1 && (
              <div
                className="bg-grey-primary px-[8px] flex justify-center items-center rounded-sm ml-[12px] cursor-pointer"
                onClick={() => remove(index)}
              >
                <IoMdCloseCircleOutline className="text-[20px] " />
              </div>
            )}
          </div>

          <div className="flex">
            <div className="w-[180px]">
              {errors.socialLinks?.[index]?.platformName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.socialLinks[index]?.platformName.message}
                </p>
              )}
            </div>
            {errors.socialLinks?.[index]?.url && (
              <p className="text-red-500 text-xs mt-1">{errors.socialLinks[index]?.url.message}</p>
            )}
          </div>
        </div>
      ))}

      {!hasInitData && (
        <Button
          type="button"
          onClick={() => append({ platformName: '', url: '' })}
          className="w-full bg-grey-primary mt-[18px] text-black hover:shadow-md hover:bg-grey-primary hover:translate-y-[-2px] active:translate-y-0"
        >
          <IoMdAddCircleOutline className="mr-2" />
          Add New Social Link
        </Button>
      )}

      {!hasInitData && (
        <div>
          <div>
            <ButtonAccountSetup
              type="button"
              title="Previous"
              onClick={goToPrev}
              isPrevious
              className="mr-[16px]"
            />
            <ButtonAccountSetup title="Save & Next" type="submit" />
          </div>
        </div>
      )}
    </form>
  );
};

export default SocialMediaProfile;
