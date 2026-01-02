export * from './router';
export * from './auth';
export * from './common';
export * from './vacancies';
export * from './company';
export * from './dashboard';
export * from './job';
export * from './queryKey';
export * from './tab';
export * from './vacancies';

export enum Size {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  '2XL' = '2xl',
}

export enum QueryType {
  QUERY_CATEGORY = 'ca',
  QUEY_TAG = 'tg',
}

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

// Gender
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
