"use client";
import { useState, useEffect } from "react";
import Navigation from "../components/navigation";
import ContentContainer from "../components/ContentContainer";
import GetConnected from "../components/getConnected";
import Gallery from "../components/Gallery";
import LogoImage from "../components/LogoImage";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

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

      <main id="main-content">
      {/* Hero Section */}
      <section className="section hero" aria-label="Hero">
        <div className="hero-background" aria-hidden="true"></div>
        <ContentContainer>
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1
              className="leading-tight"
              style={{
                marginBottom: "var(--spacing-lg)",
                color: "var(--text-high)",
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 600,
              }}
            >
              <span className="wordmark">ColorStack @ NYU</span>
            </h1>

            <p
              className="max-w-4xl site-tagline"
              style={{ marginTop: "var(--spacing-sm)", marginBottom: "var(--spacing-6xl)" }}
            >
              The largest community of Black and Latino students in tech at NYU
            </p>

            <div className="flex flex-col items-center" style={{ gap: "var(--spacing-lg)" }}>
              <button
                onClick={scrollToGetConnected}
                className="btn btn-primary"
                aria-label="Scroll to Get Connected section"
              >
                Get Connected
              </button>
            </div>
          </div>
        </ContentContainer>
      </section>

      {/* Where We've Landed - Marquee Section */}
      <section className="section logos-section" aria-label="Company Partnerships">
          <ContentContainer className="text-center relative">
            <div className="relative z-10">
              <h2
                className="font-semibold"
                style={{ fontSize: "var(--fs-h2)", color: "var(--text-high)" }}
              >
                Where We&apos;ve Landed
              </h2>
              <p style={{ fontSize: "var(--fs-small)", marginTop: "var(--spacing-sm)", color: "var(--text-mid)" }}>
                ColorStack members have interned and gone full time at top tech companies
              </p>
            </div>
          </ContentContainer>

        <div className="logos-marquee-wrap" aria-label="Company logos carousel">
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
      <section id="about" className="section" aria-labelledby="mission-heading">
        <ContentContainer>
          <div className="grid-12 section-inner">
            <div className="col-span-5">
              <h2
                id="mission-heading"
                className="font-bold"
                style={{ fontSize: "var(--fs-h1)", marginBottom: "var(--spacing-6xl)", color: "var(--text-high)" }}
              >
                Our Mission
              </h2>
              <p style={{ fontSize: "var(--fs-h3)", marginBottom: "var(--spacing-6xl)", color: "var(--text-mid)" }}>
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
      </main>
    </div>
  );
}
