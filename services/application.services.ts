import http from '.';

const endpointPrefix = '/api/applications';

export const ApplicationServices = {
  async addCV({ title, resumeFile }: { title: string; resumeFile: File }) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('resume', resumeFile);

    const res = await http.post(`${endpointPrefix}/resume`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  async getMyCV() {
    const res = await http.get(`${endpointPrefix}/resumes`);
    return res.data;
  },

  async deleteCV(id: string) {
    const res = await http.delete(`${endpointPrefix}/resume/${id}`);
    return res.data;
  },

  async updateCv({ title, resumeFile, id }: { title?: string; resumeFile?: File; id: string }) {
    const formData = new FormData();
    if (title) formData.append('title', title);
    if (resumeFile) formData.append('resume', resumeFile);

    const res = await http.patch(`${endpointPrefix}/resume/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
};
