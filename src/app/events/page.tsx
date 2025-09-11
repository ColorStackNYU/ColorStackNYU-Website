// app/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import Navigation from "../../components/navigation";

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
  const [error, setError]   = useState<string | null>(null);

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
      <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <section className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Events
          </h1>
          <p className="mt-4 text-base text-white/80 md:text-lg">
            Upcoming happenings at ColorStackNYU
          </p>
        </section>

        {loading && <p className="text-white/70">Loading…</p>}
        {error && <p className="text-red-300">Error: {error}</p>}

        {!loading && !error && (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((ev) => (
              <li key={ev.id} className="relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
                <h3 className="text-lg font-semibold text-white">{ev.title}</h3>
                <p className="text-white/70 text-sm mt-1">
                  {ev.start}{ev.end ? ` – ${ev.end}` : ""}
                </p>
                {ev.location && <p className="text-white/80 text-sm mt-1">{ev.location}</p>}
                {ev.description && <p className="text-white/80 text-sm mt-3">{ev.description}</p>}
                {ev.link && (
                  <a className="text-indigo-300 underline mt-3 inline-block" href={ev.link} target="_blank" rel="noreferrer">
                    More info
                  </a>
                )}
              </li>
            ))}
            {events.length === 0 && <p className="text-white/60">No events yet.</p>}
          </ul>
        )}
      </main>
    </>
  );
}