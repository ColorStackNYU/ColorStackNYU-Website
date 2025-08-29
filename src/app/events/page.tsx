"use client";

import { useState } from "react";
import Navigation from "../../components/navigation";

type EventItem = {
    title: string;
    description?: string;
    start: string; 
    end?: string;  
    location?: string;
    link?: string; 
    tags?: string[]; 
};

const events: EventItem[] = [
    {
        title: "Example event",
        description: "example desc",
        start: "example start time",
        end: "example end time",
        location: "example location",
        link: "/events/welcome",
        tags: ["example1", "example2"],
    },
];

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
    const timePart = end ? `${timeFmt.format(start)}–${timeFmt.format(end)}` : timeFmt.format(start);
    return `${datePart} • ${timePart}`;
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
            className={`rounded-full px-3 py-1 text-xs transition ${active ? "bg-white text-black" : "border border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
                }`}
        >
            {children}
        </button>
    );
}

function EventCard({ e }: { e: EventItem }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{e.title}</h3>
                <div className="flex gap-2">
                    <a
                        href={toGoogleCalendarUrl(e)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 transition hover:bg-white/20"
                    >
                        Add to Calendar
                    </a>
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
            </div>

            <div className="mt-2 text-sm text-white/80">{formatRange(e.start, e.end)}</div>
            {e.location && <div className="mt-1 text-sm text-white/70">{e.location}</div>}
            {e.description && <p className="mt-3 text-sm leading-relaxed text-white/80">{e.description}</p>}

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
        </div>
    );
}

export default function EventsPage() {
    const [activeTag, setActiveTag] = useState<string | null>(null);

    // simple derived data (no memo)
    const allTags = Array.from(
        new Set(events.flatMap((e) => e.tags ?? []))
    ).sort();

    const now = new Date();
    const sorted = [...events].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
    const upcoming = sorted.filter((e) => new Date(e.end ?? e.start) >= now);
    const past = sorted.filter((e) => new Date(e.end ?? e.start) < now).reverse();

    const filteredUpcoming = activeTag ? upcoming.filter((e) => e.tags?.includes(activeTag)) : upcoming;
    const filteredPast = activeTag ? past.filter((e) => e.tags?.includes(activeTag)) : past;

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

                {allTags.length > 0 && (
                    <section className="mb-8 flex flex-wrap items-center gap-2">
                        <Tag active={!activeTag} onClick={() => setActiveTag(null)}>
                            All
                        </Tag>
                        {allTags.map((t) => (
                            <Tag key={t} active={activeTag === t} onClick={() => setActiveTag(t)}>
                                {t}
                            </Tag>
                        ))}
                    </section>
                )}

                <section className="mb-12">
                    <h2 className="mb-4 text-xl font-semibold text-white/90">Upcoming</h2>
                    {filteredUpcoming.length === 0 ? (
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
                            No upcoming events{activeTag ? ` for “${activeTag}”` : ""}. Check back soon!
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredUpcoming.map((e) => (
                                <EventCard key={`${e.title}-${e.start}`} e={e} />
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-semibold text-white/90">Past</h2>
                    {filteredPast.length === 0 ? (
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
                            No past events{activeTag ? ` for “${activeTag}”` : ""}.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredPast.map((e) => (
                                <EventCard key={`${e.title}-${e.start}`} e={e} />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}
