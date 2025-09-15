'use client';

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

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
      className="rounded-[6px]"
      placeholder="Write down about your company here. Let the candidate know who we are..."
    />
  );
});

QuillCustom.displayName = 'QuillCustom';

export default QuillCustom;
