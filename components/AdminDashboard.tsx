'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import type { Post, Category } from '@/types'

const AdminDashboard = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    content: '',
    category_id: ''
  })
  const router = useRouter()

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [])

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select(`
        *,
        categories (name, slug),
        profiles (username)
      `)
      
    setPosts(data || [])
  }

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
    setCategories(data || [])
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      alert('You must be logged in to create a post')
      return
    }
    
    const { data, error } = await supabase
      .from('posts')
      .insert([
        { ...newPost, user_id: user.id }
      ])

    if (error) {
      alert(error.message)
    } else {
      setNewPost({
        title: '',
        description: '',
        content: '',
        category_id: ''
      })
      fetchPosts()
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={newPost.category_id}
                onValueChange={(value) => setNewPost({...newPost, category_id: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Rest of your form */}
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Posts</h2>
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-gray-500">
                    Category: {post.categories?.name} | Author: {post.profiles?.username}
                  </p>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/posts/${post.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this post?')) {
                        await supabase.from('posts').delete().eq('id', post.id)
                        fetchPosts()
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard