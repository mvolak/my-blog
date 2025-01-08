// app/dashboard/page.tsx
import { Navbar } from '@/components/Navbar';
import BlogLayout from '@/components/BlogLayout';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      <Navbar />
      <BlogLayout />
    </div>
  );
}