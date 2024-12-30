"use client";
import { useState, useEffect } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Post } from '@/types';
import PostCard from './PostCard';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createServerComponentClient({ cookies: cookies });
      const { data, error } = await supabase
        .from('posts')
        .select('*');

      if (error) {
        console.error(error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}