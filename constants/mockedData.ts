import { Post } from '@/types/post';
import {
  EducationLevel,
  ExperienceLevel,
  JobType,
  OrganizationType,
  SalaryType,
  StatusJob,
  TeamSize,
} from '.';
import { Company, Job, TOptions } from '@/types';
import { Comment } from '@/types/comment';

export const mockedCompany: Company = {
  id: 1,
  description:
    'Tập đoàn Viễn thông Quân đội Viettel - giữ vững vị thế Nơi làm việc tốt nhất Việt Nam trong 06 năm liên tiếp trong ngành Viễn thông, Hạ tầng, IT (theo khảo sát Anphabe) là nhà cung cấp dịch vụ số toàn cầu, luôn đi đầu trong đổi mới sáng tạo và luôn lắng nghe, thấu hiểu để đem tới những dịch vụ tốt nhất cho khách hàng.\
Viettel hiện là tập đoàn công nghệ hàng đầu Việt Nam, top 18 công ty viễn thông toàn cầu với gần 70.000 nhân viên và hoạt động tại 11 thị trường trải dài từ Châu Á, Châu Mỹ, Châu Phi. Bên cạnh viễn thông, Viettel còn tham gia vào lĩnh vực nghiên cứu sản xuất công nghệ cao, phát triển ứng dụng công nghệ số, hàng không vũ trụ và nhiều lĩnh vực khác.\
Viettel quy tụ những tài năng hàng đầu trong mọi lĩnh vực để không ngừng sáng tạo, khám phá, đưa ra những ý tưởng giúp phát triển hệ sinh thái sản phẩm – dịch vụ Viettel.\
Chúng tôi tôn vinh những giá trị khác biệt và bản sắc riêng của mỗi cá nhân, cùng sự gắn kết tương quan của những nét riêng ấy trong cộng đồng và tập thể. Viettel ủng hộ sự đa dạng và hòa hợp trên tinh thần công nhận, khuyến khích và thúc đây tư duy khác biệt để phát triển nhân tài.',
  company_name: 'TẬP ĐOÀN CÔNG NGHIỆP - VIỄN THÔNG QUÂN ĐỘI',
  company_benefits:
    'Tập đoàn Công nghiệp Viễn thông Quân đội (Viettel) - Nơi làm việc tốt nhất Việt Nam trong 6 năm liên tiếp trong ngành Viễn thông, Hạ tầng, IT (theo khảo sát Anphabe) là nhà cung cấp dịch vụ viễn thông và dịch vụ số toàn cầu, với hơn 50.000 nhân viên và hoạt động tại 11 quốc gia trải dài từ Châu Á, Châu Mỹ, Châu Phi.\
Là tập đoàn có thương hiệu giá trị nhất Việt Nam, Viettel giữ vững tinh thần đi đầu trong đổi mới sáng tạo và luôn lắng nghe, thấu hiểu để đem tới những dịch vụ tốt nhất cho khách hàng, quy tụ những tài năng hàng đầu trong mọi lĩnh vực để không ngừng sáng tạo, khám phá, đưa ra những ý tưởng giúp phát triển hệ sinh thái sản phẩm – dịch vụ Viettel.',
  company_vision:
    'Sau hơn 3 thập kỷ nỗ lực hoàn thành mục tiêu phổ cập dịch vụ viễn thông, đưa viễn thông và công nghệ thông tin vào mọi lĩnh vực của cuộc sống ở Việt Nam, Tập đoàn Công nghiệp - Viễn thông Quân đội (Viettel) đặt ra khát vọng trở thành Tập đoàn công nghiệp và công nghệ vươn tầm thế giới. Ở bất cứ giai đoạn nào trên hành trình ấy, lời hứa “sáng tạo vì con người” vẫn còn mãi.',
  email: 'career@viettel.com',
  cover_photo_url:
    'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_covers/tap-doan-cong-nghiep-vien-thong-quan-doi-e3c6e7727df189e29507b150c6a7d893-64c328ef424bd.jpg',
  founded_in: new Date('1990-01-01'),
  industry_type: 'Technology',
  logo_url:
    'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/UdiO7Pguf3akX65drUOKRz0N5dcyKWWr_1737604772____3a6bc78024143aefa7a42eaf3e57e674.png',
  team_size: TeamSize.FIVE_THOUSAND_PLUS,
  organization_type: OrganizationType.OutsourcingCompany,
  phone: '1900 1111',
  user_id: 1,
  website: 'https://tuyendung.viettel.vn',
};

