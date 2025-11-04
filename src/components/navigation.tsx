"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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
    <nav className={`site-header ${className}`}>
      <div className="site-container">
        <div className="flex items-center justify-between">
          <div className="nav-left">
            <Link href="/" onClick={closeMenu} aria-label="Home">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundImage:'var(--brand-grad)'}}>
                <img src="/Colorstack_Logo.png" alt="Logo" className="w-10 h-10 rounded-md" />
              </div>
            </Link>
          </div>

          {/* Center nav */}
          <div className="nav-center hidden md:flex">
            <Link href="/" className="nav-link" aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
            <Link href="/events" className="nav-link">Events</Link>
            <Link href="/resources" className="nav-link">Resources</Link>
            <Link href="/meet-the-team" className="nav-link">Meet the Team</Link>
            <Link href="/sponsorship" className="nav-link">Sponsorship</Link>
          </div>

          {/* Right: empty (removed Get Connected button) */}
          <div className="nav-right hidden md:flex">
          </div>

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
          </div>
        </div>
      </div>
    </nav>
  );
}