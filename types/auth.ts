export interface IRegister {
  // fullName: string;
  userName: string;
  email: string;
  role: string;
  password: string;
}

export interface ISettingCandidate {
  experience?: string;
  education?: string;
  personalWebsite?: string;
  nationality?: string;
  gender?: string;
  socialLinks?: { platform: string; url: string }[];
  location?: string;
  phoneNumber?: string;
}

export interface AuthorOfBlog {
  firebaseUid: string;
  fullName: string;
  userName: string;
  email: string;
  companySetup: boolean;
  avatar?: string;
}
