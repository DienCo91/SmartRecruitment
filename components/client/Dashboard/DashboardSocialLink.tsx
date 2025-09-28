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
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FaLinkedin, FaReddit, FaSkype, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io';
import { TiSocialFacebook, TiSocialInstagram } from 'react-icons/ti';
import z from 'zod/v3';

const socialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().nonempty('URL is required').url('Invalid URL'),
});

const formSchema = z.object({
  socialLinks: z.array(socialLinkSchema).min(1, 'At least one social link is required'),
});

type FormValues = z.infer<typeof formSchema>;

const DashboardSocialLink = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      socialLinks: [{ platform: '', url: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook':
        return <TiSocialFacebook className="text-blue-600" />;
      case 'Instagram':
        return <TiSocialInstagram className="text-pink-500" />;
      case 'X':
        return <FaXTwitter />;
      case 'Linkedin':
        return <FaLinkedin className="text-blue-600" />;
      case 'Youtube':
        return <FaYoutube className="text-red-500" />;
      case 'Reddit':
        return <FaReddit className="text-orange-500" />;
      case 'Skype':
        return <FaSkype className="text-blue-500" />;
      default:
        return null;
    }
  };

  const socialList = [
    { label: 'Facebook', value: 'Facebook' },
    { label: 'Instagram', value: 'Instagram' },
    { label: 'X', value: 'X' },
    { label: 'Linkedin', value: 'Linkedin' },
    { label: 'Youtube', value: 'Youtube' },
    { label: 'Reddit', value: 'Reddit' },
    { label: 'Skype', value: 'Skype' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-[32px]">
      {fields.map((field, index) => (
        <div key={field.id}>
          <h2 className="text-[14px] mb-[8px]">Social link {index + 1}</h2>
          <div className="flex">
            <div className="flex flex-1 items-center border-[1px] border-grey-primary rounded-[6px]">
              <Controller
                name={`socialLinks.${index}.platform` as const}
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
                              {getIcon(item.value)}
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
              {errors.socialLinks?.[index]?.platform && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.socialLinks[index]?.platform.message}
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
        onClick={() => append({ platform: '', url: '' })}
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
