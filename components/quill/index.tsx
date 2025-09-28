'use client';

import { cn } from '@/lib/utils';
import { forwardRef, useImperativeHandle, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// tham khảo https://quilljs.com/docs/modules/toolbar
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  // ['blockquote', 'code-block'],
  // ['link', 'image', 'video', 'formula'],
  ['link'],

  // [{ header: 1 }, { header: 2 }],
  // [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  // [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  // [{ direction: 'rtl' }], // text direction

  // [{ size: ['small', false, 'large', 'huge'] }],
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],

  // [{ color: [] }, { background: [] }],
  // [{ font: [] }],
  [{ align: [] }],

  ['clean'],
];

export type QuillCustomRef = {
  getValue: () => string;
  setValue: (v: string) => void;
};

const QuillCustom = forwardRef<QuillCustomRef, ReactQuill.ReactQuillProps>((props, ref) => {
  const [value, setValue] = useState('');

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (v: string) => setValue(v),
  }));

  return (
    <div spellCheck={false}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className={cn(
          'rounded-[6px] bg-white/15 fill-white placeholder:text-white text-base',
          props.className
        )}
        placeholder={
          props.placeholder ||
          'Write down about your company here. Let the candidate know who we are...'
        }
        modules={{
          toolbar: toolbarOptions,
        }}
      />
    </div>
  );
});

QuillCustom.displayName = 'QuillCustom';

export default QuillCustom;
