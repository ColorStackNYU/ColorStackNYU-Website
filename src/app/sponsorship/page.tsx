"use client";

import Navigation from "../../components/navigation";

export default function SponsorshipPage() {
  return (
    <>
      <Navigation />
      <main className="page-main site-container">
        <section className="page-heading max-w-3xl mx-auto" style={{ animation: "fadeUp 420ms ease both" }}>
          <h1 className="wordmark">Sponsorship</h1>
          <p>Partner with ColorStackNYU to empower the next generation of tech leaders</p>
        </section>

        {/* Why Partner Section */}
        <section style={{
          marginBottom: "48px",
          paddingBottom: "48px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          animation: "fadeUp 420ms ease both 100ms backwards"
        }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "var(--text-high)",
            marginBottom: "24px"
          }}>Why Partner?</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            marginTop: "var(--space-medium)"
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
          animation: "fadeUp 420ms ease both 200ms backwards"
        }}>
          <h2 style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "var(--text-high)",
            marginBottom: "24px"
          }}>Get in Touch</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Ready to make an impact? Join us in building a more diverse and inclusive tech industry.
          </p>
          <a
            href="mailto:colorstacknyu@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 32px",
              height: "56px",
              background: "var(--brand-1)",
              color: "var(--text-high)",
              border: "1px solid transparent",
              borderRadius: "var(--radius)",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 150ms ease",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--brand-1-hover)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--brand-1)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
            }}
          >
            Contact Us by Email
          </a>
        </section>
      </main>
    </>
  );
}
