// app/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import Navigation from "../../components/navigation";
import ContentContainer from "../../components/ContentContainer";

type EventItem = {
  id: string;
  title: string;
  description?: string;
  start: string;
  end?: string;
  location?: string;
  link?: string;
  tags?: string[];
  status?: string;
  url: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch events (${res.status})`);
        const data = await res.json();
        setEvents(data.events ?? []);
      } catch (e: any) {
        setError(e.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Navigation />
      <main className="page-main">
        <ContentContainer>
        <section className="page-heading max-w-3xl mx-auto">
          <h1 className="wordmark">Events</h1>
          <p>Upcoming happenings at ColorStackNYU</p>
        </section>

        {loading && <p className="text-center text-white/70">Loading…</p>}
        {error && <p className="text-center text-red-300">Error: {error}</p>}

        {!loading && !error && (
          <ul className="card-grid">
            {events.map((ev) => (
              <li key={ev.id} className="card">
                <h3>{ev.title}</h3>
                <p>
                  {ev.start}
                  {ev.end ? ` – ${ev.end}` : ""}
                </p>
                {ev.location && <p>{ev.location}</p>}
                {ev.description && <p>{ev.description}</p>}
                {ev.link && (
                  <a
                    className="text-brand underline mt-2 inline-block hover:text-brand-hover"
                    href={ev.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    More info
                  </a>
                )}
              </li>
            ))}
            {events.length === 0 && (
              <p className="text-center text-white/60 col-span-full">No events yet.</p>
            )}
          </ul>
  )}

        {/* Points Section - DISABLED FOR NOW, KEPT FOR LATER */}
        {false && (
          <section className="mt-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white">What are Points?</h2>
            </div>

            <div className="content-section">
              <p>
                Points are earned by attending events (1 point per event). Points help determine priority
                for limited-capacity opportunities like office visits. Leaderboard shows consenting members
                only.
              </p>

              <div className="benefit-grid">
                <div>
                  <h3>How to Earn?</h3>
                  <ul>
                    <li>• Attend events (1 point each)</li>
                    <li>• Participate in workshops</li>
                    <li>• Engage in community activities</li>
                  </ul>
                </div>

                <div>
                  <h3>Benefits</h3>
                  <ul>
                    <li>• Priority for office visits</li>
                    <li>• Access to exclusive events</li>
                    <li>• Recognition in the community</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
        </ContentContainer>
      </main>
    </>
  );
}