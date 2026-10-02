import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { CategoryChips, VideoGrid } from "./components/VideoGrid";
import { WatchView } from "./components/WatchView";
import { navigate, useHashRoute } from "./lib/useHashRoute";
import { addToHistory, clearHistory, getHistory, getSubscriptions } from "./lib/store";
import { allVideos, getRelatedVideos, getVideoById, getVideos } from "./lib/videos";

export default function App() {
  const route = useHashRoute();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyVersion, setHistoryVersion] = useState(0);

  // Bosh sahifa ro'yxati: so'rov yoki kategoriya o'zgarganda qayta yuklanadi
  useEffect(() => {
    if (route.view !== "home") return;
    const controller = new AbortController();
    setLoading(true);
    getVideos(route.q, route.category, controller.signal)
      .then((list) => {
        setVideos(list);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setLoading(false);
      });
    return () => controller.abort();
  }, [route.view, route.q, route.category]);

  const activeVideo = route.view === "watch" ? getVideoById(route.id) : null;

  useEffect(() => {
    if (activeVideo) {
      addToHistory(activeVideo.id);
      window.scrollTo(0, 0);
    }
  }, [activeVideo]);

  useEffect(() => setSidebarOpen(false), [route]);

  const openVideo = (video) => navigate(`/watch/${video.id}`);
  const go = (path) => navigate(path);

  const subscriptionVideos = useMemo(() => {
    const subs = getSubscriptions();
    return allVideos().filter((v) => subs.includes(v.channel));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const historyVideos = useMemo(
    () => getHistory().map(getVideoById).filter(Boolean),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [route, historyVersion],
  );

  let content;
  if (route.view === "watch") {
    content = activeVideo ? (
      <WatchView video={activeVideo} related={getRelatedVideos(activeVideo)} onOpen={openVideo} />
    ) : (
      <div className="empty-state">
        Video topilmadi. <a href="#/">Bosh sahifaga qaytish</a>
      </div>
    );
  } else if (route.view === "subscriptions") {
    content = (
      <>
        <h2 className="view-title">Obunalar</h2>
        <VideoGrid
          videos={subscriptionVideos}
          onOpen={openVideo}
          empty={"Hali hech kimga obuna bo'lmagansiz. Video oching va \"Obuna bo'lish\" tugmasini bosing."}
        />
      </>
    );
  } else if (route.view === "history") {
    content = (
      <>
        <div className="view-toolbar">
          <h2 className="view-title">Ko'rish tarixi</h2>
          {historyVideos.length > 0 && (
            <button
              className="clear-history-btn"
              onClick={() => {
                clearHistory();
                setHistoryVersion((v) => v + 1);
              }}
            >
              Tarixni tozalash
            </button>
          )}
        </div>
        <VideoGrid videos={historyVideos} onOpen={openVideo} empty="Ko'rish tarixi hali bo'sh." />
      </>
    );
  } else {
    content = (
      <>
        <CategoryChips active={route.category} onSelect={(c) => navigate("/", { c, q: route.q })} />
        {route.q && (
          <p className="search-summary">
            “{route.q}” bo'yicha natijalar · <a href="#/">tozalash</a>
          </p>
        )}
        <VideoGrid videos={videos} onOpen={openVideo} loading={loading} />
      </>
    );
  }

  return (
    <>
      <Header
        query={route.q}
        onBurgerClick={() => setSidebarOpen((o) => !o)}
        onSearch={(q) => navigate("/", { q, c: route.category })}
        onLogoClick={() => go("/")}
      />
      <div className={"body-layout" + (route.view === "watch" ? " watching" : "")}>
        <Sidebar
          open={sidebarOpen}
          view={route.view}
          category={route.category}
          onNavigate={go}
          onCategory={(c) => navigate("/", { c })}
        />
        {sidebarOpen && <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />}
        <main className="content">{content}</main>
      </div>
    </>
  );
}
