import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/Navbar';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar userEmail={user.email} />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
