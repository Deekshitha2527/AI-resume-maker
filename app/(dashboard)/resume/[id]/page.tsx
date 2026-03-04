'use client';

import { useEffect, useState } from 'react';
import { Resume } from '@/types';
import ResumeDisplay from '@/components/ResumeDisplay';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function ResumePage({ params }: { params: { id: string } }) {
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await fetch(`/api/resumes/${params.id}`);
                if (!response.ok) {
                    throw new Error('Resume not found or unauthorized');
                }
                const data = await response.json();
                setResume(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchResume();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-500">Loading your resume...</p>
            </div>
        );
    }

    if (error || !resume) {
        return (
            <div className="text-center py-20 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Oops! Something went wrong</h2>
                <p className="text-gray-600">{error || "We couldn't find the resume you're looking for."}</p>
                <div className="pt-4">
                    <Link href="/history">
                        <Button variant="outline">Back to History</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return <ResumeDisplay resume={resume} />;
}
