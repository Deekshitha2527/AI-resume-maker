import { ResumeContent } from "@/types";

export default function Architect({ data }: { data: ResumeContent }) {
    const firstName = data.personalInfo.fullName?.split(' ')[0] || "Your";
    const restOfName = data.personalInfo.fullName?.split(' ').slice(1).join(' ') || "Name";

    return (
        <div className="p-10 min-h-full bg-stone-50 font-sans text-stone-900">
            {/* Geometric Grid Header */}
            <div className="grid grid-cols-3 border-t-8 border-stone-800 pt-8 mb-16 relative">
                <div className="col-span-2">
                    <h1 className="text-7xl font-black uppercase tracking-tighter leading-[0.7] text-stone-900 mb-4">
                        {firstName}<br />
                        <span className="text-stone-300">{restOfName}</span>
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mb-6"></div>
                    <p className="text-xs font-bold uppercase tracking-[0.4em] text-stone-400">Architectural Solutions Specialist</p>
                </div>
                <div className="flex flex-col items-end justify-start text-[10px] font-bold uppercase tracking-[0.2em] leading-loose text-stone-500 gap-4">
                    <div className="text-right">
                        <p className="text-stone-900 border-b border-stone-200 pb-1 mb-1">Contact</p>
                        {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
                        {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
                    </div>
                    <div className="text-right">
                        <p className="text-stone-900 border-b border-stone-200 pb-1 mb-1">Location</p>
                        {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
                    </div>
                </div>

                {/* Decorative Grid Line */}
                <div className="absolute top-0 right-1/3 bottom-0 w-[1px] bg-stone-100 -z-10 translate-x-1/2"></div>
            </div>

            <div className="grid grid-cols-3 gap-16">
                {/* Sidebar Info */}
                <div className="col-span-1 space-y-16">
                    {data.skills.length > 0 && (
                        <div>
                            <h2 className="text-[10px] font-black uppercase mb-8 tracking-[0.4em] text-stone-300">Toolsets</h2>
                            <div className="space-y-4">
                                {data.skills.map((s) => (
                                    <div key={s.id} className="flex flex-col gap-1">
                                        <span className="text-[11px] font-bold uppercase text-stone-800">{s.name}</span>
                                        <div className="w-full h-0.5 bg-stone-200">
                                            <div className="w-4/5 h-full bg-stone-800"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.education.length > 0 && (
                        <div>
                            <h2 className="text-[10px] font-black uppercase mb-8 tracking-[0.4em] text-stone-300">Foundation</h2>
                            <div className="space-y-8">
                                {data.education.map((edu) => (
                                    <div key={edu.id} className="group">
                                        <h3 className="font-bold text-stone-900 text-xs uppercase mb-1 tracking-wider">{edu.institution}</h3>
                                        <p className="text-stone-500 text-[10px] font-medium leading-tight mb-2 italic">{edu.degree}</p>
                                        <p className="text-[9px] font-black text-stone-400 uppercase tracking-tighter">{edu.startDate} – {edu.endDate}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Sections */}
                <div className="col-span-2 space-y-16 border-l border-stone-100 pl-16">
                    {data.summary && (
                        <div>
                            <h2 className="text-[10px] font-black uppercase mb-8 tracking-[0.4em] text-stone-300">Objective</h2>
                            <p className="text-[15px] leading-relaxed text-stone-800 font-medium whitespace-pre-wrap italic">
                                {data.summary}
                            </p>
                        </div>
                    )}

                    {data.experience.length > 0 && (
                        <div>
                            <h2 className="text-[10px] font-black uppercase mb-8 tracking-[0.4em] text-stone-300">Structural Career</h2>
                            <div className="space-y-16">
                                {data.experience.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        <div className="flex flex-col mb-4">
                                            <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-2">{exp.startDate} – {exp.endDate}</span>
                                            <h3 className="font-bold text-stone-900 text-2xl uppercase tracking-tighter leading-none mb-2 underline decoration-stone-200 decoration-4 underline-offset-8">{exp.position}</h3>
                                            <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em]">{exp.company} <span className="mx-2 text-stone-400">•</span> {exp.location}</p>
                                        </div>
                                        {exp.description && (
                                            <div className="space-y-4 text-[14px] text-stone-600 leading-relaxed max-w-lg">
                                                {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                                                    <p key={i}>
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
