"use client";

import Navigation from "../../components/navigation";

// replace this with your actual form URL
const SponsorshipFormURL = "#"; 

export default function SponsorshipPage() {
  return (
    <>
      <Navigation />
      <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8 min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <section className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Sponsorship
          </h1>
          <p className="mt-4 text-base text-white/80 md:text-lg">
            Partner with ColorStackNYU to empower the next generation of tech leaders
          </p>
        </section>

        {/* Why Partner Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Why Partner?</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
              <h3 className="text-lg font-semibold text-white">Diverse Talent Pool</h3>
              <p className="text-white/80 text-sm mt-3">
                Connect with motivated students from underrepresented backgrounds in tech
              </p>
            </div>
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
              <h3 className="text-lg font-semibold text-white">Direct Impact</h3>
              <p className="text-white/80 text-sm mt-3">
                Support initiatives that make real difference in students' professional development
              </p>
            </div>
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
              <h3 className="text-lg font-semibold text-white">Brand Visibility</h3>
              <p className="text-white/80 text-sm mt-3">
                Showcase your commitment to diversity and inclusion in tech
              </p>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">How it Works</h2>
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-white mr-3">1</span>
                <p className="text-white/80">Reach out through our sponsorship form</p>
              </li>
              <li className="flex items-start">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-white mr-3">2</span>
                <p className="text-white/80">Schedule a meeting with our partnership team</p>
              </li>
              <li className="flex items-start">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-white mr-3">3</span>
                <p className="text-white/80">Choose your sponsorship package and customize engagement opportunities</p>
              </li>
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
            className="inline-block rounded-lg bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-8 py-3 text-white font-semibold hover:opacity-90 transition-opacity"
            target="_blank"
            rel="noreferrer"
          >
            Become a Sponsor
          </a>
        </section>

        {/* Sponsorship Package PDF Section - Hidden by default */}
        {false && ( // change when we have actual pdf to show
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Sponsorship Packages</h2>
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
              <p className="text-white/80 mb-4">
                Download our sponsorship package to learn more about available opportunities.
              </p>
              <a
                href="#" // change to actual pdf link
                className="inline-block rounded-lg bg-white/10 px-6 py-2 text-white hover:bg-white/20 transition-colors"
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
