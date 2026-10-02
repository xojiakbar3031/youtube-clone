// Video katalogini yig'adi: har bir ID YouTube oEmbed orqali tekshiriladi
// (kalit kerak emas), haqiqiy nom va kanal olinadi, src/data/catalog.json ga yoziladi.
// O'chirilgan yoki yopiq videolar avtomatik tashlab yuboriladi.
//
//   npm run catalog

import { writeFile } from "node:fs/promises";

const VIDEOS = {
  Coding: [
    "rfscVS0vtbw", "PkZNo7MFNFg", "SqcY0GlETPk", "w7ejDZ8SWv8",
    "Oe421EPjeBE", "HXV3zeQKqGY", "RGOj5yH7evk", "8hly31xKli0",
  ],
  AI: ["kCc8FmEb1nY", "zjkBMFhNj_g", "aircAruvnKk", "IHZwWFHWa-w", "wjZofJX0v4M"],
  Music: [
    "dQw4w9WgXcQ", "kJQP7kiw5Fk", "9bZkp7q19f0", "JGwWNGJdvx8", "OPf0YbXqDm0",
    "fJ9rUzIMcZQ", "60ItHLz5WEA", "hT_nvWreIhg", "YQHsXMglC9A",
  ],
  Gaming: ["QdBZY2fkU-0", "c0i88t0Kacs", "MmB9b5njVbA", "E3Huy2cdih0", "8X2kIfS6fb8"],
  Science: ["spUNpyF58BY", "MBRqu0YOH14"],
  Live: ["jfKfPfyJRdk", "4xDzrJKXOOY", "21X5lGlDOfg"],
};

async function oembed(id) {
  const url = `https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${id}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

const entries = Object.entries(VIDEOS).flatMap(([category, ids]) => ids.map((id) => ({ id, category })));
const results = await Promise.all(
  entries.map(async ({ id, category }) => {
    const data = await oembed(id);
    if (!data) {
      console.warn(`skip ${id} (${category}): not available`);
      return null;
    }
    return {
      id,
      category,
      title: data.title,
      channel: data.author_name,
      channelUrl: data.author_url,
      live: category === "Live",
    };
  }),
);

const catalog = results.filter(Boolean);
await writeFile(new URL("../src/data/catalog.json", import.meta.url), JSON.stringify(catalog, null, 2) + "\n");
console.log(`catalog.json: ${catalog.length} videos`);
