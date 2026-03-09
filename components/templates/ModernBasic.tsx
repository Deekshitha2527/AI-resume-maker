import { ResumeContent } from "@/types";

export default function ModernBasic({ data }: { data: ResumeContent }) {
    return (
        <div className="p-10 min-h-full bg-white font-sans flex flex-col items-center">
            <div className="w-full mb-12 text-center">
                <h1 className="text-4xl font-bold text-blue-600 mb-2">
                    {data.personalInfo.fullName || "Your Name"}
                </h1>
                <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-500">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {(data.personalInfo.email && data.personalInfo.phone) && <span className="text-gray-300">|</span>}
                    {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                    {(data.personalInfo.phone && data.personalInfo.location) && <span className="text-gray-300">|</span>}
                    {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                </div>
            </div>

            <div className="w-full text-left space-y-10">
                {data.summary && (
                    <div>
                        <h2 className="text-xs font-black uppercase mb-4 tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">
                            Professional Summary
                        </h2>
                        <p className="text-[14px] leading-relaxed text-gray-800 whitespace-pre-wrap">
                            {data.summary}
                        </p>
                    </div>
                )}

                {data.experience.length > 0 && (
                    <div>
                        <h2 className="text-xs font-black uppercase mb-6 tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">
                            Experience
                        </h2>
                        <div className="space-y-8">
                            {data.experience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex flex-col md:flex-row md:justify-between items-baseline mb-2">
                                        <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                                        <span className="text-sm font-semibold text-blue-600">
                                            {exp.startDate} – {exp.endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-3">
                                        <span className="text-gray-700 font-medium italic">{exp.company}</span>
                                        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{exp.location}</span>
                                    </div>
                                    {exp.description && (
                                        <ul className="list-disc list-outside pl-5 space-y-2">
                                            {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                                                <li key={i} className="text-[14px] text-gray-700 leading-snug">
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

                <div className="grid grid-cols-1 gap-10">
                    {data.education.length > 0 && (
                        <div>
                            <h2 className="text-xs font-black uppercase mb-4 tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">
                                Education
                            </h2>
                            <div className="space-y-4">
                                {data.education.map((edu) => (
                                    <div key={edu.id} className="flex justify-between items-baseline">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm">{edu.institution}</h3>
                                            <p className="text-gray-600 text-xs">{edu.degree} in {edu.fieldOfStudy}</p>
                                        </div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{edu.startDate} – {edu.endDate}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.skills.length > 0 && (
                        <div>
                            <h2 className="text-xs font-black uppercase mb-4 tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">
                                Expertise
                            </h2>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {data.skills.map((s) => (
                                    <span key={s.id} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold uppercase tracking-widest border border-blue-100">
                                        {s.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
