"use client";

import Navigation from "../../components/navigation";

type Resource = {
  title: string;
  description: string;
  link: string;
};

const resources: Resource[] = [
  {
    title: "example resource",
    description: "example desc",
    link: "/docs/getting-started",
  },
];

function ResourceCard({ r }: { r: Resource }) {
  return (
    <a
      href={r.link}
      target={r.link.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="card"
    >
      <h3>{r.title}</h3>
      <p>{r.description}</p>
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main className="page-main site-container">
        <section className="page-heading max-w-3xl mx-auto">
          <h1 className="wordmark">Resources</h1>
          <p>Helpful links, guides, and opportunities curated for our community.</p>
        </section>

        <section>
          <div className="card-grid">
            {resources.map((r) => (
              <ResourceCard key={r.title} r={r} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}