import { ResumeContent } from "@/types";

export default function Geometric({ data }: { data: ResumeContent }) {
    return (
        <div className="p-0 min-h-full bg-white font-sans border-t-[12px] border-blue-600">
            <div className="relative mb-10 p-10 overflow-hidden border-b-[6px] border-gray-900">
                <div className="absolute top-0 right-0 w-48 h-48 -mr-16 -mt-16 bg-blue-500 rotate-45 opacity-20"></div>
                <div className="absolute top-0 left-1/4 w-32 h-32 -mt-16 bg-green-500 rotate-[30deg] opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 -ml-8 -mb-8 bg-yellow-400 rotate-12 opacity-30"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[20px] border-gray-50 opacity-10 rounded-full"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div className="flex-1">
                        <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">
                            {data.personalInfo.fullName || "Your Name"}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col items-end text-[10px] font-black uppercase tracking-widest text-blue-600 gap-1 mt-4 md:mt-0">
                        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                    </div>
                </div>
            </div>

            <div className="p-10">
                <div className="grid grid-cols-1 gap-2">
                    {data.summary && (
                        <div className="mb-10">
                            <h2 className="text-xs font-black uppercase mb-4 tracking-[0.2em] text-gray-400">
                                Professional Summary
                            </h2>
                            <p className="text-[14px] leading-relaxed text-gray-800 whitespace-pre-wrap">
                                {data.summary}
                            </p>
                        </div>
                    )}

                    <div className="mb-10">
                        <h2 className="text-xs font-black uppercase mb-6 tracking-[0.2em] text-gray-400">
                            Experience
                        </h2>
                        <div className="space-y-10">
                            {data.experience.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="flex flex-col md:flex-row md:justify-between items-baseline mb-3">
                                        <h3 className="font-black text-gray-900 text-lg uppercase tracking-tight">{exp.position}</h3>
                                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
                                            {exp.startDate} – {exp.endDate}
                                        </span>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:justify-between items-baseline mb-4">
                                        <span className="text-blue-600 font-bold text-sm tracking-wide">{exp.company}</span>
                                        <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">{exp.location}</span>
                                    </div>
                                    {exp.description && (
                                        <ul className="list-none space-y-3">
                                            {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                                                <li key={i} className="text-[14px] text-gray-700 leading-relaxed flex items-start gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                                                    {line.replace(/^[•\-\*]\s*/, '')}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-gray-100 pt-10">
                        {data.education.length > 0 && (
                            <div>
                                <h2 className="text-xs font-black uppercase mb-6 tracking-[0.2em] text-gray-400">
                                    Education
                                </h2>
                                <div className="space-y-8">
                                    {data.education.map((edu) => (
                                        <div key={edu.id} className="border-l-2 border-gray-100 pl-6">
                                            <h3 className="font-black text-gray-900 text-sm uppercase mb-1">{edu.institution}</h3>
                                            <p className="text-gray-600 text-[13px] font-bold mb-2">{edu.degree} • {edu.fieldOfStudy}</p>
                                            <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">{edu.startDate} – {edu.endDate}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.skills.length > 0 && (
                            <div>
                                <h2 className="text-xs font-black uppercase mb-6 tracking-[0.2em] text-gray-400">
                                    Expertise
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {data.skills.map((s) => (
                                        <span key={s.id} className="px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest border-2 bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-500 transition-colors">
                                            {s.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
