"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

type Slide = { file: string; caption?: string };

export default function EventSlideshow({ interval = 4000 }: { interval?: number }) {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // fetch captions.json from public/events
    fetch("/events/captions.json")
      .then((r) => r.json())
      .then((data: Slide[]) => {
        if (cancelled) return;
        setSlides(data || []);
      })
      .catch(() => {
        // If captions.json not present, fall back to a few predictable filenames
        setSlides([
          { file: "slide-1.jpg" },
          { file: "slide-2.jpg" },
          { file: "slide-3.jpg" },
        ]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [slides, paused, interval]);

  if (!slides || slides.length === 0) {
    return (
      <div className="surface-card">No event images found.</div>
    );
  }

  const current = slides[index];
  const src = `/events/${current.file}`;

  return (
    <div className="surface-card" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div style={{display:'grid',gridTemplateColumns:'1fr',gap:'0.5rem',alignItems:'center'}}>
        <div style={{position:'relative',width:'100%',height:360}}>
          {/* Use next/image for optimization when possible */}
          <Image src={src} alt={current.caption || "Event image"} fill style={{objectFit:'cover',borderRadius:12}} />
        </div>
        {current.caption && (
          <div style={{color:'var(--text-mid)'}} className="text-md">{current.caption}</div>
        )}
        <div style={{display:'flex',justifyContent:'center',gap:8}}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`p-2 rounded-full ${i===index? 'bg-white/30':'bg-white/10'}`} aria-label={`Go to slide ${i+1}`}></button>
          ))}
        </div>
      </div>
    </div>
  );
}
