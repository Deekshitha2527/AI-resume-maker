import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { ENHANCE_EXPERIENCE_PROMPT, ENHANCE_SUMMARY_PROMPT } from "@/lib/prompt-engineering/templates";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, data } = body;

        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json(
                { error: "Groq API key is not configured" },
                { status: 500 }
            );
        }

        let prompt = "";

        if (type === "experience") {
            prompt = ENHANCE_EXPERIENCE_PROMPT
                .replace("{company}", data.company || "Unknown Company")
                .replace("{position}", data.position || "Unknown Position")
                .replace("{description}", data.description || "");
        } else if (type === "summary") {
            prompt = ENHANCE_SUMMARY_PROMPT
                .replace("{name}", data.name || "A professional")
                .replace("{roles}", data.roles || "")
                .replace("{skills}", data.skills || "")
                .replace("{summary}", data.summary || "");
        } else {
            return NextResponse.json({ error: "Invalid enhancement type" }, { status: 400 });
        }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama3-70b-8192",
            temperature: 0.5,
            response_format: { type: "json_object" },
        });

        const responseContent = completion.choices[0]?.message?.content;

        if (!responseContent) {
            throw new Error("Failed to generate content from AI");
        }

        const result = JSON.parse(responseContent);
        return NextResponse.json({ result });

    } catch (error: unknown) {
        console.error("AI Generation Edit:", error);
        const msg = error instanceof Error ? error.message : "Failed to process request";
        return NextResponse.json(
            { error: msg },
            { status: 500 }
        );
    }
}
