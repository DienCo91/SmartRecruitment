import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { GlassDialog } from '../Dialogs/GlassDialog';
import { ApplicationBriefResponse, BreakdownScore } from '@/types';

export interface ApplicationDialogDetailRef {
  setValue: (item: ApplicationBriefResponse) => void;
}

const ApplicationDialogDetail = forwardRef<ApplicationDialogDetailRef>((_props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [applicationItem, setApplicationItem] = useState<ApplicationBriefResponse>();

  useImperativeHandle(ref, () => ({
    setValue: (item: ApplicationBriefResponse) => {
      setIsOpen(true);
      setApplicationItem(item);
    },
  }));

  const onClose = () => {
    setIsOpen(false);
    setApplicationItem(undefined);
  };

  const breakdownScore: BreakdownScore | null = useMemo(() => {
    if (!applicationItem?.breakdownScore) return null;
    try {
      return JSON.parse(applicationItem.breakdownScore);
    } catch {
      return null;
    }
  }, [applicationItem]);

  return (
    <GlassDialog
      size="lg"
      onClose={onClose}
      title={<p className="my-[18px] font-black">Thông tin chi tiết</p>}
      open={isOpen}
      contentClassName="pb-[16px]"
    >
      <div className="space-y-4 text-white">
        {applicationItem?.score !== null && applicationItem?.score !== undefined && (
          <div className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3">
            <span className="text-lg font-bold text-white/70">Điểm phù hợp</span>
            <span className="text-lg font-semibold text-green-400">
              {applicationItem.score.toFixed(2)}%
            </span>
          </div>
        )}

        {/* ===== Breakdown Score ===== */}
        {breakdownScore && (
          <div className="rounded-lg bg-white/5 p-4">
            <p className="mb-3 text-md font-semibold text-white/80">Chi tiết điểm</p>

            <div className="space-y-2 text-sm">
              {Object.entries(breakdownScore).map(
                ([key, value]) =>
                  value !== null &&
                  value !== undefined && (
                    <div key={key} className="flex justify-between text-white/70">
                      <span>{key.replace(/Score$/, '').replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-white">{value.toFixed(2)}%</span>
                    </div>
                  )
              )}
            </div>
          </div>
        )}

        {/* ===== Cover Letter ===== */}
        {applicationItem?.coverLetter && (
          <div className="rounded-lg bg-white/5 p-4">
            <p className="mb-2 text-md font-semibold text-white/80">Thư ứng tuyển</p>

            <div
              className="prose prose-invert max-w-none text-sm"
              dangerouslySetInnerHTML={{
                __html: applicationItem.coverLetter,
              }}
            />
          </div>
        )}
      </div>
    </GlassDialog>
  );
});

ApplicationDialogDetail.displayName = 'ApplicationDialogDetail';

export default ApplicationDialogDetail;
