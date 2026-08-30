// ============================================================
// MA'LUMOTLAR QATLAMI (Data Layer)
// ------------------------------------------------------------
// Hozircha MOCK_VIDEOS statik ro'yxatidan foydalanadi.
// Kelajakda YouTube Data API v3 (yoki shunga o'xshash) ulanganda
// faqat getVideos() funksiyasi ichini almashtirish kifoya —
// qolgan barcha komponentlar shu funksiya qaytargan formatga
// ({id, title, channel, avatar, thumbnail, views, time, duration,
//   category, description}) mos ishlaydi.
//
// Bundan tashqari bu faylda foydalanuvchi holatini (obunalar,
// like/dislike, izohlar, ko'rish tarixi) brauzerning localStorage'ida
// saqlaydigan kichik "store" ham bor — backend bo'lmasa ham
// interfeys real ishlagandek tuyuladi.
// ============================================================

// Ochiq (public domain / CC0) namuna videolar — haqiqiy pleer sifatida
// ishlatiladi, chunki hozircha real YouTube video fayllariga ruxsatimiz yo'q.
var SAMPLE_VIDEO_URLS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
];

var MOCK_VIDEOS = [
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
    description: "Ushbu darslikda React asoslarini noldan o'rganamiz: komponentlar, props, state, hook'lar va boshqalar.",
    baseLikes: 8600,
    videoUrl: SAMPLE_VIDEO_URLS[0]
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
    description: "Diqqatni jamlash uchun tinch lo-fi musiqalar to'plami.",
    baseLikes: 54000,
    videoUrl: SAMPLE_VIDEO_URLS[1]
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
    description: "So'nggi o'yin bo'yicha to'liq tahlil va gollar sharhi.",
    baseLikes: 12500,
    videoUrl: SAMPLE_VIDEO_URLS[2]
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
    description: "Eng yaxshi highlight'lar va strategik yechimlar to'plami.",
    baseLikes: 4300,
    videoUrl: SAMPLE_VIDEO_URLS[3]
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
    description: "Kun davomidagi eng muhim voqealar bo'yicha qisqa sharh.",
    baseLikes: 6100,
    videoUrl: SAMPLE_VIDEO_URLS[4]
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
    description: "Promise, async va await tushunchalarini misollar bilan tushuntirib beraman.",
    baseLikes: 3900,
    videoUrl: SAMPLE_VIDEO_URLS[5]
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
    description: "Hans Zimmer'ning mashhur kompozitsiyasi pianino ijrosida.",
    baseLikes: 31000,
    videoUrl: SAMPLE_VIDEO_URLS[6]
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
    description: "Backend va frontend'ni birlashtirib to'liq loyiha qurishni ko'rsataman.",
    baseLikes: 9700,
    videoUrl: SAMPLE_VIDEO_URLS[7]
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
    description: "100 kun davomida omon qolish uchun kurash — hech qanday o'lim huquqisiz.",
    baseLikes: 87000,
    videoUrl: SAMPLE_VIDEO_URLS[8]
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
    description: "Mashhur klub-derbi bo'yicha statistika va asosiy lahzalar.",
    baseLikes: 21000,
    videoUrl: SAMPLE_VIDEO_URLS[9]
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
    description: "AI sohasidagi eng so'nggi yangiliklar va tahlillar.",
    baseLikes: 5400,
    videoUrl: SAMPLE_VIDEO_URLS[10]
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
    description: "Kun bo'yi davom etadigan tinch musiqa translyatsiyasi.",
    baseLikes: 980,
    videoUrl: SAMPLE_VIDEO_URLS[11]
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

function getVideoById(id) {
  return MOCK_VIDEOS.find(function (v) {
    return v.id === id;
  });
}

function getRelatedVideos(currentId) {
  return MOCK_VIDEOS.filter(function (v) {
    return v.id !== currentId;
  }).slice(0, 8);
}

// ============================================================
// FOYDALANUVCHI HOLATI (localStorage'da saqlanadi)
// ------------------------------------------------------------
// Backend yo'qligi sababli obunalar, like/dislike, izohlar va
// ko'rish tarixi shu brauzerning localStorage'ida saqlanadi.
// Sahifani yangilasangiz ham (bir xil brauzerda) saqlanib qoladi.
// ============================================================

var STORAGE_KEY = "ytclone_state_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { subscriptions: [], likes: {}, history: [], comments: {} };
    const parsed = JSON.parse(raw);
    return {
      subscriptions: parsed.subscriptions || [],
      likes: parsed.likes || {},
      history: parsed.history || [],
      comments: parsed.comments || {}
    };
  } catch (e) {
    return { subscriptions: [], likes: {}, history: [], comments: {} };
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // localStorage yo'q yoki to'lgan bo'lishi mumkin — ilova baribir ishlashda davom etadi
  }
}

