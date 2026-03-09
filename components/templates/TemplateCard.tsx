"use client";

import { motion } from "framer-motion";
import { Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TemplateCardProps {
    id: string;
    name: string;
    description: string;
    image: string;
    onPreview: (id: string) => void;
    onSelect: (id: string) => void;
}

export default function TemplateCard({
    id,
    name,
    description,
    image,
    onPreview,
    onSelect,
}: TemplateCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 gap-4">
                    <Button
                        onClick={() => onPreview(id)}
                        variant="secondary"
                        className="w-full py-6 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors"
                    >
                        <Eye size={20} />
                        Quick Preview
                    </Button>
                    <Button
                        onClick={() => onSelect(id)}
                        className="w-full py-6 rounded-full font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-transform active:scale-95"
                    >
                        <Check size={20} />
                        Use Template
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Tags or Badge optional */}
            <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                <span className="bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    Popular
                </span>
            </div>
        </motion.div>
    );
}
