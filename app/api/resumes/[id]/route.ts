import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const supabase = createClient();
        const { id } = params;

        const { data: resume, error } = await supabase
            .from('resumes')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return NextResponse.json({ error: "Resume not found" }, { status: 404 });
        }

        return NextResponse.json({ resume });
    } catch {
        return NextResponse.json(
            { error: "Failed to fetch resume" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const supabase = createClient();
        const { id } = params;
        const body = await req.json();
        const { title, content } = body;

        const { data, error } = await supabase
            .from('resumes')
            .update({ title, content, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ resume: data });
    } catch (error: unknown) {
        console.error("Supabase PUT error:", error);
        return NextResponse.json(
            { error: "Failed to update resume" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const supabase = createClient();
        const { id } = params;

        const { error } = await supabase
            .from('resumes')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error("Supabase DELETE error:", error);
        return NextResponse.json(
            { error: "Failed to delete resume" },
            { status: 500 }
        );
    }
}
