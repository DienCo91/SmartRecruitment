'use client';
import { DatePickerField } from '@/components/hookFormCustom/DatePickerField';
import { SelectField } from '@/components/hookFormCustom/SelectField';
import TextField from '@/components/hookFormCustom/TextField';
import QuillCustom, { QuillCustomRef } from '@/components/quill';
import { Button } from '@/components/ui/button';
import CategorySelector from '@/components/ui/category-selector';
import { Form } from '@/components/ui/form';
import { JOB_TYPE } from '@/constants/company';
import { educations, experiences } from '@/constants/mockedData';
import { setLoading } from '@/lib/features/common/commonSlice';
import { cn } from '@/lib/utils';
import { EmployerService } from '@/services/employer.services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import z from 'zod/v3';

// const jobLevels = [
//   { value: 'internship', label: 'Internship' },
//   { value: 'fresher', label: 'Fresher' },
//   { value: 'junior', label: 'Junior' },
//   { value: 'mid-level', label: 'Mid-level' },
//   { value: 'senior', label: 'Senior' },
//   { value: 'lead', label: 'Lead' },
//   { value: 'manager', label: 'Manager' },
//   { value: 'director', label: 'Director' },
//   { value: 'vp', label: 'Vice President' },
//   { value: 'c-level', label: 'C-Level (CEO, CTO, CFO)' },
// ];

const FormPostJobSchema = z
  .object({
    jobTitle: z.string().nonempty('Job Title is required'),
    category: z
      .array(
        z.object({
          id: z.number(),
          name: z.string().min(1, 'Tag name is required'),
        })
      )
      .min(1, 'At least one tag is required'),
    minimumSalary: z.string().refine(
      val => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 && Number.isInteger(num);
      },
      { message: 'Minimum Salary must be a positive integer' }
    ),
    maximumSalary: z.string().refine(
      val => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 && Number.isInteger(num);
      },
      { message: 'Maximum Salary must be a positive integer' }
    ),
    salaryType: z.string().nonempty('Salary Type is required'),
    education: z.string().nonempty('Education is required'),
    experience: z.string().nonempty('Experience is required'),
    jobType: z.string().nonempty('Job Type is required'),
    vacancies: z.string().refine(
      val => {
        const num = Number(val);
        return !isNaN(num) && num >= 1 && Number.isInteger(num);
      },
      { message: 'Quantity must be a positive integer' }
    ),
    expirationDate: z.date({ required_error: 'Expiration Date is required' }),
  })
  .refine(data => Number(data.maximumSalary) > Number(data.minimumSalary), {
    message: 'Maximum Salary must be greater than Minimum Salary',
    path: ['maximumSalary'],
  });

type FormValues = z.infer<typeof FormPostJobSchema>;

const DashboardFormPostJob = () => {
  const dispatch = useDispatch();
  const descriptionRef = useRef<QuillCustomRef>(null);
  const responsibilitiesRef = useRef<QuillCustomRef>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormPostJobSchema),
    defaultValues: {
      jobTitle: '',
      category: [],
      minimumSalary: '',
      maximumSalary: '',
      salaryType: '',
      education: '',
      experience: '',
      jobType: '',
      expirationDate: new Date(),
      vacancies: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!descriptionRef.current) {
      toast.error('Description is required');
      return;
    }
    if (!responsibilitiesRef.current) {
      toast.error('Responsibilities is required');
      return;
    }
    try {
      dispatch(setLoading(true));
      await EmployerService.createJob({
        categoryIds: data.category.map(c => c.id),
        tagIds: [1],
        description: descriptionRef.current.getValue(),
        responsibilities: responsibilitiesRef.current?.getValue(),
        title: data.jobTitle,
        minSalary: Number(data.minimumSalary),
        maxSalary: Number(data.maximumSalary),
        salaryType: data.salaryType,
        educationLevel: data.education,
        experienceLevel: data.experience,
        jobType: data.jobType,
        expirationDate: data.expirationDate,
        vacancies: Number(data.vacancies),
      });

      toast.success('Create job successfully');
      form.reset();
      descriptionRef.current.setValue('');
      responsibilitiesRef.current.setValue('');
    } catch {
      toast.error('Đã xảy ra lỗi');
    } finally {
      dispatch(setLoading(false));
    }
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
        <div>
          <label className="text-sm font-medium text-white">Categories</label>
          <Controller
            control={form.control}
            name="category"
            render={({ field }) => (
              <CategorySelector
                onChange={category => field.onChange(category)}
                value={field.value}
              />
            )}
          />
          {form.formState.errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.category.message as string}
            </p>
          )}
        </div>

        <h1 className="font-bold text-[18px]">Salary</h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <TextField
            classNameLabel="!text-white"
            control={form.control}
            name="minimumSalary"
            label="Minimum Salary"
            placeholder="Minimum salary..."
            className="pr-[60px]"
            isActiveBorderRedError
            type="text"
            inputMode="numeric"
            endIcon={<span className="absolute right-2 text-gray-400 text-sm">USD</span>}
          />
          <TextField
            classNameLabel="!text-white"
            control={form.control}
            name="maximumSalary"
            label="Maximum Salary"
            placeholder="Maximum salary..."
            className="pr-[60px]"
            isActiveBorderRedError
            type="text"
            inputMode="numeric"
            endIcon={<span className="absolute right-2 text-gray-400 text-sm">USD</span>}
          />
          <SelectField
            name="salaryType"
            label="Salary Type"
            options={[
              { value: 'HOURLY', label: 'Hourly' },
              { value: 'MONTHLY', label: 'Monthly' },
              { value: 'YEARLY', label: 'Yearly' },
            ]}
            value={form.watch('salaryType')}
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
            options={educations}
            register={form.register}
            setValue={form.setValue}
            error={form.formState.errors.education}
            classNameInput="bg-white/20 rounded-lg"
            className="flex flex-col flex-1"
            value={form.watch('education')}
          />
          <SelectField
            name="experience"
            label="Experience"
            options={experiences}
            register={form.register}
            setValue={form.setValue}
            error={form.formState.errors.experience}
            classNameInput="bg-white/20 rounded-lg"
            className="flex flex-col flex-1"
            value={form.watch('experience')}
          />
          <SelectField
            name="jobType"
            label="Job Type"
            options={JOB_TYPE}
            value={form.watch('jobType')}
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
              name="vacancies"
              label="Vacancies"
              placeholder="Vacancies..."
              isActiveBorderRedError
              type="text"
              inputMode="numeric"
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

          {/* <SelectField
            name="jobLevel"
            label="Job Level"
            options={jobLevels}
            register={form.register}
            setValue={form.setValue}
            error={form.formState.errors.jobLevel}
            classNameInput="bg-white/20 rounded-lg"
            className="flex flex-col flex-1"
          /> */}
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
