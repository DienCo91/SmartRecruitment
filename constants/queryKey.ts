export const QueryKey = {
  comment: {
    all: ['comment'] as const,
    blogs: () => [...QueryKey.comment.all, 'blog'] as const,
    blog: (id: number) => [...QueryKey.comment.blogs(), id] as const,
  },
};
