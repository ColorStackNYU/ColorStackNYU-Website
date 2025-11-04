"use client";

import Navigation from "../../components/navigation";

// replace this with your actual form URL
const SponsorshipFormURL = "#";

export default function SponsorshipPage() {
  return (
    <>
      <Navigation />
      <main className="page-main site-container">
        <section className="page-heading max-w-3xl mx-auto">
          <h1 className="wordmark">Sponsorship</h1>
          <p>Partner with ColorStackNYU to empower the next generation of tech leaders</p>
        </section>

        {/* Why Partner Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Why Partner?</h2>
          <div className="card-grid">
            <div className="card">
              <h3>Diverse Talent Pool</h3>
              <p>Connect with motivated students from underrepresented backgrounds in tech</p>
            </div>
            <div className="card">
              <h3>Direct Impact</h3>
              <p>Support initiatives that make real difference in students&apos; professional development</p>
            </div>
            <div className="card">
              <h3>Brand Visibility</h3>
              <p>Showcase your commitment to diversity and inclusion in tech</p>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">How it Works</h2>
          <div className="content-section">
            <ol>
              <li>Reach out through our sponsorship form</li>
              <li>Schedule a meeting with our partnership team</li>
              <li>Choose your sponsorship package and customize engagement opportunities</li>
            </ol>
          </div>
        </section>

        {/* Get in Touch Section */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Ready to make an impact? Join us in building a more diverse and inclusive tech industry.
          </p>
          <a
            href={SponsorshipFormURL}
            className="btn btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Become a Sponsor
          </a>
        </section>

        {/* Sponsorship Package PDF Section - Hidden by default */}
        {false && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Sponsorship Packages</h2>
            <div className="content-section">
              <p>Download our sponsorship package to learn more about available opportunities.</p>
              <a
                href="#"
                className="btn btn-secondary"
                target="_blank"
                rel="noreferrer"
              >
                Download PDF
              </a>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
