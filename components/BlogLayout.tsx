'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { format } from 'date-fns';

interface Post {
  id: number;
  title: string;
  description: string;
  created_at: string;
  read_time: string;
  author: string;
}

const BlogLayout = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setPosts(data || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Set up real-time subscription
    const channel = supabase
      .channel('posts_channel')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'posts' 
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setPosts(current => [payload.new as Post, ...current]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const handleCreatePost = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/login');
      return;
    }
    
    router.push('/posts/create');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-600">
        Error loading posts: {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-12 flex justify-between items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">My Blog</h1>
          <p className="text-gray-600">Sharing thoughts and experiences</p>
        </div>
        <Button
          onClick={handleCreatePost}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Create New Post
        </Button>
      </header>

      <div className="grid gap-6">
        {posts.length === 0 ? (
          <Card className="w-full">
            <CardContent className="p-6 text-center text-gray-500">
              No posts yet. Be the first to create one!
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl hover:text-blue-600 cursor-pointer">
                  {post.title}
                </CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 text-gray-500">
                    <CalendarDays className="w-4 h-4" />
                    <span>{format(new Date(post.created_at), 'PP')}</span>
                    <span>•</span>
                    <span>{post.read_time}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{post.description}</p>
              </CardContent>
              <CardFooter className="gap-4">
                <Button
                  variant="outline"
                  onClick={() => router.push(`/posts/${post.id}`)}
                >
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogLayout;