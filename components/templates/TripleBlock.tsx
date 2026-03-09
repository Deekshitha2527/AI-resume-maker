import { ResumeContent } from "@/types";

export default function TripleBlock({ data }: { data: ResumeContent }) {
    return (
        <div className="min-h-full bg-white font-sans border-[20px] border-gray-900 p-0">
            {/* Header Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 overflow-hidden border-b-[20px] border-gray-900">
                <div className="bg-gray-900 p-10 text-white flex flex-col justify-center">
                    <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4">
                        {data.personalInfo.fullName || "Name"}
                    </h1>
                    <p className="text-teal-400 text-[10px] font-black uppercase tracking-[0.3em]">Lead Architect</p>
                </div>
                <div className="bg-teal-700 p-10 text-white col-span-2 flex items-center">
                    <div className="flex flex-wrap gap-x-12 gap-y-4 text-[11px] font-bold uppercase tracking-widest opacity-90">
                        {data.personalInfo.email && <div className="flex items-center gap-2"><span className="opacity-50">E</span> {data.personalInfo.email}</div>}
                        {data.personalInfo.phone && <div className="flex items-center gap-2"><span className="opacity-50">T</span> {data.personalInfo.phone}</div>}
                        {data.personalInfo.location && <div className="flex items-center gap-2"><span className="opacity-50">L</span> {data.personalInfo.location}</div>}
                    </div>
                </div>
            </div>

            <div className="p-10 space-y-12">
                {data.summary && (
                    <div className="max-w-3xl">
                        <h2 className="text-xs font-black uppercase mb-6 tracking-[0.2em] text-gray-400">Strategic Profile</h2>
                        <p className="text-[14px] leading-relaxed text-gray-800 font-medium whitespace-pre-wrap">{data.summary}</p>
                    </div>
                )}

                {data.experience.length > 0 && (
                    <div className="space-y-10">
                        <h2 className="text-xs font-black uppercase mb-2 tracking-[0.2em] text-gray-400">Core Experience</h2>
                        <div className="space-y-12">
                            {data.experience.map((exp) => (
                                <div key={exp.id} className="grid md:grid-cols-4 gap-8">
                                    <div className="md:col-span-1">
                                        <p className="text-xs font-black text-teal-600 uppercase tracking-widest">{exp.startDate}</p>
                                        <p className="text-xs font-black text-gray-300 uppercase tracking-widest mt-1">{exp.endDate}</p>
                                    </div>
                                    <div className="md:col-span-3 border-l border-gray-100 pl-8">
                                        <h3 className="font-black text-gray-900 text-lg uppercase mb-1">{exp.position}</h3>
                                        <p className="text-gray-400 text-sm font-bold uppercase mb-4">{exp.company} <span className="mx-2 text-gray-200">/</span> {exp.location}</p>
                                        {exp.description && (
                                            <ul className="space-y-3">
                                                {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                                                    <li key={i} className="text-[14px] text-gray-700 leading-relaxed flex items-start gap-3">
                                                        <div className="w-1.5 h-1.5 bg-gray-900 mt-1.5 shrink-0"></div>
                                                        {line.replace(/^[•\-\*]\s*/, '')}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-gray-100">
                    {data.skills.length > 0 && (
                        <div>
                            <h2 className="text-xs font-black uppercase mb-8 tracking-[0.2em] text-gray-400">Stack & Expertise</h2>
                            <div className="flex flex-wrap gap-3">
                                {data.skills.map((s) => (
                                    <span key={s.id} className="px-4 py-2 bg-gray-900 text-teal-400 text-[10px] font-black uppercase tracking-widest hover:bg-teal-700 hover:text-white transition-all cursor-default">
                                        {s.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.education.length > 0 && (
                        <div>
                            <h2 className="text-xs font-black uppercase mb-8 tracking-[0.2em] text-gray-400">Scholastics</h2>
                            <div className="space-y-6">
                                {data.education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-black text-gray-900 text-sm uppercase mb-1">{edu.institution}</h3>
                                        <p className="text-gray-500 text-xs font-medium uppercase tracking-tight">{edu.degree}</p>
                                        <p className="text-teal-600 text-[10px] font-black mt-1">{edu.startDate} – {edu.endDate}</p>
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
