"use client";

import { FadeIn, SlideIn } from "@/components/ui/Animations";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ChevronRight, Layout } from "lucide-react";
import Link from "next/link";

const TEMPLATES = [
    {
        id: "modern",
        name: "Modern Executive",
        description: "High-impact design for senior management and leadership roles.",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400",
        tags: ["Executive", "Corporate", "ATS-Friendly"],
    },
    {
        id: "tech-spec",
        name: "Tech Specialist",
        description: "Optimized for developers and engineers, highlighting tech stacks and projects.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400",
        tags: ["Software", "Projects", "Modern"],
    },
    {
        id: "creative",
        name: "Creative Visionary",
        description: "Bold aesthetics for designers, artists, and marketing strategists.",
        image: "https://images.unsplash.com/photo-1586282391129-59a998bd1160?auto=format&fit=crop&q=80&w=400",
        tags: ["Visual", "Portfolio", "Dynamic"],
    },
    {
        id: "retail-pro",
        name: "Customer Service Pro",
        description: "Perfect for retail, hospitality, and front-of-house professionals.",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=400",
        tags: ["Service", "Reliable", "Skills"],
    },
    {
        id: "finance",
        name: "Finance & Analytics",
        description: "Traditional and precise design for accounting and data professionals.",
        image: "https://images.unsplash.com/photo-1454165833762-01d0bf7e7a0e?auto=format&fit=crop&q=80&w=400",
        tags: ["Precise", "Formal", "Data"],
    },
    {
        id: "minimal",
        name: "Minimalist Scholar",
        description: "Elegant, whitespace-focused layout for academic and entry-level roles.",
        image: "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?auto=format&fit=crop&q=80&w=400",
        tags: ["Simple", "Academic", "Clean"],
    },
];

export default function TemplatesPage() {
    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <FadeIn>
                    <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 ring-1 ring-inset ring-blue-600/20 mb-6 uppercase tracking-wider">
                        Premium Layouts
                    </div>
                </FadeIn>
                <SlideIn direction="up" delay={0.1}>
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-6xl mb-6">
                        Choose Your <span className="text-blue-600">Winning Template</span>
                    </h1>
                </SlideIn>
                <FadeIn delay={0.2}>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        All our templates are tested against major ATS systems to ensure your resume gets seen by human recruiters.
                    </p>
                </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TEMPLATES.map((template, index) => (
                    <FadeIn key={template.id} delay={0.1 * index}>
                        <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex items-end p-8">
                                    <Link href={`/builder?template=${template.id}`} className="w-full">
                                        <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold">
                                            Use This Template
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {template.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                                <p className="text-gray-500 text-sm">{template.description}</p>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>

            {/* CTA Section */}
            <div className="mt-24 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <Layout className="w-16 h-16 mx-auto mb-6 opacity-80" />
                    <h2 className="text-3xl font-bold mb-4">Haven't found the right one?</h2>
                    <p className="text-blue-100 max-w-xl mx-auto mb-8">
                        Don't worry, even our simplest templates are optimized for maximum visibility. Our AI does the heavy lifting regardless of layout.
                    </p>
                    <Link href="/builder">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 rounded-full font-bold">
                            Start Building Now <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
                {/* Subtle decorative circles */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
            </div>
        </div>
    );
}
