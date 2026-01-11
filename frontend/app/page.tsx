"use client";

import { useEffect, useState } from "react";
import { Post } from "./types/post";
import { PostCard } from "@/components/PostCard";
import { PostForm } from "@/components/PostForm";
import { PostsService } from "./lib/service/posts.service";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    const data = await PostsService.getAll();
    setPosts(data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreate = async () => {
    if (!title || !content) return;
    setLoading(true);
    await PostsService.create(title, content);
    setTitle("");
    setContent("");
    await loadPosts();
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await PostsService.delete(id);
    await loadPosts();
  };

  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Rust Blog</h1>

      <PostForm
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        onSubmit={handleCreate}
        isLoading={loading}
      />

      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </main>
  );
}
