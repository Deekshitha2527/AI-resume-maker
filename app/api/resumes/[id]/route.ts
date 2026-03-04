import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data: resume, error } = await supabase
            .from('resumes')
            .select('*')
            .eq('id', params.id)
            .eq('user_id', user.id)
            .single();

        if (error) throw error;
        if (!resume) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        return NextResponse.json(resume);
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message || 'Failed to fetch resume' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { error } = await supabase
            .from('resumes')
            .delete()
            .eq('id', params.id)
            .eq('user_id', user.id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message || 'Failed to delete resume' },
            { status: 500 }
        );
    }
}
