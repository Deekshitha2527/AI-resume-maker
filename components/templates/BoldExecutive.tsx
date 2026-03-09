import { ResumeContent } from "@/types";

export default function BoldExecutive({ data }: { data: ResumeContent }) {
    const firstName = data.personalInfo.fullName?.split(' ')[0] || "YOUR";
    const restOfName = data.personalInfo.fullName?.split(' ').slice(1).join(' ') || "NAME";

    return (
        <div className="p-0 min-h-full bg-white font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row bg-gray-900 text-white p-12">
                <div className="flex-1">
                    <h1 className="text-6xl font-black uppercase tracking-tighter leading-[0.8] mb-2">
                        {firstName}<br />
                        <span className="text-gray-500">{restOfName}</span>
                    </h1>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.4em] mt-4">Executive Leadership Portfolio</p>
                </div>
                <div className="flex flex-col items-start md:items-end justify-center text-xs font-bold uppercase tracking-widest text-gray-400 gap-2 mt-8 md:mt-0 md:border-l border-gray-800 md:pl-8">
                    {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
                    {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
                    {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
                    {data.personalInfo.linkedin && <p className="text-blue-400">{data.personalInfo.linkedin}</p>}
                </div>
            </div>

            <div className="p-12 space-y-12">
                {data.summary && (
                    <div>
                        <h2 className="text-[13px] font-black uppercase mb-6 tracking-[0.2em] text-gray-900 border-b-2 border-gray-100 pb-2">
                            Executive Summary
                        </h2>
                        <p className="text-[15px] leading-relaxed text-gray-700 font-medium whitespace-pre-wrap">
                            {data.summary}
                        </p>
                    </div>
                )}

                {data.experience.length > 0 && (
                    <div>
                        <h2 className="text-[13px] font-black uppercase mb-8 tracking-[0.2em] text-gray-900 border-b-2 border-gray-100 pb-2">
                            Professional Experience
                        </h2>
                        <div className="space-y-12">
                            {data.experience.map((exp) => (
                                <div key={exp.id} className="relative border-l-4 border-gray-50 pl-8">
                                    <div className="flex flex-col md:flex-row md:justify-between items-baseline mb-4">
                                        <h3 className="font-black text-gray-900 text-xl uppercase tracking-tight">{exp.position}</h3>
                                        <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-1.5 rounded-sm shadow-sm">
                                            {exp.startDate} – {exp.endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-6">
                                        <span className="text-gray-900 font-black text-sm uppercase tracking-wide">{exp.company}</span>
                                        <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">{exp.location}</span>
                                    </div>
                                    {exp.description && (
                                        <ul className="space-y-4">
                                            {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                                                <li key={i} className="text-[14px] text-gray-600 leading-relaxed flex items-start gap-4 italic opacity-90">
                                                    <span className="text-gray-300 font-black">/</span>
                                                    {line.replace(/^[•\-\*]\s*/, '')}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-100 pt-12">
                    {data.education.length > 0 && (
                        <div>
                            <h2 className="text-[13px] font-black uppercase mb-6 tracking-[0.2em] text-gray-900">
                                Education
                            </h2>
                            <div className="space-y-8">
                                {data.education.map((edu) => (
                                    <div key={edu.id} className="bg-gray-50 p-6 rounded-md border border-gray-100">
                                        <h3 className="font-black text-gray-900 text-sm uppercase mb-1">{edu.institution}</h3>
                                        <p className="text-gray-600 text-[12px] font-bold">{edu.degree}</p>
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-2">{edu.startDate} – {edu.endDate}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.skills.length > 0 && (
                        <div>
                            <h2 className="text-[13px] font-black uppercase mb-6 tracking-[0.2em] text-gray-900">
                                Core Competencies
                            </h2>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                                {data.skills.map((s) => (
                                    <div key={s.id} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-700 hover:text-blue-600 transition-colors">
                                        <div className="w-1.5 h-1.5 bg-gray-900 rounded-full"></div>
                                        {s.name}
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
