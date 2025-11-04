"use client";

import React from "react";

type Props = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/**
 * ContentContainer
 * Unified site-wide content wrapper that matches the header/nav width.
 * - Fixed max-width via CSS token --container-max
 * - Responsive horizontal padding
 * - Horizontally centered
 */
export function ContentContainer({ as: Tag = "div", className = "", children, style }: Props) {
  return (
    <Tag className={`site-container ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}

/**
 * FullBleed
 * Optional utility for sections that intentionally span the viewport edge-to-edge.
 * Use this for visual bands, background colors, etc. The nav/header should never be full-bleed.
 */
export function FullBleed({ as: Tag = "div", className = "", children, style }: Props) {
  return (
    <Tag className={`full-bleed ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}

export default ContentContainer;
