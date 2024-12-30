// components/Navbar.tsx
'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="p-4 bg-white shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My App</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}