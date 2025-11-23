/**
 * Helper to truncate text to specific length
 */
export function truncateText(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength - 3) + "...";
}
