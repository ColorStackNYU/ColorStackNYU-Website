"use client";

import { useEffect, useState } from "react";
import Navigation from "../../components/navigation";

type Member = {
    id: string;
    name: string;
    role: string;
    bio?: string;
    icon?: { type: "emoji" | "url"; value: string };
};

export default function MeetTheTeamPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/team", { cache: "no-store" });
                if (!res.ok) throw new Error("Failed to fetch team");
                const data = await res.json();

                const toCard = (m: any): Member => ({
                    id: m.id,
                    name: m.name,
                    role: m.role,
                    bio: [m.year, m.major, m.minor].filter(Boolean).join(" · "),
                    icon: m.icon,
                });

                // Combine all members into one array
                const allMembers = [
                    ...(data.leadership ?? []).map(toCard),
                    ...(data.core ?? []).map(toCard)
                ];
                const roleOrder = ["President", "Vice President", "Treasurer"];
                allMembers.sort((a, b) => {
                    const ai = roleOrder.indexOf(a.role);
                    const bi = roleOrder.indexOf(b.role);
                    if (ai !== -1 && bi !== -1) return ai - bi;
                    if (ai !== -1) return -1;
                    if (bi !== -1) return 1;
                    return a.name.localeCompare(b.name);
                });

                setMembers(allMembers);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>
            <Navigation />
            <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8 min-h-screen bg-[var(--background)] text-[var(--foreground)]">
                <div/>

                <section className="mx-auto mb-10 max-w-3xl text-center">
                    <h1 className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                        Meet the Team
                    </h1>
                    <p className="mt-4 text-base text-white/80 md:text-lg">
                        The students powering ColorStack @ NYU
                    </p>
                </section>

                {loading ? (
                    <p className="text-white/70">Loading…</p>
                ) : (
                    <section className="mb-12">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {members.map((m) => (
                                <Card key={m.id} m={m} />
                            ))}
                        </div>
                        {members.length === 0 && (
                            <p className="text-white/60 text-sm">No members yet.</p>
                        )}
                    </section>
                )}
            </main>
        </>
    );
}

function Card({ m }: { m: Member }) {
    return (
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
            <div className="flex items-center gap-3">
                {m.icon?.type === "url" ? (
                    <img
                        src={m.icon.value}
                        alt={`${m.name}`}
                        className="h-20 w-20 rounded-lg object-cover"
                    />
                ) : (
                    <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                        <span className="text-white font-semibold text-2xl">
                            {m.name.charAt(0)}
                        </span>
                    </div>
                )}
                <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold text-white">{m.name}</h3>
                    <p className="text-sm text-white/80">{m.role}</p>
                </div>
            </div>
            {m.bio && (
                <p className="mt-4 text-sm leading-relaxed text-white/80">{m.bio}</p>
            )}
        </div>
    );
}