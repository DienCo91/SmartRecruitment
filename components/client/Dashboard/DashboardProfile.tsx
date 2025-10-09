'use client';
import { CountrySelectField } from '@/components/hookFormCustom/CountrySelectField';
import { DatePickerField } from '@/components/hookFormCustom/DatePickerField';
import { SelectField } from '@/components/hookFormCustom/SelectField';
import QuillCustom, { QuillCustomRef } from '@/components/quill';
import { Button } from '@/components/ui/button';
import CountrySelect from '@/components/ui/country-select';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod/v3';

const formSchema = z.object({
  nationality: z.string().nonempty('Nationality is required'),
  dateOfBirth: z.date({ required_error: 'Date of Birth is required' }),
  gender: z.string().nonempty('Gender is required'),
});

type FormValues = z.infer<typeof formSchema>;

const DashboardProfile = () => {
  const editorRef = useRef<QuillCustomRef>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nationality: '',
      gender: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log('data', data, editorRef.current?.getValue());
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-[32px]">
        <div className="grid grid-cols-2 gap-[16px]">
          <CountrySelectField
            name="nationality"
            label="Nationality"
            control={form.control}
            error={form.formState.errors.nationality?.message}
            className="w-full"
          />

          <DatePickerField
            name="dateOfBirth"
            label="Date of Birth"
            setValue={form.setValue}
            value={form.getValues('dateOfBirth')}
            error={form.formState.errors.dateOfBirth}
          />

          <SelectField
            name="gender"
            label="Gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
            register={form.register}
            setValue={form.setValue}
            error={form.formState.errors.gender}
          />
        </div>
        <div className="mt-[20px]">
          <h1 className="mb-[8px] font-bold text-[14px]">Biography</h1>
          <QuillCustom
            ref={editorRef}
            placeholder="Write down your biography here. Let the employers know who you are..."
          />
        </div>

        <Button size={'lg'} type="submit">
          Save Change
        </Button>
      </form>
    </Form>
  );
};

export default DashboardProfile;
