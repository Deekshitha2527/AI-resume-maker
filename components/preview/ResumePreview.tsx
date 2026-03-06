"use client";

import { useResumeContext } from "../builder/ResumeContext";

export default function ResumePreview() {
    const { data } = useResumeContext();
    const { templateId = 'modern' } = data;

    // Helper to render sections based on layout
    const renderHeader = () => {
        if (templateId === 'creative') {
            return (
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-900 text-white p-10 -m-10 mb-10">
                    <div className="flex-1">
                        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
                            {data.personalInfo.fullName || "Your Name"}
                        </h1>
                    </div>
                    <div className="flex flex-col items-end text-sm opacity-80 gap-1 mt-4 md:mt-0">
                        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                    </div>
                </div>
            );
        }

        if (templateId === 'minimal' || templateId === 'retail-pro') {
            return (
                <div className="mb-10 text-left border-l-4 border-blue-600 pl-6">
                    <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
                        {data.personalInfo.fullName || "Your Name"}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500 uppercase tracking-widest">
                        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                        {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                    </div>
                </div>
            );
        }

        if (templateId === 'finance' || templateId === 'tech-spec') {
            return (
                <div className="mb-8 border-b-2 border-gray-900 pb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {data.personalInfo.fullName || "Your Name"}
                    </h1>
                    <div className="flex flex-wrap gap-x-4 text-sm text-gray-600 font-medium">
                        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                        {data.personalInfo.phone && <span>| {data.personalInfo.phone}</span>}
                        {data.personalInfo.location && <span>| {data.personalInfo.location}</span>}
                    </div>
                </div>
            );
        }

        // Modern (Default)
        return (
            <div className="text-center border-b-[1.5px] border-gray-800 pb-4 mb-5">
                <h1 className="text-3xl font-extrabold uppercase tracking-wide mb-2 text-gray-900">
                    {data.personalInfo.fullName || "Your Name"}
                </h1>
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[13px] text-gray-700 font-medium tracking-wide">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span> • {data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span> • {data.personalInfo.location}</span>}
                </div>
            </div>
        );
    };

    const renderSummary = () => {
        if (!data.summary) return null;
        const isModern = templateId === 'modern';
        return (
            <div className="mb-6">
                <h2 className={`text-[13px] font-bold uppercase mb-2 tracking-widest ${isModern ? 'text-gray-900 border-b border-gray-300 pb-1' : 'text-blue-600'}`}>
                    Professional Summary
                </h2>
                <p className="text-[14px] leading-snug text-gray-800 whitespace-pre-wrap">
                    {data.summary}
                </p>
            </div>
        );
    };

    const renderExperience = () => {
        if (data.experience.length === 0) return null;
        const isModern = templateId === 'modern';
        return (
            <div className="mb-6">
                <h2 className={`text-[13px] font-bold uppercase mb-4 tracking-widest ${isModern ? 'text-gray-900 border-b border-gray-300 pb-1' : 'text-blue-600'}`}>
                    Professional Experience
                </h2>
                <div className="space-y-6">
                    {data.experience.map((exp) => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-gray-900 text-[15px]">{exp.position}</h3>
                                <span className={`text-[12px] font-bold uppercase tracking-tighter ${isModern ? 'text-gray-500' : 'text-blue-500'}`}>
                                    {exp.startDate} – {exp.endDate}
                                </span>
                            </div>
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="italic text-[14px] text-gray-700 font-semibold">{exp.company}</span>
                                <span className="text-[12px] text-gray-400 font-medium">{exp.location}</span>
                            </div>
                            {exp.description && (
                                <ul className="list-disc list-outside pl-4 space-y-1">
                                    {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                                        <li key={i} className="text-[14px] text-gray-800 leading-snug">
                                            {line.replace(/^[•\-\*]\s*/, '')}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderEducation = () => {
        if (data.education.length === 0) return null;
        const isModern = templateId === 'modern';
        return (
            <div className="mb-6">
                <h2 className={`text-[13px] font-bold uppercase mb-3 tracking-widest ${isModern ? 'text-gray-900 border-b border-gray-300 pb-1' : 'text-blue-600'}`}>
                    Education
                </h2>
                <div className="space-y-3">
                    {data.education.map((edu) => (
                        <div key={edu.id} className="flex justify-between items-start">
                            <div className="max-w-[70%]">
                                <h3 className="font-bold text-gray-900 text-[14px]">{edu.institution}</h3>
                                <p className="text-[13px] text-gray-700 italic">{edu.degree} in {edu.fieldOfStudy}</p>
                            </div>
                            <span className="text-[12px] font-bold text-gray-400">
                                {edu.startDate} – {edu.endDate}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderSkills = () => {
        if (data.skills.length === 0) return null;
        const isModern = templateId === 'modern';
        return (
            <div className="mb-6">
                <h2 className={`text-[13px] font-bold uppercase mb-2 tracking-widest ${isModern ? 'text-gray-900 border-b border-gray-300 pb-1' : 'text-blue-600'}`}>
                    Technical Skills
                </h2>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                    {data.skills.map((s, i) => (
                        <span key={s.id} className="text-[14px] text-gray-800 font-medium flex items-center">
                            {s.name}
                            {i < data.skills.length - 1 && <span className="text-gray-300 ml-3">|</span>}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    const fontClass = templateId === 'finance' || templateId === 'minimal' ? 'font-serif' : 'font-sans';

    return (
        <div className={`p-10 min-h-full bg-white transition-all duration-500 shadow-2xl ${templateId === 'creative' ? 'rounded-none' : 'rounded-sm'}`}>
            <div className={`max-w-4xl mx-auto ${fontClass}`}>
                {renderHeader()}
                <div className="grid grid-cols-1 gap-4">
                    {renderSummary()}
                    {renderExperience()}
                    {renderEducation()}
                    {renderSkills()}
                </div>
            </div>
        </div>
    );
}
