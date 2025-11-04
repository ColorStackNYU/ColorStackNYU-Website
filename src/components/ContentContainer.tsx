"use client";

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

export default ContentContainer;
