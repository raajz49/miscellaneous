import { Post } from "@/app/lib/posts/posts.api";
import { Button } from "./ui/button";

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
  onEdit?: (post: Post) => void;
}

export const PostCard = ({ post, onDelete, onEdit }: PostCardProps) => (
  <div className="p-4 border rounded-md shadow-sm mb-4">
    <h3 className="font-bold text-lg">{post.title}</h3>
    <p className="mt-2">{post.content}</p>
    <div className="flex gap-2 mt-2">
      <Button variant="destructive" size="sm" onClick={() => onDelete(post.id)}>
        Delete
      </Button>
      {onEdit && (
        <Button variant="secondary" size="sm" onClick={() => onEdit(post)}>
          Edit
        </Button>
      )}
    </div>
  </div>
);
