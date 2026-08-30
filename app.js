const { useState, useEffect } = React;

// ============================================================
// SIDEBAR
// ============================================================
function Sidebar({ open }) {
  const mainLinks = [
    { icon: "mdi:home", label: "Bosh sahifa" },
    { icon: "mdi:play-box-multiple-outline", label: "Shorts" },
    { icon: "mdi:youtube-subscription", label: "Obunalar" }
  ];

  const exploreLinks = [
    { icon: "mdi:fire", label: "Trend" },
    { icon: "mdi:music-note-outline", label: "Musiqa" },
    { icon: "mdi:controller-classic-outline", label: "O'yinlar" },
    { icon: "mdi:newspaper-variant-outline", label: "Yangiliklar" },
    { icon: "mdi:trophy-outline", label: "Sport" },
    { icon: "mdi:school-outline", label: "Ta'lim" },
    { icon: "mdi:code-tags", label: "Dasturlash" }
  ];

  return (
    <aside className={"sidebar" + (open ? " open" : "")}>
      <nav className="sidebar-section">
        {mainLinks.map(function (item) {
          return (
            <a href="#" className="sidebar-link" key={item.label}>
              <img src={"https://api.iconify.design/" + item.icon + ".svg?color=%23ffffff"} alt="" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
      <hr className="sidebar-divider" />
      <div className="sidebar-title">Kashf etish</div>
      <nav className="sidebar-section">
        {exploreLinks.map(function (item) {
          return (
            <a href="#" className="sidebar-link" key={item.label}>
              <img src={"https://api.iconify.design/" + item.icon + ".svg?color=%23ffffff"} alt="" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

// ============================================================
// HEADER
// ============================================================
function Header({ onBurgerClick, searchValue, onSearchChange, onSearchSubmit }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="icon-btn" onClick={onBurgerClick} aria-label="menu">
          <img src="https://api.iconify.design/mdi:menu.svg?color=%23ffffff" alt="" />
        </button>
        <a href="#" className="logo">
          <img src="https://api.iconify.design/mdi:youtube.svg?color=%23FF0000" alt="" className="logo-icon" />
          <span>YouTube</span>
        </a>
      </div>

      <form
        className="header-search"
        onSubmit={function (e) {
          e.preventDefault();
          onSearchSubmit();
        }}
      >
        <input
          type="text"
          placeholder="Qidirish"
          value={searchValue}
          onChange={function (e) {
            onSearchChange(e.target.value);
          }}
        />
        <button type="submit" className="search-btn" aria-label="search">
          <img src="https://api.iconify.design/mdi:magnify.svg?color=%23606060" alt="" />
        </button>
        <button type="button" className="mic-btn" aria-label="voice search">
          <img src="https://api.iconify.design/mdi:microphone-outline.svg?color=%23ffffff" alt="" />
        </button>
      </form>

      <div className="header-right">
        <button className="icon-btn">
          <img src="https://api.iconify.design/mdi:video-plus-outline.svg?color=%23ffffff" alt="" />
        </button>
        <button className="icon-btn">
          <img src="https://api.iconify.design/mdi:bell-outline.svg?color=%23ffffff" alt="" />
        </button>
        <img src="https://i.pravatar.cc/80?img=68" alt="avatar" className="header-avatar" />
      </div>
    </header>
  );
}

// ============================================================
// CATEGORY CHIPS
// ============================================================
function CategoryChips({ active, onSelect }) {
  return (
    <div className="chips-row">
      {CATEGORIES.map(function (cat) {
        return (
          <button
            key={cat}
            className={"chip" + (cat === active ? " active" : "")}
            onClick={function () {
              onSelect(cat);
            }}
          >
            {cat === "All" ? "Hammasi" : cat}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// VIDEO CARD
// ============================================================
function VideoCard({ video, onOpen }) {
  return (
    <div
      className="video-card"
      onClick={function () {
        onOpen(video);
      }}
    >
      <div className="thumb-wrap">
        <img src={video.thumbnail} alt={video.title} className="thumb" />
        <span className={"duration-badge" + (video.duration === "LIVE" ? " live" : "")}>
          {video.duration === "LIVE" ? "JONLI" : video.duration}
        </span>
      </div>
      <div className="video-meta">
        <img src={video.avatar} alt={video.channel} className="channel-avatar" />
        <div className="video-text">
          <h3 className="video-title">{video.title}</h3>
          <p className="video-channel">{video.channel}</p>
          <p className="video-stats">{video.views} • {video.time}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// VIDEO GRID
// ============================================================
function VideoGrid({ videos, onOpen, loading }) {
  if (loading) {
    return <div className="empty-state">Yuklanmoqda...</div>;
  }
  if (videos.length === 0) {
    return <div className="empty-state">Hech narsa topilmadi 😔</div>;
  }
  return (
    <div className="video-grid">
      {videos.map(function (video) {
        return <VideoCard video={video} onOpen={onOpen} key={video.id} />;
      })}
    </div>
  );
}

// ============================================================
// WATCH VIEW (video ochilganda ko'rinadigan sahifa)
// ============================================================
function WatchView({ video, related, onClose, onOpen }) {
  return (
    <div className="watch-overlay">
      <div className="watch-topbar">
        <button className="back-btn" onClick={onClose}>
          <img src="https://api.iconify.design/mdi:arrow-left.svg?color=%23ffffff" alt="" />
          Orqaga
        </button>
      </div>

      <div className="watch-layout">
        <div className="watch-main">
          <div className="player">
            <img src={video.thumbnail} alt={video.title} className="player-thumb" />
            <div className="player-play">
              <img src="https://api.iconify.design/mdi:play-circle.svg?color=%23ffffff" alt="play" />
            </div>
          </div>

          <h1 className="watch-title">{video.title}</h1>

          <div className="watch-channel-row">
            <div className="watch-channel-info">
              <img src={video.avatar} alt={video.channel} className="channel-avatar large" />
              <div>
                <p className="watch-channel-name">{video.channel}</p>
                <p className="watch-channel-subs">128 ming obunachi</p>
              </div>
              <button className="subscribe-btn">Obuna bo'lish</button>
            </div>
            <div className="watch-actions">
              <button className="pill-btn">
                <img src="https://api.iconify.design/mdi:thumb-up-outline.svg?color=%23ffffff" alt="" /> Yoqdi
              </button>
              <button className="pill-btn">
                <img src="https://api.iconify.design/mdi:share-outline.svg?color=%23ffffff" alt="" /> Ulashish
              </button>
            </div>
          </div>

          <div className="watch-description">
            <p className="watch-stats">{video.views} • {video.time}</p>
            <p>{video.description}</p>
          </div>
        </div>

        <div className="watch-related">
          {related.map(function (v) {
            return (
              <div className="related-card" onClick={function () { onOpen(v); }} key={v.id}>
                <div className="thumb-wrap small">
                  <img src={v.thumbnail} alt={v.title} className="thumb" />
                  <span className={"duration-badge" + (v.duration === "LIVE" ? " live" : "")}>
                    {v.duration === "LIVE" ? "JONLI" : v.duration}
                  </span>
                </div>
                <div className="related-text">
                  <h4>{v.title}</h4>
                  <p>{v.channel}</p>
                  <p>{v.views}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// APP (root component)
// ============================================================
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(function () {
    let cancelled = false;
    setLoading(true);
    getVideos(activeQuery, activeCategory).then(function (result) {
      if (!cancelled) {
        setVideos(result);
        setLoading(false);
      }
    });
    return function () {
      cancelled = true;
    };
  }, [activeQuery, activeCategory]);

  function openVideo(video) {
    setActiveVideo(video);
    window.scrollTo(0, 0);
  }

  return (
    <React.Fragment>
      <Header
        onBurgerClick={function () { setSidebarOpen(!sidebarOpen); }}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={function () { setActiveQuery(searchInput); }}
      />

      <div className="body-layout">
        <Sidebar open={sidebarOpen} />

        <main className="content">
          <CategoryChips
            active={activeCategory}
            onSelect={function (cat) {
              setActiveCategory(cat);
            }}
          />
          <VideoGrid videos={videos} onOpen={openVideo} loading={loading} />
        </main>
      </div>

      {activeVideo && (
        <WatchView
          video={activeVideo}
          related={getRelatedVideos(activeVideo.id)}
          onClose={function () { setActiveVideo(null); }}
          onOpen={openVideo}
        />
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
