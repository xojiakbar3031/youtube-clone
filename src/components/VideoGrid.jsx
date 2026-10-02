import { CATEGORIES } from "../lib/videos";
import { formatCount, timeAgo } from "../lib/format";
import { Avatar } from "./Avatar";

export function CategoryChips({ active, onSelect }) {
  return (
    <div className="chips-row" role="tablist">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={cat === active}
          className={"chip" + (cat === active ? " active" : "")}
          onClick={() => onSelect(cat)}
        >
          {cat === "All" ? "Hammasi" : cat}
        </button>
      ))}
    </div>
  );
}

export function Badge({ video }) {
  if (video.live) return <span className="duration-badge live">JONLI</span>;
  if (video.duration) return <span className="duration-badge">{video.duration}</span>;
  return null;
}

export function videoStats(video) {
  return [video.views != null && `${formatCount(video.views)} marta ko'rilgan`, timeAgo(video.publishedAt)]
    .filter(Boolean)
    .join(" • ");
}

function VideoCard({ video, onOpen }) {
  return (
    <a
      className="video-card"
      href={`#/watch/${video.id}`}
      onClick={(e) => {
        e.preventDefault();
        onOpen(video);
      }}
    >
      <div className="thumb-wrap">
        <img src={video.thumbnail} alt="" className="thumb" loading="lazy" />
        <Badge video={video} />
      </div>
      <div className="video-meta">
        <Avatar name={video.channel} />
        <div className="video-text">
          <h3 className="video-title">{video.title}</h3>
          <p className="video-channel">{video.channel}</p>
          {videoStats(video) && <p className="video-stats">{videoStats(video)}</p>}
        </div>
      </div>
    </a>
  );
}

function SkeletonCard() {
  return (
    <div className="video-card skeleton-card" aria-hidden="true">
      <div className="thumb-wrap skeleton" />
      <div className="video-meta">
        <span className="avatar skeleton" />
        <div className="video-text">
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
        </div>
      </div>
    </div>
  );
}

export function VideoGrid({ videos, onOpen, loading, empty = "Hech narsa topilmadi 😔" }) {
  if (loading) {
    return (
      <div className="video-grid" aria-busy="true">
        {Array.from({ length: 8 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }
  if (videos.length === 0) return <div className="empty-state">{empty}</div>;
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard video={video} onOpen={onOpen} key={video.id} />
      ))}
    </div>
  );
}
