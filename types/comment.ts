export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  parent_comment_id?: number | null;
  content: string;
  created_date: Date;
  last_modified_date?: Date;
  childs: Comment[];
}
