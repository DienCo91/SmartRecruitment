'use client';
import { DatePickerField } from '@/components/hookFormCustom/DatePickerField';
import { SearchableSelectField } from '@/components/hookFormCustom/SearchableSelectField';
import { SelectField } from '@/components/hookFormCustom/SelectField';
import TextField from '@/components/hookFormCustom/TextField';
import QuillCustom, { QuillCustomRef } from '@/components/quill';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { VACANCIES } from '@/constants';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod/v3';

const jobLevels = [
  { value: 'internship', label: 'Internship' },
  { value: 'fresher', label: 'Fresher' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid-level', label: 'Mid-level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
  { value: 'manager', label: 'Manager' },
  { value: 'director', label: 'Director' },
  { value: 'vp', label: 'Vice President' },
  { value: 'c-level', label: 'C-Level (CEO, CTO, CFO)' },
];

const FormPostJobSchema = z.object({
  jobTitle: z.string().nonempty('Job Title is required'),
  tag: z
    .array(
      z.object({
        value: z.string().min(1, 'Tag value is required'),
      })
    )
    .min(1, 'At least one tag is required'),
  minimumSalary: z.string().nonempty('Minimum Salary is required'),
  maximumSalary: z.string().nonempty('Maximum Salary is required'),
  salaryType: z.string().nonempty('Salary Type is required'),
  education: z.string().nonempty('Education is required'),
  experience: z.string().nonempty('Experience is required'),
  jobType: z.string().nonempty('Job Type is required'),
  // vacancies: z.string().nonempty('Vacancies is required'),
  quantity: z.string().refine(
    val => {
      const num = Number(val);
      return !isNaN(num) && num >= 1 && Number.isInteger(num);
    },
    { message: 'Quantity must be a positive integer' }
  ),
  expirationDate: z.date({ required_error: 'Expiration Date is required' }),
  jobLevel: z.string().nonempty('Job Level is required'),
});

type FormValues = z.infer<typeof FormPostJobSchema>;

const DashboardFormPostJob = () => {
  const descriptionRef = useRef<QuillCustomRef>(null);
  const responsibilitiesRef = useRef<QuillCustomRef>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormPostJobSchema),
    defaultValues: {
      jobTitle: '',
      tag: [],
      minimumSalary: '',
      maximumSalary: '',
      salaryType: '',
      education: '',
      experience: '',
      jobType: '',
      // vacancies: '',
      expirationDate: new Date(),
      jobLevel: '',
      quantity: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!descriptionRef.current) {
      toast.error('Description is required');
      return;
    }
    if (responsibilitiesRef.current) {
      toast.error('Responsibilities is required');
      return;
    }
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-4 mt-[32px]" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField
          classNameLabel="!text-white"
          control={form.control}
          name="jobTitle"
          label="Job Title"
          placeholder="Add job title, role, vacancies etc"
          isActiveBorderRedError
        />
        <TextField
          classNameLabel="!text-white"
          control={form.control}
          name="tag"
          label="Tags"
          placeholder="Job keyword, tags etc..."
          isActiveBorderRedError
        />

        <h1 className="font-bold text-[18px]">Salary</h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <TextField
            classNameLabel="!text-white"
            control={form.control}
            name="minimumSalary"
            label="Minimum Salary"
            placeholder="Minimum salary..."
            isActiveBorderRedError
          />
          <TextField
            classNameLabel="!text-white"
            control={form.control}
            name="maximumSalary"
            label="Maximum Salary"
            placeholder="Maximum salary..."
            isActiveBorderRedError
          />
          <SelectField
            name="salaryType"
            label="Salary Type"
            options={[
              { value: 'usd', label: 'USD' },
              { value: 'vnd', label: 'VND' },
            ]}
            register={form.register}
            setValue={form.setValue}
            error={form.formState.errors.salaryType}
            classNameInput={cn('bg-white/20 rounded-lg mt-[10px]')}
            className="space-y-0"
          />
        </div>

        <h1 className="font-bold text-[18px]">Advance Information</h1>

        <div className="flex flex-wrap gap-4">
          <SelectField
            name="education"
            label="Education"
            options={[
              { value: 'highschool', label: 'High School' },
              { value: 'bachelor', label: "Bachelor's Degree" },
              { value: 'master', label: "Master's Degree" },
              { value: 'phd', label: 'PhD' },
            ]}
            register={form.register}
            setValue={form.setValue}
            error={form.formState.errors.education}
            classNameInput="bg-white/20 rounded-lg"
            className="flex flex-col flex-1"
          />
          <SelectField
            name="experience"
            label="Experience"
            options={[
              { value: '<1', label: '< 1 year' },
              { value: '1-3', label: '1-3 year' },
              { value: '3-5', label: '3-5 year' },
              { value: '>5', label: '> 5 year' },
            ]}
            register={form.register}
            setValue={form.setValue}
            error={form.formState.errors.experience}
            classNameInput="bg-white/20 rounded-lg"
            className="flex flex-col flex-1"
          />
          <SelectField
            name="jobType"
            label="Job Type"
            options={[
              { value: 'full-time', label: 'Full-time' },
              { value: 'part-time', label: 'Part-time' },
              { value: 'contract', label: 'Contract' },
              { value: 'internship', label: 'Internship' },
              { value: 'freelance', label: 'Freelance' },
            ]}
            register={form.register}
            setValue={form.setValue}
            error={form.formState.errors.jobType}
            classNameInput="bg-white/20 rounded-lg"
            className="flex flex-col flex-1"
          />
        </div>
        {/* <SearchableSelectField<FormValues>
            name="vacancies"
            label="Vacancies"
            placeholder="Select a vacancy..."
            register={form.register}
            options={VACANCIES}
            setValue={form.setValue}
            error={form.formState.errors.vacancies}
            classNameInput="bg-white/20 rounded-lg"
          /> */}

        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col flex-1 mt-[-2px]">
            <TextField
              classNameLabel="!text-white"
              control={form.control}
              name="quantity"
              label="Quantity"
              placeholder="Quantity..."
              isActiveBorderRedError
              type="text"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
            />
          </div>
          <DatePickerField
            name="expirationDate"
            label="Expiration Date"
            setValue={form.setValue}
            value={form.getValues('expirationDate')}
            error={form.formState.errors.expirationDate}
            classNameInput="bg-white/20 rounded-lg"
            className="flex flex-col flex-1"
          />

          <SelectField
            name="jobLevel"
            label="Job Level"
            options={jobLevels}
            register={form.register}
            setValue={form.setValue}
            error={form.formState.errors.jobLevel}
            classNameInput="bg-white/20 rounded-lg"
            className="flex flex-col flex-1"
          />
        </div>

        <h1 className="font-bold text-[18px]">Description & Responsibility</h1>
        <div className="mt-[20px] ">
          <h1 className="mb-[8px] text-[16px] font-bold">Description</h1>
          <QuillCustom ref={descriptionRef} />
        </div>
        <div className="mt-[20px]">
          <h1 className="mb-[8px] text-[16px] font-bold">Responsibilities</h1>
          <QuillCustom ref={responsibilitiesRef} />
        </div>
        <Button size={'lg'} type="submit">
          Post job
        </Button>
      </form>
    </Form>
  );
};

export default DashboardFormPostJob;
