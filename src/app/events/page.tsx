"use client";

import { useState, useEffect } from "react";
import Navigation from "../../components/navigation";

// --------------------
// Types
// --------------------

type EventItem = {
  id: string;
  title: string;
  description?: string;
  start: string; // ISO
  end?: string; // ISO
  location?: string;
  link?: string;
  tags?: string[];
  status?: string;
  url: string; // Notion page URL (unused here but kept for completeness)
};

type ViewMode = "list" | "timeline"; // <-- FIX: use timeline instead of unused "calendar"

// --------------------
// Helpers
// --------------------

function formatRange(startISO: string, endISO?: string) {
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : undefined;

  const dateFmt = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeFmt = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  const datePart = dateFmt.format(start);

  if (end && end.getTime() !== start.getTime()) {
    const timePart = `${timeFmt.format(start)}–${timeFmt.format(end)}`;
    return `${datePart} • ${timePart}`;
  } else {
    const timePart = timeFmt.format(start);
    return `${datePart} • ${timePart}`;
  }
}

function formatDateShort(dateISO: string) {
  const date = new Date(dateISO);
  const dateFmt = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  });
  return dateFmt.format(date);
}

function formatTime(dateISO: string) {
  const date = new Date(dateISO);
  const timeFmt = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  return timeFmt.format(date);
}

