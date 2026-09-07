// ESLATMA: Sahifa aslida shu koddan emas, index.html ichidagi inline
// <script type="text/babel"> blokidan ishlaydi (file:// orqali ochilganda
// ham ishlashi uchun). Bu fayl xuddi o'sha kodning o'qish uchun qulay
// nusxasi — agar shu yerni o'zgartirsangiz, index.html ichidagini ham
// yangilashni unutmang.

const { useState, useEffect } = React;

const NOTIFICATIONS = [
  { id: 1, text: "CodeUz yangi video joyladi: \"Full-Stack loyihani noldan qurish\"", time: "2 soat oldin" },
  { id: 2, text: "GameZone jonli efirni boshladi", time: "5 soat oldin" },
  { id: 3, text: "Sport24 sizga yangi video tavsiya qildi", time: "1 kun oldin" }
];

function formatCount(n) {
  if (n >= 1000000) {
    return (n / 1000000).toFixed(1).replace(/\.0$/, "") + " mln";
  }
  if (n >= 1000) {
    return (n / 1000).toFixed(1).replace(/\.0$/, "") + " ming";
  }
  return String(n);
}

// ============================================================
// SIDEBAR
// ============================================================
function Sidebar({ open, navView, activeCategory, onSelectHome, onSelectSubscriptions, onSelectHistory, onSelectCategory }) {
  const categoryIcons = {
    Coding: "mdi:code-tags",
    Music: "mdi:music-note-outline",
    Gaming: "mdi:controller-classic-outline",
    Sports: "mdi:trophy-outline",
    News: "mdi:newspaper-variant-outline",
    Live: "mdi:access-point"
  };
  const exploreCategories = CATEGORIES.filter(function (c) {
    return c !== "All";
  });

  return (
    <aside className={"sidebar" + (open ? " open" : "")}>
      <nav className="sidebar-section">
        <button className={"sidebar-link" + (navView === "home" ? " active" : "")} onClick={onSelectHome}>
          <img src="https://api.iconify.design/mdi:home.svg?color=%23ffffff" alt="" />
          <span>Bosh sahifa</span>
        </button>
        <button className={"sidebar-link" + (navView === "subscriptions" ? " active" : "")} onClick={onSelectSubscriptions}>
          <img src="https://api.iconify.design/mdi:youtube-subscription.svg?color=%23ffffff" alt="" />
          <span>Obunalar</span>
        </button>
        <button className={"sidebar-link" + (navView === "history" ? " active" : "")} onClick={onSelectHistory}>
          <img src="https://api.iconify.design/mdi:history.svg?color=%23ffffff" alt="" />
          <span>Tarix</span>
        </button>
      </nav>

      <hr className="sidebar-divider" />
      <div className="sidebar-title">Kashf etish</div>
      <nav className="sidebar-section">
        {exploreCategories.map(function (cat) {
          return (
            <button
              key={cat}
              className={"sidebar-link" + (navView === "home" && activeCategory === cat ? " active" : "")}
              onClick={function () { onSelectCategory(cat); }}
            >
              <img src={"https://api.iconify.design/" + categoryIcons[cat] + ".svg?color=%23ffffff"} alt="" />
              <span>{cat}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

// ============================================================
// HEADER
// ============================================================
function Header({ onBurgerClick, searchValue, onSearchChange, onSearchSubmit, notifOpen, onToggleNotif }) {
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

        <div className="notif-wrap">
          <button className="icon-btn" onClick={onToggleNotif} aria-label="notifications">
            <img src="https://api.iconify.design/mdi:bell-outline.svg?color=%23ffffff" alt="" />
            <span className="notif-dot"></span>
          </button>
          {notifOpen && (
            <div className="notif-dropdown">
              <p className="notif-title">Bildirishnomalar</p>
              {NOTIFICATIONS.map(function (n) {
                return (
                  <div className="notif-item" key={n.id}>
                    <p>{n.text}</p>
                    <span>{n.time}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

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
// IZOHLAR (comments) BO'LIMI
// ============================================================
function CommentsSection({ videoId }) {
  const [comments, setComments] = useState(function () {
    return getComments(videoId);
  });
  const [text, setText] = useState("");

  useEffect(function () {
    setComments(getComments(videoId));
    setText("");
  }, [videoId]);

  function handleSubmit(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    addComment(videoId, value);
    setComments(getComments(videoId));
    setText("");
  }

  return (
    <div className="comments-section">
      <h3 className="comments-count">{comments.length} ta izoh</h3>

      <form className="comment-form" onSubmit={handleSubmit}>
        <img src="https://i.pravatar.cc/80?img=68" alt="" className="channel-avatar" />
        <input
          type="text"
          placeholder="Izoh qoldiring..."
          value={text}
          onChange={function (e) {
            setText(e.target.value);
          }}
        />
        <button type="submit" className="comment-submit-btn" disabled={!text.trim()}>Yuborish</button>
      </form>

      <div className="comment-list">
        {comments.map(function (c) {
          return (
            <div className="comment" key={c.id}>
              <img src={c.avatar} alt={c.author} className="channel-avatar" />
              <div className="comment-body">
                <p className="comment-meta">
                  <span className="comment-author">{c.author}</span>
                  <span className="comment-time">{c.time}</span>
                </p>
                <p className="comment-text">{c.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// WATCH VIEW (video ochilganda ko'rinadigan sahifa)
// ============================================================
function WatchView({ video, related, onClose, onOpen }) {
  const [reaction, setReactionState] = useState(function () {
    return getReaction(video.id);
  });
  const [subscribed, setSubscribed] = useState(function () {
    return isSubscribed(video.channel);
  });

  useEffect(function () {
    setReactionState(getReaction(video.id));
    setSubscribed(isSubscribed(video.channel));
  }, [video.id, video.channel]);

  function handleLike() {
    setReactionState(setReaction(video.id, "like"));
  }

  function handleDislike() {
    setReactionState(setReaction(video.id, "dislike"));
  }

  function handleSubscribe() {
    setSubscribed(toggleSubscription(video.channel));
  }

  const likeCount = video.baseLikes + (reaction === "like" ? 1 : 0);

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
            {video.videoUrl ? (
              <video
                className="player-video"
                src={video.videoUrl}
                poster={video.thumbnail}
                controls
                preload="metadata"
              ></video>
            ) : (
              <iframe
                className="player-video"
                src={"https://www.youtube.com/embed/" + video.id + "?autoplay=1"}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>

          <h1 className="watch-title">{video.title}</h1>

          <div className="watch-channel-row">
            <div className="watch-channel-info">
              <img src={video.avatar} alt={video.channel} className="channel-avatar large" />
              <div>
                <p className="watch-channel-name">{video.channel}</p>
                <p className="watch-channel-subs">128 ming obunachi</p>
              </div>
              <button
                className={"subscribe-btn" + (subscribed ? " subscribed" : "")}
                onClick={handleSubscribe}
              >
                {subscribed ? "✓ Obuna bo'lingan" : "Obuna bo'lish"}
              </button>
            </div>
            <div className="watch-actions">
              <button className={"pill-btn" + (reaction === "like" ? " active" : "")} onClick={handleLike}>
                <img src="https://api.iconify.design/mdi:thumb-up-outline.svg?color=%23ffffff" alt="" />
                {formatCount(likeCount)}
              </button>
              <button className={"pill-btn" + (reaction === "dislike" ? " active" : "")} onClick={handleDislike}>
                <img src="https://api.iconify.design/mdi:thumb-down-outline.svg?color=%23ffffff" alt="" />
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

          <CommentsSection videoId={video.id} />
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
  const [navView, setNavView] = useState("home"); // "home" | "subscriptions" | "history"
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [, forceRefresh] = useState(0);

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
    addToHistory(video.id);
    setActiveVideo(video);
    setNotifOpen(false);
    window.scrollTo(0, 0);
  }

  function goHome() {
    setNavView("home");
    setActiveCategory("All");
    setActiveQuery("");
    setSearchInput("");
    setActiveVideo(null);
    setSidebarOpen(false);
  }

  function goSubscriptions() {
    setNavView("subscriptions");
    setActiveVideo(null);
    setSidebarOpen(false);
  }

  function goHistory() {
    setNavView("history");
    setActiveVideo(null);
    setSidebarOpen(false);
  }

  function selectCategory(cat) {
    setNavView("home");
    setActiveCategory(cat);
    setSidebarOpen(false);
  }

  function handleClearHistory() {
    clearHistory();
    forceRefresh(function (t) { return t + 1; });
  }

  let mainContent;

  if (navView === "subscriptions") {
    const subVideos = getSubscribedVideos();
    mainContent = subVideos.length === 0 ? (
      <div className="empty-state">
        Hali hech kimga obuna bo'lmagansiz.<br />
        Video oching va "Obuna bo'lish" tugmasini bosing.
      </div>
    ) : (
      <VideoGrid videos={subVideos} onOpen={openVideo} loading={false} />
    );
  } else if (navView === "history") {
    const historyVideos = getHistoryVideos();
    mainContent = historyVideos.length === 0 ? (
      <div className="empty-state">Ko'rish tarixi hali bo'sh.</div>
    ) : (
      <React.Fragment>
        <div className="view-toolbar">
          <h2 className="view-title">Ko'rish tarixi</h2>
          <button className="clear-history-btn" onClick={handleClearHistory}>Tarixni tozalash</button>
        </div>
        <VideoGrid videos={historyVideos} onOpen={openVideo} loading={false} />
      </React.Fragment>
    );
  } else {
    mainContent = (
      <React.Fragment>
        <CategoryChips active={activeCategory} onSelect={selectCategory} />
        <VideoGrid videos={videos} onOpen={openVideo} loading={loading} />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Header
        onBurgerClick={function () { setSidebarOpen(!sidebarOpen); }}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onSearchSubmit={function () {
          setActiveQuery(searchInput);
          setNavView("home");
        }}
        notifOpen={notifOpen}
        onToggleNotif={function () { setNotifOpen(!notifOpen); }}
      />

      <div className="body-layout">
        <Sidebar
          open={sidebarOpen}
          navView={navView}
          activeCategory={activeCategory}
          onSelectHome={goHome}
          onSelectSubscriptions={goSubscriptions}
          onSelectHistory={goHistory}
          onSelectCategory={selectCategory}
        />

        <main className="content">
          {mainContent}
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
