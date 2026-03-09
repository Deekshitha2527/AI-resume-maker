import { ResumeContent } from "@/types";

export default function SocialClean({ data }: { data: ResumeContent }) {
    return (
        <div className="p-12 min-h-full bg-white font-sans text-gray-800">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center border-t-2 border-b-2 border-gray-900 py-10 mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 tracking-[0.1em] uppercase mb-6 leading-tight border-b border-gray-100 pb-6">
                        {data.personalInfo.fullName || "Your Name"}
                    </h1>
                    <div className="text-[11px] font-black text-gray-400 tracking-[0.3em] uppercase flex justify-center flex-wrap gap-x-8 gap-y-2">
                        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-16">
                    {data.summary && (
                        <div className="text-center px-10">
                            <h2 className="text-[10px] font-black text-gray-300 tracking-[0.5em] uppercase mb-6">Profile</h2>
                            <p className="text-[15px] leading-relaxed font-medium text-gray-600 italic">
                                &quot;{data.summary}&quot;
                            </p>
                        </div>
                    )}

                    {data.experience.length > 0 && (
                        <div className="space-y-12">
                            <h2 className="text-[10px] font-black text-gray-300 tracking-[0.5em] uppercase text-center mb-10">Evolution</h2>
                            <div className="space-y-16">
                                {data.experience.map((exp) => (
                                    <div key={exp.id} className="text-center group">
                                        <div className="inline-block border-b border-gray-900 pb-1 mb-4">
                                            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{exp.position}</h3>
                                        </div>
                                        <div className="flex justify-center items-center gap-4 text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
                                            <span className="text-gray-900">{exp.company}</span>
                                            <span className="opacity-30">/</span>
                                            <span>{exp.startDate} – {exp.endDate}</span>
                                        </div>
                                        {exp.description && (
                                            <div className="max-w-2xl mx-auto space-y-4">
                                                {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                                                    <p key={i} className="text-[14px] text-gray-500 leading-relaxed font-medium group-hover:text-gray-700 transition-colors">
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

                    <div className="grid md:grid-cols-2 gap-16 border-t border-gray-50 pt-16">
                        {data.education.length > 0 && (
                            <div className="text-center">
                                <h2 className="text-[10px] font-black text-gray-300 tracking-[0.5em] uppercase mb-8">Scholastics</h2>
                                <div className="space-y-8">
                                    {data.education.map((edu) => (
                                        <div key={edu.id}>
                                            <h3 className="font-bold text-gray-900 text-sm mb-1">{edu.institution}</h3>
                                            <p className="text-[11px] text-gray-500 font-medium uppercase tracking-widest mb-1">{edu.degree}</p>
                                            <p className="text-[9px] text-gray-300 font-black uppercase">{edu.startDate} – {edu.endDate}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.skills.length > 0 && (
                            <div className="text-center">
                                <h2 className="text-[10px] font-black text-gray-300 tracking-[0.5em] uppercase mb-8">Expertise</h2>
                                <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
                                    {data.skills.map((s) => (
                                        <span key={s.id} className="text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-1 hover:border-gray-900 transition-all">
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
