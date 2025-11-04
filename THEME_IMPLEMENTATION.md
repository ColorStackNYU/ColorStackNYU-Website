/* THEME IMPLEMENTATION GUIDE
   
   Your app is already set up perfectly for theming!
   Here's how to add dark/light mode:
*/

/* ====================================
   STEP 1: ADD LIGHT MODE VARIABLES
   ==================================== */

/* Add this AFTER your existing :root block in globals.css */

[data-theme="light"] {
  /* core tokens - LIGHT MODE */
  --canvas: #ffffff;
  --surface: #f8f9fa;
  --text-high: #1a1a1a;
  --text-mid: #4a4a4a;
  --brand: #7c3aed;
  --brand-hover: #6d28d9;
  --brand-1: #ab82c5;
  --brand-1-hover: #9a63b8;
  --accent: #d946ef;

  /* borders and shadows - adjusted for light */
  --border: rgba(0, 0, 0, 0.08);
  --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  /* marquee */
  --marquee-bg: #f0f0f0;
  
  /* footer link */
  --footer-link: #7c3aed;
}

/* ====================================
   STEP 2: CREATE THEME TOGGLE COMPONENT
   ==================================== */

/* 
Create: src/components/ThemeToggle.tsx

"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Load theme from localStorage or system preference
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      style={{
        background: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "8px",
        padding: "8px 12px",
        cursor: "pointer",
        fontSize: "20px",
        transition: "all 0.2s ease",
      }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
*/

/* ====================================
   STEP 3: ADD TO NAVIGATION
   ==================================== */

/*
In src/components/navigation.tsx, add:

import ThemeToggle from "./ThemeToggle";

// Inside your nav header:
<div className="nav-right">
  <ThemeToggle />
  <a href="https://forms.gle/..." className="btn btn-primary header-cta">
    Join ColorStack
  </a>
</div>
*/

/* ====================================
   STEP 4: ADD THEME TRANSITION (OPTIONAL)
   ==================================== */

/* Add to globals.css for smooth transitions */
html {
  transition: background-color 0.3s ease, color 0.3s ease;
}

* {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* ====================================
   HARDCODED COLORS TO FIX
   ==================================== */

/*
Search your code for these hardcoded values and replace:

❌ color: "#d4b5ff"        → ✅ color: "var(--brand-1)" or create --resource-tag-color
❌ color: "#e8e6ff"        → ✅ color: "var(--text-high)"
❌ color: "#b5a3d4"        → ✅ color: "var(--text-mid)" or --text-low
❌ rgba(212, 181, 255, X)  → ✅ Add --brand-1-alpha-08, --brand-1-alpha-15, etc.

Files to update:
- src/app/resources/page.tsx (most hardcoded colors)
- src/app/sponsorship/page.tsx (a few instances)
*/

/* ====================================
   RECOMMENDED: ADD MORE ALPHA VARIANTS
   ==================================== */

/* Add to :root for both themes */
:root {
  --brand-1-alpha-08: rgba(171, 130, 197, 0.08);
  --brand-1-alpha-10: rgba(171, 130, 197, 0.1);
  --brand-1-alpha-15: rgba(171, 130, 197, 0.15);
  --brand-1-alpha-20: rgba(171, 130, 197, 0.2);
  --brand-1-alpha-30: rgba(171, 130, 197, 0.3);
}

/* For light mode, these would need adjustment */
[data-theme="light"] {
  --brand-1-alpha-08: rgba(124, 58, 237, 0.08);
  --brand-1-alpha-10: rgba(124, 58, 237, 0.1);
  --brand-1-alpha-15: rgba(124, 58, 237, 0.15);
  --brand-1-alpha-20: rgba(124, 58, 237, 0.2);
  --brand-1-alpha-30: rgba(124, 58, 237, 0.3);
}

/* ====================================
   ESTIMATED TIME
   ==================================== */
/*
Total: 2-3 hours

✅ Add light mode variables: 30 mins
✅ Create ThemeToggle component: 30 mins
✅ Add to navigation: 10 mins
✅ Replace hardcoded colors in resources page: 60 mins
✅ Replace hardcoded colors in sponsorship page: 15 mins
✅ Test both themes: 30 mins
✅ Fix any visual issues: 30 mins
*/
