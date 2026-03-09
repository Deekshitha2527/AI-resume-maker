import { ResumeContent } from "@/types";

export default function Impact({ data }: { data: ResumeContent }) {
    return (
        <div className="min-h-full bg-white font-sans grid md:grid-cols-3 min-h-[1056px]">
            {/* Sidebar */}
            <div className="p-10 bg-[#E6F3F5] md:col-span-1 border-r border-gray-100">
                <div className="mb-10 text-left border-b-8 border-teal-600 pb-8">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-3">
                        {data.personalInfo.fullName || "Your Name"}
                    </h1>
                    <p className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-6">Professional Specialist</p>
                    <div className="flex flex-col gap-4 text-xs font-medium text-gray-500">
                        {data.personalInfo.email && <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-teal-600"></div> {data.personalInfo.email}</span>}
                        {data.personalInfo.phone && <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-teal-600"></div> {data.personalInfo.phone}</span>}
                    </div>
                </div>

                <div className="mt-10 space-y-10">
                    {data.skills.length > 0 && (
                        <div>
                            <h2 className="text-xs font-black uppercase mb-6 tracking-[0.2em] text-gray-400">Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((s) => (
                                    <span key={s.id} className="px-3 py-1.5 rounded bg-white text-gray-600 text-[10px] font-bold uppercase tracking-widest border border-gray-100">
                                        {s.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.education.length > 0 && (
                        <div>
                            <h2 className="text-xs font-black uppercase mb-6 tracking-[0.2em] text-gray-400">Education</h2>
                            <div className="space-y-6">
                                {data.education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-gray-900 text-xs uppercase mb-1">{edu.institution}</h3>
                                        <p className="text-gray-500 text-[11px] leading-tight">{edu.degree} • {edu.fieldOfStudy}</p>
                                        <p className="text-[10px] text-teal-600 font-bold mt-1">{edu.startDate} – {edu.endDate}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 p-10 bg-white">
                <div className="space-y-8">
                    {data.summary && (
                        <div className="bg-gray-50 p-8 rounded-lg">
                            <h2 className="text-xs font-black uppercase mb-4 tracking-[0.2em] text-gray-400">Professional Summary</h2>
                            <p className="text-[14px] leading-relaxed text-gray-800 whitespace-pre-wrap">{data.summary}</p>
                        </div>
                    )}

                    {data.experience.length > 0 && (
                        <div>
                            <h2 className="text-xs font-black uppercase mb-6 tracking-[0.2em] text-gray-400">Experience</h2>
                            <div className="space-y-10">
                                {data.experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex flex-col md:flex-row md:justify-between items-baseline mb-3">
                                            <h3 className="font-black text-gray-900 text-lg uppercase tracking-tight">{exp.position}</h3>
                                            <span className="text-[11px] font-black text-teal-600 uppercase tracking-widest">{exp.startDate} – {exp.endDate}</span>
                                        </div>
                                        <div className="flex flex-col md:flex-row md:justify-between items-baseline mb-4">
                                            <span className="text-gray-500 font-bold text-sm tracking-wide">{exp.company}</span>
                                            <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">{exp.location}</span>
                                        </div>
                                        {exp.description && (
                                            <ul className="list-none space-y-3">
                                                {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                                                    <li key={i} className="text-[14px] text-gray-700 leading-relaxed flex items-start gap-3">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
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
                </div>
            </div>
        </div>
    );
}
