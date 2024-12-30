// app/posts/[slug]/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from '@/lib/supabase'
import type { Post } from '@/types'

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { data: post } = await supabase
    .from('posts')
    .select(`
      *,
      categories (name),
      profiles (username)
    `)
    .eq('id', params.slug)
    .single() as { data: Post | null }

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
          <div className="text-gray-500">
            By {post.profiles?.username} in {post.categories?.name}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {post.content}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}