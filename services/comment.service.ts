import http from '.';

export const CommentService = {
  deleteComment: async (id: number) => {
    const res = await http.delete(`api/comments/${id}`);
    return res.data;
  },
  updateComment: async (id: number, content: string) => {
    const res = await http.patch(`api/comments/${id}`, { content });
    return res.data;
  },
};
