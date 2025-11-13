import React from 'react';
import GlassCardBase from '../Cards/GlassCardBase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApplicationBriefResponse } from '@/types';
import { getLabelEducation, getLabelExperience } from '@/utils';
import { formatDate } from '@/utils/common';

interface IApplicationItem {
  item: ApplicationBriefResponse;
}

const ApplicationItem: React.FC<IApplicationItem> = ({ item }) => {
  const info = [
    getLabelExperience(item.experienceLevel || 'NO_EXPERIENCE'),
    `Education: ${getLabelEducation(item.educationLevel || 'NO_EDUCATION')}`,
    `Applied:${formatDate(item.appliedAt)}`,
  ];

  return (
    <GlassCardBase>
      <div className="flex space-x-2 p-[10px]">
        <Avatar className="w-[44px] h-[44px] shadow-md">
          <AvatarImage
            src={
              item?.candidateAvatarUrl ||
              'https://images.pexels.com/photos/33514898/pexels-photo-33514898.jpeg'
            }
          />
          <AvatarFallback>{item.candidateName?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span>{item?.candidateName}</span>
          <span>{item?.candidateHeadline}</span>
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
