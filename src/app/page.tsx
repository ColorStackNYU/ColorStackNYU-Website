"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "../components/navigation";
import GetConnected from "../components/getConnected";
import Gallery from "../components/Gallery";
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
      if (window.location.hash === "#get-connected") {
        setTimeout(() => {
          const element = document.getElementById("get-connected");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100); // Small delay to ensure the page is fully loaded
      }
    };

    handleHashNavigation();

    return () => clearInterval(interval);
  }, []);

  // Function to scroll to GetConnected section
  const scrollToGetConnected = () => {
    const element = document.getElementById("get-connected");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="section hero">
        <div className="site-container">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1
              className="mb-4 leading-tight"
              style={{
                color: "var(--text-high)",
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 600,
              }}
            >
              <span className="wordmark">ColorStack @ NYU</span>
            </h1>
            <p
              className="mb-8 max-w-4xl site-tagline"
              style={{ marginTop: "6px" }}
            >
              The largest community of Black and Latino students in tech at NYU
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <button
                onClick={scrollToGetConnected}
                className="btn btn-primary"
              >
                Get Connected
                <span className="ml-2 transition-transform inline-block">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Where We've Landed - Marquee Section */}
      <section className="section logos-section">
        <div className="site-container text-center">
          <h3
            className="text-2xl font-semibold"
            style={{ color: "var(--text-high)" }}
          >
            Where We've Landed
          </h3>
          <p className="text-sm mt-2" style={{ color: "var(--text-mid)" }}>
            Our members have interned at 20+ top tech companies
          </p>
        </div>

        <div className="logos-marquee-wrap" aria-hidden="false">
          <div className="logos-marquee">
            <div className="marquee-track" aria-hidden="true">
              {/* Duplicate set 1 */}
              <div className="marquee-set">
                <div className="marquee-item">
                  <img src="/logos/google.svg" alt="Google" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/meta.svg" alt="Meta" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/microsoft.svg" alt="Microsoft" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/amazon.svg" alt="Amazon" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/apple.svg" alt="Apple" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/bloomberg.svg" alt="Bloomberg" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/goldman-sachs.svg" alt="Goldman Sachs" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/jpmorgan.svg" alt="JPMorgan" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/spotify.svg" alt="Spotify" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/netflix.svg" alt="Netflix" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/uber.svg" alt="Uber" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/airbnb.svg" alt="Airbnb" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/salesforce.svg" alt="Salesforce" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/adobe.svg" alt="Adobe" />
                </div>
              </div>

              {/* Duplicate set 2 (for seamless loop) */}
              <div className="marquee-set">
                <div className="marquee-item">
                  <img src="/logos/google.svg" alt="Google" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/meta.svg" alt="Meta" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/microsoft.svg" alt="Microsoft" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/amazon.svg" alt="Amazon" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/apple.svg" alt="Apple" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/bloomberg.svg" alt="Bloomberg" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/goldman-sachs.svg" alt="Goldman Sachs" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/jpmorgan.svg" alt="JPMorgan" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/spotify.svg" alt="Spotify" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/netflix.svg" alt="Netflix" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/uber.svg" alt="Uber" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/airbnb.svg" alt="Airbnb" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/salesforce.svg" alt="Salesforce" />
                </div>
                <div className="marquee-item">
                  <img src="/logos/adobe.svg" alt="Adobe" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="section">
        <div className="site-container">
          <div className="grid-12 section-inner">
            <div className="col-span-7">
              <h2
                className="text-4xl font-bold mb-6"
                style={{ color: "var(--text-high)" }}
              >
                Our Mission
              </h2>
              <p className="text-lg mb-6" style={{ color: "var(--text-mid)" }}>
                Dedicated to increasing the number of Black and Latinx Computer
                Science graduates who go on to launch rewarding technical
                careers
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="bullet-dot" aria-hidden></span>
                  <span
                    style={{ color: "var(--text-high)" }}
                    className="text-lg"
                  >
                    Office visits
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="bullet-dot" aria-hidden></span>
                  <span
                    style={{ color: "var(--text-high)" }}
                    className="text-lg"
                  >
                    Weekly coding sessions
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="bullet-dot" aria-hidden></span>
                  <span
                    style={{ color: "var(--text-high)" }}
                    className="text-lg"
                  >
                    Open to all CS levels
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-5">
              <Gallery />
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
                  <img
                    src="/Colorstack_Logo.png"
                    alt="Logo"
                    className="w-10 h-10 rounded-md"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white">ColorStackNYU</h3>
              </div>
              <p className="text-white/70 text-lg leading-relaxed">
                Empowering the next generation of Black and Latino technologists
                at NYU and beyond
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">
                Quick Links
              </h4>
              <div className="space-y-3">
                <a
                  href="#about"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  About Us
                </a>
                <a
                  href="/events"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Events
                </a>
                <a
                  href="/resources"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Resources
                </a>
                <a
                  href="/meet-the-team"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Meet the Team
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg mb-4">Connect</h4>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/colorstacknyu/"
                  target="_blank"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Discord
                </a>
                <a
                  href="mailto:colorstacknyu@gmail.com"
                  className="block text-white/70 hover:text-white transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
