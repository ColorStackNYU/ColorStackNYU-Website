"use client";
import React from "react";

interface Props {
  name: string; // file base name without extension (e.g. 'google')
  alt?: string;
  className?: string;
}

export default function LogoImage({ name, alt, className }: Props) {
  // SVG-only loader: will request /logos/<name>.svg. No PNG fallback per request.
  const svg = `/logos/${name}.svg`;

  return (
    <img data-name={name} src={svg} alt={alt || name} className={className} />
  );
}
