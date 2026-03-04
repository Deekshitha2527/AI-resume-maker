import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { ResumeFormData } from '@/types';

export async function POST(req: Request) {
    try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body: ResumeFormData = await req.json();
        const { name, email, phone, summary, skills, experience, education, projects } = body;

        const prompt = `
      You are an expert resume writer. Create a professional resume for the following person.
      Use professional, action-oriented language. Keep the formatting clean and clear.

      PERSONAL INFORMATION:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}

      SUMMARY:
      ${summary}

      SKILLS:
      ${skills}

      WORK EXPERIENCE:
      ${experience}

      EDUCATION:
      ${education}

      PROJECTS:
      ${projects}

      IMPORTANT: Return the resume in a clear, formatted professional layout using simple text headers. 
      Do not include any conversational filler before or after the resume. 
      Start directly with the name.
    `;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://github.com/Bytematic/ai-resume-maker', // Optional
                'X-Title': 'AI Resume Maker', // Optional
            },
            body: JSON.stringify({
                model: 'mistralai/mistral-7b-instruct:free',
                messages: [
                    { role: 'user', content: prompt }
                ],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('OpenRouter Error:', data);
            throw new Error(data.error?.message || 'AI Generation failed');
        }

        const generatedResume = data.choices[0].message.content;

        // Save to database
        const { data: resume, error: dbError } = await supabase
            .from('resumes')
            .insert({
                user_id: user.id,
                name: name,
                email: email,
                content: generatedResume,
            })
            .select()
            .single();

        if (dbError) {
            console.error('Database Error:', dbError);
            throw new Error('Failed to save resume to database');
        }

        return NextResponse.json({ id: resume.id });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
