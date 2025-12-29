import { EducationLevel, ExperienceLevel, JobType, SalaryType, StatusJob } from '@/constants/job';
import { Company } from './company';

export interface Job {
  id: number;
  company_id?: number; // lấy relation thôi, ko cần cái id này
  company: Company;
  jobTitle: string;
  description: string;
  responsibilities?: string;
  // tags
  minSalary: number;
  maxSalary: number;
  salaryType: SalaryType;
  location_id: number;
  education_level: EducationLevel;
  experienceLevel: ExperienceLevel;
  jobType: JobType;
  vacancies: number;
  expirationDate: Date;
  status: StatusJob;
  is_featured: boolean;
  posted_at: Date;
  slug: string;
}

export interface HotJob
  extends Pick<
    Job,
    | 'id'
    | 'slug'
    | 'salaryType'
    | 'minSalary'
    | 'maxSalary'
    | 'jobType'
    | 'jobTitle'
    | 'expirationDate'
    | 'experienceLevel'
  > {
  companyLogoUrl: string;
  companyName: string;
  provinceCity: string;
}

export interface CreateJob {
  title: string;
  description: string;
  responsibilities: string;
  categoryIds?: number[];
  tagIds?: number[];
  minSalary: number;
  maxSalary: number;
  salaryType: string;
  educationLevel: string;
  experienceLevel: string;
  jobType: string;
  expirationDate: Date;
  vacancies: number;
}

export interface JobItem {
  id: number;
  slug: string;
  jobTitle: string;
  companyName: string;
  companyLogoUrl: string;
  provinceCity: string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'REMOTE' | string;
  minSalary: string;
  maxSalary: string;
  salaryType: 'MONTHLY' | 'YEARLY' | 'HOURLY' | string;
}

export interface JobDetail {
  id: string;
  company: CompanyInfo;
  title: string;
  description: string;
  responsibilities: string;
  minSalary: string;
  maxSalary: string;
  salaryType: string;
  location: LocationInfo;
  educationLevel: string;
  experienceLevel: string;
  jobType: string;
  vacancies: number;
  expirationDate: string;
  status: string;
  slug: string;
  isFeatured: boolean;
  postedAt: string;
  jobCategories: JobCategory[];
  isFavorite: boolean;
  isApplied: boolean;
}

export interface CompanyInfo {
  name: string;
  logoUrl: string;
  foundedIn: number;
  website: string;
  email: string;
  phone: string;
  companySize: string;
}

export interface LocationInfo {
  country: string;
  provinceCity: string;
  commune: string;
  latitude: Coordinate;
  longitude: Coordinate;
}

export interface Coordinate {
  source: string;
  parsedValue: number;
}

export interface JobCategory {
  id?: number;
  name?: string;
}
export interface MyJobPageResponse {
  id: string;
  slug: string;
  title: string;
  daysRemaining: string;
  status: string;
  numberOfApplications: string;
}

export interface CompanyJobPageResponse {
  id: number;
  slug: string;
  jobTitle: string;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'CONTRACT' | string;
  minSalary: number;
  maxSalary: number;
  salaryType: 'MONTHLY' | 'YEARLY' | 'HOURLY' | string;
  isFavorite: boolean;
  isApplied: boolean;
}

export interface ParamGetJob {
  page: number;
  size?: number;
  keyword?: string;
  location?: string;
  category?: string;
  minSalary?: number;
  maxSalary?: number;
  experienceLevel?: string;
  educationLevels?: string[];
  jobTypes?: string[];
}

export interface AppliedJobResponse {
  id: number;
  slug: string;
  jobTitle: string;
  provinceCity: string;
  companyName: string;
  companyLogoUrl: string;
  minSalary: string;
  maxSalary: string;
  salaryType: 'MONTHLY' | 'HOURLY' | 'YEARLY' | string;
  type: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'CONTRACT' | string;
  jobStatus: 'ACTIVE' | 'INACTIVE' | 'CLOSED' | string;
  appliedDate: string;
}

export interface JobFav extends AppliedJobResponse {
  daysRemaining: number;
}

export interface ApplicationBriefResponse {
  applicationId: number;
  candidateId: number;
  candidateName: string | null;
  candidateAvatarUrl: string | null;
  candidateHeadline: string | null;
  experienceLevel: string | null;
  educationLevel: string | null;
  appliedAt: string; // ISO datetime string
  resumeUrl: string;
  coverLetter: string | null;
  score: {
    source: string; // "0.0"
    parsedValue: number; // 0
  };
  email: string;
}

export interface DataFilter {
  appropriate: number;
  gender: string;
  ageRange: string;
  language: string;
}
