"use client";
import React from "react";

interface Props {
  name: string; // file base name without extension (e.g. 'google')
  alt?: string;
  className?: string;
}

export default function LogoImage({ name, alt, className }: Props) {
  const svg = `/logos/${name}.svg`;

  // Strict SVG-only loader per user request — no PNG fallback.
  return <img src={svg} alt={alt || name} className={className} />;
}
