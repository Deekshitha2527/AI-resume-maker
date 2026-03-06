'use client';

import { Resume } from '@/types';
import { Button } from './ui/Button';
import { Eye, Trash2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface ResumeCardProps {
    resume: Resume;
    onDelete: (id: string) => void;
}

export default function ResumeCard({ resume, onDelete }: ResumeCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this resume?')) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/resumes/${resume.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete');

            toast.success('Resume deleted');
            onDelete(resume.id);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {resume.title || resume.content?.personalInfo?.fullName || 'Untitled Resume'}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(resume.created_at).toLocaleDateString()}
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-600 line-clamp-3 mb-6 bg-gray-50 p-3 rounded-lg border border-dashed italic">
                {resume.content?.summary?.substring(0, 150) || 'No summary provided.'}...
            </p>

            <div className="flex gap-2">
                <Link href={`/resume/${resume.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        View
                    </Button>
                </Link>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    isLoading={isDeleting}
                    className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
