export function formatCount(n) {
  if (n == null) return "";
  if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, "") + " mlrd";
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + " mln";
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + " ming";
  return String(n);
}

const UNITS = [
  ["yil", 365 * 24 * 3600],
  ["oy", 30 * 24 * 3600],
  ["hafta", 7 * 24 * 3600],
  ["kun", 24 * 3600],
  ["soat", 3600],
  ["daqiqa", 60],
];

export function timeAgo(iso) {
  if (!iso) return "";
  const sec = (Date.now() - new Date(iso).getTime()) / 1000;
  for (const [name, size] of UNITS) {
    if (sec >= size) return `${Math.floor(sec / size)} ${name} oldin`;
  }
  return "hozirgina";
}

/** Kanal nomidan barqaror rang — avatar uchun (tashqi rasm servislariga bog'lanmaslik). */
export function avatarColor(name) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return `hsl(${Math.abs(hash) % 360} 55% 42%)`;
}

export const initials = (name) =>
  name
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("") || "?";
