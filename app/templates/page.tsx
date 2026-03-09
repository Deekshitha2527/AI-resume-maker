"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { TEMPLATES } from "@/lib/templates-config";
import { SAMPLE_RESUME_DATA } from "@/lib/sample-data";
import TemplateCard from "@/components/templates/TemplateCard";
import TemplatePreviewModal from "@/components/templates/TemplatePreviewModal";

const CATEGORIES = ["All", "Modern", "Creative", "Professional", "Minimal", "Tech", "Executive"];

export default function TemplatesPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [previewTemplate, setPreviewTemplate] = useState<{ id: string; name: string } | null>(null);

    const filteredTemplates = TEMPLATES.filter((template) => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" ||
            template.tags.some(tag => tag === selectedCategory);
        return matchesSearch && matchesCategory;
    });

    const handleSelectTemplate = (id: string) => {
        router.push(`/builder?template=${id}`);
    };

    const handlePreviewTemplate = (id: string) => {
        const template = TEMPLATES.find(t => t.id === id);
        if (template) {
            setPreviewTemplate({ id: template.id, name: template.name });
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] pb-20">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6"
                    >
                        <Sparkles size={16} />
                        10+ Professional Templates
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl font-black text-gray-900 mb-6 tracking-tight"
                    >
                        Choose your perfect <span className="text-blue-600">template</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium"
                    >
                        Elevate your career with our professionally designed, ATS-optimized resume templates.
                        Choose a style that reflects your professional brand.
                    </motion.p>

                    {/* Search & Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 p-2 bg-white rounded-[2rem] shadow-xl border border-gray-100"
                    >
                        <div className="flex-1 relative flex items-center">
                            <Search className="absolute left-6 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search templates (e.g. Modern, Minimal, Tech)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 rounded-full bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                            />
                        </div>
                        <div className="flex items-center gap-2 px-4 border-l border-gray-100">
                            <SlidersHorizontal className="text-gray-400" size={18} />
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Filter</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Categories */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${selectedCategory === cat
                                ? "bg-gray-900 text-white shadow-lg"
                                : "bg-white text-gray-500 hover:bg-gray-100 border border-transparent"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredTemplates.map((template) => (
                        <TemplateCard
                            key={template.id}
                            id={template.id}
                            name={template.name}
                            description={template.description}
                            image={template.image}
                            onPreview={handlePreviewTemplate}
                            onSelect={handleSelectTemplate}
                        />
                    ))}
                </div>

                {filteredTemplates.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <p className="text-gray-400 text-lg font-medium">No templates found matching your search.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            className="mt-4 text-blue-600 font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            {/* Preview Modal */}
            <TemplatePreviewModal
                isOpen={!!previewTemplate}
                onClose={() => setPreviewTemplate(null)}
                templateId={previewTemplate?.id || ""}
                templateName={previewTemplate?.name || ""}
                data={SAMPLE_RESUME_DATA}
                onSelect={handleSelectTemplate}
            />
        </div>
    );
}
