import { ResumeContent } from "@/types";

export const SAMPLE_RESUME_DATA: ResumeContent = {
    personalInfo: {
        fullName: "Alex Rivera",
        email: "alex.rivera@example.com",
        phone: "+1 (555) 012-3456",
        location: "San Francisco, CA",
        website: "alexrivera.dev",
        linkedin: "linkedin.com/in/alexrivera",
        github: "github.com/alexrivera"
    },
    summary: "Innovative Full-Stack Developer with 6+ years of experience building scalable web applications. Expert in React, Node.js, and cloud architecture. Proven track record of improving system performance by 40% and leading cross-functional teams to deliver high-impact products.",
    experience: [
        {
            id: "1",
            company: "TechFlow Systems",
            position: "Senior Software Engineer",
            startDate: "2021-03",
            endDate: "Present",
            current: true,
            location: "San Francisco, CA",
            description: "Led the migration of a legacy monolithic architecture to a microservices-based system using Next.js and AWS.\nOptimized database queries reducing latency by 30%.\nMentored 5 junior developers and implemented standardized code review processes."
        },
        {
            id: "2",
            company: "Innovate AI",
            position: "Full Stack Developer",
            startDate: "2018-06",
            endDate: "2021-02",
            current: false,
            location: "Austin, TX",
            description: "Developed and maintained several high-traffic client-facing web applications.\nIntegrated AI-powered search functionality increasing user engagement by 25%.\nCollaborated with UI/UX designers to implement pixel-perfect responsive designs."
        }
    ],
    education: [
        {
            id: "1",
            institution: "Stanford University",
            degree: "Bachelor of Science",
            fieldOfStudy: "Computer Science",
            startDate: "2014-09",
            endDate: "2018-05",
            current: false
        }
    ],
    skills: [
        { id: "1", name: "React / Next.js", level: "Expert" },
        { id: "2", name: "TypeScript", level: "Expert" },
        { id: "3", name: "Node.js", level: "Advanced" },
        { id: "4", name: "PostgreSQL", level: "Advanced" },
        { id: "5", name: "AWS / Cloud Solutions", level: "Intermediate" },
        { id: "6", name: "UI/UX Design", level: "Intermediate" }
    ],
    projects: [
        {
            id: "1",
            name: "AI Portfolio Builder",
            description: "A platform that uses LLMs to generate professional portfolios from GitHub profiles.",
            technologies: ["Next.js", "OpenAI API", "Tailwind CSS"],
            url: "https://aiportfolio.dev"
        }
    ]
};
