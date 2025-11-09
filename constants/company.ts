import { jobType, JobType } from './job';

export const ORGANIZATION_TYPE = [
  { value: 'GOVERNMENT', label: 'Government' },
  { value: 'SEMI_GOVERNMENT', label: 'Semi-government' },
  { value: 'NGO', label: 'Non-Governmental Organization' },
  { value: 'PRIVATE_COMPANY', label: 'Private Company' },
  { value: 'STARTUP', label: 'Startup' },
  { value: 'MULTINATIONAL', label: 'Multinational' },
];

export const INDUSTRY_TYPE = [
  { value: 'IT', label: 'IT' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'FINANCE', label: 'Finance' },
  { value: 'HEALTHCARE', label: 'Healthcare' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'RETAIL', label: 'Retail' },
  { value: 'MANUFACTURING', label: 'Manufacturing' },
  { value: 'CONSTRUCTION', label: 'Construction' },
  { value: 'TELECOMMUNICATIONS', label: 'Telecommunications' },
  { value: 'LOGISTICS', label: 'Logistics' },
  { value: 'HOSPITALITY', label: 'Hospitality' },
  { value: 'ENERGY', label: 'Energy' },
];

export const COMPANY_SIZE = [
  { value: 'ONE_TO_FIFTY', label: '1-50' },
  { value: 'FIFTY_ONE_TO_HUNDRED', label: '51-100' },
  { value: 'HUNDRED_ONE_TO_TWO_FIFTY', label: '101-250' },
  { value: 'TWO_FIFTY_ONE_TO_FIVE_HUNDRED', label: '251-500' },
  { value: 'FIVE_HUNDRED_ONE_TO_THOUSAND', label: '501-1,000' },
  { value: 'THOUSAND_PLUS', label: '1,000+' },
];

export const JOB_TYPE = [
  { value: JobType.FullTime, label: jobType[JobType.FullTime] },
  { value: JobType.PartTime, label: jobType[JobType.PartTime] },
  { value: JobType.InternShip, label: jobType[JobType.InternShip] },
  { value: JobType.Remote, label: jobType[JobType.Remote] },
  { value: JobType.Temporary, label: jobType[JobType.Temporary] },
  { value: JobType.ContractBase, label: jobType[JobType.ContractBase] },
];
