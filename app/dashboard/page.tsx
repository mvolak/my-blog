// app/dashboard/page.tsx
import BlogLayout from '@/components/BlogLayout';
import { Navbar } from '@/components/Navbar';
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
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {session.user.email}
        </h1>
        {/* Your dashboard content */}
        <p>Your dashboard content </p>
        <BlogLayout/>
      </main>
    </div>
  );
}