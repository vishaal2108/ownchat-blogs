/**
 * Formats an ISO date string into a clean, human-readable SaaS style date.
 * Example: "March 23, 2024" or "Oct 12, 2024"
 */
export function formatDate(dateString) {
  if (!dateString) return 'Recently Published';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recently Published';
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  } catch (err) {
    return 'Recently Published';
  }
}
