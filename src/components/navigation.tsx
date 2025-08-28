"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleGetConnected = () => {
    // Check if we're already on the home page
    if (window.location.pathname === '/') {
      // If on home page, just scroll to the section
      const element = document.getElementById('get-connected');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on another page, navigate to home page with hash
      router.push('/#get-connected');
    }
    closeMenu();
  };

  return (
    <nav className={`fixed top-0 w-full bg-black/20 backdrop-blur-lg z-50 border-b border-white/10 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#43048a] to-purple-600 rounded-lg flex items-center justify-center">
              <Link href="/" onClick={closeMenu}>
                <img src="/Colorstack_Logo.png" alt="Logo" className="w-10 h-10 rounded-md drop-shadow-[0_0_2px_rgba(255,255,255,0.7)]" />
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-white">ColorStackNYU</h1>
          </div>

          {/* Desktop Navigation */}
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
            <button
              onClick={handleGetConnected}
              className="bg-gradient-to-r from-[#43048a] to-purple-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              Get Connected
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="py-4 space-y-2 border-t border-white/10 mt-4">
            <Link
              href="/"
              className="block text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/events"
              className="block text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all"
              onClick={closeMenu}
            >
              Events
            </Link>
            <Link
              href="/resources"
              className="block text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all"
              onClick={closeMenu}
            >
              Resources
            </Link>
            <Link
              href="/meet-the-team"
              className="block text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all"
              onClick={closeMenu}
            >
              Meet the Team
            </Link>
            <div className="pt-2">
              <button
                onClick={handleGetConnected}
                className="w-full bg-gradient-to-r from-[#43048a] to-purple-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
              >
                Get Connected
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}