"use client";

import Link from "next/link";
import { Sparkles, Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div className="">
                        <Link href="/" className="flex items-center space-x-2 mb-6 group">
                            <div className="bg-blue-600 text-white p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                Resume.ai
                            </span>
                        </Link>
                        <p className="text-gray-500 max-w-xs mb-8 leading-relaxed">
                            Empowering job seekers with AI-driven resume optimization. Stand out from the crowd and land your dream job faster.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-700 hover:bg-blue-50 transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div className="flex justify-start md:justify-end">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Product</h4>
                            <ul className="space-y-4">
                                <li><Link href="/builder" className="text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium">Builder</Link></li>
                                <li><Link href="/templates" className="text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium">Templates</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs text-center md:text-left">
                        © {new Date().getFullYear()} Resume.ai. All rights reserved. Built with Next.js 14 and Groq.
                    </p>
                    <div className="flex items-center space-x-6 text-xs text-gray-400">
                        <a href="#" className="hover:text-gray-600 transition-colors flex items-center gap-1">
                            <Mail className="w-3 h-3" /> hello@resume.ai
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
