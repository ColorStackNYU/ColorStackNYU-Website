"use client";

import Link from "next/link";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  return (
    <nav className={`fixed top-0 w-full bg-black/20 backdrop-blur-lg z-50 border-b border-white/10 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Link href="/">
                <img src="/Colorstack_Logo.png" alt="Logo" className="w-10 h-10 rounded-md drop-shadow-[0_0_2px_rgba(255,255,255,0.7)]" />
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-white">ColorStackNYU</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/events" className="text-white/80 hover:text-white transition-colors">
              Events
            </Link>
            <Link href="/resources" className="text-white/80 hover:text-white transition-colors">
              Resources
            </Link>
            <Link href="/meet-the-team" className="text-white/80 hover:text-white transition-colors">
              Meet the Team
            </Link>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105">
              Get Connected
            </button>
          </div>

          <div className="md:hidden">
            <button className="text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}