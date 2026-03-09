import { ResumeContent } from "@/types";

export default function CleanElegant({ data }: { data: ResumeContent }) {
    return (
        <div className="min-h-full bg-[#F2F7FF] font-sans grid md:grid-cols-3 min-h-[1056px]">
            {/* Sidebar */}
            <div className="p-10 bg-white md:col-span-1 border-r border-gray-100 flex flex-col items-center text-center">
                <div className="mb-10 w-full border-b-2 border-gray-100 pb-10">
                    <h1 className="text-xl font-light text-gray-900 mb-4 tracking-wide uppercase">
                        {data.personalInfo.fullName || "Your Name"}
                    </h1>
                    <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                    </div>
                </div>

                <div className="mt-10 space-y-12 w-full">
                    {data.skills.length > 0 && (
                        <div>
                            <h2 className="text-[11px] font-black uppercase mb-6 tracking-[0.3em] text-gray-400">Capabilities</h2>
                            <div className="flex flex-col gap-3">
                                {data.skills.map((s) => (
                                    <div key={s.id} className="text-[10px] font-bold uppercase tracking-widest text-gray-600 border-b border-gray-50 pb-1">
                                        {s.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.education.length > 0 && (
                        <div>
                            <h2 className="text-[11px] font-black uppercase mb-6 tracking-[0.3em] text-gray-400">Background</h2>
                            <div className="space-y-8">
                                {data.education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-gray-900 text-[10px] uppercase mb-1">{edu.institution}</h3>
                                        <p className="text-gray-400 text-[10px] font-medium tracking-tight uppercase">{edu.degree}</p>
                                        <p className="text-[9px] text-gray-300 font-black mt-1 uppercase tracking-tighter">{edu.startDate} – {edu.endDate}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 p-10 bg-[#F2F7FF]">
                <div className="space-y-10">
                    {data.summary && (
                        <div className="border-l-4 border-gray-200 pl-8 py-2">
                            <h2 className="text-[11px] font-black uppercase mb-4 tracking-[0.3em] text-gray-400">Mission</h2>
                            <p className="text-[13px] leading-relaxed text-gray-600 font-medium whitespace-pre-wrap">{data.summary}</p>
                        </div>
                    )}

                    {data.experience.length > 0 && (
                        <div className="space-y-8">
                            <h2 className="text-[11px] font-black uppercase mb-4 tracking-[0.3em] text-gray-400">Timeline</h2>
                            <div className="space-y-12">
                                {data.experience.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        <div className="flex flex-col mb-4">
                                            <h3 className="font-light text-gray-900 text-2xl tracking-wide uppercase mb-1">{exp.position}</h3>
                                            <div className="flex justify-between items-center text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                                                <span>{exp.company}</span>
                                                <span className="text-gray-300">{exp.startDate} – {exp.endDate}</span>
                                            </div>
                                        </div>
                                        {exp.description && (
                                            <div className="text-[13px] text-gray-500 leading-relaxed font-medium">
                                                {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                                                    <p key={i} className="mb-2">
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
