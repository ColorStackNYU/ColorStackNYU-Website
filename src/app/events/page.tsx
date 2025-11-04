// app/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import Navigation from "../../components/navigation";
import ContentContainer from "../../components/ContentContainer";
import { useApiData } from "../../hooks/useApiData";

type EventItem = {
  id: string;
  title: string;
  start: string;
  end?: string;
  tags?: string[];
  status?: string;
  url: string;
  instagramUrl?: string;
};

type GroupedEvents = {
  [monthYear: string]: EventItem[];
};

// Helper function to format date like "Monday, Nov 10"
function formatEventDate(start: string): string {
  const startDate = new Date(start);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };
  
  return startDate.toLocaleString("en-US", options);
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

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventItem[]>([]);
  const [pastEvents, setPastEvents] = useState<EventItem[]>([]);
  
  // Fetch events data using shared hook
  const { data, loading, error } = useApiData<{events: EventItem[]}>("/api/events");

  // Process events: separate into upcoming/past and sort
  useEffect(() => {
    const allEvents = data?.events ?? [];
    const now = new Date();
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
    
    // Sort upcoming descending by start date (newest first: Dec 1 before Nov)
    upcoming.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
    
    // Sort past descending by start date (newest first)
    past.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
    
    setUpcomingEvents(upcoming);
    setPastEvents(past);
  }, [data]);

  // Group upcoming events by month/semester
  const groupedUpcoming = groupByMonth(upcomingEvents);

  return (
    <>
      <Navigation />
      <main id="main-content" className="page-main">
        <ContentContainer>
          <section className="page-heading">
            <h1 className="wordmark">Events</h1>
            <p>
              Follow{" "}
              <a
                href="https://www.instagram.com/colorstacknyu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline hover:text-brand-hover"
              >
                @colorstacknyu
              </a>
              {" "}for event details, photos, and updates
            </p>
          </section>

          {loading && <p className="text-center text-white/70">Loading…</p>}
          {error && <p className="text-center text-red-300">Error: {error}</p>}

          {!loading && !error && (
            <div>
                {/* Upcoming Events Section */}
                <section className="mb-12">
                <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-high)" }}>
                  Upcoming Events
                </h2>

                {upcomingEvents.length === 0 ? (
                  <p className="text-center" style={{ color: "var(--text-mid)" }}>
                    No upcoming events at this time. Check back soon!
                  </p>
                ) : (
                  Object.entries(groupedUpcoming).map(([monthYear, events]) => (
                    <div key={monthYear} className="mb-12">
                      <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-high)" }}>
                        {monthYear}
                      </h3>
                      <div className="card-grid">
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
                <section className="mb-12">
                  <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-high)" }}>
                    Past Events
                  </h2>
                  <div className="card-grid">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} isPast />
                    ))}
                  </div>
                </section>
              )}
              </div>
            )}
        </ContentContainer>
      </main>
    </>
  );
}

// EventCard Component
function EventCard({ event, isPast = false }: { event: EventItem; isPast?: boolean }) {
  const cardUrl = event.instagramUrl || event.url;
  
  return (
    <a
      href={cardUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="card"
      style={{
        opacity: isPast ? 0.8 : 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Instagram Icon - Top Right */}
      {event.instagramUrl && (
        <div
          className="event-instagram-icon"
          title="View on Instagram"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "24px",
            height: "24px",
            color: "var(--brand-1)",
            transition: "color 200ms ease, transform 200ms ease",
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
      )}

      {/* Title - Dominant */}
      <h3 
        style={{ 
          fontSize: "20px", 
          fontWeight: 700, 
          color: "var(--text-high)", 
          marginBottom: "12px",
          lineHeight: "1.3",
          paddingRight: event.instagramUrl ? "32px" : "0", // Add padding when icon is present
        }}
      >
        {event.title}
      </h3>

      {/* Date - Secondary */}
      <p style={{ 
        fontSize: "14px", 
        fontWeight: 400,
        color: "var(--text-mid)", 
        marginBottom: "16px",
        opacity: 0.9,
      }}>
        <time dateTime={event.start}>
          {formatEventDate(event.start)}
        </time>
      </p>

      {/* Tags - Footer */}
      {event.tags && event.tags.length > 0 && (
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "8px",
          marginTop: "auto",
          paddingTop: "12px",
          borderTop: "1px solid rgba(171, 130, 197, 0.15)",
        }}>
          {event.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "11px",
                color: "var(--brand-1)",
                opacity: 0.9,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}