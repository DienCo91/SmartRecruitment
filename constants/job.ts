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
  ONE_TO_TWO_YEARS = 'ONE_TO_TWO_YEARS',
  TWO_TO_FOUR_YEARS = 'TWO_TO_FOUR_YEARS',
  FOUR_TO_SIX_YEARS = 'FOUR_TO_SIX_YEARS',
  SIX_TO_TEN_YEARS = 'SIX_TO_TEN_YEARS',
  TEN_PLUS_YEARS = 'TEN_PLUS_YEARS',
}

export const experienceLevel = {
  [ExperienceLevel.Fresher]: 'Fresher',
  [ExperienceLevel.ONE_TO_TWO_YEARS]: '1 - 2 năm kinh nghiệm',
  [ExperienceLevel.TWO_TO_FOUR_YEARS]: '2 - 4 năm kinh nghiệm',
  [ExperienceLevel.FOUR_TO_SIX_YEARS]: '4 - 6 năm kinh nghiệm',
  [ExperienceLevel.SIX_TO_TEN_YEARS]: '6 - 10 năm kinh nghiệm',
  [ExperienceLevel.TEN_PLUS_YEARS]: '10+ năm kinh nghiệm',
};

export enum JobType {
  FullTime = 'FULL_TIME',
  PartTime = 'PART_TIME',
  InternShip = 'INTERNSHIP',
  Remote = 'REMOTE',
  Temporary = 'TEMPORARY',
  ContractBase = 'CONTRACT_BASE',
}

export const jobType = {
  [JobType.FullTime]: 'FullTime',
  [JobType.PartTime]: 'PartTime',
  [JobType.InternShip]: 'Intern',
  [JobType.Remote]: 'Remote',
  [JobType.Temporary]: 'Temporary',
  [JobType.ContractBase]: 'ContractBase',
};

export enum StatusJob {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}
