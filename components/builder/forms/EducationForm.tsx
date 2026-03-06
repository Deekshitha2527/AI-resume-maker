"use client";

import { useResumeContext } from "../ResumeContext";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";
import { Education } from "@/types";

export default function EducationForm() {
    const { data, addEducation, updateEducation, removeEducation } = useResumeContext();

    const handleAdd = () => {
        addEducation({
            id: Date.now().toString(),
            institution: "",
            degree: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            current: false,
        });
    };

    return (
        <section className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                <Button size="sm" variant="outline" onClick={handleAdd}>
                    <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
            </div>

            {data.education.map((edu: Education) => (
                <div key={edu.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4 relative group">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeEducation(edu.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1 sm:col-span-2">
                            <Label>Institution</Label>
                            <Input
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                                placeholder="University Name"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Degree</Label>
                            <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                placeholder="Bachelor of Science"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Field of Study</Label>
                            <Input
                                value={edu.fieldOfStudy}
                                onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                                placeholder="Computer Science"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Start Date</Label>
                            <Input
                                value={edu.startDate}
                                onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                                placeholder="Sep 2018"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>End Date</Label>
                            <Input
                                value={edu.endDate}
                                onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                                placeholder="May 2022"
                            />
                        </div>
                    </div>
                </div>
            ))}

            {data.education.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                    No education added yet.
                </div>
            )}
        </section>
    );
}
