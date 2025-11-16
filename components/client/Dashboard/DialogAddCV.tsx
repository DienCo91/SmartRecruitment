'use client';
import TextField from '@/components/hookFormCustom/TextField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ACCEPT_TYPE_CV, ACCEPTED_IMAGE_TYPES_CV, MAX_FILE_SIZE_CV } from '@/constants';
import { ApplicationServices } from '@/services/application.services';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react'; // icon loading
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod/v3';
import UploadInfo from '../AccountSetup/upload-info';
import { GlassDialog } from '../Dialogs/GlassDialog';
import { ICvItem } from './DashboardSettingPersonal';

interface IDialogAddCV {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setListCv: React.Dispatch<React.SetStateAction<ICvItem[]>>;
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

const DialogAddCV: React.FC<IDialogAddCV> = ({ isShow, setIsShow, setListCv }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onCloseDialog = () => {
    if (!isLoading) setIsShow(false);
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const res = await ApplicationServices.addCV({ resumeFile: data.file, title: data.name });
      form.reset();
      toast.success('Add Cv/Resume successfully');
      setIsShow(false);
      setListCv(prev => [...prev, res.data]);
    } catch (error: unknown) {
      console.log('error', error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message ?? 'Add Cv/Resume failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isShow) return null;

  return (
    <GlassDialog size="sm" open onClose={onCloseDialog} title={<p>Add Cv/Resume</p>}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            control={form.control}
            name="name"
            placeholder="Name..."
            label="Cv/Resume Name"
            disabled={isLoading}
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
                  disabled={isLoading}
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
              disabled={isLoading}
              className="text-gray-400"
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Adding…' : 'Add'}
            </Button>
          </div>
        </form>
      </Form>
    </GlassDialog>
  );
};

export default DialogAddCV;
