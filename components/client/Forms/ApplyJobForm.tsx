'use client';

import { CustomButton } from '@/components/Buttons/CustomButton';
import QuillCustom, { QuillCustomRef } from '@/components/quill';
import { Label } from '@/components/ui/label';
import { Router } from '@/constants';
import { setLoading } from '@/lib/features/common/commonSlice';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { ApplicationServices } from '@/services/application.services';
import { CandidateService } from '@/services/candidate.services';
import { JobDetail } from '@/types';
import clsx from 'clsx';
import { ArrowRightIcon, Check, FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import GlassCardBase from '../Cards/GlassCardBase';
import { ICvItem } from '../Dashboard/DashboardSettingPersonal';
import { GlassDialog } from '../Dialogs/GlassDialog';

interface Props {
  onClose: () => void;
  job: JobDetail;
  setJob: Dispatch<SetStateAction<JobDetail | undefined>>;
}

export function ApplyJobForm({ onClose, job, setJob }: Props) {
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);
  const [listCv, setListCv] = useState<ICvItem[]>([]);
  const [selectedCvId, setSelectedCvId] = useState<string>();
  const [isLoadingCV, setIsLoadingCV] = useState<boolean>(false);
  const editorRef = useRef<QuillCustomRef>(null);

  const getMyCV = async () => {
    try {
      setIsLoadingCV(true);
      const res = await ApplicationServices.getMyCV();
      setListCv(res.data);
    } catch (error) {
      console.log(error);
      toast.error('Không thể tải danh sách CV');
    } finally {
      setIsLoadingCV(false);
    }
  };

  useEffect(() => {
    if (currentUser) getMyCV();
  }, [currentUser]);

  const handleSubmit = async () => {
    const coverLetter = editorRef.current?.getValue() || '';

    if (!selectedCvId) {
      toast.error('Vui lòng chọn một CV để apply.');
      return;
    }

    if (coverLetter.length < 50) {
      toast.error('Cover letter phải có ít nhất 50 ký tự.');
      return;
    }

    try {
      dispatch(setLoading(true));
      await CandidateService.applyJob({
        jobId: job.id,
        resumeId: selectedCvId,
        coverLetter,
      });
      setJob(prev => (prev ? { ...prev, isApplied: true } : prev));
      onClose();
      toast.success('Ứng tuyển thành công');
    } catch (error) {
      console.log(error);
      toast.error('Đã xảy ra lỗi, ứng tuyển thất bại');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <GlassDialog
      open
      onClose={onClose}
      size="lg"
      title={`Apply Job: ${job.title}`}
      footer={
        <div className="flex gap-3">
          <CustomButton className="bg-blue-100 text-blue-600 hover:bg-blue-200" onClick={onClose}>
            Hủy
          </CustomButton>
          <CustomButton
            className="bg-blue-700 text-white hover:bg-blue-800 hover:text-gray-200"
            onClick={handleSubmit}
          >
            Ứng tuyển ngay
            <ArrowRightIcon />
          </CustomButton>
        </div>
      }
    >
      <div className="space-y-4 mb-5">
        <Label htmlFor="select-file-cv">Chọn CV của bạn</Label>

        {isLoadingCV ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="animate-spin text-blue-500" size={24} />
          </div>
        ) : listCv.length === 0 ? (
          <Link
            href={Router.DASHBOARD.SETTING}
            className="inline-block text-sm font-medium text-blue-400 hover:text-blue-300 
             transition-all duration-300 bg-blue-500/10 px-4 py-2 rounded-xl 
             hover:bg-blue-500/20 backdrop-blur-md border border-blue-400/20 shadow-sm"
          >
            Thêm CV +
          </Link>
        ) : (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-[16px]">
            {listCv.map(item => (
              <GlassCardBase
                key={item.id}
                onClick={() =>
                  item.id !== selectedCvId ? setSelectedCvId(item.id) : setSelectedCvId('')
                }
                className={clsx('flex flex-row items-center justify-between cursor-pointer ')}
              >
                <div className="flex items-center gap-3">
                  <FileText size={32} />
                  <div>
                    <h1 className="font-semibold text-[14px]">{item.title}</h1>
                    <span className="text-[12px] text-gray-400">{(item?.size).toFixed(2)} MB</span>
                  </div>

                  {item.id === selectedCvId && (
                    <div className="absolute right-4">
                      <Check className="bg-green-600 rounded-full" />
                    </div>
                  )}
                </div>
              </GlassCardBase>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="select-enter-cover-letter">Cover letter</Label>
        <QuillCustom
          ref={editorRef}
          placeholder="Write down your biography here. Let the employers know who you are..."
        />
      </div>
    </GlassDialog>
  );
}
