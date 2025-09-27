export * from './router';
export * from './auth';
export * from './common';

export enum Size {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  '2XL' = '2xl',
}

// Job
export enum SalaryType {
  Monthly = 'MONTHLY',
  Yearly = 'YEARLY',
  Hourly = 'HOURLY',
}

export const salaryType = {
  [SalaryType.Hourly]: 'hour',
  [SalaryType.Monthly]: 'month',
  [SalaryType.Yearly]: 'year',
};

export enum EducationLevel {
  HighSchool = 'HIGH_SCHOOL',
}

export const educationLevel = {
  [EducationLevel.HighSchool]: 'High school',
};

export enum ExperienceLevel {
  Fresher = 'FRESHER',
}

export const experienceLevel = {
  [ExperienceLevel.Fresher]: 'Fresher',
};

export enum JobType {
  FullTime = 'FULL_TIME',
  PartTime = 'PART_TIME',
}

export enum StatusJob {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export const jobType = {
  [JobType.FullTime]: 'Full time',
  [JobType.PartTime]: 'Part time',
};

// Company
export enum OrganizationType {
  ProductCompany = 'PRODUCT_COMPANY',
  OutsourcingCompany = 'OUTSOURCING_COMPANY',
}

export const organizationType = {
  [OrganizationType.OutsourcingCompany]: 'Outsourcing company',
  [OrganizationType.ProductCompany]: 'Product company',
};

export enum TeamSize {
  ONE_TO_TEN = '1-10',
  ELEVEN_TO_FIFTY = '11-50',
  FIFTY_ONE_TO_ONE_HUNDRED = '51-100',
  HUNDRED_ONE_TO_TWO_FIFTY = '101-250',
  TWO_FIFTY_ONE_TO_FIVE_HUNDRED = '251-500',
  FIVE_HUNDRED_ONE_TO_ONE_THOUSAND = '501-1000',
  ONE_THOUSAND_ONE_TO_FIVE_THOUSAND = '1001-5000',
  FIVE_THOUSAND_PLUS = '5000+',
}
