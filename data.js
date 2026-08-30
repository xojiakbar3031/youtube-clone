// ============================================================
// MA'LUMOTLAR QATLAMI (Data Layer)
// ------------------------------------------------------------
// Hozircha MOCK_VIDEOS statik ro'yxatidan foydalanadi.
// Kelajakda YouTube Data API v3 (yoki shunga o'xshash) ulanganda
// faqat getVideos() funksiyasi ichini almashtirish kifoya —
// qolgan barcha komponentlar shu funksiya qaytargan formatga
// ({id, title, channel, avatar, thumbnail, views, time, duration,
//   category, description}) mos ishlaydi.
// ============================================================

const MOCK_VIDEOS = [
  {
    id: "v1",
    title: "React'ni noldan o'rganish — to'liq kurs 2026",
    channel: "CodeUz",
    avatar: "https://i.pravatar.cc/80?img=12",
    thumbnail: "https://picsum.photos/seed/react1/400/225",
    views: "128 ming marta ko'rilgan",
    time: "2 kun oldin",
    duration: "12:45",
    category: "Coding",
    description: "Ushbu darslikda React asoslarini noldan o'rganamiz: komponentlar, props, state, hook'lar va boshqalar."
  },
  {
    id: "v2",
    title: "Lo-fi beats to code / relax to",
    channel: "ChillWave Music",
    avatar: "https://i.pravatar.cc/80?img=32",
    thumbnail: "https://picsum.photos/seed/music1/400/225",
    views: "2.4 mln marta ko'rilgan",
    time: "3 oy oldin",
    duration: "1:02:11",
    category: "Music",
    description: "Diqqatni jamlash uchun tinch lo-fi musiqalar to'plami."
  },
  {
    id: "v3",
    title: "O'zbekiston terma jamoasi so'nggi o'yin sharhi",
    channel: "Sport24",
    avatar: "https://i.pravatar.cc/80?img=15",
    thumbnail: "https://picsum.photos/seed/sport1/400/225",
    views: "540 ming marta ko'rilgan",
    time: "5 soat oldin",
    duration: "8:20",
    category: "Sports",
    description: "So'nggi o'yin bo'yicha to'liq tahlil va gollar sharhi."
  },
  {
    id: "v4",
    title: "Valorant Radiant reyting o'yinlari — highlight'lar",
    channel: "GameZone",
    avatar: "https://i.pravatar.cc/80?img=5",
    thumbnail: "https://picsum.photos/seed/game1/400/225",
    views: "89 ming marta ko'rilgan",
    time: "1 kun oldin",
    duration: "15:33",
    category: "Gaming",
    description: "Eng yaxshi highlight'lar va strategik yechimlar to'plami."
  },
  {
    id: "v5",
    title: "Bugungi asosiy yangiliklar — qisqacha sharh",
    channel: "Daryo News",
    avatar: "https://i.pravatar.cc/80?img=48",
    thumbnail: "https://picsum.photos/seed/news1/400/225",
    views: "312 ming marta ko'rilgan",
    time: "10 soat oldin",
    duration: "6:12",
    category: "News",
    description: "Kun davomidagi eng muhim voqealar bo'yicha qisqa sharh."
  },
  {
    id: "v6",
    title: "JavaScript'da Async/Await'ni tushunish",
    channel: "CodeUz",
    avatar: "https://i.pravatar.cc/80?img=12",
    thumbnail: "https://picsum.photos/seed/js1/400/225",
    views: "76 ming marta ko'rilgan",
    time: "4 kun oldin",
    duration: "10:05",
    category: "Coding",
    description: "Promise, async va await tushunchalarini misollar bilan tushuntirib beraman."
  },
  {
    id: "v7",
    title: "Piano Cover — Interstellar Main Theme",
    channel: "PianoVibes",
    avatar: "https://i.pravatar.cc/80?img=22",
    thumbnail: "https://picsum.photos/seed/music2/400/225",
    views: "1.1 mln marta ko'rilgan",
    time: "1 yil oldin",
    duration: "4:48",
    category: "Music",
    description: "Hans Zimmer'ning mashhur kompozitsiyasi pianino ijrosida."
  },
  {
    id: "v8",
    title: "Full-Stack loyihani noldan qurish (Node.js + React)",
    channel: "CodeUz",
    avatar: "https://i.pravatar.cc/80?img=12",
    thumbnail: "https://picsum.photos/seed/fullstack1/400/225",
    views: "203 ming marta ko'rilgan",
    time: "6 kun oldin",
    duration: "45:22",
    category: "Coding",
    description: "Backend va frontend'ni birlashtirib to'liq loyiha qurishni ko'rsataman."
  },
  {
    id: "v9",
    title: "Minecraft'da 100 kun — Hardcore rejim",
    channel: "GameZone",
    avatar: "https://i.pravatar.cc/80?img=5",
    thumbnail: "https://picsum.photos/seed/game2/400/225",
    views: "3.2 mln marta ko'rilgan",
    time: "2 hafta oldin",
    duration: "22:10",
    category: "Gaming",
    description: "100 kun davomida omon qolish uchun kurash — hech qanday o'lim huquqisiz."
  },
  {
    id: "v10",
    title: "Real Madrid vs Barcelona — El Clasico xulosalari",
    channel: "Sport24",
    avatar: "https://i.pravatar.cc/80?img=15",
    thumbnail: "https://picsum.photos/seed/sport2/400/225",
    views: "980 ming marta ko'rilgan",
    time: "3 kun oldin",
    duration: "9:47",
    category: "Sports",
    description: "Mashhur klub-derbi bo'yicha statistika va asosiy lahzalar."
  },
  {
    id: "v11",
    title: "Sun'iy intellekt sohasidagi so'nggi yangiliklar",
    channel: "Daryo News",
    avatar: "https://i.pravatar.cc/80?img=48",
    thumbnail: "https://picsum.photos/seed/ai1/400/225",
    views: "150 ming marta ko'rilgan",
    time: "8 soat oldin",
    duration: "7:35",
    category: "News",
    description: "AI sohasidagi eng so'nggi yangiliklar va tahlillar."
  },
  {
    id: "v12",
    title: "Chillhop Radio — 24/7 jonli efir",
    channel: "ChillWave Music",
    avatar: "https://i.pravatar.cc/80?img=32",
    thumbnail: "https://picsum.photos/seed/live1/400/225",
    views: "12 ming tomoshabin",
    time: "Jonli efir",
    duration: "LIVE",
    category: "Live",
    description: "Kun bo'yi davom etadigan tinch musiqa translyatsiyasi."
  }
];

