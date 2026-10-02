import { useEffect, useState } from "react";
import {
  addComment,
  deleteComment,
  getComments,
  getReaction,
  isSubscribed,
  setReaction,
  toggleSubscription,
} from "../lib/store";
import { timeAgo } from "../lib/format";
import { Avatar } from "./Avatar";
import { Badge, videoStats } from "./VideoGrid";

const icon = (name) => `https://api.iconify.design/mdi:${name}.svg?color=%23ffffff`;

function CommentsSection({ videoId }) {
  const [comments, setComments] = useState(() => getComments(videoId));
  const [text, setText] = useState("");

  useEffect(() => {
    setComments(getComments(videoId));
    setText("");
  }, [videoId]);

  const submit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    addComment(videoId, value.slice(0, 1000));
    setComments(getComments(videoId));
    setText("");
  };

  return (
    <section className="comments-section" aria-label="Izohlar">
      <h3 className="comments-count">{comments.length} ta izoh</h3>

      <form className="comment-form" onSubmit={submit}>
        <Avatar name="Siz" />
        <input
          type="text"
          placeholder="Izoh qoldiring..."
          aria-label="Izoh"
          maxLength={1000}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="comment-submit-btn" disabled={!text.trim()}>
          Yuborish
        </button>
      </form>

      {comments.length === 0 && <p className="comment-empty">Birinchi bo'lib izoh qoldiring.</p>}
      <div className="comment-list">
        {comments.map((c) => (
          <div className="comment" key={c.id}>
            <Avatar name={c.author} />
            <div className="comment-body">
              <p className="comment-meta">
                <span className="comment-author">{c.author}</span>
                <span className="comment-time">{timeAgo(c.createdAt)}</span>
                <button
                  className="comment-delete"
                  onClick={() => {
                    deleteComment(videoId, c.id);
                    setComments(getComments(videoId));
                  }}
                >
                  O'chirish
                </button>
              </p>
              <p className="comment-text">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function WatchView({ video, related, onOpen }) {
  const [reaction, setReactionState] = useState(() => getReaction(video.id));
  const [subscribed, setSubscribed] = useState(() => isSubscribed(video.channel));
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setReactionState(getReaction(video.id));
    setSubscribed(isSubscribed(video.channel));
    setExpanded(false);
    document.title = `${video.title} — YouTube Clone`;
    return () => {
      document.title = "YouTube Clone";
    };
  }, [video.id, video.channel, video.title]);

  const share = async () => {
    const url = `https://www.youtube.com/watch?v=${video.id}`;
    try {
      if (navigator.share) await navigator.share({ title: video.title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* foydalanuvchi bekor qildi */
    }
  };

  return (
    <div className="watch-layout">
      <div className="watch-main">
        <div className="player">
          <iframe
            key={video.id}
            className="player-video"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <h1 className="watch-title">{video.title}</h1>

        <div className="watch-channel-row">
          <div className="watch-channel-info">
            <Avatar name={video.channel} size={40} />
            <div>
              <a className="watch-channel-name" href={video.channelUrl} target="_blank" rel="noopener noreferrer">
                {video.channel}
              </a>
              <p className="watch-channel-subs">{video.category}</p>
            </div>
            <button
              className={"subscribe-btn" + (subscribed ? " subscribed" : "")}
              onClick={() => setSubscribed(toggleSubscription(video.channel))}
              aria-pressed={subscribed}
            >
              {subscribed ? "✓ Obuna bo'lingan" : "Obuna bo'lish"}
            </button>
          </div>
          <div className="watch-actions">
            <button
              className={"pill-btn" + (reaction === "like" ? " active" : "")}
              onClick={() => setReactionState(setReaction(video.id, "like"))}
              aria-pressed={reaction === "like"}
              aria-label="Yoqdi"
            >
              <img src={icon(reaction === "like" ? "thumb-up" : "thumb-up-outline")} alt="" />
            </button>
            <button
              className={"pill-btn" + (reaction === "dislike" ? " active" : "")}
              onClick={() => setReactionState(setReaction(video.id, "dislike"))}
              aria-pressed={reaction === "dislike"}
              aria-label="Yoqmadi"
            >
              <img src={icon(reaction === "dislike" ? "thumb-down" : "thumb-down-outline")} alt="" />
            </button>
            <button className="pill-btn" onClick={share}>
              <img src={icon("share-outline")} alt="" /> {copied ? "Nusxa olindi ✓" : "Ulashish"}
            </button>
          </div>
        </div>

        <div className="watch-description">
          {videoStats(video) && <p className="watch-stats">{videoStats(video)}</p>}
          {video.description ? (
            <>
              <p className={expanded ? "" : "clamped"}>{video.description}</p>
              <button className="more-btn" onClick={() => setExpanded((x) => !x)}>
                {expanded ? "Kamroq" : "Ko'proq"}
              </button>
            </>
          ) : (
            <p>
              <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                YouTube'da ochish ↗
              </a>
            </p>
          )}
        </div>

        <CommentsSection videoId={video.id} />
      </div>

      <aside className="watch-related" aria-label="Aloqador videolar">
        {related.map((v) => (
          <a
            className="related-card"
            href={`#/watch/${v.id}`}
            onClick={(e) => {
              e.preventDefault();
              onOpen(v);
            }}
            key={v.id}
          >
            <div className="thumb-wrap small">
              <img src={v.thumbnail} alt="" className="thumb" loading="lazy" />
              <Badge video={v} />
            </div>
            <div className="related-text">
              <h4>{v.title}</h4>
              <p>{v.channel}</p>
            </div>
          </a>
        ))}
      </aside>
    </div>
  );
}
