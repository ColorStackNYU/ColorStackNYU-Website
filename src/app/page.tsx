"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "../components/navigation";
import ContentContainer from "../components/ContentContainer";
import GetConnected from "../components/getConnected";
import Gallery from "../components/Gallery";
import Link from "next/link";
import LogoImage from "../components/LogoImage";

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
        <div className="hero-background"></div>
        <ContentContainer>
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
              className="mb-6 max-w-4xl site-tagline"
              style={{ marginTop: "6px" }}
            >
              The largest community of Black and Latino students in tech at NYU
            </p>

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={scrollToGetConnected}
                className="btn btn-primary"
                aria-label="Get Connected"
              >
                Get Connected
              </button>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* Where We've Landed - Marquee Section */}
      <section className="section logos-section">
          <ContentContainer className="text-center relative">
            <div className="relative z-10">
              <h3
                className="text-2xl font-semibold"
                style={{ color: "var(--text-high)" }}
              >
                Where We&apos;ve Landed
              </h3>
              <p className="text-sm mt-2" style={{ color: "var(--text-mid)" }}>
                ColorStack members have interned and gone full time at top tech companies
              </p>
            </div>
          </ContentContainer>

        <div className="logos-marquee-wrap" aria-hidden="false">
          <div className="logos-marquee">
            <div className="marquee-track" aria-hidden="true">
              {/* Duplicate set 1 */}
        <div className="marquee-set">
          <div className="marquee-item"><LogoImage name="google" alt="Google" /></div>
          <div className="marquee-item"><LogoImage name="meta" alt="Meta" /></div>
          <div className="marquee-item"><LogoImage name="microsoft" alt="Microsoft" /></div>
          <div className="marquee-item"><LogoImage name="janestreet" alt="Jane Street" /></div>
          <div className="marquee-item"><LogoImage name="amazon" alt="Amazon" /></div>
          <div className="marquee-item"><LogoImage name="apple" alt="Apple" /></div>
          <div className="marquee-item"><LogoImage name="bloomberg" alt="Bloomberg" /></div>
          <div className="marquee-item"><LogoImage name="goldman-sachs" alt="Goldman Sachs" /></div>
          <div className="marquee-item"><LogoImage name="jpmorgan" alt="JPMorgan" /></div>
          <div className="marquee-item"><LogoImage name="spotify" alt="Spotify" /></div>
          <div className="marquee-item"><LogoImage name="netflix" alt="Netflix" /></div>
          <div className="marquee-item"><LogoImage name="uber" alt="Uber" /></div>
          <div className="marquee-item"><LogoImage name="airbnb" alt="Airbnb" /></div>
          <div className="marquee-item"><LogoImage name="adobe" alt="Adobe" /></div>
          <div className="marquee-item"><LogoImage name="duolingo" alt="Duolingo" /></div>
                <div className="marquee-item">
                  <LogoImage name="google" alt="Google" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="meta" alt="Meta" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="microsoft" alt="Microsoft" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="amazon" alt="Amazon" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="apple" alt="Apple" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="bloomberg" alt="Bloomberg" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="goldman-sachs" alt="Goldman Sachs" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="jpmorgan" alt="JPMorgan" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="spotify" alt="Spotify" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="netflix" alt="Netflix" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="uber" alt="Uber" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="airbnb" alt="Airbnb" />
                </div>
                
                <div className="marquee-item">
                  <LogoImage name="adobe" alt="Adobe" />
                </div>
              </div>

              {/* Duplicate set 2 (for seamless loop) */}
              <div className="marquee-set">
                <div className="marquee-item"><LogoImage name="google" alt="Google" /></div>
                <div className="marquee-item"><LogoImage name="meta" alt="Meta" /></div>
                <div className="marquee-item"><LogoImage name="microsoft" alt="Microsoft" /></div>
                <div className="marquee-item"><LogoImage name="janestreet" alt="Jane Street" /></div>
                <div className="marquee-item"><LogoImage name="amazon" alt="Amazon" /></div>
                <div className="marquee-item"><LogoImage name="apple" alt="Apple" /></div>
                <div className="marquee-item"><LogoImage name="bloomberg" alt="Bloomberg" /></div>
                <div className="marquee-item"><LogoImage name="goldman-sachs" alt="Goldman Sachs" /></div>
                <div className="marquee-item"><LogoImage name="jpmorgan" alt="JPMorgan" /></div>
                <div className="marquee-item"><LogoImage name="spotify" alt="Spotify" /></div>
                <div className="marquee-item"><LogoImage name="netflix" alt="Netflix" /></div>
                <div className="marquee-item"><LogoImage name="uber" alt="Uber" /></div>
                <div className="marquee-item"><LogoImage name="airbnb" alt="Airbnb" /></div>
                <div className="marquee-item"><LogoImage name="adobe" alt="Adobe" /></div>
                <div className="marquee-item"><LogoImage name="duolingo" alt="Duolingo" /></div>
                <div className="marquee-item">
                  <LogoImage name="google" alt="Google" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="meta" alt="Meta" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="microsoft" alt="Microsoft" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="amazon" alt="Amazon" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="apple" alt="Apple" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="bloomberg" alt="Bloomberg" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="goldman-sachs" alt="Goldman Sachs" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="jpmorgan" alt="JPMorgan" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="spotify" alt="Spotify" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="netflix" alt="Netflix" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="uber" alt="Uber" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="airbnb" alt="Airbnb" />
                </div>
                <div className="marquee-item">
                  <LogoImage name="adobe" alt="Adobe" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="about" className="section">
        <ContentContainer>
          <div className="grid-12 section-inner">
            <div className="col-span-5">
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
              <div className="benefit-list">
                <div className="benefit-item">
                  <span className="benefit-icon" aria-hidden>
                    →
                  </span>
                  <div className="benefit-copy">
                    <div className="benefit-title">Connect with tech companies</div>
                    <div className="benefit-desc">Office tours, coffee chats, and insider access</div>
                  </div>
                </div>

                <div className="benefit-item">
                  <span className="benefit-icon" aria-hidden>
                    →
                  </span>
                  <div className="benefit-copy">
                    <div className="benefit-title">Build real projects together</div>
                    <div className="benefit-desc">Weekly coding sessions with peers and mentors</div>
                  </div>
                </div>

                <div className="benefit-item">
                  <span className="benefit-icon" aria-hidden>
                    →
                  </span>
                  <div className="benefit-copy">
                    <div className="benefit-title">All experience levels welcome</div>
                    <div className="benefit-desc">From first line of code to advanced algorithms</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-7">
              <Gallery />
            </div>
          </div>
        </ContentContainer>
      </section>

      <div id="get-connected">
        <GetConnected />
      </div>
    </div>
  );
}
