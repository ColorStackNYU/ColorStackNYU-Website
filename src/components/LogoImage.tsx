"use client";
import React, { useState, useCallback } from "react";

interface Props {
  name: string; // file base name without extension (e.g. 'google')
  alt?: string;
  className?: string;
}

export default function LogoImage({ name, alt, className }: Props) {
  // Start with SVG; if it fails to load (e.g. janestreet.png case) fall back to PNG.
  const svg = `/logos/${name}.svg`;
  const png = `/logos/${name}.png`;
  const [src, setSrc] = useState<string>(svg);

  const handleError = useCallback(() => {
    if (src !== png) {
      setSrc(png);
    }
  }, [src, png]);

  return (
    // eslint-disable-next-line jsx-a11y/img-redundant-alt
    <img
      data-name={name}
      src={src}
      alt={alt || name}
      className={className}
      onError={handleError}
    />
  );
}
