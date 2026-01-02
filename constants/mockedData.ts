import { TOptions } from '@/types';
import { educationLevel, EducationLevel, experienceLevel, ExperienceLevel } from './job';

// Data cứng
export const locations: TOptions[] = [
  { value: '', label: 'Tất cả' },
  { value: 'an giang', label: 'An Giang' },
  { value: 'ba ria vung tau', label: 'Bà Rịa - Vũng Tàu' },
  { value: 'bac giang', label: 'Bắc Giang' },
  { value: 'bac kan', label: 'Bắc Kạn' },
  { value: 'bac lieu', label: 'Bạc Liêu' },
  { value: 'bac ninh', label: 'Bắc Ninh' },
  { value: 'ben tre', label: 'Bến Tre' },
  { value: 'binh dinh', label: 'Bình Định' },
  { value: 'binh duong', label: 'Bình Dương' },
  { value: 'binh phuoc', label: 'Bình Phước' },
  { value: 'binh thuan', label: 'Bình Thuận' },
  { value: 'ca mau', label: 'Cà Mau' },
  { value: 'cao bang', label: 'Cao Bằng' },
  { value: 'can tho', label: 'Cần Thơ' },
  { value: 'da nang', label: 'Đà Nẵng' },
  { value: 'dak lak', label: 'Đắk Lắk' },
  { value: 'dak nong', label: 'Đắk Nông' },
  { value: 'dien bien', label: 'Điện Biên' },
  { value: 'dong nai', label: 'Đồng Nai' },
  { value: 'dong thap', label: 'Đồng Tháp' },
  { value: 'gia lai', label: 'Gia Lai' },
  { value: 'ha giang', label: 'Hà Giang' },
  { value: 'ha nam', label: 'Hà Nam' },
  { value: 'ha noi', label: 'Hà Nội' },
  { value: 'ha tinh', label: 'Hà Tĩnh' },
  { value: 'hai duong', label: 'Hải Dương' },
  { value: 'hai phong', label: 'Hải Phòng' },
  { value: 'hau giang', label: 'Hậu Giang' },
  { value: 'hoa binh', label: 'Hòa Bình' },
  { value: 'hung yen', label: 'Hưng Yên' },
  { value: 'khanh hoa', label: 'Khánh Hòa' },
  { value: 'kien giang', label: 'Kiên Giang' },
  { value: 'kon tum', label: 'Kon Tum' },
  { value: 'lai chau', label: 'Lai Châu' },
  { value: 'lam dong', label: 'Lâm Đồng' },
  { value: 'lang son', label: 'Lạng Sơn' },
  { value: 'lao cai', label: 'Lào Cai' },
  { value: 'long an', label: 'Long An' },
  { value: 'nam dinh', label: 'Nam Định' },
  { value: 'nghe an', label: 'Nghệ An' },
  { value: 'ninh binh', label: 'Ninh Bình' },
  { value: 'ninh thuan', label: 'Ninh Thuận' },
  { value: 'phu tho', label: 'Phú Thọ' },
  { value: 'phu yen', label: 'Phú Yên' },
  { value: 'quang binh', label: 'Quảng Bình' },
  { value: 'quang nam', label: 'Quảng Nam' },
  { value: 'quang ngai', label: 'Quảng Ngãi' },
  { value: 'quang ninh', label: 'Quảng Ninh' },
  { value: 'quang tri', label: 'Quảng Trị' },
  { value: 'soc trang', label: 'Sóc Trăng' },
  { value: 'son la', label: 'Sơn La' },
  { value: 'tay ninh', label: 'Tây Ninh' },
  { value: 'thai binh', label: 'Thái Bình' },
  { value: 'thai nguyen', label: 'Thái Nguyên' },
  { value: 'thanh hoa', label: 'Thanh Hóa' },
  { value: 'thua thien hue', label: 'Thừa Thiên Huế' },
  { value: 'tien giang', label: 'Tiền Giang' },
  { value: 'ho chi minh', label: 'TP Hồ Chí Minh' },
  { value: 'tra vinh', label: 'Trà Vinh' },
  { value: 'tuyen quang', label: 'Tuyên Quang' },
  { value: 'vinh long', label: 'Vĩnh Long' },
  { value: 'vinh phuc', label: 'Vĩnh Phúc' },
  { value: 'yen bai', label: 'Yên Bái' },
  { value: 'thu duc', label: 'TP Thủ Đức' },
];

export const categories = [
  { value: '1', label: 'IT & Software' },
  { value: '2', label: 'DevOps & Cloud' },
  { value: '3', label: 'AI / Machine Learning' },
  { value: '4', label: 'Data Analyst / Data Engineer' },
];

export const experiences = [
  { id: 1, value: ExperienceLevel.FRESHER, label: experienceLevel[ExperienceLevel.FRESHER] },
  {
    id: 2,
    value: ExperienceLevel.ONE_TO_TWO_YEARS,
    label: experienceLevel[ExperienceLevel.ONE_TO_TWO_YEARS],
  },
  {
    id: 3,
    value: ExperienceLevel.TWO_TO_FOUR_YEARS,
    label: experienceLevel[ExperienceLevel.TWO_TO_FOUR_YEARS],
  },
  {
    id: 4,
    value: ExperienceLevel.FOUR_TO_SIX_YEARS,
    label: experienceLevel[ExperienceLevel.FOUR_TO_SIX_YEARS],
  },
  {
    id: 5,
    value: ExperienceLevel.SIX_TO_TEN_YEARS,
    label: experienceLevel[ExperienceLevel.SIX_TO_TEN_YEARS],
  },
  {
    id: 6,
    value: ExperienceLevel.TEN_PLUS_YEARS,
    label: experienceLevel[ExperienceLevel.TEN_PLUS_YEARS],
  },
];

export const educations = [
  { value: EducationLevel.HIGH_SCHOOL, label: educationLevel[EducationLevel.HIGH_SCHOOL] },
  { value: EducationLevel.INTERMEDIATE, label: educationLevel[EducationLevel.INTERMEDIATE] },
  { value: EducationLevel.BACHELOR_DEGREE, label: educationLevel[EducationLevel.BACHELOR_DEGREE] },
  { value: EducationLevel.MASTER_DEGREE, label: educationLevel[EducationLevel.MASTER_DEGREE] },
  { value: EducationLevel.DOCTORATE, label: educationLevel[EducationLevel.DOCTORATE] },
];

export const salaries = [
  { id: 'all', value: '-', label: 'Tất cả' },
  { id: 'under-10m', value: '0-10000000', label: 'Dưới 10 triệu' },
  { id: '10-15m', value: '10000000-15000000', label: '10 - 15 triệu' },
  { id: '15-25m', value: '15000000-25000000', label: '15 - 25 triệu' },
  { id: '25-40m', value: '25000000-40000000', label: '25 - 40 triệu' },
  { id: '40-60m', value: '40000000-60000000', label: '40 - 60 triệu' },
  { id: 'above-60m', value: '60000000-', label: 'Trên 60 triệu' },
];

export const genders = [
  { id: 'male', value: 'MALE', label: 'Nam' },
  { id: 'female', value: 'FEMALE', label: 'Nữ' },
];

export const categoriesBlog = [
  { id: 'graphics&design', value: 'graphics&design', label: 'Graphics & Design' },
  { id: 'code&programing', value: 'code&programing', label: 'Code & Programing' },
  { id: 'digitalMarketing', value: 'digitalMarketing', label: 'Digital Marketing' },
  { id: 'it', value: 'it', label: 'Information & Technology' },
  { id: 'ai', value: 'ai', label: 'AI' },
];
