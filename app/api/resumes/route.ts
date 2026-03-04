import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = createClient();

        // Fetch all resumes publicly (since auth is removed)
        const { data: resumes, error } = await supabase
            .from('resumes')
            .select('*')
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
