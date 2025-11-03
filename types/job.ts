import { EducationLevel, ExperienceLevel, JobType, SalaryType, StatusJob } from '@/constants';
import { Company } from './company';

export interface Job {
  id: number;
  company_id?: number; // lấy relation thôi, ko cần cái id này
  company: Company;
  title: string;
  description: string;
  responsibilities?: string;
  // tags
  min_salary: number;
  max_salary: number;
  salary_type: SalaryType;
  location_id: number;
  education_level: EducationLevel;
  experience_level: ExperienceLevel;
  job_type: JobType;
  vacancies: number;
  expiration_date: Date;
  status: StatusJob;
  is_featured: boolean;
  // is_highlighted (BOOLEAN): Tin được làm nổi bật (màu sắc).
  // apply_on (ENUM): Hình thức ứng tuyển.
  // Ví dụ: 'ON_PLATFORM'
  // apply_url_or_email (VARCHAR): Link/Email để ứng tuyển (nếu không phải trên platform).
  // is_deleted (BOOLEAN): Cờ xóa mềm.
  posted_at: Date;
  // created_date (DATETIME): Thời điểm tạo.
  // last_modified_date (DATETIME): Thời điểm cập nhật cuối.

  // thêm trường
  slug: string;
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
