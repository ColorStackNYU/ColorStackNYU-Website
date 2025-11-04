// app/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  graphic?: string;
  flyer?: string;
  instagramPostURL?: string;
  engageURL?: string;
};

type GroupedEvents = {
  [monthYear: string]: EventItem[];
};

// Helper function to format date/time like "Monday, Sept 22 · 6:30–8:00 PM ET"
function formatEventDateTime(start: string, end?: string): string {
  const startDate = new Date(start);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  };
  
  let formatted = startDate.toLocaleString("en-US", options);
  
  if (end) {
    const endDate = new Date(end);
    const endTime = endDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    });
    // Remove timezone from start, add time range
    formatted = formatted.replace(/ [A-Z]{2,3}$/, "") + `–${endTime}`;
  }
  
  return formatted.replace(",", " ·");
}

// Helper to group events by month
function groupByMonth(events: EventItem[]): GroupedEvents {
  const grouped: GroupedEvents = {};
  
  events.forEach((event) => {
    const date = new Date(event.start);
    const monthYear = date.toLocaleString("en-US", { month: "long", year: "numeric" });
    
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(event);
  });
  
  return grouped;
}

// Helper to truncate description to ~2 lines
function truncateDescription(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch events (${res.status})`);
        const data = await res.json();
        const allEvents = data.events ?? [];
        
        const now = new Date();
        
        // Separate upcoming and past events
        const upcoming: EventItem[] = [];
        const past: EventItem[] = [];
        
        allEvents.forEach((event: EventItem) => {
          const eventStart = new Date(event.start);
          const isScheduled = event.status === "Scheduled";
          const isCompleted = event.status === "Completed";
          const isCanceled = event.status === "Canceled";
          const isPastDate = eventStart < now;
          
          // Upcoming: Status == "Scheduled" AND Start >= now
          if (isScheduled && !isPastDate) {
            upcoming.push(event);
          }
          // Past: Status == "Completed" OR (Start < now AND not Canceled)
          else if (isCompleted || (isPastDate && !isCanceled)) {
            past.push(event);
          }
        });
        
        // Sort upcoming ascending by start date
        upcoming.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
        
        // Sort past descending by start date
        past.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
        
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (e: any) {
        setError(e.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Group upcoming events by month
  const groupedUpcoming = groupByMonth(upcomingEvents);

  return (
    <>
      <Navigation />
      <main id="main-content" className="page-main">
        <ContentContainer>
          <section className="page-heading max-w-3xl mx-auto">
            <h1 className="wordmark">Events</h1>
            <p>Join us for workshops, socials, and career development opportunities</p>
          </section>

          {loading && <p className="text-center text-white/70">Loading…</p>}
          {error && <p className="text-center text-red-300">Error: {error}</p>}

          {!loading && !error && (
            <>
              {/* Upcoming Events Section */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--text-high)" }}>
                  Upcoming Events
                </h2>

                {upcomingEvents.length === 0 ? (
                  <p className="text-center" style={{ color: "var(--text-mid)" }}>
                    No upcoming events at this time. Check back soon!
                  </p>
                ) : (
                  Object.entries(groupedUpcoming).map(([monthYear, events]) => (
                    <div key={monthYear} className="mb-12">
                      <h3 className="text-xl font-semibold mb-6" style={{ color: "var(--brand)" }}>
                        {monthYear}
                      </h3>
                      <div className="space-y-6">
                        {events.map((event) => (
                          <EventCard key={event.id} event={event} />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </section>

              {/* Past Events Section - Only show if there are past events */}
              {pastEvents.length > 0 && (
                <section className="mb-16">
                  <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--text-high)" }}>
                    Past Events
                  </h2>
                  <div className="space-y-6">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} isPast />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </ContentContainer>
      </main>
    </>
  );
}

// EventCard Component
function EventCard({ event, isPast = false }: { event: EventItem; isPast?: boolean }) {
  return (
    <article
      className="card"
      style={{
        display: "grid",
        gridTemplateColumns: event.graphic ? "300px 1fr" : "1fr",
        gap: "1.5rem",
        opacity: isPast ? 0.8 : 1,
      }}
    >
      {/* Media Section */}
      {event.graphic && (
        <div style={{ position: "relative", width: "100%", height: "200px", borderRadius: "8px", overflow: "hidden" }}>
          <Image
            src={event.graphic}
            alt={`${event.title} graphic`}
            fill
            style={{ objectFit: "cover" }}
            sizes="300px"
          />
        </div>
      )}

      {/* Content Section */}
      <div>
        <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-high)" }}>
          {event.title}
        </h3>

        {/* Date/Time */}
        <p className="mb-2" style={{ color: "var(--text-mid)", fontSize: "0.95rem" }}>
          <time dateTime={event.start}>
            {formatEventDateTime(event.start, event.end)}
          </time>
        </p>

        {/* Location */}
        {event.location && (
          <p className="mb-3" style={{ color: "var(--text-mid)", fontSize: "0.9rem" }}>
            📍 {event.location}
          </p>
        )}

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full"
                style={{
                  backgroundColor: "var(--surface)",
                  color: "var(--brand)",
                  border: "1px solid var(--brand)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        {event.description && (
          <p className="mb-4" style={{ color: "var(--text-mid)", lineHeight: "1.6" }}>
            {truncateDescription(event.description)}
          </p>
        )}

        {/* Media Links - Priority: Graphic (already shown) → Flyer → Instagram → Engage */}
        <div className="flex flex-wrap gap-3 items-center">
          {!event.graphic && event.flyer && (
            <a
              href={event.flyer}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline hover:text-brand-hover"
              aria-label={`View flyer for ${event.title} (opens in new tab)`}
            >
              📄 View Flyer (PDF)
            </a>
          )}

          {!event.graphic && !event.flyer && event.instagramPostURL && (
            <a
              href={event.instagramPostURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline hover:text-brand-hover"
              aria-label={`View Instagram post for ${event.title} (opens in new tab)`}
            >
              📸 View on Instagram
            </a>
          )}

          {event.engageURL && (
            <a
              href={event.engageURL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              aria-label={`RSVP for ${event.title} on NYU Engage (opens in new tab)`}
            >
              RSVP on Engage
            </a>
          )}

          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline hover:text-brand-hover"
              aria-label={`More information about ${event.title} (opens in new tab)`}
            >
              More Info
            </a>
          )}
        </div>
      </div>
    </article>
  );
}