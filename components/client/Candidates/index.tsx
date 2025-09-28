import { ReactNode } from 'react';

export interface PropsContactInformationItem {
  icon: ReactNode;
  title: string;
  content: string;
}

export function ContactInformationItem({ icon, title, content }: PropsContactInformationItem) {
  return (
    <div className="flex col-span-1 text-xs items-center gap-3">
      {icon}
      <div className="flex flex-col">
        <p className="text-gray-300 uppercase mt-3">{title}</p>
        <p className="font-semibold">{content}</p>
      </div>
    </div>
  );
}
