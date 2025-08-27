"use client";

import Link from "next/link";
import Navigation from "../../components/navigation";

type Member = {
    name: string;
    role: string;
    bio?: string;
};

const leadership: Member[] = [
    {
        name: "Jordan Carter",
        role: "President",
        bio: "CS @ NYU • Community, AI, and access.",
    },
    {
        name: "Naomi Reyes",
        role: "Vice President",
        bio: "Full-stack builder and event wrangler.",
    },
    {
        name: "David Kim",
        role: "Treasurer",
        bio: "Making the numbers friendly so the vibes can thrive.",
    },
];

const core: Member[] = [
    { name: "Hannah Lewis", role: "Events Lead", bio: "Ships unforgettable events and snacks." },
    { name: "Aiden Gomez", role: "Technical Lead", bio: "TypeScript, systems, and leveling up others." },
    { name: "Amara Okafor", role: "Design Lead", bio: "Turning ideas into friendly pixels." },
    { name: "Marcus Silva", role: "Community Manager", bio: "Your first ping when you join." },
    { name: "Priya Shah", role: "Sponsorships", bio: "Partnerships & outreach." },
];

function Card({ m }: { m: Member }) {
    return (
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
            <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold text-white">{m.name}</h3>
                <p className="text-sm text-white/80">{m.role}</p>
            </div>
            {m.bio && <p className="mt-4 text-sm leading-relaxed text-white/80">{m.bio}</p>}
        </div>
    );
}

export default function MeetTheTeamPage() {
    return (
        <>
            <Navigation />
            <main className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
                {/* top fade */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent" />

                {/* hero */}
                <section className="mx-auto mb-10 max-w-3xl text-center">
                    <h1 className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                        Meet the Team
                    </h1>
                    <p className="mt-4 text-base text-white/80 md:text-lg">
                        The students powering ColorStackNYU
                    </p>
                </section>

                {/* leadership */}
                <section className="mb-12">
                    <h2 className="mb-4 text-xl font-semibold text-white/90">Leadership</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {leadership.map((m) => (
                            <Card key={m.name} m={m} />
                        ))}
                    </div>
                </section>

                {/* core team */}
                <section>
                    <h2 className="mb-4 text-xl font-semibold text-white/90">Core Team</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {core.map((m) => (
                            <Card key={m.name} m={m} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