function toGoogleCalendarUrl(e: EventItem) {
  const fmt = (iso: string) => {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    const yyyy = d.getUTCFullYear();
    const mm = pad(d.getUTCMonth() + 1);
    const dd = pad(d.getUTCDate());
    const hh = pad(d.getUTCHours());
    const min = pad(d.getUTCMinutes());
    const ss = pad(d.getUTCSeconds());
    return `${yyyy}${mm}${dd}T${hh}${min}${ss}Z`;
  };

  const start = fmt(e.start);
  const end = fmt(e.end ?? e.start);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${start}/${end}`,
    details: e.description ?? "",
    location: e.location ?? "",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// --------------------
// UI pieces
// --------------------

function Tag({
  children,
  active = false,
  onClick,
}: {
  children: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs transition ${
        active
          ? "bg-white text-black"
          : "border border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function ViewToggle({
  viewMode,
  onViewChange,
}: {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}) {
  return (
    <div className="flex rounded-lg border border-white/20 bg-white/5 p-1">
      <button
        onClick={() => onViewChange("list")}
        className={`rounded-md px-3 py-1.5 text-sm transition ${
          viewMode === "list" ? "bg-white text-black" : "text-white/80 hover:text-white"
        }`}
      >
        List View
      </button>
      <button
        onClick={() => onViewChange("timeline")}
        className={`rounded-md px-3 py-1.5 text-sm transition ${
          viewMode === "timeline" ? "bg-white text-black" : "text-white/80 hover:text-white"
        }`}
      >
        Timeline View
      </button>
    </div>
  );
}

function EventCard({ e }: { e: EventItem }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{e.title}</h3>
          <div className="mt-2 text-sm text-white/80">{formatRange(e.start, e.end)}</div>
          {e.location && <div className="mt-1 text-sm text-white/70">{e.location}</div>}
        </div>

        {e.link && (
          <a
            href={e.link}
            target={e.link.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 transition hover:bg-white/20"
          >
            Details
          </a>
        )}
      </div>

      {e.description && (
        <p className="mt-3 text-sm leading-relaxed text-white/80">{e.description}</p>
      )}

      {e.tags && e.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {e.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 border-t border-white/10 pt-3">
        <a
          href={toGoogleCalendarUrl(e)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 transition hover:bg-white/20"
        >
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          Add to Calendar
        </a>
      </div>
    </div>
  );
}

function CalendarEventCard({ e }: { e: EventItem }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3 shadow backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-center">
          <div className="rounded-lg border border-white/20 bg-white/10 px-2 py-1">
            <div className="text-xs font-medium text-white/90">{formatDateShort(e.start)}</div>
            <div className="text-xs text-white/70">{formatTime(e.start)}</div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="truncate text-sm font-medium text-white">{e.title}</h4>
            {e.link && (
              <a
                href={e.link}
                target={e.link.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="flex-shrink-0 rounded border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/90 transition hover:bg-white/20"
              >
                Details
              </a>
            )}
          </div>

          {e.location && <div className="mt-1 text-xs text-white/60">{e.location}</div>}

          {e.tags && e.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {e.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/70"
                >
                  {t}
                </span>
              ))}
              {e.tags.length > 2 && (
                <span className="text-[10px] text-white/50">+{e.tags.length - 2}</span>
              )}
            </div>
          )}

          <div className="mt-2">
            <a
              href={toGoogleCalendarUrl(e)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/90 transition hover:bg-white/20"
            >
              <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Add to Calendar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function groupEventsByMonth(events: EventItem[]) {
  const grouped: { [key: string]: EventItem[] } = {};

  events.forEach((event) => {
    const date = new Date(event.start);
    const monthYear = date.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });

    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(event);
  });

  return grouped;
}

// --------------------
// Page
// --------------------

export default function EventsPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const response = await fetch("/api/events");

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({} as any));
          throw new Error((errorData as any).error || "Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data.events || []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err instanceof Error ? err.message : "Failed to load events");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />

          <section className="mx-auto mb-8 max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Events
            </h1>
            <p className="mt-4 text-base text-white/80 md:text-lg">
              Workshops, meetups, and career moments for the ColorStackNYU community.
            </p>
          </section>

          <div className="flex justify-center">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
              Loading events...
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />

          <section className="mx-auto mb-8 max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Events
            </h1>
            <p className="mt-4 text-base text-white/80 md:text-lg">
              Workshops, meetups, and career moments for the ColorStackNYU community.
            </p>
          </section>

          <div className="flex justify-center">
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-red-200">
              Error loading events: {error}
            </div>
          </div>
        </main>
      </>
    );
  }

  // Derived data
  const allTags = Array.from(new Set(events.flatMap((e) => e.tags ?? []))).sort();

  const now = new Date();
  const sorted = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
  const upcoming = sorted.filter((e) => new Date(e.end ?? e.start) >= now);
  const past = sorted
    .filter((e) => new Date(e.end ?? e.start) < now)
    .reverse();

  const filteredUpcoming = activeTag
    ? upcoming.filter((e) => e.tags?.includes(activeTag))
    : upcoming;
  const filteredPast = activeTag ? past.filter((e) => e.tags?.includes(activeTag)) : past;

  const upcomingByMonth = groupEventsByMonth(filteredUpcoming);
  const pastByMonth = groupEventsByMonth(filteredPast);

  return (
    <>
      <Navigation />
      <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />

        <section className="mx-auto mb-8 max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Events
          </h1>
          <p className="mt-4 text-base text-white/80 md:text-lg">
            Workshops, meetups, and career moments for the ColorStackNYU community.
          </p>
        </section>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {allTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <Tag active={!activeTag} onClick={() => setActiveTag(null)}>
                  All
                </Tag>
                {allTags.map((t) => (
                  <Tag key={t} active={activeTag === t} onClick={() => setActiveTag(t)}>
                    {t}
                  </Tag>
                ))}
              </div>
            )}
          </div>

          <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
        </div>

        {/* Upcoming */}
        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-white/90">Upcoming</h2>
          {filteredUpcoming.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
              No upcoming events{activeTag ? ` for "${activeTag}"` : ""}. Check back soon!
            </div>
          ) : viewMode === "list" ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredUpcoming.map((e) => (
                <EventCard key={e.id} e={e} />
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(upcomingByMonth).map(([monthYear, monthEvents]) => (
                <div key={monthYear}>
                  <h3 className="mb-4 text-lg font-medium text-white/90">{monthYear}</h3>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {monthEvents.map((e) => (
                      <CalendarEventCard key={e.id} e={e} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Past */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-white/90">Past</h2>
          {filteredPast.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
              No past events{activeTag ? ` for "${activeTag}"` : ""}.
            </div>
          ) : viewMode === "list" ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPast.map((e) => (
                <EventCard key={e.id} e={e} />
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(pastByMonth).map(([monthYear, monthEvents]) => (
                <div key={monthYear}>
                  <h3 className="mb-4 text-lg font-medium text-white/90">{monthYear}</h3>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {monthEvents.map((e) => (
                      <CalendarEventCard key={e.id} e={e} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
