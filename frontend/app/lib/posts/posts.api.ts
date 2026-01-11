import api from "../axios/axios";
import { ENDPOINTS } from "../api/endpoints";

export type Post = {
  id: string;
  title: string;
  content: string;
};

export const PostsAPI = {
  getAll: async (): Promise<Post[]> => {
    const res = await api.get<Post[]>(ENDPOINTS.posts);
    return res.data;
  },

  create: async (title: string, content: string): Promise<void> => {
    await api.post(ENDPOINTS.posts, { title, content });
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${ENDPOINTS.posts}/${id}`);
  },
};