function isSubscribed(channel) {
  return loadState().subscriptions.indexOf(channel) !== -1;
}

function toggleSubscription(channel) {
  const state = loadState();
  const idx = state.subscriptions.indexOf(channel);
  if (idx === -1) {
    state.subscriptions.push(channel);
  } else {
    state.subscriptions.splice(idx, 1);
  }
  saveState(state);
  return state.subscriptions.indexOf(channel) !== -1;
}

function getSubscribedVideos() {
  const subs = loadState().subscriptions;
  return MOCK_VIDEOS.filter(function (v) {
    return subs.indexOf(v.channel) !== -1;
  });
}

// reaction: "like" | "dislike" | null
function getReaction(videoId) {
  return loadState().likes[videoId] || null;
}

function setReaction(videoId, reaction) {
  const state = loadState();
  const current = state.likes[videoId] || null;
  state.likes[videoId] = current === reaction ? null : reaction;
  saveState(state);
  return state.likes[videoId];
}

function addToHistory(videoId) {
  const state = loadState();
  state.history = state.history.filter(function (id) {
    return id !== videoId;
  });
  state.history.unshift(videoId);
  state.history = state.history.slice(0, 20);
  saveState(state);
}

function getHistoryVideos() {
  const ids = loadState().history;
  return ids.map(getVideoById).filter(Boolean);
}

function clearHistory() {
  const state = loadState();
  state.history = [];
  saveState(state);
}

var MOCK_COMMENTS = {
  v1: [
    { id: "c1", author: "Aziz Karimov", avatar: "https://i.pravatar.cc/80?img=51", text: "Juda tushunarli tushuntirdingiz, rahmat ustoz!", time: "1 kun oldin" },
    { id: "c2", author: "Dilnoza R.", avatar: "https://i.pravatar.cc/80?img=44", text: "useEffect qismini yana biroz chuqurroq tushuntirsangiz bo'ladimi?", time: "5 soat oldin" }
  ],
  v6: [
    { id: "c3", author: "Jasur T.", avatar: "https://i.pravatar.cc/80?img=8", text: "Promise.all haqida ham video qiling iltimos", time: "2 kun oldin" }
  ],
  v9: [
    { id: "c4", author: "Sardor", avatar: "https://i.pravatar.cc/80?img=3", text: "20-kunda qanday omon qolganingizga hali ham ishonmayman 😂", time: "3 kun oldin" },
    { id: "c5", author: "Malika", avatar: "https://i.pravatar.cc/80?img=9", text: "Keyingi qismini qachon joylaysiz?", time: "1 kun oldin" }
  ]
};

function getComments(videoId) {
  const seed = MOCK_COMMENTS[videoId] || [];
  const userComments = loadState().comments[videoId] || [];
  return seed.concat(userComments);
}

function addComment(videoId, text) {
  const state = loadState();
  if (!state.comments[videoId]) {
    state.comments[videoId] = [];
  }
  const comment = {
    id: "u" + Date.now(),
    author: "Siz",
    avatar: "https://i.pravatar.cc/80?img=68",
    text: text,
    time: "hozirgina"
  };
  state.comments[videoId].push(comment);
  saveState(state);
  return comment;
}
