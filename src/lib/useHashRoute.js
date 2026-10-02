import { useEffect, useState } from "react";

// Oddiy hash-router: GitHub Pages'da server sozlamasisiz ishlaydi,
// "orqaga" tugmasi va havolani ulashish to'g'ri ishlaydi.
//
//   #/                         bosh sahifa
//   #/?q=react&c=Coding        qidiruv / kategoriya
//   #/watch/VIDEO_ID           video sahifasi
//   #/subscriptions  #/history

function parse() {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [path, search = ""] = raw.split("?");
  const params = new URLSearchParams(search);
  const parts = path.split("/").filter(Boolean);
  return {
    view: parts[0] || "home",
    id: parts[1] || null,
    q: params.get("q") || "",
    category: params.get("c") || "All",
  };
}

export function useHashRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function navigate(path, params = {}) {
  const search = new URLSearchParams(Object.entries(params).filter(([, v]) => v && v !== "All")).toString();
  window.location.hash = path + (search ? `?${search}` : "");
}
