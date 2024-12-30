import type { Post } from '@/types';

export default function PostCard({ post }: { post: Post }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
}