"use client";

import Link from 'next/link';
import { ArrowRight, Sparkles, FileText, CheckCircle2, Zap, Layout, BarChart, ShieldCheck } from 'lucide-react';
import { FadeIn, SlideIn } from '@/components/ui/Animations';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50 animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-100 rounded-full blur-[100px] opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
          <FadeIn>
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-bold text-blue-600 bg-blue-50 border border-blue-100 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Revolutionizing Careers with AI
            </div>
          </FadeIn>

          <SlideIn direction="up" delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Land Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Dream Job</span> <br className="hidden md:block" /> with AI Precision
            </h1>
          </SlideIn>

          <FadeIn delay={0.2}>
            <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              Join 50,000+ professionals using the world's most advanced AI Resume Builder. Optimized for ATS, designed for recruiters, and built for results.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/builder">
                <Button size="lg" className="h-16 px-10 text-lg font-bold shadow-2xl shadow-blue-500/40 rounded-2xl group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:opacity-90 transition-opacity"></div>
                  <span className="relative flex items-center text-white">
                    Start Building Free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Smarter Resumes, Faster</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">Focused on results. Powered by advanced AI intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Zap,
                title: "AI Writing Assistant",
                desc: "Our AI transforms your basic notes into professional, high-impact career achievements instantly.",
                color: "blue"
              },
              {
                icon: ShieldCheck,
                title: "Recruiter Ready",
                desc: "Every resume is structured to be perfectly readable by both ATS systems and human recruiters.",
                color: "indigo"
              },
              {
                icon: FileText,
                title: "Visual Real-time Preview",
                desc: "See your resume update instantly as you type with our split-screen live preview mode.",
                color: "purple"
              }
            ].map((f, i) => (
              <SlideIn key={i} direction="up" delay={0.1 * i}>
                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all h-full group">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-${f.color}-50 text-${f.color}-600 group-hover:scale-110 transition-transform`}>
                    <f.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{f.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">{f.desc}</p>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-10 blur-3xl rounded-full scale-150 transform -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to update your career?</h2>
          <p className="text-gray-400 text-xl mb-12 font-medium">It takes less than 10 minutes to create a world-class resume with our AI.</p>
          <Link href="/builder">
            <Button size="lg" className="h-16 px-12 text-xl font-bold bg-white text-gray-900 hover:bg-gray-100 rounded-2xl shadow-2xl shadow-white/10">
              Build My Resume Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
