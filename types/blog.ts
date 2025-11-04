export interface ISpecificationParams {
  page?: number;
  size?: number;
  sort?: string;
  keyword?: string;
}

export interface Blog {
  id: number;
  user_id: number;
  thumbnail: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  cover_image_url: string;
  status?: 'PUBLISHED' | 'DRAFT' | 'REQUESTED';
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
