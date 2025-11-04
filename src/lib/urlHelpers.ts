/**
 * Normalizes URLs by ensuring they have proper protocol
 * Handles null/undefined values safely
 * @param url - URL to normalize
 * @returns Normalized URL or null if input was empty
 */
export const normalizeUrl = (url: string | null | undefined): string | null => {
  // Handle null, undefined, or empty string
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return null;
  }

  const trimmedUrl = url.trim();

  // Already has protocol - return as-is
  if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
    return trimmedUrl;
  }

  // Starts with www. - add https://
  if (trimmedUrl.startsWith('www.')) {
    return `https://${trimmedUrl}`;
  }

  // LinkedIn-specific: handle linkedin.com without www
  if (trimmedUrl.startsWith('linkedin.com')) {
    return `https://www.${trimmedUrl}`;
  }

  // Instagram-specific: handle instagram.com without www
  if (trimmedUrl.startsWith('instagram.com')) {
    return `https://www.${trimmedUrl}`;
  }

  // Default: assume it needs https://
  return `https://${trimmedUrl}`;
};

/**
 * Validates if a URL is a valid LinkedIn profile URL
 * @param url - URL to validate
 * @returns true if valid LinkedIn URL
 */
export const isValidLinkedInUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  const normalized = normalizeUrl(url);
  if (!normalized) return false;
  return normalized.includes('linkedin.com');
};

/**
 * Validates if a URL is a valid Instagram profile URL
 * @param url - URL to validate
 * @returns true if valid Instagram URL
 */
export const isValidInstagramUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  const normalized = normalizeUrl(url);
  if (!normalized) return false;
  return normalized.includes('instagram.com');
};
