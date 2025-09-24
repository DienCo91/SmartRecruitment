'use client';

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// tham khảo https://quilljs.com/docs/modules/toolbar
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  // [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ['clean'],
];

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
});

export type QuillCustomRef = {
  getValue: () => string;
  setValue: (v: string) => void;
};

const QuillCustom = forwardRef<QuillCustomRef>((props, ref) => {
  const [value, setValue] = useState('');

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (v: string) => setValue(v),
  }));

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      className="rounded-[6px] bg-white/15"
      placeholder="Write down about your company here. Let the candidate know who we are..."
      modules={{
        toolbar: toolbarOptions,
      }}
    />
  );
});

QuillCustom.displayName = 'QuillCustom';

export default QuillCustom;
