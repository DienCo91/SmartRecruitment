'use client';
import { Input } from '@/components/ui/input';
import LocationInputOSM from '@/components/ui/location-input-OSM';
import { PhoneInput } from '@/components/ui/phone-input';
import { IPlace, OSMAddress } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { IoMdMail } from 'react-icons/io';
import { z } from 'zod/v3';
import { DataSubmitFormProps } from './AccountSetupTabView';
import ButtonAccountSetup from './button-account-setup';
import { useEffect, useState } from 'react';

interface IContact {
  goToPrev: () => void;
  goToNext: (values?: Partial<DataSubmitFormProps>) => void;
  initValue: DataSubmitFormProps;
  hasInitData: boolean;
}

const contactSchema = z.object({
  location: z.string().nonempty('Location is required'),
  phoneNumber: z
    .string()
    .nonempty('Phone Number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .min(10, 'Phone Number must be at least 10 characters')
    .max(15, 'Phone Number must be at most 15 characters'),
  email: z.string().nonempty('Email is required').email('Invalid email address'),
});

type FormValues = z.infer<typeof contactSchema>;

const Contact: React.FC<IContact> = ({ goToPrev, goToNext, initValue, hasInitData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { location: '', phoneNumber: '', email: '' },
  });

  const [place, setPlace] = useState<IPlace | null>(null);

  const handleLocationSelect = (place: {
    address: string;
    display_name: string;
    lat: number;
    lng: number;
    osm_id: number;
    address_detail: OSMAddress;
  }) => {
    console.log('place', place);
    setPlace(place);
  };

  useEffect(() => {
    reset({
      location: `${initValue.location?.commune ?? ''}`,
      phoneNumber: initValue.phoneNumber,
      email: initValue.email,
    });
  }, [initValue]);

  const handleSubmitForm = (data: FormValues) => {
    goToNext({
      ...data,
      location: {
        commune: place?.display_name ?? '',
        provinceCity: place?.address_detail?.city ?? '',
        country: place?.address_detail?.country ?? '',
        latitude: place?.lat ?? 0,
        longitude: place?.lng ?? 0,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <h1 className="text-[14px] mb-[8px]">Vị trí</h1>
      <Controller
        control={control}
        disabled={hasInitData}
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
      <h1 className="text-[14px] mt-[18px] mb-[8px]">Số điện thoại</h1>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            onChange={onChange}
            value={value || initValue.phoneNumber}
            disabled={hasInitData}
          />
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
                <IoMdMail className="text-primary text-[20px]" />
              </div>
              <Input
                disabled={hasInitData}
                placeholder="Email address"
                className="border-none rounded-l-none"
                onChange={onChange}
                value={value || initValue.email}
              />
            </div>
          </>
        )}
      />
      {errors.email?.message && (
        <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
      )}
      {!hasInitData && (
        <div>
          <ButtonAccountSetup
            title="Previous"
            isPrevious
            type="button"
            className="mr-[16px]"
            onClick={goToPrev}
          />
          <ButtonAccountSetup title="Finish Editing" type="submit" />
        </div>
      )}
    </form>
  );
};

export default Contact;
