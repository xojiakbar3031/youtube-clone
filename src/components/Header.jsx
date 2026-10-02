import { useEffect, useRef, useState } from "react";
import { Avatar } from "./Avatar";

const icon = (name, color = "ffffff") => `https://api.iconify.design/mdi:${name}.svg?color=%23${color}`;

const NOTIFICATIONS = [
  { id: 1, text: "freeCodeCamp.org yangi kurs joyladi", time: "2 soat oldin" },
  { id: 2, text: "Lofi Girl jonli efirda", time: "5 soat oldin" },
  { id: 3, text: "3Blue1Brown sizga yangi video tavsiya qildi", time: "1 kun oldin" },
];

export function Header({ onBurgerClick, query, onSearch, onLogoClick }) {
  const [value, setValue] = useState(query);
  const [notifOpen, setNotifOpen] = useState(false);
  const inputRef = useRef(null);
  const notifRef = useRef(null);

  // URL'dagi so'rov o'zgarsa (masalan "orqaga"), inputni ham yangilaymiz
  useEffect(() => setValue(query), [query]);

  useEffect(() => {
    const onKey = (e) => {
      // "/" — YouTube'dagidek qidiruvga fokus
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") setNotifOpen(false);
    };
    const onClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-btn" onClick={onBurgerClick} aria-label="Menyu">
          <img src={icon("menu")} alt="" />
        </button>
        <a
          href="#/"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            onLogoClick();
          }}
        >
          <img src={icon("youtube", "FF0000")} alt="" className="logo-icon" />
          <span>YouTube</span>
        </a>
      </div>

      <form
        className="header-search"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(value.trim());
          inputRef.current?.blur();
        }}
      >
        <input
          ref={inputRef}
          type="search"
          placeholder="Qidirish  ( / )"
          aria-label="Qidirish"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="search-btn" aria-label="Qidirish">
          <img src={icon("magnify", "606060")} alt="" />
        </button>
      </form>

      <div className="header-right">
        <div className="notif-wrap" ref={notifRef}>
          <button
            className="icon-btn"
            onClick={() => setNotifOpen((o) => !o)}
            aria-label="Bildirishnomalar"
            aria-expanded={notifOpen}
          >
            <img src={icon("bell-outline")} alt="" />
            <span className="notif-dot"></span>
          </button>
          {notifOpen && (
            <div className="notif-dropdown" role="menu">
              <p className="notif-title">Bildirishnomalar</p>
              {NOTIFICATIONS.map((n) => (
                <div className="notif-item" key={n.id}>
                  <p>{n.text}</p>
                  <span>{n.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <Avatar name="Siz" size={32} />
      </div>
    </header>
  );
}
