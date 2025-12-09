import http from '.';

export const CommentService = {
  deleteComment: async (id: number) => {
    const res = await http.delete(`api/comments/${id}`);
    return res.data;
  },
};
