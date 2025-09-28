'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LocationInputOSM from '@/components/ui/location-input-OSM';
import { PhoneInput } from '@/components/ui/phone-input';
import { OSMAddress } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoMdMail } from 'react-icons/io';
import z from 'zod/v3';

const accountSettingSchema = z.object({
  location: z.string().nonempty('Location is required'),
  phoneNumber: z
    .string()
    .nonempty('Phone Number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .min(10, 'Phone Number must be at least 10 characters')
    .max(15, 'Phone Number must be at most 15 characters'),
  email: z.string().nonempty('Email is required').email('Invalid email address'),
});

type FormValues = z.infer<typeof accountSettingSchema>;

const DashboardAccountSetting = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(accountSettingSchema),
    defaultValues: { location: '', phoneNumber: '', email: '' },
  });

  const handleLocationSelect = (place: {
    address: string;
    display_name: string;
    lat: number;
    lng: number;
    osm_id: number;
    address_detail: OSMAddress;
  }) => {
    console.log('📍 Selected Place (OSM):', place);
  };

  const handleSubmitForm = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="mt-[32px]">
      <h1 className="mb-[32px] font-bold">Contact Info</h1>
      <h1 className="text-[14px] mb-[8px]"> Map Location</h1>
      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, value } }) => (
          <LocationInputOSM
            value={value}
            onChange={onChange}
            onSelect={handleLocationSelect}
            error={errors.location?.message}
            placeholder="Type your address or city..."
          />
        )}
      />
      <h1 className="text-[14px] mt-[18px] mb-[8px]">Phone</h1>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, value } }) => (
          <PhoneInput onChange={onChange} value={value} />
        )}
      />
      {errors.phoneNumber?.message && (
        <p className="text-red-500 text-xs mt-1">{errors.phoneNumber?.message}</p>
      )}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <h1 className="text-[14px] mt-[18px] mb-[8px]">Email</h1>
            <div className={'flex items-center border-[1px] rounded-md'}>
              <div className="px-[16px]">
                <IoMdMail className="text-[20px] text-white" />
              </div>
              <Input
                placeholder="Email address"
                className="border-none rounded-l-none"
                onChange={onChange}
                value={value}
              />
            </div>
          </>
        )}
      />
      {errors.email?.message && (
        <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
      )}
      <Button type="submit" size={'lg'} className="mt-[32px]">
        Save Changes
      </Button>
    </form>
  );
};

export default DashboardAccountSetting;
