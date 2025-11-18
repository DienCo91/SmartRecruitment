import { Post } from '@/types/post';
import { TOptions } from '@/types';
import { Comment } from '@/types/comment';
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

export const mockedPost: Post = {
  id: 1,
  content:
    '<p class="ql-align-justify"><strong style="color: rgb(2, 176, 78); background-color: transparent;"><a href="https://www.topcv.vn/tim-hieu-ve-chuong-trinh-du-hoc-nghe-duc" rel="noopener noreferrer" target="_blank">Du học nghề Đức</a></strong><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);"> đang là “hướng đi mới” đem đến cơ hội nghề nghiệp hấp dẫn cho các bạn trẻ sau khi tốt nghiệp THPT với điều kiện du học đơn giản, miễn 100% học phí, cơ hội nhận mức lương hàng ngàn Euro/tháng sau khi tốt nghiệp, cơ hội định cư sau dài hạn sau tốt nghiệp, v.vv.. Vậy chương trình du học nghề Đức là gì? Du học nghề Đức nên học ngành nào? Hãy cùng </span><strong style="color: rgb(2, 176, 78); background-color: transparent;"><a href="https://www.topcv.vn/" rel="noopener noreferrer" target="_blank">TopCV</a></strong><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);"> khám phá những review du học nghề Đức siêu chân thực ở bài viết này nhé!</span></p><h2 class="ql-align-justify"><strong style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">Du học nghề Đức là gì?</strong></h2><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">Du học nghề Đức chương trình đào tạo nghề diễn ra tại Cộng hòa Liên bang Đức. Học viên sẽ được học lý thuyết tại các trường nghề và tham gia thực hành tại các công ty/doanh nghiệp. Ngoài ra, học viên còn được hưởng trợ cấp trong quá trình học và có cơ hội làm việc, định cư lâu dài sau tốt nghiệp. </span></p><p class="ql-align-center"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);"><img src="https://static.topcv.vn/cms/du-hoc-nghe-duc-la-gi66fcfd23351df.png" alt="Du học nghề Đức là gì?"></span><em style="background-color: rgb(255, 255, 255); color: rgb(102, 102, 102);">Du học nghề Đức là gì?</em></p><table><tbody><tr><td data-row="1" class="ql-align-justify"><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);">TopCV hân hạnh đồng hành cùng </span><strong style="color: rgb(2, 176, 78); background-color: transparent;"><a href="https://www.topcv.vn/brand/avt-topcv-du-hoc-nghe-duc?id=194995" rel="noopener noreferrer" target="_blank">AVT Group</a></strong><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);"> - một trong những đơn vị tiên phong trong lĩnh vực đào tạo du học nghề tại CHLB Đức. Hàng ngàn cơ hội apply du học nghề Đức được TopCV cập nhật liên tục để giúp các bạn trẻ quan tâm đến chương trình du học nghề Đức tiếp cận gần hơn với nền giáo dục hàng đầu Châu Âu. Tham khảo ngay các cơ hội du học nghề Đức tại TopCV bạn nhé!</span></td><td data-row="1" class="ql-align-center"><br></td></tr></tbody></table><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">Hiện nay, chương trình du học nghề tại Đức đã và đang thu hút đông đảo sự quan tâm của sinh viên Việt Nam cũng như sinh viên quốc tế với cơ hội học tập, làm việc tại quốc gia có nền kinh tế phát triển hàng đầu châu Âu. Theo nghiên cứu mới của Quỹ Bertelsmann, tỷ lệ người dân Đức từ 65 tuổi trở lên sẽ tăng từ 22% lên 28% vào năm 2040 trong khi số người trong độ tuổi lao động sẽ giảm xuống dưới 50%. Điều này cho thấy, Đức đang phải đối mặt với tình trạng thiếu hụt lao động nghiêm trọng do sự già hóa của dân số. </span></p><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">Đứng trước tình trạng này, Chính phủ Cộng hòa Liên bang Đức đã đưa ra nhiều chính sách nhằm thu hút sinh viên quốc tế như: miễn 100% học phí, hưởng trợ cấp mỗi tháng trong suốt 3 năm học nghề, v.vv.. hay mới đây nhất là thay đổi trong Luật định cư mới rút ngắn thời gian xin thẻ vĩnh trú, nhập Quốc tịch Đức và cho phép được song tịch trong một số trường hợp đặc biệt. Điều này mở ra cơ hội nghề nghiệp lớn cho sinh viên quốc tế muốn phát triển và định cư tại quốc gia có nền giáo dục hàng đầu châu Âu này. Theo báo cáo về sinh viên quốc tế của DAAD (Cơ quan Trao đổi Hàn lâm Đức) thì năm học 2022 - 2023 có hơn 458.000 sinh viên quốc tế học tập tại Đức. </span></p><p class="ql-align-center"><br></p><p class="ql-align-justify"><br></p><h2 class="ql-align-justify"><strong style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">Du học nghề Đức nên chọn ngành nghề nào?</strong></h2><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">Du học nghề Đức nên chọn ngành nào, nghề nào để cơ hội việc làm rộng mở? Đây hẳn là băn khoăn của rất nhiều người trước khi đăng ký du học nghề. Dưới đây là một vài gợi ý của TopCV về những ngành nghề đang lên ngôi và được nhiều người lựa chọn khi đi du học nghề.</span></p><p class="ql-align-center"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);"><img src="https://static.topcv.vn/cms/du-hoc-nghe-tai-duc%20(1)66fe0dc637f6a.png" alt="Du học nghề Đức nên chọn ngành nghề nào?"></span><em style="background-color: rgb(255, 255, 255); color: rgb(102, 102, 102);">Du học nghề Đức nên chọn ngành nghề nào?</em></p><h3 class="ql-align-justify"><strong style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">Y tá - Điều dưỡng</strong></h3><p class="ql-align-justify"><span style="background-color: rgb(255, 255, 255); color: rgb(51, 51, 51);">Đức là quốc gia có tỷ lệ dân số già hóa cực lớn, với số người từ 60 - 80 tuổi đạt 19,1 triệu người (chiếm 22,6%) - Theo Dữ liệu của Cơ quan Thống kê Liên bang Đức (Destatis). Điều này dẫn đến nhu cầu về chăm sóc sức khỏe, y tế tăng cao, khiến nghề Y tá - Điều dưỡng tại Đức đối mặt với tình trạng thiếu nhân lực nghiêm trọng. Theo Tổ chức Y tế Đức, đến năm 2035, Đức sẽ thiếu khoảng hơn 500.000 nhân sự Điều dưỡng có tay nghề.</span></p><p><br></p>',
  description:
    'Du học nghề Đức đang là “hướng đi mới” đem đến cơ hội nghề nghiệp hấp dẫn cho các bạn trẻ sau khi tốt nghiệp THPT với điều kiện du học đơn giản, miễn 100% học phí, cơ hội nhận mức lương hàng ngàn Euro/tháng sau khi tốt nghiệp, cơ hội định cư sau dài hạn sau tốt nghiệp, v.vv..',
  cover_image_url: '',
  title: 'Du học nghề Đức - Khởi đầu vững bước, hành trình chinh phục ước mơ',
  slug: 'tim-hieu-ve-chuong-trinh-du-hoc-nghe-duc',
  user_id: 1,
  status: 'PUBLISHED',
  // user:
};

