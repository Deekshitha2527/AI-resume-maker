"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, BarChart, Settings, Plus, User } from "lucide-react";
import { ResumeProvider } from "@/components/builder/ResumeContext";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navigation = [
        { name: "My Resumes", href: "/resumes", icon: FileText },
        { name: "Create New", href: "/builder", icon: Plus },
    ];

    return (
        <ResumeProvider>
            <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-white">
                {/* Sidebar */}
                <div className="w-64 flex-shrink-0 border-r border-gray-100 bg-gray-50/50 hidden md:flex md:flex-col">
                    <div className="p-6">
                        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Workspace</h2>
                    </div>
                    <nav className="flex-1 px-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-3 py-3 text-sm font-semibold rounded-xl transition-all ${isActive
                                        ? "bg-white text-blue-600 shadow-sm border border-gray-100"
                                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                >
                                    <item.icon
                                        className={`flex-shrink-0 -ml-1 mr-3 h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-400"
                                            }`}
                                        aria-hidden="true"
                                    />
                                    <span className="truncate">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none bg-white">
                    <div className="py-8 px-4 sm:px-6 md:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </ResumeProvider>
    );
}
