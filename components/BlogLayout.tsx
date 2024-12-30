"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import { useRouter } from "next/navigation"

const BlogLayout = () => {
    const router = useRouter()

  // Sample blog posts data - this would come from Supabase in a real implementation
  const posts = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      description: "Learn the basics of Next.js and how to create your first app",
      date: "2024-12-29",
      readTime: "5 min read",
      author: "John Doe"
    },
    {
      id: 2,
      title: "Working with Supabase",
      description: "How to integrate Supabase with your Next.js application",
      date: "2024-12-28",
      readTime: "7 min read",
      author: "Jane Smith"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">My Blog</h1>
        <p className="text-gray-600">Sharing thoughts and experiences</p>
      </header>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl hover:text-blue-600 cursor-pointer">
                {post.title}
              </CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 text-gray-500">
                  <CalendarDays className="w-4 h-4" />
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{post.description}</p>
            </CardContent>
            <CardFooter>
              {/* <Button variant="outline">Read More</Button> */}
                <Button
                    variant="outline"
                    onClick={() => router.push(`/posts/${post.id}`)}
                >
                    Read More
                </Button>
                <Button
                    onClick={() => router.push('/posts/create')}
                >
                    Create New Post
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogLayout;