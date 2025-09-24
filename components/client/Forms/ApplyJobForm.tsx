import { Job } from '@/types';
import { GlassDialog } from '../Dialogs/GlassDialog';
import { CustomButton } from '@/components/Buttons/CustomButton';
import { ArrowRightIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { CustomInput } from '@/components/Inputs/CustomInput';
import QuillCustom, { QuillCustomRef } from '@/components/quill';
import { useRef } from 'react';

interface Props extends Pick<Job, 'title'> {
  onClose: () => void;
}

export function ApplyJobForm({ onClose, title }: Props) {
  const handleSubmit = () => {
    onClose();
  };

  const editorRef = useRef<QuillCustomRef>(null);

  return (
    <GlassDialog
      open
      onClose={onClose}
      size="lg"
      title={`Apply Job: ${title}`}
      footer={
        <div className="flex gap-3">
          <CustomButton className="bg-blue-100 text-blue-600 hover:bg-blue-200" onClick={onClose}>
            Cancel
          </CustomButton>
          <CustomButton
            className="bg-blue-700 text-white hover:bg-blue-800 hover:text-gray-200"
            onClick={handleSubmit}
          >
            Apply now
            <ArrowRightIcon />
          </CustomButton>
        </div>
      }
    >
      <div className="space-y-2 mb-5">
        <Label htmlFor="select-file-cv">Choose Resume</Label>
        <CustomInput
          id="select-file-cv"
          type="file"
          accept=".pdf,.doc,.docx"
          className="bg-white/15"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="select-enter-cover-letter">Cover letter</Label>
        <QuillCustom ref={editorRef} />
      </div>
    </GlassDialog>
  );
}
