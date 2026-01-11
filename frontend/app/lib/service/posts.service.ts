import api from "../axios/axios";
import { ENDPOINTS } from "../api/endpoints";
import { Post } from "../../types/post";

export const PostsService = {
  getAll: async (): Promise<Post[]> => {
    const res = await api.get<Post[]>(ENDPOINTS.posts);
    return res.data;
  },

  create: async (title: string, content: string): Promise<Post> => {
    const res = await api.post<Post>(ENDPOINTS.posts, { title, content });
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${ENDPOINTS.posts}/${id}`);
  },

  update: async (id: string, title: string, content: string): Promise<Post> => {
    const res = await api.put<Post>(`${ENDPOINTS.posts}/${id}`, {
      title,
      content,
    });
    return res.data;
  },
};
