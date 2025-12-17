import { GlassDialog } from '@/components/client/Dialogs/GlassDialog';
import { Button } from '@/components/ui/button';
import { BlogService } from '@/services/blog.service';
import { Blog } from '@/types/blog';
import { EyeIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { AdminBlogColumns } from './Columns';
import { Typography } from '@/components/ui/typography';
import { format } from 'date-fns';
import { DecorateContent } from '@/components/client/Jobs/DecorateContent';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';

interface Props {
  blog: AdminBlogColumns;
}

export function DetailBlogAction({ blog: infoBlog }: Props) {
  const [showDialogDetail, setShowDialogDetail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<Blog>();

  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true);
      const blog = (await BlogService.getBlogById(infoBlog.id)).data as Blog;
      setBlog(blog);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [infoBlog.id]);

  useEffect(() => {
    if (showDialogDetail) fetchBlog();
  }, [fetchBlog, showDialogDetail]);

  return (
    <div>
      <Button variant="ghost" onClick={() => setShowDialogDetail(true)}>
        <EyeIcon size={18} />
      </Button>

      {showDialogDetail && (
        <GlassDialog
          open
          onClose={() => setShowDialogDetail(false)}
          title={`Chi tiết blog: ${infoBlog.title}`}
        >
          {loading ? (
            <LoadingCircle spinColor="white" />
          ) : (
            <div className="space-y-3">
              <Typography variant="small" className="text-white/50">
                Ngày đăng: {format(blog?.publishedAt ?? new Date(), 'dd-MM-yyyy')}
              </Typography>
              <DecorateContent title="Mô tả" content={blog?.description || ''} />
              <DecorateContent title="Nội dung" content={blog?.content || ''} />
            </div>
          )}
        </GlassDialog>
      )}
    </div>
  );
}
