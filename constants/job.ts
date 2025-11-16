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
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  INTERMEDIATE = 'INTERMEDIATE',
  BACHELOR_DEGREE = 'BACHELOR_DEGREE',
  MASTER_DEGREE = 'MASTER_DEGREE',
  DOCTORATE = 'DOCTORATE',
}

export const educationLevel = {
  [EducationLevel.HIGH_SCHOOL]: 'Trung học phổ thông',
  [EducationLevel.INTERMEDIATE]: 'Trung cấp',
  [EducationLevel.BACHELOR_DEGREE]: 'Cử nhân',
  [EducationLevel.MASTER_DEGREE]: 'Thạc sĩ',
  [EducationLevel.DOCTORATE]: 'Tiến sĩ',
};

export enum ExperienceLevel {
  FRESHER = 'FRESHER',
  ONE_TO_TWO_YEARS = 'ONE_TO_TWO_YEARS',
  TWO_TO_FOUR_YEARS = 'TWO_TO_FOUR_YEARS',
  FOUR_TO_SIX_YEARS = 'FOUR_TO_SIX_YEARS',
  SIX_TO_TEN_YEARS = 'SIX_TO_TEN_YEARS',
  TEN_PLUS_YEARS = 'TEN_PLUS_YEARS',
}

export const experienceLevel = {
  [ExperienceLevel.FRESHER]: 'Fresher',
  [ExperienceLevel.ONE_TO_TWO_YEARS]: '1 - 2 năm kinh nghiệm',
  [ExperienceLevel.TWO_TO_FOUR_YEARS]: '2 - 4 năm kinh nghiệm',
  [ExperienceLevel.FOUR_TO_SIX_YEARS]: '4 - 6 năm kinh nghiệm',
  [ExperienceLevel.SIX_TO_TEN_YEARS]: '6 - 10 năm kinh nghiệm',
  [ExperienceLevel.TEN_PLUS_YEARS]: 'Trên 10 năm kinh nghiệm',
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
  [JobType.FullTime]: 'Toàn thời gian',
  [JobType.PartTime]: 'Bán thời gian',
  [JobType.InternShip]: 'Thực tập',
  [JobType.Remote]: 'Làm việc từ xa',
  [JobType.Temporary]: 'Tạm thời',
  [JobType.ContractBase]: 'Hợp đồng',
};

export enum StatusJob {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export const jobCategories = [
  { id: 1, name: 'IT & Software' },
  { id: 2, name: 'DevOps & Cloud' },
  { id: 3, name: 'AI / Machine Learning' },
  { id: 4, name: 'Data Analyst / Data Engineer' },
];
