"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "../components/navigation";
import GetConnected from "../components/getConnected";
import Link from "next/link";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    
    // Handle hash navigation when component mounts
    const handleHashNavigation = () => {
      if (window.location.hash === '#get-connected') {
        setTimeout(() => {
          const element = document.getElementById('get-connected');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100); // Small delay to ensure the page is fully loaded
      }
    };

    handleHashNavigation();
    
    return () => clearInterval(interval);
  }, []);

  // Function to scroll to GetConnected section
  const scrollToGetConnected = () => {
    const element = document.getElementById('get-connected');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen">

      <Navigation />

      {/* Hero Section */}
      <section className="section hero">
        <div className="site-container">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight" style={{color:'var(--text-high)'}}>
              <span className="inline-flex">
                <span className="px-4 py-2 logo-block rounded-l-2xl bg-white shadow-2xl transform transition-all duration-300 border-r" style={{color:'var(--primary)'}}>
                  ColorStack
                </span>
                <span className="px-4 py-2 logo-block rounded-r-2xl text-white shadow-2xl transform transition-all duration-300" style={{backgroundImage:'var(--brand-grad)'}}>
                  NYU
                </span>
              </span>
            </h1>
            <p className="text-lg md:text-2xl mb-8 max-w-4xl mx-auto site-tagline">
              The largest community of Black and Latino students in tech at NYU
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={scrollToGetConnected}
                className="group cta-primary"
              >
                Get Connected
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </button>
              <button className="cta-secondary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="section">
        <div className="site-container">
          <div className="grid-12 section-inner">
            <div className="col-span-7">
              <h2 className="text-4xl font-bold mb-6" style={{color:'var(--text-high)'}}>Our Mission</h2>
              <p className="text-lg mb-6" style={{color:'var(--text-mid)'}}>
                Dedicated to increasing the number of Black and Latinx Computer Science graduates who go on to launch rewarding technical careers
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="bullet-dot" aria-hidden></span>
                  <span style={{color:'var(--text-high)'}} className="text-lg">Office visits</span>
                </div>
                <div className="flex items-center">
                  <span className="bullet-dot" aria-hidden></span>
                  <span style={{color:'var(--text-high)'}} className="text-lg">Weekly coding sessions</span>
                </div>
                <div className="flex items-center">
                  <span className="bullet-dot" aria-hidden></span>
                  <span style={{color:'var(--text-high)'}} className="text-lg">Open to all CS levels</span>
                </div>
              </div>
            </div>

            {/* Event image block sits in its own row under Mission (no overlap) */}
            <div className="col-span-12">
              <div className="surface-card" style={{display:'grid',gridTemplateColumns:'1fr',alignItems:'center'}}>
                <div style={{fontSize:'1.25rem',marginBottom:'0.5rem', color:'var(--text-mid)'}}>image of event</div>
                <div style={{color:'var(--text-high)', fontWeight:600}}>event (scrolling coming)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="get-connected">
        <GetConnected />
      </div>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r flex items-center justify-center">
                  <img src="/Colorstack_Logo.png" alt="Logo" className="w-10 h-10 rounded-md" />
                </div>
                <h3 className="text-2xl font-bold text-white">ColorStackNYU</h3>
              </div>
              <p className="text-white/70 text-lg leading-relaxed">
                Empowering the next generation of Black and Latino technologists at NYU and beyond
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
              <div className="space-y-3">
                <a href="#about" className="block text-white/70 hover:text-white transition-colors">About Us</a>
                <a href="/events" className="block text-white/70 hover:text-white transition-colors">Events</a>
                <a href="/resources" className="block text-white/70 hover:text-white transition-colors">Resources</a>
                <a href="/meet-the-team" className="block text-white/70 hover:text-white transition-colors">Meet the Team</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Connect</h4>
              <div className="space-y-3">
                <a href="https://www.instagram.com/colorstacknyu/" target="_blank" className="block text-white/70 hover:text-white transition-colors">Instagram</a>
                <a href="#" target="_blank" className="block text-white/70 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" target="_blank" className="block text-white/70 hover:text-white transition-colors">Discord</a>
                <a href="mailto:colorstacknyu@gmail.com" className="block text-white/70 hover:text-white transition-colors">Email</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}