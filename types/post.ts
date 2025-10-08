export interface Post {
  id: number;
  user_id: number;
  title: string;
  slug: string;
  content: string;
  description: string;
  cover_image_url: string;
  status?: 'PUBLISHED' | 'DRAFT' | 'PENDING';
  // published_at (DATETIME): Thời điểm xuất bản.
  // created_date (DATETIME): Thời điểm tạo.
  // last_modified_date (DATETIME): Thời điểm cập nhật cuối
}
