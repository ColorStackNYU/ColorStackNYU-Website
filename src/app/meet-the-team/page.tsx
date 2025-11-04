"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navigation from "../../components/navigation";
import ContentContainer from "../../components/ContentContainer";

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
        const allMembers = [...(data.leadership ?? []).map(toCard), ...(data.core ?? []).map(toCard)];
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
      <main id="main-content" className="page-main">
        <ContentContainer>
        <section className="page-heading max-w-3xl mx-auto">
          <h1 className="wordmark">Meet the Team</h1>
          <p>The students powering ColorStack @ NYU</p>
        </section>

        {loading ? (
          <p className="text-center text-white/70">Loading…</p>
        ) : (
          <section className="mb-12">
            <div className="card-grid">
              {members.map((m) => (
                <Card key={m.id} m={m} />
              ))}
            </div>
            {members.length === 0 && <p className="text-center text-white/60 text-sm">No members yet.</p>}
          </section>
        )}
        </ContentContainer>
      </main>
    </>
  );
}

function Card({ m }: { m: Member }) {
  return (
    <article className="card">
      <div className="flex items-start gap-3">
        {m.icon?.type === "url" ? (
          <Image
            src={m.icon.value}
            alt={`${m.name} profile picture`}
            width={64}
            height={64}
            className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="h-16 w-16 rounded-lg bg-brand flex items-center justify-center flex-shrink-0" aria-hidden="true">
            <span className="text-white font-semibold text-xl">{m.name.charAt(0)}</span>
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold" style={{ color: "var(--text-high)" }}>{m.name}</h3>
          <p className="text-sm" style={{ color: "var(--text-mid)" }}>{m.role}</p>
        </div>
      </div>
      {m.bio && <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>{m.bio}</p>}
    </article>
  );
}