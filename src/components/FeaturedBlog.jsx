import React, { useState, useEffect, useCallback } from 'react';
import { formatDate } from '../utils/formatDate';
import { stripHtml } from '../utils/stripHtml';

function estimateReadTime(text) {
  if (!text) return '5 min read';
  const words = text.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export default function FeaturedBlog({ blogs = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next'); // 'next' | 'prev'

  const total = blogs.length;

  const goTo = useCallback((idx, dir = 'next') => {
    if (animating || idx === activeIdx) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setAnimating(false);
    }, 380);
  }, [animating, activeIdx]);

  const goNext = useCallback(() => {
    goTo((activeIdx + 1) % total, 'next');
  }, [activeIdx, total, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIdx - 1 + total) % total, 'prev');
  }, [activeIdx, total, goTo]);

  // Auto-play every 5s
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext, total]);

  if (!blogs || total === 0) return null;

  const blog = blogs[activeIdx];
  const { title, slug, category, content, featuredImage, authorName, createdAt } = blog;
  const shortDesc = stripHtml(content, 180);
  const formattedDate = formatDate(createdAt);
  const readTime = estimateReadTime(content);
  const url = `https://ownchat.app/blog/${slug}`;

  return (
    <section className="fs-section">
      <div className="container">

        {/* Eyebrow */}
        <div className="fs-eyebrow">
          <div className="fs-eyebrow__line" />
          <span className="fs-eyebrow__label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
            Featured Stories
          </span>
          <div className="fs-eyebrow__line" />
        </div>

        {/* Slide card */}
        <article
          className={`fs-card ${animating ? (direction === 'next' ? 'fs-exit-left' : 'fs-exit-right') : 'fs-enter'}`}
          onClick={() => window.location.href = url}
          style={{ cursor: 'pointer' }}
        >
          {/* Left: Image */}
          <div className="fs-img-panel">
            <img
              src={featuredImage}
              alt={title}
              loading="lazy"
              className="fs-img"
              onError={(e) => {
                e.target.src = 'https://api-blog.owncart.shop/uploads/images/9s19hyOddh-green-tick.png';
              }}
            />
            <div className="fs-img-overlay" />

            {/* Slide counter on image */}
            <div className="fs-counter">{activeIdx + 1} / {total}</div>
          </div>

          {/* Right: Content */}
          <div className="fs-content">
            <div className="fs-meta">
              <span>{formattedDate}</span>
              <span className="fs-dot">·</span>
              <span>{readTime}</span>
            </div>

            <h2 className="fs-title">{title}</h2>
            <div className="fs-divider" />
            <p className="fs-excerpt">{shortDesc}</p>

            <div className="fs-footer">
              <div className="fs-author">
                <div className="fs-avatar">{(authorName || 'O')[0].toUpperCase()}</div>
                <div>
                  <div className="fs-author-name">{authorName || 'OwnChat Team'}</div>
                  <div className="fs-author-role">Content Writer</div>
                </div>
              </div>

              <a
                href={url}
                className="fs-cta"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Read Full Story</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </a>
            </div>
          </div>
        </article>

      </div>

      <style jsx="true">{`
        /* ── Section ── */
        .fs-section {
          padding: 2rem 0 2.5rem;
        }

        /* Eyebrow */
        .fs-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1.25rem;
        }
        .fs-eyebrow__line {
          flex: 1;
          height: 1px;
          background: var(--border-default);
        }
        .fs-eyebrow__label {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--primary-blue);
          white-space: nowrap;
        }

        /* ── Slide card ── */
        .fs-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 320px;
          max-height: 340px;
          border-radius: 18px;
          overflow: hidden;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.3s cubic-bezier(0.16,1,0.3,1),
                      border-color 0.2s ease;
        }
        .fs-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 50px rgba(11,116,255,0.2);
          border-color: rgba(11,116,255,0.4);
        }

        /* Slide animations */
        .fs-enter {
          animation: fs-slide-in 0.38s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .fs-exit-left {
          animation: fs-slide-out-left 0.38s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .fs-exit-right {
          animation: fs-slide-out-right 0.38s cubic-bezier(0.16,1,0.3,1) forwards;
        }

        @keyframes fs-slide-in {
          from { opacity: 0; transform: translateX(32px) scale(0.98); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes fs-slide-out-left {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-32px); }
        }
        @keyframes fs-slide-out-right {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(32px); }
        }

        /* ── Image panel ── */
        .fs-img-panel {
          position: relative;
          overflow: hidden;
        }
        .fs-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .fs-card:hover .fs-img {
          transform: scale(1.05);
        }
        .fs-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(6,9,17,0.2) 0%, rgba(11,116,255,0.07) 100%);
          pointer-events: none;
        }

        /* Badge */
        .fs-badge {
          position: absolute;
          top: 14px;
          left: 0;
          background: var(--primary-blue);
          color: #fff;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.26rem 0.9rem 0.26rem 0.7rem;
          border-radius: 0 9999px 9999px 0;
          box-shadow: 0 3px 12px rgba(11,116,255,0.4);
          z-index: 2;
        }

        /* Slide counter */
        .fs-counter {
          position: absolute;
          bottom: 12px;
          right: 12px;
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(255,255,255,0.75);
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(6px);
          padding: 0.22rem 0.6rem;
          border-radius: 9999px;
          letter-spacing: 0.05em;
          z-index: 2;
        }

        /* ── Content panel ── */
        .fs-content {
          padding: 1.75rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.7rem;
          overflow: hidden;
        }

        .fs-meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .fs-dot { color: var(--border-input); font-size: 1rem; }

        .fs-title {
          font-size: clamp(1.15rem, 1.8vw, 1.6rem);
          font-weight: 800;
          color: var(--text-heading);
          line-height: 1.28;
          letter-spacing: -0.03em;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.15s ease;
        }
        .fs-card:hover .fs-title { color: var(--primary-blue); }

        .fs-divider {
          width: 36px;
          height: 3px;
          border-radius: 9999px;
          background: var(--primary-blue);
          flex-shrink: 0;
        }

        .fs-excerpt {
          font-size: 0.85rem;
          color: var(--text-paragraph);
          line-height: 1.6;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .fs-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding-top: 0.9rem;
          border-top: 1px solid var(--border-default);
          margin-top: auto;
        }

        .fs-author {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }
        .fs-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-blue) 0%, #338CFF 100%);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px rgba(11,116,255,0.25);
        }
        .fs-author-name {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-secondary);
          line-height: 1.2;
        }
        .fs-author-role {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .fs-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1.1rem;
          background: var(--primary-blue);
          color: #fff;
          border-radius: 9999px;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.15s ease, transform 0.15s ease,
                      box-shadow 0.15s ease, gap 0.15s ease;
          box-shadow: 0 3px 12px rgba(11,116,255,0.35);
        }
        .fs-cta:hover {
          background: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(11,116,255,0.5);
          gap: 0.65rem;
        }

        /* ── Navigation ── */
        .fs-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .fs-nav-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--border-default);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease,
                      color 0.15s ease, transform 0.15s ease;
        }
        .fs-nav-btn:hover {
          background: var(--primary-blue);
          border-color: var(--primary-blue);
          color: #fff;
          transform: scale(1.1);
        }
        .fs-dots {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .fs-dot-btn {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: var(--border-default);
          border: none;
          cursor: pointer;
          transition: background 0.2s ease, width 0.25s ease, transform 0.2s ease;
        }
        .fs-dot-active {
          width: 24px;
          background: var(--primary-blue);
          box-shadow: 0 0 8px rgba(11,116,255,0.5);
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .fs-card {
            grid-template-columns: 1fr;
            min-height: auto;
            max-height: none;
          }
          .fs-img-panel { aspect-ratio: 16/9; }
          .fs-content { padding: 1.5rem; }
        }
        @media (max-width: 540px) {
          .fs-footer { flex-direction: column; align-items: flex-start; }
          .fs-content { padding: 1.25rem; }
        }
      `}</style>
    </section>
  );
}
