"use client";

import { useResumeContext } from "./ResumeContext";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import ProjectsForm from "./forms/ProjectsForm";

export default function ResumeForm() {
    const { data, updatePersonalInfo, updateSummary } = useResumeContext();
    const [loadingSummary, setLoadingSummary] = useState(false);

    const handleEnhanceSummary = async () => {
        setLoadingSummary(true);
        try {
            const response = await fetch("/api/generate-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "summary",
                    data: {
                        name: data.personalInfo.fullName,
                        roles: data.experience.map(e => e.position).join(", "),
                        skills: data.skills.map(s => s.name).join(", "),
                        summary: data.summary,
                    },
                }),
            });

            if (!response.ok) throw new Error("Enhanced failed");

            const result = await response.json();

            if (result.result && result.result.enhanced_summary) {
                updateSummary(result.result.enhanced_summary);
                toast.success("Summary enhanced!");
            } else {
                throw new Error("Invalid response format");
            }
        } catch {
            toast.error("Failed to enhance summary. Please try again.");
        } finally {
            setLoadingSummary(false);
        }
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Personal Info Section */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label>Full Name</Label>
                        <Input
                            value={data.personalInfo.fullName}
                            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                            placeholder="e.g. Jane Doe"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={data.personalInfo.email}
                            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                            placeholder="jane@example.com"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Phone</Label>
                        <Input
                            value={data.personalInfo.phone}
                            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Location</Label>
                        <Input
                            value={data.personalInfo.location}
                            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                            placeholder="San Francisco, CA"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>LinkedIn URL</Label>
                        <Input
                            value={data.personalInfo.linkedin || ''}
                            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                            placeholder="linkedin.com/in/janedoe"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Website / Portfolio</Label>
                        <Input
                            value={data.personalInfo.website || ''}
                            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                            placeholder="janedoe.com"
                        />
                    </div>
                </div>
            </section>

            {/* Summary Section */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Professional Summary</h3>
                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <Label>Summary</Label>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 text-xs text-blue-600 px-2 hover:bg-blue-50"
                            onClick={handleEnhanceSummary}
                            isLoading={loadingSummary}
                        >
                            <Sparkles className="w-3 h-3 mr-1" /> AI Write Summary
                        </Button>
                    </div>
                    <Textarea
                        value={data.summary}
                        onChange={(e) => updateSummary(e.target.value)}
                        placeholder="A brief overview of your professional background and goals..."
                        rows={4}
                    />
                </div>
            </section>

            {/* Experience Section */}
            <ExperienceForm />

            {/* Education Section */}
            <EducationForm />

            {/* Skills Section */}
            <SkillsForm />

            {/* Projects Section */}
            <ProjectsForm />

        </div>
    );
}
