"use client";

import ResumeForm from "@/components/builder/ResumeForm";
import ResumePreview from "@/components/preview/ResumePreview";
import { useState, useRef, Suspense, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Download, Sparkles, Save } from "lucide-react";
import generatePDF from "react-to-pdf";
import { useResumeContext } from "@/components/builder/ResumeContext";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

function BuilderContent() {
    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
    const targetRef = useRef<HTMLDivElement>(null);
    const { data, setTemplateId } = useResumeContext();
    const [isSaving, setIsSaving] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const template = searchParams.get('template');
        if (template) {
            setTemplateId(template);
        }
    }, [searchParams, setTemplateId]);

    const handleDownloadPdf = () => {
        if (targetRef.current) {
            generatePDF(targetRef, {
                filename: 'resume.pdf',
                page: {
                    margin: 0,
                    format: 'a4',
                }
            });
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch("/api/resumes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: data.personalInfo.fullName ? `${data.personalInfo.fullName}'s Resume` : 'My Resume',
                    content: data,
                }),
            });

            if (!response.ok) throw new Error("Save failed");
            toast.success("Resume saved successfully!");
        } catch (error) {
            toast.error("Failed to save resume. (Make sure Supabase is configured)");
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-6rem)] flex-col md:flex-row gap-6 bg-gray-50 px-2 sm:px-0">

            {/* Mobile Tabs */}
            <div className="md:hidden flex rounded-lg p-1 bg-gray-200 w-full shrink-0">
                <button
                    onClick={() => setActiveTab('edit')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md ${activeTab === 'edit' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
                >
                    Edit
                </button>
                <button
                    onClick={() => setActiveTab('preview')}
                    className={`flex-1 py-2 text-sm font-medium rounded-md ${activeTab === 'preview' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
                >
                    Preview
                </button>
            </div>

            {/* Left Side - Editor */}
            <div className={`w-full md:w-1/2 flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${activeTab === 'edit' ? 'flex' : 'hidden md:flex'}`}>
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center shrink-0">
                    <h2 className="font-semibold text-gray-700">Resume Details</h2>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 hidden sm:flex">
                            <Sparkles className="w-4 h-4 mr-2" /> AI Enhance All
                        </Button>
                        <Button size="sm" onClick={handleSave} isLoading={isSaving}>
                            <Save className="w-4 h-4 mr-2" /> Save
                        </Button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-32">
                    <ResumeForm />
                </div>
            </div>

            {/* Right Side - Preview */}
            <div className={`w-full md:w-1/2 flex-col h-full bg-gray-200 rounded-xl overflow-hidden shadow-inner ${activeTab === 'preview' ? 'flex' : 'hidden md:flex'}`}>
                <div className="p-4 bg-gray-800 text-white flex justify-between items-center shrink-0">
                    <h2 className="font-semibold text-gray-200 text-sm">Live Preview</h2>
                    <Button size="sm" onClick={handleDownloadPdf} className="bg-white text-gray-900 hover:bg-gray-100">
                        <Download className="w-4 h-4 mr-2" /> Download PDF
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex items-start justify-center">
                    <div ref={targetRef} className="w-full max-w-[800px] bg-white shadow-2xl min-h-[1056px] transition-all duration-300 print:shadow-none print:m-0 print:p-0">
                        <ResumePreview />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default function BuilderPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        }>
            <BuilderContent />
        </Suspense>
    );
}
