"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../context/ThemeContext";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

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
    <nav className={`fixed top-0 w-full z-50 border-b`} style={{background:'rgba(22,18,42,0.6)', borderColor:'var(--border)'}}>
      <div className="site-container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundImage:'var(--brand-grad)'}}>
              <Link href="/" onClick={closeMenu}>
                <img src="/Colorstack_Logo.png" alt="Logo" className="w-10 h-10 rounded-md drop-shadow-[0_0_2px_rgba(255,255,255,0.7)]" />
              </Link>
            </div>
            <h1 className="text-2xl font-bold" style={{color:'var(--text-high)'}}>ColorStackNYU</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="transition-colors" style={{color:'var(--text-mid)'}}>
              Home
            </Link>
            <Link href="/events" className="transition-colors" style={{color:'var(--text-mid)'}}>
              Events
            </Link>
            <Link href="/resources" className="transition-colors" style={{color:'var(--text-mid)'}}>
              Resources
            </Link>
            <Link href="/meet-the-team" className="transition-colors" style={{color:'var(--text-mid)'}}>
              Meet the Team
            </Link>
            <Link href="/sponsorship" className="transition-colors" style={{color:'var(--text-mid)'}}>
              Sponsorship
            </Link>
            {/* Need to make more overall changes for this light to dark mode to actually work well */}
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button> */}
            <button
              onClick={handleGetConnected}
              className="cta-primary"
              style={{padding:'0.5rem 1.25rem'}}
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
          <div className="py-4 space-y-2" style={{borderTop:'1px solid var(--border)', marginTop:'1rem'}}>
            <Link
              href="/"
              className="block px-4 py-3 rounded-lg transition-all"
              onClick={closeMenu}
              style={{color:'var(--text-mid)'}}
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
            <Link
              href="/sponsorship"
              className="block text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all"
              onClick={closeMenu}
            >
              Sponsorship
            </Link>
            <button
              onClick={toggleTheme}
              className="block w-full text-left px-4 py-3 rounded-lg transition-all"
              style={{color:'var(--text-mid)'}}
            >
              {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
            <div className="pt-2">
              <button
                onClick={handleGetConnected}
                className="w-full cta-primary"
                style={{padding:'0.75rem'}}
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