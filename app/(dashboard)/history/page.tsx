'use client';

import { useEffect, useState } from 'react';
import { Resume } from '@/types';
import ResumeCard from '@/components/ResumeCard';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { PlusCircle, FileText } from 'lucide-react';

export default function HistoryPage() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchResumes = async () => {
        try {
            const response = await fetch('/api/resumes');
            if (response.ok) {
                const data = await response.json();
                setResumes(data);
            }
        } catch (error) {
            console.error('Failed to fetch resumes', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);

    const handleDelete = (id: string) => {
        setResumes(resumes.filter(r => r.id !== id));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 px-4">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Resume History</h1>
                    <p className="text-gray-600">Manage your previously generated resumes</p>
                </div>
                <Link href="/builder">
                    <Button className="flex items-center gap-2">
                        <PlusCircle className="w-4 h-4" />
                        Create New
                    </Button>
                </Link>
            </div>

            {resumes.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4">
                        <FileText className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">No resumes yet</h2>
                    <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                        You haven't generated any resumes. Start by filling out the builder form.
                    </p>
                    <div className="mt-6">
                        <Link href="/builder">
                            <Button>Start Building</Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map((resume) => (
                        <ResumeCard key={resume.id} resume={resume} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}
