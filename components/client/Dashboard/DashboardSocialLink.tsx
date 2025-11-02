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
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppDispatch } from '@/lib/hooks';
import { CandidateService } from '@/services/candidate.services';
import { getIconSocialLink } from '@/utils/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { ca, fi } from 'date-fns/locale';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
  FaGithub,
  FaGitlab,
  FaGlobe,
  FaLinkedin,
  FaReddit,
  FaSkype,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io';
import { TiSocialFacebook, TiSocialInstagram } from 'react-icons/ti';
import { toast } from 'sonner';
import z from 'zod/v3';

const socialLinkSchema = z
  .object({
    platformName: z.string().min(1, 'Platform is required'),
    url: z.string().nonempty('URL is required').url('Invalid URL'),
  })
  .superRefine((data, ctx) => {
    const { platformName, url } = data;
    const patterns: Record<string, RegExp> = {
      FACEBOOK: /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9._-]+/,
      INSTAGRAM: /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._-]+/,
      X: /^https?:\/\/(www\.)?(twitter|x)\.com\/[A-Za-z0-9._-]+/,
      LINKEDIN: /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9._-]+/,
      YOUTUBE: /^https?:\/\/(www\.)?youtube\.com\/(channel|c|user|@)[A-Za-z0-9._-]+/,
      REDDIT: /^https?:\/\/(www\.)?reddit\.com\/user\/[A-Za-z0-9._-]+/,
      SKYPE: /^skype:[A-Za-z0-9._-]+(\?call)?/,
      GITLAB: /^https?:\/\/(www\.)?gitlab\.com\/[A-Za-z0-9._-]+/,
      GITHUB: /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9._-]+/,
      PORTFOLIO: /^https?:\/\//,
    };

    const platform = platformName.toUpperCase();
    const pattern = patterns[platform];
    if (pattern && !pattern.test(url)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid ${platformName} link format.`,
        path: ['url'],
      });
    }
  });

const formSchema = z.object({
  socialLinks: z.array(socialLinkSchema).min(1, 'At least one social link is required'),
});

type FormValues = z.infer<typeof formSchema>;

const DashboardSocialLink = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
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

  const onSubmit = async (data: FormValues) => {
    try {
      dispatch(setLoading(true));
      const res = await CandidateService.updateSocialLinks(data);
      toast.success('Update social links successfully');
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
      toast.error('Update social links failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-[32px]">
      {fields.map((field, index) => (
        <div key={field.id}>
          <h2 className="text-[14px] mb-[8px]">Social link {index + 1}</h2>
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
                <IoMdCloseCircleOutline className="text-[20px] text-[red]" />
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

      <Button
        type="button"
        onClick={() => append({ platformName: '', url: '' })}
        className="w-full bg-grey-primary mt-[18px] text-black hover:shadow-md hover:bg-grey-primary hover:translate-y-[-2px] active:translate-y-0"
      >
        <IoMdAddCircleOutline className="mr-2" />
        Add New Social Link
      </Button>

      <Button type="submit" className="w-full">
        Save Change
      </Button>
    </form>
  );
};

export default DashboardSocialLink;
