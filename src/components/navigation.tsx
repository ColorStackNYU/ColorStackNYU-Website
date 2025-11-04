"use client";

import { useState, useEffect } from "react";
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
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
                <Image src="/Colorstack_Logo.png" alt="ColorStackNYU logo" width={40} height={40} />
              </div>
            </Link>
          </div>

          {/* Center nav */}
          <div className="nav-center">
            <Link href="/" className="nav-link" aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
            <Link href="/events" className="nav-link" aria-current={pathname?.startsWith('/events') ? 'page' : undefined}>Events</Link>
            <Link href="/resources" className="nav-link" aria-current={pathname?.startsWith('/resources') ? 'page' : undefined}>Resources</Link>
            <Link href="/meet-the-team" className="nav-link" aria-current={pathname?.startsWith('/meet-the-team') ? 'page' : undefined}>Meet the Team</Link>
            <Link href="/sponsorship" className="nav-link" aria-current={pathname?.startsWith('/sponsorship') ? 'page' : undefined}>Sponsorship</Link>
          </div>

          {/* Right cluster: theme toggle + mobile menu button */}
          <div className="nav-right">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-toggle"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <svg
                className={`hamburger-icon ${isOpen ? 'open' : ''}`}
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <Link href="/" className="mobile-nav-link" onClick={closeMenu}>
              Home
            </Link>
            <Link href="/events" className="mobile-nav-link" onClick={closeMenu}>
              Events
            </Link>
            <Link href="/resources" className="mobile-nav-link" onClick={closeMenu}>
              Resources
            </Link>
            <Link href="/meet-the-team" className="mobile-nav-link" onClick={closeMenu}>
              Meet the Team
            </Link>
            <Link href="/sponsorship" className="mobile-nav-link" onClick={closeMenu}>
              Sponsorship
            </Link>
            <button onClick={toggleTheme} className="mobile-nav-link mobile-theme-toggle">
              {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}