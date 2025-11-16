'use client';
import TextField from '@/components/hookFormCustom/TextField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ACCEPT_TYPE_CV, ACCEPTED_IMAGE_TYPES_CV, MAX_FILE_SIZE_CV } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, Loader2 } from 'lucide-react'; // icon loading
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod/v3';
import UploadInfo from '../AccountSetup/upload-info';
import { GlassDialog } from '../Dialogs/GlassDialog';
import { ICvItem } from './DashboardSettingPersonal';
import { IoClose } from 'react-icons/io5';
import { ApplicationServices } from '@/services/application.services';

interface IDialogEditCV {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setListCv: React.Dispatch<React.SetStateAction<ICvItem[]>>;
  name: string;
  size: string;
  id: string;
}

const formSchema = z.object({
  name: z
    .string()
    .nonempty('Name Company is required')
    .min(3, 'Name Company must be at least 3 characters'),

  file: z
    .instanceof(File)
    .optional()
    .refine(file => !file || file.size <= MAX_FILE_SIZE_CV, {
      message: 'Max size is 12MB.',
    })
    .refine(file => !file || ACCEPTED_IMAGE_TYPES_CV.includes(file.type), {
      message: 'Only .pdf, .doc, .docx formats are supported',
    }),
});

type FormValues = z.infer<typeof formSchema>;

const DialogEditCV: React.FC<IDialogEditCV> = ({
  isShow,
  setIsShow,
  setListCv,
  name,
  size,
  id,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowUpload, setIsShowUpload] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || '',
    },
  });

  useEffect(() => {
    form.setValue('name', name);
    setIsShowUpload(false);
  }, [name]);

  const onCloseDialog = () => {
    if (!isLoading) {
      setIsShow(false);
      form.reset();
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const payload: { title?: string; resumeFile?: File; id: string } = {
        id,
      };

      if (data.file) {
        payload.resumeFile = data.file;
      }
      if (data.name) {
        payload.title = data.name;
      }

      const res = await ApplicationServices.updateCv(payload);

      setListCv(prev => {
        return prev.map(item => {
          if (item.id === res.data.id) {
            return res.data;
          }
          return item;
        });
      });

      onCloseDialog();
    } catch (error) {
      console.log('error', error);
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

          <div className="relative">
            {isShowUpload ? (
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
            ) : (
              <div className="flex flex-col items-center gap-2 h-[200px] ">
                <Button className="absolute right-0" onClick={() => setIsShowUpload(true)}>
                  <IoClose />
                </Button>
                <FileText className="w-[48px] h-[56px] text-[#b0b4ba] mt-[60px]" />
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-white">{size}</p>
              </div>
            )}
          </div>

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
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </Form>
    </GlassDialog>
  );
};

export default DialogEditCV;
