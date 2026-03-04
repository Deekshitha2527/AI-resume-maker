'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { ResumeFormData } from '@/types';

const formSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number is required'),
    summary: z.string().min(10, 'Professional summary is required'),
    skills: z.string().min(5, 'Skills are required'),
    experience: z.string().min(10, 'Work experience is required'),
    education: z.string().min(10, 'Education details are required'),
    projects: z.string().min(5, 'Projects are required'),
});

export default function ResumeForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResumeFormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: ResumeFormData) => {
        setLoading(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to generate resume');
            }

            toast.success('Resume generated successfully!');
            router.push(`/resume/${result.id}`);
        } catch (error) {
            toast.error((error as Error).message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 rounded-xl shadow-sm border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 md:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Personal Information</h2>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <Input {...register('name')} error={errors.name?.message} placeholder="John Doe" />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <Input type="email" {...register('email')} error={errors.email?.message} placeholder="john@example.com" />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input {...register('phone')} error={errors.phone?.message} placeholder="+1 (555) 000-0000" />
                </div>

                <div className="space-y-4 md:col-span-2 mt-4">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Professional Details</h2>
                </div>

                <div className="md:col-span-2 space-y-1">
                    <label className="text-sm font-medium text-gray-700">Professional Summary</label>
                    <Textarea
                        {...register('summary')}
                        error={errors.summary?.message}
                        placeholder="Briefly describe your professional background and goals..."
                        rows={4}
                    />
                </div>

                <div className="md:col-span-2 space-y-1">
                    <label className="text-sm font-medium text-gray-700">Skills</label>
                    <Textarea
                        {...register('skills')}
                        error={errors.skills?.message}
                        placeholder="List your key skills (e.g., React, Node.js, Project Management...)"
                        rows={3}
                    />
                    <p className="text-xs text-gray-500 italic">Separate with commas or new lines</p>
                </div>

                <div className="md:col-span-2 space-y-1">
                    <label className="text-sm font-medium text-gray-700">Work Experience</label>
                    <Textarea
                        {...register('experience')}
                        error={errors.experience?.message}
                        placeholder="List your work history, including job titles, companies, and key achievements..."
                        rows={6}
                    />
                </div>

                <div className="md:col-span-2 space-y-1">
                    <label className="text-sm font-medium text-gray-700">Education</label>
                    <Textarea
                        {...register('education')}
                        error={errors.education?.message}
                        placeholder="List your degrees, schools, and graduation dates..."
                        rows={3}
                    />
                </div>

                <div className="md:col-span-2 space-y-1">
                    <label className="text-sm font-medium text-gray-700">Projects</label>
                    <Textarea
                        {...register('projects')}
                        error={errors.projects?.message}
                        placeholder="Highlight 2-3 key projects you&apos;ve worked on..."
                        rows={4}
                    />
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <Button type="submit" size="lg" className="w-full md:w-auto" isLoading={loading}>
                    Generate AI Resume
                </Button>
            </div>
        </form>
    );
}
