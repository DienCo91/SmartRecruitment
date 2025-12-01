import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Hoặc bubble.css

interface Props {
  content: string;
}

export default function QuillViewer({ content }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const quill = new Quill(containerRef.current, {
      readOnly: true,
      theme: 'snow',
      modules: {
        toolbar: false,
      },
    });

    quill.setContents(quill.clipboard.convert({ html: content }));
  }, [content]);

  return <div className="border border-red-400 h-2000" ref={containerRef} />;
}
