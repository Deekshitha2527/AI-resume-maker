"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import TemplateRenderer from "./TemplateRenderer";
import { ResumeContent } from "@/types";
import { Button } from "@/components/ui/Button";

interface TemplatePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    templateId: string;
    data: ResumeContent;
    templateName: string;
    onSelect: (id: string) => void;
}

export default function TemplatePreviewModal({
    isOpen,
    onClose,
    templateId,
    data,
    templateName,
    onSelect,
}: TemplatePreviewModalProps) {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-6xl">
                                {/* Header */}
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-20">
                                    <div>
                                        <Dialog.Title as="h3" className="text-xl font-bold text-gray-900">
                                            {templateName} Preview
                                        </Dialog.Title>
                                        <p className="text-sm text-gray-500">Previewing with sample data</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            onClick={() => onSelect(templateId)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
                                        >
                                            Use This Template
                                        </Button>
                                        <button
                                            onClick={onClose}
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>

                                {/* Preview Body */}
                                <div className="bg-gray-100 p-8 md:p-12 overflow-y-auto max-h-[80vh] flex justify-center">
                                    <div className="w-full max-w-[850px] shadow-[0_0_50px_rgba(0,0,0,0.1)] transform origin-top transition-transform duration-300">
                                        <TemplateRenderer templateId={templateId} data={data} />
                                    </div>
                                </div>

                                {/* Footer Controls */}
                                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-md"><ZoomOut size={18} /></button>
                                        <span className="text-sm font-medium text-gray-500">100%</span>
                                        <button className="p-2 hover:bg-gray-100 rounded-md"><ZoomIn size={18} /></button>
                                    </div>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                                        Interactive Preview Logic Active
                                    </p>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
