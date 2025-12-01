import { ExperienceLevel } from '@/constants/job';
import { LocationInfo } from './job';

export interface UpdateBasicInformation {
  fullName: string;
  headline: string;
  experienceLevel: string;
  educationLevel: string;
  personalWebsite?: string;
}

export interface UpdateDetailInfo {
  nationality: string;
  dateOfBirth: Date;
  gender: string;
  biography: string;
}

export interface UpdateSocialLinks {
  socialLinks: { platformName: string; url: string }[];
}

export interface Location {
  country: string;
  provinceCity: string;
  commune: string;
  latitude: number;
  longitude: number;
}

export interface UpdateContactInfo {
  location: Location;
  phone: string;
}

export type Candidate = {
  id: number;
  fullName: string | null;
  avatarUrl: string | null;
  headline: string | null;
  experienceLevel: ExperienceLevel | null;
  educationLevel: string | null;
  location?: {
    country?: string | null;
    provinceCity?: string | null;
    commune?: string | null;
    latitude?: number | null;
    longitude?: number | null;
  };
  follow?: boolean;
  email?: string;
};

export interface ICandidateDetail {
  id: number;
  fullName: string | null;
  avatarUrl: string | null;
  headline: string | null;
  experienceLevel: string | null;
  educationLevel: string | null;
  personalWebsite: string | null;
  nationality: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  maritalStatus: string | null;
  biography: string | null;
  phone: string | null;
  email: string | null;
  isPublic: boolean;
  location: Location;
  socialLinks: { platformName: string; url: string }[];
}
