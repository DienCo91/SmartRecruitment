import React, { ReactNode } from 'react';
import Dropzone from 'react-dropzone';

interface Props {
  onSelectFiles: (files: File[]) => void;
  placeholder?: ReactNode;
  accept?: string;
}

export default function DragAndDropFileInput({
  placeholder = 'Drag &apos;n&apos; drop some files here, or click to select files',
  onSelectFiles,
  accept,
}: Props) {
  return (
    <Dropzone onDrop={onSelectFiles}>
      {({ getRootProps, getInputProps }) => (
        <section className="cursor-pointer">
          <div {...getRootProps()} className="border border-dashed p-9">
            <input {...getInputProps()} accept={accept} />
            <p className="text-center text-gray-400">{placeholder}</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
