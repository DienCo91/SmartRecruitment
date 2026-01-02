'use client';
import { Button } from '@/components/ui/button';
import LocationInputOSM from '@/components/ui/location-input-OSM';
import { PhoneInput } from '@/components/ui/phone-input';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppDispatch } from '@/lib/hooks';
import { CandidateService } from '@/services/candidate.services';
import { ICandidateDetail, IPlace, OSMAddress } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod/v3';

const accountSettingSchema = z.object({
  location: z.string().nonempty('Location is required'),
  phone: z
    .string()
    .nonempty('Phone Number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .min(10, 'Phone Number must be at least 10 characters')
    .max(15, 'Phone Number must be at most 15 characters'),
});

type FormValues = z.infer<typeof accountSettingSchema>;

const DashboardAccountSetting = ({
  data,
  setData,
}: {
  data: ICandidateDetail | null;
  setData: Dispatch<SetStateAction<ICandidateDetail | null>>;
}) => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(accountSettingSchema),
    defaultValues: {
      location: `${data?.location?.commune || ''}, ${data?.location?.provinceCity || ''}, ${data?.location?.country || ''}`,
      phone: data?.phone || '',
    },
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
    setPlace(place);
  };

  const handleSubmitForm = (formData: FormValues) => {
    if (!place && !formData.location) return;
    try {
      dispatch(setLoading(true));

      const payload = {
        location: {
          commune: place?.display_name ?? (data?.location?.commune || ''),
          provinceCity: place?.address_detail?.city ?? (data?.location?.provinceCity || ''),
          country: place?.address_detail?.country ?? (data?.location?.country || ''),
          latitude: place?.lat ?? (data?.location?.latitude || 0) ?? 0,
          longitude: place?.lng ?? (data?.location?.longitude || 0) ?? 0,
        },
        phone: formData.phone,
      };

      console.log('payload', payload);
      CandidateService.updateContactInfo(payload);
      toast.success('Update contact info successfully');
      setData(prev => ({ ...prev, ...payload }) as unknown as ICandidateDetail);
    } catch (error) {
      console.log('error', error);
      toast.error('Update contact info failed');
    } finally {
      dispatch(setLoading(false));
    }
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
        name="phone"
        render={({ field: { onChange, value } }) => (
          <PhoneInput onChange={onChange} value={value} />
        )}
      />
      {errors.phone?.message && (
        <p className="text-red-500 text-xs mt-1">{errors.phone?.message}</p>
      )}

      <Button type="submit" size={'lg'} className="mt-[32px]">
        Save Changes
      </Button>
    </form>
  );
};

export default DashboardAccountSetting;
