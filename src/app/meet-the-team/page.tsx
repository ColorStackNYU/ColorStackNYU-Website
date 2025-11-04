"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navigation from "../../components/navigation";
import ContentContainer from "../../components/ContentContainer";
import { useApiData } from "../../hooks/useApiData";

type Member = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  icon?: { type: "emoji" | "url"; value: string };
  linkedinUrl?: string;
  hallOfFame?: boolean;
  quote?: string;
};

export default function MeetTheTeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [hallOfFame, setHallOfFame] = useState<Member[]>([]);
  
  // Fetch team data using shared hook
  const { data, loading } = useApiData<{leadership: Member[], core: Member[], hallOfFame: Member[]}>("/api/team");

  // Process team data: transform and sort members
  useEffect(() => {
    if (!data) return;
    
    const toCard = (m: any): Member => ({
      id: m.id,
      name: m.name,
      role: m.role,
      bio: [m.year, m.major, m.minor].filter(Boolean).join(" · "),
      icon: m.icon,
      linkedinUrl: m.linkedinUrl,
      hallOfFame: m.hallOfFame,
      quote: m.quote,
    });

    // Combine all current members into one array
    const allMembers = [...(data.leadership ?? []).map(toCard), ...(data.core ?? []).map(toCard)];
    const alumni = (data.hallOfFame ?? []).map(toCard);
    
    // Sort members by role priority, then alphabetically
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
    setHallOfFame(alumni);
  }, [data]);

  return (
    <>
      <Navigation />
      <main id="main-content" className="page-main">
        <ContentContainer>
        <section className="page-heading">
          <h1 className="wordmark">Meet the Team</h1>
          <p>The students powering ColorStack @ NYU</p>
        </section>

        {loading ? (
          <p className="text-center" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Loading…</p>
        ) : (
          <>
            <section style={{ marginBottom: "var(--spacing-6xl)" }}>
              <h2 className="font-bold" style={{ fontSize: "var(--fs-h2)", marginBottom: "var(--spacing-4xl)", color: "var(--text-high)" }}>
                Current E-Board
              </h2>
              <div className="card-grid">
                {members.map((m) => (
                  <Card key={m.id} m={m} />
                ))}
              </div>
              {members.length === 0 && <p className="text-center" style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "var(--fs-small)" }}>No members yet.</p>}
            </section>

            {hallOfFame.length > 0 && (
              <section style={{ marginBottom: "var(--spacing-5xl)" }}>
                <h2 className="font-bold" style={{ fontSize: "var(--fs-h2)", marginBottom: "var(--spacing-6xl)", color: "var(--text-high)" }}>
                  Hall of Fame
                </h2>
                <p className="text-center" style={{ marginBottom: "var(--spacing-6xl)", color: "var(--text-mid)" }}>
                  Celebrating our alumni who helped build ColorStack @ NYU
                </p>
                <div className="card-grid">
                  {hallOfFame.map((m) => (
                    <Card key={m.id} m={m} isAlumni />
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

function Card({ m, isAlumni = false }: { m: Member; isAlumni?: boolean }) {
  const CardWrapper = m.linkedinUrl ? "a" : "article";
  const cardProps = m.linkedinUrl
    ? {
        href: m.linkedinUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `View ${m.name}'s LinkedIn profile`,
      }
    : {};

  return (
    <CardWrapper className="card" style={{ position: "relative" }} {...cardProps as any}>
      {/* LinkedIn Icon - Top Right */}
      {m.linkedinUrl && (
        <div
          className="external-link-icon"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "24px",
            height: "24px",
            color: "var(--brand-1)",
            transition: "color 200ms ease, transform 200ms ease",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
      )}
      
      <div className="flex items-start" style={{ gap: "var(--spacing-md)" }}>
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
            <span className="text-white font-semibold" style={{ fontSize: "var(--fs-h3)" }}>{m.name.charAt(0)}</span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold" style={{ fontSize: "var(--fs-h3)", color: "var(--text-high)", paddingRight: m.linkedinUrl ? "var(--spacing-2xl)" : "0", wordWrap: "break-word", overflowWrap: "break-word" }}>{m.name}</h3>
          <p style={{ fontSize: "var(--fs-small)", color: "var(--text-mid)" }}>{m.role}</p>
        </div>
      </div>
      {m.bio && <p className="leading-relaxed" style={{ marginTop: "var(--spacing-md)", fontSize: "var(--fs-small)", color: "var(--text-mid)" }}>{m.bio}</p>}
      {isAlumni && m.quote && (
        <div className="border-t" style={{ marginTop: "var(--spacing-lg)", paddingTop: "var(--spacing-md)", borderColor: "rgba(171, 130, 197, 0.2)" }}>
          <p className="leading-relaxed italic" style={{ fontSize: "var(--fs-small)", color: "var(--text-mid)", opacity: 0.9 }}>
            &ldquo;{m.quote}&rdquo;
          </p>
        </div>
      )}
    </CardWrapper>
  );
}