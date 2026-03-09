import { ResumeContent } from "@/types";

export default function TechSpecialist({ data }: { data: ResumeContent }) {
    return (
        <div className="p-10 min-h-full bg-slate-950 font-mono text-slate-300">
            {/* Dev Header */}
            <div className="mb-10 border-b border-slate-800 pb-8">
                <div className="text-blue-500 mb-2">class <span className="text-yellow-400">SoftwareEngineer</span> {"{"}</div>
                <div className="pl-6 space-y-1">
                    <h1 className="text-4xl font-bold text-white tracking-tight italic">
                        const name = <span className="text-green-400">&quot;{data.personalInfo.fullName || "Your Name"}&quot;</span>;
                    </h1>
                    <p className="text-sm">
                        const location = <span className="text-green-400">&quot;{data.personalInfo.location}&quot;</span>;
                    </p>
                    <div className="flex gap-4 text-xs pt-1">
                        <span className="text-slate-500">{"// "}{data.personalInfo.email}</span>
                        <span className="text-slate-500">{"// "}{data.personalInfo.phone}</span>
                    </div>
                </div>
                <div className="text-blue-500 mt-2">{"}"}</div>
            </div>

            <div className="space-y-10">
                {data.summary && (
                    <div>
                        <div className="text-blue-500 mb-2">/** Summary */</div>
                        <p className="text-sm leading-relaxed text-slate-400 border-l-2 border-slate-800 pl-6">
                            {data.summary}
                        </p>
                    </div>
                )}

                {data.skills.length > 0 && (
                    <div>
                        <div className="text-blue-500 mb-4">const <span className="text-yellow-400">techStack</span> = [</div>
                        <div className="pl-6 flex flex-wrap gap-2">
                            {data.skills.map((s) => (
                                <span key={s.id} className="text-green-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded text-xs">
                                    &quot;{s.name}&quot;
                                </span>
                            ))}
                        </div>
                        <div className="text-blue-500 mt-2">];</div>
                    </div>
                )}

                {data.experience.length > 0 && (
                    <div className="space-y-8">
                        <div className="text-blue-500 mb-4">async function <span className="text-yellow-400">getExperience</span>() {"{"}</div>
                        <div className="pl-6 space-y-10 border-l border-slate-900">
                            {data.experience.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-white font-bold text-lg underline decoration-blue-500 underline-offset-4">{exp.position}</h3>
                                        <span className="text-xs text-slate-500 font-bold">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <div className="text-sm text-yellow-400 mb-4 opacity-80 mt-1">{exp.company} @ {exp.location}</div>
                                    {exp.description && (
                                        <div className="space-y-2 text-sm text-slate-400 pl-4 border-l border-slate-800">
                                            {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                                                <p key={i}>
                                                    <span className="text-blue-600 mr-2 opacity-50">&gt;</span>
                                                    {line.replace(/^[•\-\*]\s*/, '')}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="text-blue-500 mt-2">{"}"}</div>
                    </div>
                )}

                {data.education.length > 0 && (
                    <div className="pt-10 border-t border-slate-900">
                        <div className="text-slate-600 text-[10px] mb-4 uppercase tracking-[0.2em]">Academic Context</div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {data.education.map((edu) => (
                                <div key={edu.id} className="border border-slate-800 p-4 rounded bg-slate-900/50">
                                    <h4 className="text-white text-xs font-bold mb-1">{edu.institution}</h4>
                                    <p className="text-slate-500 text-[11px]">{edu.degree} in {edu.fieldOfStudy}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
