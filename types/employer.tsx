import { Location } from './candidate';

export interface UpdateCompanyInfo {
  name: string;
  description: string;
  organizationType: string;
  industryType: string;
  teamSize: string;
  website?: string;
  foundedIn?: number;
  companyVision?: string;
  socialLinks?: { platformName: string; url: string }[];
  location: Location | null;
  email: string;
  phone: string;
}
