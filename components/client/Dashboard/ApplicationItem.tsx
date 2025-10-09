import React from 'react';
import GlassCardBase from '../Cards/GlassCardBase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const info = ['7 Years Experience', 'Education: Master Degree', 'Applied: Jan 23, 2022'];

const ApplicationItem = () => {
  return (
    <GlassCardBase>
      <div className="flex space-x-2 p-[10px]">
        <Avatar className="w-[44px] h-[44px] shadow-md">
          <AvatarImage src="https://images.pexels.com/photos/33514898/pexels-photo-33514898.jpeg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span>Ronald Richards</span>
          <span>UI/UX Designer</span>
        </div>
      </div>
      <Separator className=" " />
      <ul className="text-sm space-y-1 list-disc pl-5">
        {info.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <Button>
        <Download />
        <h1>Download CV</h1>
      </Button>
    </GlassCardBase>
  );
};

export default ApplicationItem;
