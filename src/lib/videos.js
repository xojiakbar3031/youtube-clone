// Ma'lumot manbasi.
//  - Standart: src/data/catalog.json — `npm run catalog` bilan YouTube oEmbed orqali
//    tekshirilgan haqiqiy videolar (API kalit kerak emas, GitHub Pages'da ishlaydi).
//  - VITE_YOUTUBE_API_KEY berilsa: YouTube Data API v3 orqali istalgan so'rov bo'yicha
//    jonli qidiruv (ko'rishlar soni va davomiyligi bilan). Kalitni Google Cloud'da
//    HTTP referrer bilan cheklab qo'ying — u brauzer kodida ko'rinadi.

import catalog from "../data/catalog.json";

export const CATEGORIES = ["All", ...new Set(catalog.map((v) => v.category))];

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const cache = new Map(catalog.map((v) => [v.id, toVideo(v)]));

function toVideo(v) {
  return {
    id: v.id,
    title: v.title,
    channel: v.channel,
    channelUrl: v.channelUrl,
    category: v.category,
    live: Boolean(v.live),
    thumbnail: `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`,
    views: v.views ?? null,
    duration: v.duration ?? null,
    publishedAt: v.publishedAt ?? null,
    description: v.description ?? "",
  };
}

const normalize = (s) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

function searchLocal(query, category) {
  const q = normalize(query.trim());
  return [...cache.values()].filter(
    (v) =>
      (category === "All" || v.category === category) &&
      (!q || normalize(`${v.title} ${v.channel}`).includes(q)),
  );
}

// ISO 8601 davomiylik (PT1H2M10S) -> "1:02:10"
function formatDuration(iso) {
  const m = iso?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return null;
  const [h, min, s] = [m[1], m[2], m[3]].map((x) => Number(x || 0));
  const pad = (n) => String(n).padStart(2, "0");
  return h ? `${h}:${pad(min)}:${pad(s)}` : `${min}:${pad(s)}`;
}

async function searchYouTube(query, category, signal) {
  const q = query.trim() || (category === "All" ? "trending" : category);
  const base = "https://www.googleapis.com/youtube/v3";
  const search = await fetch(
    `${base}/search?part=snippet&type=video&maxResults=24&q=${encodeURIComponent(q)}&key=${API_KEY}`,
    { signal },
  ).then((r) => (r.ok ? r.json() : Promise.reject(new Error(`YouTube API ${r.status}`))));

  const ids = search.items.map((i) => i.id.videoId).join(",");
  const details = await fetch(`${base}/videos?part=snippet,statistics,contentDetails&id=${ids}&key=${API_KEY}`, {
    signal,
  }).then((r) => r.json());

  return details.items.map((item) => {
    const video = toVideo({
      id: item.id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      channelUrl: `https://www.youtube.com/channel/${item.snippet.channelId}`,
      category,
      live: item.snippet.liveBroadcastContent === "live",
      views: Number(item.statistics.viewCount || 0),
      duration: formatDuration(item.contentDetails.duration),
      publishedAt: item.snippet.publishedAt,
      description: item.snippet.description,
    });
    cache.set(video.id, video);
    return video;
  });
}

export async function getVideos(query = "", category = "All", signal) {
  if (API_KEY) {
    try {
      return await searchYouTube(query, category, signal);
    } catch (err) {
      if (err.name === "AbortError") throw err;
      console.warn("YouTube API unavailable, using local catalog:", err);
    }
  }
  return searchLocal(query, category);
}

export const getVideoById = (id) => cache.get(id) ?? null;

/** Aloqador videolar: avval shu kategoriya, keyin qolganlari. */
export function getRelatedVideos(video, limit = 12) {
  const others = [...cache.values()].filter((v) => v.id !== video.id);
  const same = others.filter((v) => v.category === video.category);
  const rest = others.filter((v) => v.category !== video.category);
  return [...same, ...rest].slice(0, limit);
}

export const allVideos = () => [...cache.values()];
