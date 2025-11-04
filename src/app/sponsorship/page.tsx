"use client";

import Navigation from "../../components/navigation";
import ContentContainer from "../../components/ContentContainer";

export default function SponsorshipPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="page-main">
        <ContentContainer>
          <section className="page-heading" style={{ 
            animation: "fadeUp 420ms ease both",
            marginBottom: "var(--spacing-2xl)"
          }}>
            <h1 className="wordmark">Sponsorship</h1>
            <p>Partner with ColorStackNYU to empower the next generation of tech leaders</p>
          </section>

          {/* Why Partner Section */}
          <section style={{
            marginBottom: "var(--spacing-xl)",
            paddingBottom: "var(--spacing-xl)",
            borderBottom: "1px solid var(--border)",
            animation: "fadeUp 420ms ease both 100ms backwards"
          }}>
          <h2 style={{
            fontSize: "var(--fs-h2)",
            fontWeight: 700,
            color: "var(--text-high)",
            marginBottom: "var(--spacing-xl)"
          }}>Why Partner?</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--spacing-2xl)",
            marginTop: "var(--spacing-sm)"
          }}>
            <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <h3>Diverse Talent Pool</h3>
              <p style={{ flex: 1 }}>Connect with motivated students from underrepresented backgrounds in tech</p>
            </div>
            <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <h3>Direct Impact</h3>
              <p style={{ flex: 1 }}>Support initiatives that make real difference in students&apos; professional development</p>
            </div>
            <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <h3>Brand Visibility</h3>
              <p style={{ flex: 1 }}>Showcase your commitment to diversity and inclusion in tech</p>
            </div>
          </div>
        </section>

        {/* Get in Touch Section */}
        <section style={{
          textAlign: "center",
          marginTop: "var(--spacing-xl)",
          animation: "fadeUp 420ms ease both 200ms backwards"
        }}>
          <h2 style={{
            fontSize: "var(--fs-h2)",
            fontWeight: 700,
            color: "var(--text-high)",
            marginBottom: "var(--spacing-xl)"
          }}>Get in Touch</h2>
          <p className="max-w-2xl mx-auto" style={{ color: "var(--text-mid)", marginBottom: "var(--spacing-6xl)" }}>
            Ready to make an impact? Join us in building a more diverse and inclusive tech industry.
          </p>
          <a
            href="mailto:colorstacknyu@gmail.com"
            className="btn btn-primary"
            style={{
              height: "var(--spacing-6xl)",
              padding: "0 var(--spacing-2xl)",
              fontSize: "var(--fs-body)"
            }}
          >
            Contact Us
          </a>
        </section>
        </ContentContainer>
      </main>
    </>
  );
}