export const comment: Comment = {
  id: 1,
  content: 'Quá đỉnh :>>',
  created_date: new Date(),
  post_id: 1,
  user_id: 1,
  parent_comment_id: 0,
  childs: [],
};

export const comments: Comment[] = [
  {
    id: 1,
    content: 'Quá đỉnh :>>',
    created_date: new Date(),
    post_id: 1,
    user_id: 1,
    parent_comment_id: null,
    childs: [],
  },
  {
    id: 2,
    content: 'Quá đỉnh luôn :>>',
    created_date: new Date(),
    post_id: 1,
    user_id: 1,
    parent_comment_id: null,
    childs: [],
  },
  {
    id: 3,
    content: 'Sub comment 1 :>>',
    created_date: new Date(),
    post_id: 1,
    user_id: 1,
    parent_comment_id: 1,
    childs: [],
  },
  {
    id: 4,
    content: 'Quá là đ :>>',
    created_date: new Date(),
    post_id: 1,
    user_id: 1,
    parent_comment_id: null,
    childs: [],
  },
  {
    id: 5,
    content: 'Cmt5 :>>',
    created_date: new Date(),
    post_id: 1,
    user_id: 1,
    parent_comment_id: 2,
    childs: [],
  },
  {
    id: 6,
    content: 'Sub comment 2 :>>',
    created_date: new Date(),
    post_id: 1,
    user_id: 1,
    parent_comment_id: 3,
    childs: [],
  },
];
