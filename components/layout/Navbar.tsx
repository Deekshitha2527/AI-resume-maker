"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, Menu, X, FileText } from "lucide-react"
import { useState } from "react"
import { FadeIn } from "../ui/Animations"
import { Button } from "../ui/Button"

export default function Navbar() {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Determine if we should show a transparent or solid navbar
    const isHome = pathname === "/"

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isHome ? 'bg-white/80 backdrop-blur-md border-b border-gray-200' : 'bg-white border-b border-gray-200'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="bg-blue-600 text-white p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            Resume.ai
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/templates" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                            Templates
                        </Link>


                        <div className="flex items-center space-x-4 border-l pl-8 border-gray-200">
                            <Link href="/builder">
                                <Button variant="primary" size="sm" className="shadow-lg shadow-blue-500/30">
                                    Create My Resume <FileText className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <FadeIn className="md:hidden bg-white border-b border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
                        <Link href="/templates" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                            Templates
                        </Link>

                        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-2 px-3">
                            <Link href="/builder" className="w-full">
                                <Button variant="primary" className="w-full justify-center">Create My Resume</Button>
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            )}
        </nav>
    )
}
