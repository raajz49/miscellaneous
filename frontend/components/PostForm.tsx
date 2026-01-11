import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface PostFormProps {
  title: string;
  content: string;
  setTitle: (t: string) => void;
  setContent: (c: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export const PostForm = ({
  title,
  content,
  setTitle,
  setContent,
  onSubmit,
  isLoading,
}: PostFormProps) => (
  <div className="mb-6">
    <Input
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="mb-2"
    />
    <Textarea
      placeholder="Content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="mb-2"
    />
    <Button onClick={onSubmit} disabled={isLoading}>
      {isLoading ? "Saving..." : "Create Post"}
    </Button>
  </div>
);
