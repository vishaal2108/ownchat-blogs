/**
 * Strips HTML tags and markdown entities from blog content to create clean plain text excerpts.
 * @param {string} html - The raw content string from API
 * @param {number} maxLength - Maximum character length before truncating
 */
export function stripHtml(html, maxLength = 140) {
  if (!html || typeof html !== 'string') {
    return 'Explore this insightful article from the OwnChat team to discover cutting-edge strategies and innovations.';
  }

  // Remove HTML tags
  let text = html.replace(/<[^>]*>?/gm, ' ');
  // Replace multiple spaces and line breaks with single space
  text = text.replace(/\s+/g, ' ').trim();
  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');

  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength).trim() + '...';
}
