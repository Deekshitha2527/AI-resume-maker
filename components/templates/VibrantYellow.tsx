import { ResumeContent } from "@/types";

export default function VibrantYellow({ data }: { data: ResumeContent }) {
    return (
        <div className="p-12 min-h-full bg-[#FFDE59] font-sans text-black">
            {/* Header */}
            <div className="mb-12 border-b-8 border-black pb-12">
                <h1 className="text-8xl font-black text-black uppercase tracking-tighter leading-[0.8] mb-8">
                    {data.personalInfo.fullName || "Your Name"}
                </h1>
                <div className="flex flex-wrap gap-10 text-xs font-black uppercase tracking-[0.2em] text-black/60">
                    {data.personalInfo.email && <span className="underline decoration-4 underline-offset-8">{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span className="underline decoration-4 underline-offset-8">{data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Left Col - Briefs */}
                <div className="md:col-span-1 border-r-4 border-black pr-8 space-y-12">
                    {data.skills.length > 0 && (
                        <div>
                            <h2 className="text-xs font-black uppercase mb-6 tracking-widest bg-black text-yellow-400 px-2 py-1 inline-block">Power</h2>
                            <div className="space-y-3">
                                {data.skills.map((s) => (
                                    <p key={s.id} className="text-[11px] font-black uppercase tracking-widest">{s.name}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.education.length > 0 && (
                        <div>
                            <h2 className="text-xs font-black uppercase mb-6 tracking-widest bg-black text-yellow-400 px-2 py-1 inline-block">Base</h2>
                            <div className="space-y-6">
                                {data.education.map((edu) => (
                                    <div key={edu.id}>
                                        <p className="text-[10px] font-black uppercase leading-tight">{edu.institution}</p>
                                        <p className="text-[9px] font-bold mt-1 opacity-60">{edu.degree}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Col - Core */}
                <div className="md:col-span-3 space-y-16">
                    {data.summary && (
                        <div>
                            <h2 className="text-xs font-black uppercase mb-6 tracking-[0.2em] text-black underline decoration-4 underline-offset-4">Mission Statement</h2>
                            <p className="text-xl font-black leading-tight text-black">{data.summary}</p>
                        </div>
                    )}

                    {data.experience.length > 0 && (
                        <div className="space-y-12">
                            <h2 className="text-xs font-black uppercase mb-10 tracking-[0.2em] text-black underline decoration-4 underline-offset-4">Success History</h2>
                            <div className="space-y-16">
                                {data.experience.map((exp) => (
                                    <div key={exp.id} className="relative group">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-4xl font-black text-black uppercase tracking-tighter leading-none">{exp.position}</h3>
                                            <span className="text-xs font-black bg-black text-yellow-400 px-3 py-1 uppercase">{exp.startDate} – {exp.endDate}</span>
                                        </div>
                                        <p className="text-sm font-black uppercase mb-6 opacity-60">{exp.company} <span className="mx-2">/</span> {exp.location}</p>
                                        {exp.description && (
                                            <div className="space-y-4 max-w-2xl border-l-8 border-black pl-8 ml-2">
                                                {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                                                    <p key={i} className="text-[15px] font-black leading-tight text-black">
                                                        {line.replace(/^[•\-\*]\s*/, '')}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
