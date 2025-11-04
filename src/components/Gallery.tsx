"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Slide = { file: string; caption?: string; url?: string };

export default function Gallery() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [preferReduced, setPreferReduced] = useState(false);
  const [contain, setContain] = useState<boolean[]>([]);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPreferReduced(mq.matches);
    const onChange = () => setPreferReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    // Load slides from static captions.json file only (no API calls)
    let cancelled = false;
    
    fetch("/events/captions.json")
      .then((r) => r.json())
      .then((captions) => {
        if (cancelled) return;
        
        if (Array.isArray(captions) && captions.length > 0) {
          setSlides(captions as Slide[]);
          setContain(new Array(captions.length).fill(false));
        } else {
          // Fallback to hardcoded slides
          const fallback: Slide[] = [
            { file: "slide-1.jpg", caption: "First ColorStack @ NYU event" },
            { file: "slide-2.jpg", caption: "Vice President Sebastian Capellan hosting a weekly coding session" },
            { file: "slide-3.jpg", caption: "ColorStack @ NYU community gathering" },
          ];
          setSlides(fallback);
          setContain(new Array(fallback.length).fill(false));
        }
      })
      .catch(() => {
        if (cancelled) return;
        // Fallback if captions.json fails to load
        const fallback: Slide[] = [
          { file: "slide-1.jpg", caption: "First ColorStack @ NYU event" },
          { file: "slide-2.jpg", caption: "Vice President Sebastian Capellan hosting a weekly coding session" },
          { file: "slide-3.jpg", caption: "ColorStack @ NYU community gathering" },
        ];
        setSlides(fallback);
        setContain(new Array(fallback.length).fill(false));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (preferReduced) return;
    if (paused) return;
    if (slides.length <= 1) return;
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [slides, paused, preferReduced]);

  if (!slides || slides.length === 0) return null;

  const current = slides[index];
  const src = `/events/${current.file}`;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div
        className="gallery-card"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Image
          src={src}
          alt={current.caption || "Event photo"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          style={{ objectFit: contain[index] ? "contain" : "cover", objectPosition: "50% 35%" }}
          className={contain[index] ? "gallery-image contain" : "gallery-image"}
          priority={index === 0}
        />

        {/* Caption overlay (rendered inside image, positioned at bottom) */}
        {current.caption && (
          <div className="gallery-caption-below" aria-hidden={false}>
            {current.caption}
          </div>
        )}

        {/* arrows (visible but subtle) */}
        {slides.length > 1 && (
          <>
            <button
              aria-label="Previous slide"
              className="gallery-arrow left"
              onClick={() =>
                setIndex((index - 1 + slides.length) % slides.length)
              }
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              ‹
            </button>
            <button
              aria-label="Next slide"
              className="gallery-arrow right"
              onClick={() => setIndex((index + 1) % slides.length)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
}
