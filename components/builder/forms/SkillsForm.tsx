"use client";

import { useResumeContext } from "../ResumeContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export default function SkillsForm() {
    const { data, addSkill, removeSkill } = useResumeContext();
    const [newSkill, setNewSkill] = useState("");

    const handleAdd = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!newSkill.trim()) return;

        addSkill({
            id: Date.now().toString(),
            name: newSkill.trim(),
        });
        setNewSkill("");
    };

    return (
        <section className="space-y-6">
            <div className="border-b pb-2">
                <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            </div>

            <form onSubmit={handleAdd} className="flex gap-2">
                <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g. React, Node.js, Project Management"
                    className="flex-1"
                />
                <Button type="submit" variant="primary">
                    <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
            </form>

            <div className="flex flex-wrap gap-2 mt-4">
                {data.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 shadow-sm">
                        {skill.name}
                        <button
                            onClick={() => removeSkill(skill.id)}
                            className="text-gray-400 hover:text-red-500 focus:outline-none"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ))}
            </div>

            {data.skills.length === 0 && (
                <div className="text-center py-6 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                    No skills added yet.
                </div>
            )}
        </section>
    );
}