// `var` ishlatilyapti (const emas) — chunki bu global o'zgaruvchi boshqa
// <script> fayldan (app.js) foydalaniladi, va faqat `var`/funksiya
// e'lonlarigina barcha muhitlarda ishonchli ravishda global bo'lib qoladi.
var CATEGORIES = ["All", "Coding", "Music", "Gaming", "Sports", "News", "Live"];

/**
 * Videolarni olib keladigan asosiy funksiya.
 * Hozircha MOCK_VIDEOS'dan filtrlaydi. Kelajakda buni real API
 * chaqiruviga almashtirish uchun quyidagicha yozish mumkin:
 *
 *   async function getVideos(query = "", category = "All") {
 *     const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=API_KEY`;
 *     const res = await fetch(url);
 *     const data = await res.json();
 *     return data.items.map(normalizeVideo); // API javobini shu fayldagi
 *                                             // {id, title, channel, ...} formatiga o'giradi
 *   }
 */
async function getVideos(query = "", category = "All") {
  let results = MOCK_VIDEOS;

  if (category && category !== "All") {
    results = results.filter(function (v) {
      return v.category === category;
    });
  }

  if (query && query.trim() !== "") {
    const q = query.trim().toLowerCase();
    results = results.filter(function (v) {
      return v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q);
    });
  }

  return results;
}

function getRelatedVideos(currentId) {
  return MOCK_VIDEOS.filter(function (v) {
    return v.id !== currentId;
  }).slice(0, 8);
}
