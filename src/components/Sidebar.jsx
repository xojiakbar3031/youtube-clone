import { Fragment } from "react";
import { CATEGORIES } from "../lib/videos";

const icon = (name) => `https://api.iconify.design/${name}.svg?color=%23ffffff`;

const CATEGORY_ICONS = {
  Coding: "mdi:code-tags",
  AI: "mdi:robot-outline",
  Music: "mdi:music-note-outline",
  Gaming: "mdi:controller-classic-outline",
  Science: "mdi:atom",
  Live: "mdi:access-point",
};

export function Sidebar({ open, view, category, onNavigate, onCategory }) {
  const link = (active, label, iconName, onClick) => (
    <button className={"sidebar-link" + (active ? " active" : "")} onClick={onClick} aria-current={active ? "page" : undefined}>
      <img src={icon(iconName)} alt="" />
      <span>{label}</span>
    </button>
  );

  return (
    <aside className={"sidebar" + (open ? " open" : "")} aria-label="Navigatsiya">
      <nav className="sidebar-section">
        {link(view === "home" && category === "All", "Bosh sahifa", "mdi:home", () => onNavigate("/"))}
        {link(view === "subscriptions", "Obunalar", "mdi:youtube-subscription", () => onNavigate("/subscriptions"))}
        {link(view === "history", "Tarix", "mdi:history", () => onNavigate("/history"))}
      </nav>

      <hr className="sidebar-divider" />
      <div className="sidebar-title">Kashf etish</div>
      <nav className="sidebar-section">
        {CATEGORIES.filter((c) => c !== "All").map((cat) => (
          <Fragment key={cat}>
            {link(view === "home" && category === cat, cat, CATEGORY_ICONS[cat] || "mdi:play-circle-outline", () =>
              onCategory(cat),
            )}
          </Fragment>
        ))}
      </nav>
    </aside>
  );
}
