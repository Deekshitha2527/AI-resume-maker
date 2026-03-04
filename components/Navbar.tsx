'use client';

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="border-b bg-white no-print">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-blue-600">
                            Resume AI
                        </Link>
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/builder" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                Create New
                            </Link>
                            <Link href="/history" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                History
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
