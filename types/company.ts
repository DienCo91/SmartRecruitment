import { OrganizationType, TeamSize } from '@/constants';
import { OSMAddress } from './osm';
import { Location } from './candidate';

export interface Company {
  id: number;
  user_id: number;
  name: string;
  logoUrl: string;
  cover_photo_url: string;
  description: string;
  organizationType: OrganizationType;
  industryType: string;
  team_size: TeamSize;
  founded_in: Date;
  website: string;
  company_vision: string;
  company_benefits: string;
  phone: string;
  email: string;
  location: Location;
}

export interface TopCompany extends Pick<
  Company,
  'id' | 'name' | 'logoUrl' | 'location' | 'industryType'
> {
  numberOfJobs: number;
}

export interface IPlace {
  address: string;
  display_name: string;
  lat: number;
  lng: number;
  osm_id: number;
  address_detail: OSMAddress;
}

export interface CompanyItem {
  id: number;
  logoUrl: string;
  name: string;
  location: Location;
  numberOfJobs: number;
}

export interface CompanyDetail {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
  organizationType: string;
  industryType: string;
  teamSize: string;
  website: string;
  foundedIn: number;
  companyVision: string;
  socialLinks: { platformName: string; url: string }[];
  location: Location;
  email: string;
  phone: string;
  isFavorite: boolean;
}

export type IEmployerDashboard = Pick<CompanyDetail, 'id' | 'name' | 'email' | 'logoUrl'> & {
  isActive: boolean;
  createdAt: string;
};
