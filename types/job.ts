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
