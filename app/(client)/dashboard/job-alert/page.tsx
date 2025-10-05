'use client';
import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';
import FavoriteJobsList from '@/components/client/Dashboard/FavoriteJobsList';
import { Button } from '@/components/ui/button';
import { Pencil, X } from 'lucide-react';
import React, { useState } from 'react';

const JobAlert = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  return (
    <div>
      <DashboardHeader title="Job Alerts" count={9}>
        {setIsEditing ? (
          isEditing ? (
            <Button size={'sm'} onClick={() => setIsEditing(false)} className="ml-1 ">
              <X size={16} />
            </Button>
          ) : (
            <Button size={'sm'} onClick={() => setIsEditing(true)}>
              <Pencil size={14} fill="#fff" />
              Edit
            </Button>
          )
        ) : (
          ''
        )}
      </DashboardHeader>
      <FavoriteJobsList isEditing={isEditing} />
    </div>
  );
};

export default JobAlert;
