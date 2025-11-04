"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <nav className={`site-header ${className}`}>
      <div className="site-container">
        <div className="nav-layout">
          <div className="nav-left">
            <Link href="/" onClick={closeMenu} aria-label="Home">
              <div className="logo-wrap">
                <Image src="/Colorstack_Logo.png" alt="ColorStackNYU logo" width={40} height={40} className="rounded-md" />
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

          {/* Right cluster: theme toggle (desktop) */}
          <div className="nav-right hidden md:flex">
            <ThemeToggle />
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="mobile-menu-toggle"
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
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 space-y-2" style={{borderTop:'1px solid var(--border)', marginTop:'1rem'}}>
            <Link
              href="/"
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/events"
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              Events
            </Link>
            <Link
              href="/resources"
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              Resources
            </Link>
            <Link
              href="/meet-the-team"
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              Meet the Team
            </Link>
            <Link
              href="/sponsorship"
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              Sponsorship
            </Link>
            <button
              onClick={toggleTheme}
              className="mobile-nav-link w-full text-left"
            >
              {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}