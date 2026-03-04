import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data: resumes, error } = await supabase
            .from('resumes')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(resumes);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message || 'Failed to fetch resumes' },
            { status: 500 }
        );
    }
}
