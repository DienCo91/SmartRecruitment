'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import { GoChevronDown } from 'react-icons/go';

const filters = {
  experience: [
    'Freshers',
    '1 - 2 Years',
    '2 - 4 Years',
    '4 - 6 Years',
    '6 - 8 Years',
    '8 - 10 Years',
    '10 - 15 Years',
    '15+ Years',
  ],
  salary: [
    '$50 - $1000',
    '$1000 - $2000',
    '$3000 - $4000',
    '$4000 - $6000',
    '$6000 - $8000',
    '$8000 - $10000',
    '$10000 - $15000',
    '$15000+',
  ],
  jobType: ['All', 'Full Time', 'Part Time', 'Internship', 'Remote', 'Temporary', 'Contract Base'],
  education: [
    'All',
    'High School',
    'Intermediate',
    'Graduation',
    'Master Degree',
    'Bachelor Degree',
  ],
  jobLevel: ['Entry Level', 'Mid Level', 'Expert Level'],
};

const PopoverAdvanceFilter = () => {
  const [selected, setSelected] = useState<Record<string, string | string[]>>({});

  const handleSelect = (group: string, value: string, multiple = false) => {
    setSelected(prev => {
      if (multiple) {
        const arr = Array.isArray(prev[group]) ? prev[group] : [];
        return {
          ...prev,
          [group]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
        };
      }
      return { ...prev, [group]: value };
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center text-gray-500 hover:text-blue-primary rounded-none flex-1 h-[56px]"
        >
          <span className="text-[14px]"> Advance Filter</span>
          <GoChevronDown className="text-gray-500" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[900px] p-6" side="bottom" align="end" avoidCollisions={false}>
        <div className="grid grid-cols-5 gap-6 text-sm">
          {/* Experience */}
          <div>
            <h4 className="font-medium mb-3">Experience</h4>
            <div className="flex flex-col gap-2">
              {filters.experience.map(exp => (
                <label key={exp} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="experience"
                    value={exp}
                    checked={selected.experience === exp}
                    onChange={() => handleSelect('experience', exp)}
                  />
                  {exp}
                </label>
              ))}
            </div>
          </div>

          {/* Salary */}
          <div>
            <h4 className="font-medium mb-3">Salary</h4>
            <div className="flex flex-col gap-2">
              {filters.salary.map(sal => (
                <label key={sal} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="salary"
                    value={sal}
                    checked={selected.salary === sal}
                    onChange={() => handleSelect('salary', sal)}
                  />
                  {sal}
                </label>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div>
            <h4 className="font-medium mb-3">Job Type</h4>
            <div className="flex flex-col gap-2">
              {filters.jobType.map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Array.isArray(selected.jobType) && selected.jobType.includes(type)}
                    onChange={() => handleSelect('jobType', type, true)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="font-medium mb-3">Education</h4>
            <div className="flex flex-col gap-2">
              {filters.education.map(edu => (
                <label key={edu} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Array.isArray(selected.education) && selected.education.includes(edu)}
                    onChange={() => handleSelect('education', edu, true)}
                  />
                  {edu}
                </label>
              ))}
            </div>
          </div>

          {/* Job Level */}
          <div>
            <h4 className="font-medium mb-3">Job Level</h4>
            <div className="flex flex-col gap-2">
              {filters.jobLevel.map(level => (
                <label key={level} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="jobLevel"
                    value={level}
                    checked={selected.jobLevel === level}
                    onChange={() => handleSelect('jobLevel', level)}
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverAdvanceFilter;
