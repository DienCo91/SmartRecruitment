import { COMPANY_SIZE, INDUSTRY_TYPE, ORGANIZATION_TYPE } from '@/constants/company';

export const getLabelOrganization = (value: string) => {
  return ORGANIZATION_TYPE.find(item => item.value === value)?.label;
};

export const getLabelTeamSize = (value: string) => {
  return COMPANY_SIZE.find(item => item.value === value)?.label;
};

export const getLabelIndustry = (value: string) => {
  return INDUSTRY_TYPE.find(item => item.value === value)?.label;
};
