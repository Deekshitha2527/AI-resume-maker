"use client";

import { useResumeContext } from "../ResumeContext";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { Experience } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ExperienceForm() {
    const { data, addExperience, updateExperience, removeExperience } = useResumeContext();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleAdd = () => {
        addExperience({
            id: Date.now().toString(),
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            current: false,
            location: "",
            description: "",
        });
    };

    const handleEnhance = async (exp: Experience) => {
        if (!exp.description || exp.description.length < 10) {
            toast.error("Please enter at least a few words to enhance.");
            return;
        }

        setLoadingId(exp.id);
        try {
            const response = await fetch("/api/generate-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "experience",
                    data: {
                        company: exp.company,
                        position: exp.position,
                        description: exp.description,
                    },
                }),
            });

            if (!response.ok) throw new Error("Enhanced failed");

            const result = await response.json();

            // The API returns { result: { enhanced_bullets: [] } }
            if (result.result && result.result.enhanced_bullets) {
                updateExperience(exp.id, {
                    description: result.result.enhanced_bullets.map((b: string) => `• ${b}`).join("\n")
                });
                toast.success("Experience enhanced!");
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            toast.error("Failed to enhance experience. Please try again.");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <section className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                <Button size="sm" variant="outline" onClick={handleAdd}>
                    <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
            </div>

            {data.experience.map((exp: Experience, index: number) => (
                <div key={exp.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4 relative group">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeExperience(exp.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label>Company</Label>
                            <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                placeholder="Company Name"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Position</Label>
                            <Input
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                                placeholder="Software Engineer"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Start Date</Label>
                            <Input
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                                placeholder="Jan 2020"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>End Date</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    value={exp.endDate}
                                    onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                                    placeholder="Present"
                                    disabled={exp.current}
                                    className={exp.current ? "bg-gray-100" : ""}
                                />
                                <label className="flex items-center text-sm gap-1 whitespace-nowrap cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={exp.current}
                                        onChange={(e) => {
                                            updateExperience(exp.id, {
                                                current: e.target.checked,
                                                endDate: e.target.checked ? "Present" : ""
                                            })
                                        }}
                                        className="rounded border-gray-300"
                                    /> Current
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between items-end">
                            <Label>Description</Label>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 text-xs text-blue-600 px-2 hover:bg-blue-50"
                                onClick={() => handleEnhance(exp)}
                                isLoading={loadingId === exp.id}
                            >
                                <Sparkles className="w-3 h-3 mr-1" /> AI Enhance
                            </Button>
                        </div>
                        <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={5}
                        />
                    </div>
                </div>
            ))}

            {data.experience.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                    No work experience added yet.
                </div>
            )}
        </section>
    );
}
