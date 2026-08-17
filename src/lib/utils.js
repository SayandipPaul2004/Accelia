export function formatPostedDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date("2026-08-16");
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 14) return `${diffDays} days ago`;
  const weeks = Math.floor(diffDays / 7);
  return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
}

export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}
