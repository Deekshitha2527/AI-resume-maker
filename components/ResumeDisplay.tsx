'use client';

import { Resume } from '@/types';
import { Button } from './ui/Button';
import { Download, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import ResumePreview from './preview/ResumePreview';

export default function ResumeDisplay({ resume }: { resume: Resume }) {
  const handlePrint = () => {
    window.print();
  };

  if (!resume || !resume.content) return null;

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

      <div className="resume-container no-shadow print:shadow-none mx-auto max-w-[800px]">
        <ResumePreview content={resume.content} />
      </div>

    </div>
  );
}
