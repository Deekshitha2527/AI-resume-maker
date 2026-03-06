import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

// Used placeholder generic error responses as Auth isn't strictly enforced yet
export async function GET() {
    try {
        const supabase = createClient();

        // In a real app with Auth, we'd get the user session first
        // For now, we'll fetch all resumes assuming a single user testing locally
        const { data: resumes, error } = await supabase
            .from('resumes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Supabase GET error:", error);
            // Suppress hard failure for now to allow local testing if DB is empty/unconfigured
            return NextResponse.json({ resumes: [] });
        }

        return NextResponse.json({ resumes });
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch resumes" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const supabase = createClient();
        const body = await req.json();
        const { title, content } = body;

        // We can insert with Auth handled by Supabase policies, or bypass for local testing
        const { data, error } = await supabase
            .from('resumes')
            .insert([
                {
                    title: title || 'Untitled Resume',
                    content: content,
                    // user_id would be inserted here
                }
            ])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ resume: data });
    } catch (error: unknown) {
        console.error("Supabase POST error:", error);
        return NextResponse.json(
            { error: "Failed to create resume" },
            { status: 500 }
        );
    }
}