export const mockedJob: Job = {
  id: 1,
  description:
    'Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet.',
  education_level: EducationLevel.HighSchool,
  experience_level: ExperienceLevel.Fresher,
  expiration_date: new Date('2025-12-31'),
  is_featured: true,
  job_type: JobType.FullTime,
  location_id: 0,
  min_salary: 2_000,
  max_salary: 5_000,
  salary_type: SalaryType.Monthly,
  slug: 'chuyen-vien-kinh-doanh-giai-phap-thanh-toan-tu-van-tin-dung-doanh-nghiep',
  status: StatusJob.Active,
  title: 'Chuyên Viên Kinh Doanh Giải Pháp Thanh Toán / Tư Vấn Tín Dụng Doanh Nghiệp',
  vacancies: 100,
  company_id: 40,
  responsibilities:
    'MISA là doanh nghiệp CNTT xuất sắc nhất khu vực Châu Á - Châu Đại Dương. Tiên phong xuất khẩu giải pháp SaaS \
TOP đầu doanh nghiệp CNTT tăng trưởng liên tục với quy mô nhân sự tăng 20%/năm, doanh thu tăng 15%/năm \
Hội tụ gần 3000 nhân tài cùng khát vọng đưa sản phẩm công nghệ “Make In Vietnam” vươn tầm quốc tế \
Xây dựng niềm tin với 350.000 khách hàng là đơn vị HCSN, doanh nghiệp, 3.5 triệu khách hàng cá nhân tại Việt Nam và 22 quốc gia\
Hơn 100 giải thưởng trong ngành CNTT trong nước và quốc tế',
  company: mockedCompany,
  posted_at: new Date(),
};

// Data cứng
export const locations: TOptions[] = [
  {
    value: 'hanoi',
    label: 'Hà Nội',
  },
  {
    value: 'hochiminh',
    label: 'Hồ Chí Minh',
  },
  {
    value: 'danang',
    label: 'Đà Nẵng',
  },
  {
    value: 'thaibinh',
    label: 'Thái Bình',
  },
];

export const categories = [
  {
    value: 'it',
    label: 'IT & Máy tính',
  },
  {
    value: 'marketing',
    label: 'Marketing',
  },
  {
    value: 'bussiness',
    label: 'Kinh doanh',
  },
];

export const experiences = [
  { id: 1, value: 'underOneYear', label: 'Fresher' },
  { id: 2, value: '1-2Year', label: '1-2 Năm' },
  { id: 3, value: '2-4Year', label: '2-4 Năm' },
  { id: 4, value: '4-6Year', label: '4-6 Năm' },
  { id: 5, value: '6-8Year', label: '6-8 Năm' },
  { id: 6, value: '8-10Year', label: '8-10 Năm' },
  { id: 7, value: '10-15Year', label: '10-15 Năm' },
  { id: 8, value: '15+Year', label: '15+ Năm' },
];

export const salaries = [
  { id: '$50-$1000', value: '$50-$1000', label: '$50-$1000' },
  { id: '$1000-$2000', value: '$1000-$2000', label: '$1000-$2000' },
  { id: '$3000-$4000', value: '$3000-$4000', label: '$3000-$4000' },
  { id: '$4000-$6000', value: '$4000-$6000', label: '$4000-$6000' },
  { id: '$6000-$8000', value: '$6000-$8000', label: '$6000-$8000' },
  { id: '$8000-$10000', value: '$8000-$10000', label: '$8000-$10000' },
  { id: '$10000-$15000', value: '$10000-$15000', label: '$10000-$15000' },
  { id: '$15000+', value: '$15000+', label: '$15000+' },
];

export const jobTypes = [
  { id: 'all', value: 'all', label: 'All' },
  { id: 'fulltime', value: 'fulltime', label: 'Full Time' },
  { id: 'parttime', value: 'parttime', label: 'Part Time' },
  { id: 'internship', value: 'internship', label: 'Internship' },
  { id: 'remote', value: 'remote', label: 'Remote' },
  { id: 'temporary', value: 'temporary', label: 'Temporary' },
];

export const educations = [
  { id: 'all', value: 'all', label: 'All' },
  { id: 'highSchool', value: 'highSchool', label: 'High School' },
  { id: 'intermediate', value: 'intermediate', label: 'Intermediate' },
  { id: 'graduation', value: 'graduation', label: 'Graduation' },
  { id: 'masterDegree', value: 'masterDegree', label: 'Master Degree' },
];

export const jobLevels = [
  { id: 'entryLevel', value: 'entryLevel', label: 'Entry Level' },
  { id: 'midLevel', value: 'midLevel', label: 'Mid Level' },
  { id: 'expertLevel', value: 'expertLevel', label: 'Expert Level' },
];

export const genders = [
  { id: 'male', value: 'male', label: 'Nam' },
  { id: 'female', value: 'female', label: 'Nữ' },
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
};

export const comments: Comment[] = [
  {
    id: 1,
    content: 'Quá đỉnh :>>',
    created_date: new Date(),
    post_id: 1,
    user_id: 1,
    parent_comment_id: null,
  },
  {
    id: 2,
    content: 'Quá đỉnh luôn :>>',
    created_date: new Date(),
    post_id: 1,
    user_id: 1,
    parent_comment_id: null,
  },
  {
    id: 3,
    content: 'Sub comment 1 :>>',
    created_date: new Date(),
    post_id: 1,
    user_id: 1,
    parent_comment_id: 1,
  },
  {
    id: 4,
    content: 'Quá là đ :>>',
    created_date: new Date(),
    post_id: 1,
    user_id: 1,
    parent_comment_id: null,
  },
  {
    id: 5,
    content: 'Quá đỉnh luôn :>>',
    created_date: new Date(),
    post_id: 1,
    user_id: 1,
    parent_comment_id: 2,
  },
];
