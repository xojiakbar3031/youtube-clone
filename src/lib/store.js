// Foydalanuvchi holati (obunalar, like/dislike, izohlar, ko'rish tarixi).
// Backend yo'q — hammasi localStorage'da saqlanadi.

const STORAGE_KEY = "ytclone_state_v2";
const EMPTY = { subscriptions: [], likes: {}, history: [], comments: {} };

function load() {
  try {
    return { ...EMPTY, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return { ...EMPTY };
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage yo'q yoki to'la — ilova baribir ishlayveradi */
  }
}

function update(fn) {
  const state = load();
  fn(state);
  save(state);
  return state;
}

export const isSubscribed = (channel) => load().subscriptions.includes(channel);

export function toggleSubscription(channel) {
  return update((s) => {
    s.subscriptions = s.subscriptions.includes(channel)
      ? s.subscriptions.filter((c) => c !== channel)
      : [...s.subscriptions, channel];
  }).subscriptions.includes(channel);
}

export const getSubscriptions = () => load().subscriptions;

/** reaction: "like" | "dislike" | null — bir xilini qayta bosish bekor qiladi */
export const getReaction = (videoId) => load().likes[videoId] ?? null;

export function setReaction(videoId, reaction) {
  return update((s) => {
    s.likes[videoId] = s.likes[videoId] === reaction ? null : reaction;
  }).likes[videoId];
}

export function addToHistory(videoId) {
  update((s) => {
    s.history = [videoId, ...s.history.filter((id) => id !== videoId)].slice(0, 50);
  });
}

export const getHistory = () => load().history;
export const clearHistory = () => update((s) => (s.history = []));

export const getComments = (videoId) => load().comments[videoId] ?? [];

export function addComment(videoId, text) {
  const comment = { id: `c${Date.now()}`, author: "Siz", text, createdAt: new Date().toISOString() };
  update((s) => {
    s.comments[videoId] = [comment, ...(s.comments[videoId] ?? [])];
  });
  return comment;
}

export function deleteComment(videoId, commentId) {
  update((s) => {
    s.comments[videoId] = (s.comments[videoId] ?? []).filter((c) => c.id !== commentId);
  });
}
