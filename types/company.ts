import { OrganizationType, TeamSize } from '@/constants';

export interface Company {
  id: number;
  user_id: number;
  company_name: string;
  logo_url: string;
  cover_photo_url: string;
  description: string;
  organization_type: OrganizationType;
  industry_type: string;
  team_size: TeamSize;
  founded_in: Date;
  website: string;
  company_vision: string;
  company_benefits: string;
  phone: string;
  email: string;
  // is_deleted (BOOLEAN): Cờ xóa mềm (mặc định false).
  // created_date (DATETIME): Thời điểm tạo.
  // last_modified_date (DATETIME): Thời điểm cập nhật cuối.
}
