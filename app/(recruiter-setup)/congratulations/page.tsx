'use client';
import { CheckCheck } from 'lucide-react';
import React, { useEffect } from 'react';
import ButtonAccountSetup from '../components/button-account-setup';
import { useProgressAccountSetup } from '@/contexts';

const Congratulations = () => {
  const { setProgress } = useProgressAccountSetup();

  useEffect(() => {
    setProgress(100);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-[#E7F0FA] relative w-[126px] h-[126px] flex justify-center items-center rounded-full ">
        <span className="absolute inline-flex h-full w-full animate-ping-small rounded-full bg-blue-primary opacity-20 "></span>
        <CheckCheck size={48} color="#3B82F6" />
      </div>
      <h1 className="mt-[32px] text-[20px] font-[500]">
        🎉 Congratulations, You profile is 100% complete!
      </h1>
      <div className="mt-[32px]">
        <ButtonAccountSetup title="View Dashboard" className=" mr-[16px]" isPrevious />
        <ButtonAccountSetup title="Post Job" />
      </div>
    </div>
  );
};

export default Congratulations;
