// // app/auth/page.tsx

// import AuthComponent from "@/components/AuthComponent";


// export default function AuthPage() {
//   return <AuthComponent />
// }

// app/(auth)/login/page.tsx
// import { LoginPage } from '@/components/LoginPage';
import LoginPage from '@/components/LoginPage';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Login() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect('/dashboard');
  }

  return <LoginPage />;
}