"use client";

import { useResumeContext } from "../builder/ResumeContext";
import TemplateRenderer from "../templates/TemplateRenderer";

export default function ResumePreview() {
    const { data } = useResumeContext();

    if (!data) return null;

    return (
        <div className="w-full h-full">
            <TemplateRenderer
                templateId={data.templateId || "modern-basic"}
                data={data}
            />
        </div>
    );
}
