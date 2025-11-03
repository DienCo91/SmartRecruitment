import { COMPANY_SIZE, INDUSTRY_TYPE, JOB_TYPE, ORGANIZATION_TYPE } from '@/constants/company';
import { educations, experiences } from '@/constants/mockedData';

export const getLabelOrganization = (value: string) => {
  return ORGANIZATION_TYPE.find(item => item.value === value)?.label;
};

export const getLabelTeamSize = (value: string) => {
  return COMPANY_SIZE.find(item => item.value === value)?.label;
};

export const getLabelIndustry = (value: string) => {
  return INDUSTRY_TYPE.find(item => item.value === value)?.label;
};

export const getLabelJobType = (value: string) => {
  return JOB_TYPE.find(item => item.value === value)?.label;
};

export const getLabelEducation = (value: string) => {
  return educations.find(item => item.value === value)?.label;
};

export const getLabelExperience = (value: string) => {
  return experiences.find(item => item.value === value)?.label;
};
