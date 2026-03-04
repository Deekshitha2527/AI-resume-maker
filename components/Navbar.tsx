'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from './ui/Button';
import { toast } from 'react-hot-toast';

export default function Navbar({ userEmail }: { userEmail?: string | null }) {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        toast.success('Logged out');
        router.push('/login');
        router.refresh();
    };

    return (
        <nav className="border-b bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-blue-600">
                            Resume AI
                        </Link>
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/builder" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                Create New
                            </Link>
                            <Link href="/history" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                History
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {userEmail && (
                            <span className="text-sm text-gray-500 mr-2 hidden sm:inline">
                                {userEmail}
                            </span>
                        )}
                        <Button variant="outline" size="sm" onClick={handleSignOut}>
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
