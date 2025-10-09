'use client';
import TextField from '@/components/HookFormCustom/TextField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ACCEPT_TYPE_CV, ACCEPTED_IMAGE_TYPES_CV, MAX_FILE_SIZE_CV } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod/v3';
import { GlassDialog } from '../Dialogs/GlassDialog';
import UploadInfo from '../AccountSetup/upload-info';

interface IDialogAddCV {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  name: z
    .string()
    .nonempty('Name Company is required')
    .min(3, 'Name Company must be at least 3 characters'),
  file: z
    .instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE_CV, 'Max size is 12MB.')
    .refine((file: File) => ACCEPTED_IMAGE_TYPES_CV.includes(file.type), {
      message: 'Only .pdf, .doc, .docx formats are supported',
    }),
});

type FormValues = z.infer<typeof formSchema>;

const DialogAddCV: React.FC<IDialogAddCV> = ({ isShow, setIsShow }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onCloseDialog = () => {
    setIsShow(false);
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  if (!isShow) return null;

  return (
    <GlassDialog size="sm" open onClose={onCloseDialog} title={<h1>Add Cv/Resume</h1>}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            control={form.control}
            name="name"
            placeholder="Name..."
            label="Cv/Resume Name"
          />
          <Controller
            name="file"
            control={form.control}
            render={({ field }) => (
              <div>
                <UploadInfo
                  accept={ACCEPT_TYPE_CV}
                  title="Upload Logo"
                  desc="A photo larger than 400 pixels work best. Max 5 MB."
                  classNameDropWrap="border-[2px] border-dashed"
                  onChange={file => field.onChange(file)}
                  value={field.value}
                />
                {form.formState.errors.file && (
                  <span className="text-[12px] text-red-500">
                    {form.formState.errors.file.message as string}
                  </span>
                )}
              </div>
            )}
          />
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={onCloseDialog}
              type="button"
              className="text-gray-400"
            >
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </Form>
    </GlassDialog>
  );
};

export default DialogAddCV;
