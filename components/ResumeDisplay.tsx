'use client';

import { Resume } from '@/types';
import { Button } from './ui/Button';
import { Download, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function ResumeDisplay({ resume }: { resume: Resume }) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 no-print bg-white p-4 rounded-lg shadow-sm border">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Your Generated Resume</h2>
                    <p className="text-sm text-gray-500">Created on {new Date(resume.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/builder">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <RotateCcw className="w-4 h-4" />
                            Regenerate
                        </Button>
                    </Link>
                    <Button onClick={handlePrint} size="sm" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download PDF
                    </Button>
                </div>
            </div>

            <div className="resume-container bg-white shadow-xl border p-8 md:p-12 mx-auto max-w-[210mm] min-h-[297mm]">
                {/* Simple Text Rendering of the AI generated content */}
                <div className="whitespace-pre-wrap text-gray-800 font-serif leading-relaxed text-sm resume-content">
                    {resume.content}
                </div>
            </div>

            <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background-color: white !important;
            padding: 0 !important;
          }
          .resume-container {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
        </div>
    );
}
