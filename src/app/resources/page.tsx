"use client";

import Navigation from "../../components/navigation";

type Resource = {
  title: string;
  description: string;
  link: string;
};

const resources: Resource[] = [
  {
    title: "Getting Started Guide",
    description: "Learn how to get involved with ColorStackNYU and find your community.",
    link: "/docs/getting-started", // can be internal or external
  },
  {
    title: "Tech Interview Prep",
    description: "Practice problems, study plans, and curated resources to ace interviews.",
    link: "https://interviewprep.example.com",
  },
  {
    title: "Scholarships & Opportunities",
    description: "A list of scholarships, internships, and fellowships for CS students.",
    link: "/opportunities",
  },
  {
    title: "Event Recordings",
    description: "Catch up on past workshops, speaker panels, and community events.",
    link: "/events/recordings",
  },
];

function ResourceCard({ r }: { r: Resource }) {
  return (
    <a
      href={r.link}
      target={r.link.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="block rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur transition hover:bg-white/10"
    >
      <h3 className="text-lg font-semibold text-white">{r.title}</h3>
      <p className="mt-2 text-sm text-white/80">{r.description}</p>
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        {/* top fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />

        {/* hero */}
        <section className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Resources
          </h1>
          <p className="mt-4 text-base text-white/80 md:text-lg">
            Helpful links, guides, and opportunities curated for our community.
          </p>
        </section>

        {/* resource grid */}
        <section>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <ResourceCard key={r.title} r={r} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}