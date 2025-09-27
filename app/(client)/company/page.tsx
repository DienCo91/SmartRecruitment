'use client';

import CompanyOpenPosition from '@/components/client/FindCompany/CompanyOpenPosition';
import FilterCompany from '@/components/client/Filters/FilterCompany';
import { FilterJob } from '@/components/client/Filters/FilterJob';
import { useState } from 'react';

const Company = () => {
  const [optionSelected, setOptionSelected] = useState<string[]>([]);

  return (
    <div className="relative ">
      <FilterJob />

      <div className="grid grid-cols-12 mt-[60px]">
        <div className="col-span-3 mr-3 ">
          <FilterCompany setOptionSelected={setOptionSelected} optionSelected={optionSelected} />
        </div>
        {/* Right card */}
        <div className="col-span-9 space-y-[16px]">
          {Array.from({ length: 10 }, (_, index) => (
            <CompanyOpenPosition key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Company;
