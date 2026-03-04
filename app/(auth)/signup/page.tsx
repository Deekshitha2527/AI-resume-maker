'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const supabase = createClient();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error("Passwords don't match");
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/api/auth/callback`,
                },
            });

            if (error) throw error;

            toast.success('Check your email for confirmation!');
            setIsSent(true);
        } catch (error) {
            toast.error((error as Error).message || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    if (isSent) {
        return (
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
                <p className="text-gray-600">
                    We've sent a confirmation link to <strong>{email}</strong>.
                    Please click the link to activate your account.
                </p>
                <div className="pt-4">
                    <Link href="/login" className="text-blue-600 font-medium hover:underline">
                        Back to login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
            </div>
            <form className="mt-8 space-y-4" onSubmit={handleSignup}>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email address</label>
                    <Input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <Input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <Input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>

                <div>
                    <Button type="submit" className="w-full" isLoading={loading}>
                        Get Started
                    </Button>
                </div>
            </form>

            <div className="text-center text-sm">
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
