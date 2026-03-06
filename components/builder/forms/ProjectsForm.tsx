"use client";

import { useResumeContext } from "../ResumeContext";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";

export default function ProjectsForm() {
    const { data, addProject, updateProject, removeProject } = useResumeContext();

    const handleAdd = () => {
        addProject({
            id: Date.now().toString(),
            name: "",
            description: "",
            url: "",
            technologies: [],
        });
    };

    return (
        <section className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
                <Button size="sm" variant="outline" onClick={handleAdd}>
                    <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
            </div>

            {data.projects.map((proj) => (
                <div key={proj.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4 relative group">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeProject(proj.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label>Project Name</Label>
                            <Input
                                value={proj.name}
                                onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                                placeholder="E-commerce App"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Project URL</Label>
                            <Input
                                value={proj.url || ""}
                                onChange={(e) => updateProject(proj.id, { url: e.target.value })}
                                placeholder="github.com/yourusername/project"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label>Description</Label>
                        <Textarea
                            value={proj.description}
                            onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                            placeholder="Describe the project, your role, and what you built..."
                            rows={3}
                        />
                    </div>

                    <div className="space-y-1">
                        <Label>Technologies (Comma separated)</Label>
                        <Input
                            value={proj.technologies.join(", ")}
                            onChange={(e) => updateProject(proj.id, { technologies: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
                            placeholder="React, Node.js, PostgreSQL"
                        />
                    </div>
                </div>
            ))}

            {data.projects.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                    No projects added yet.
                </div>
            )}
        </section>
    );
}
