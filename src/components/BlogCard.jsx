import React from 'react';
import { formatDate } from '../utils/formatDate';
import { stripHtml } from '../utils/stripHtml';

export default function BlogCard({ blog }) {
  if (!blog) return null;

  const { title, slug, category, content, featuredImage, authorName, createdAt } = blog;
  const shortDesc = stripHtml(content, 90);
  const formattedDate = formatDate(createdAt);
  const url = `https://ownchat.app/blog/${slug}`;

  return (
    <div className="bc-card-wrap">
      <article
        className="bc-card"
        onClick={() => window.location.href = url}
        style={{ cursor: 'pointer' }}
      >
        {/* Image */}
        <div className="bc-img-wrap">
          <img
            src={featuredImage}
            alt={title}
            loading="lazy"
            className="bc-img"
            onError={(e) => {
              e.target.src = 'https://api-blog.owncart.shop/uploads/images/HYpA8aaItM-whatsapp-business-pricing.png';
            }}
          />
        </div>

        {/* Body */}
        <div className="bc-body">
          {/* Meta */}
          <div className="bc-meta">
            <span>{formattedDate}</span>
            <span className="bc-dot">·</span>
            <span>{authorName || 'OwnChat Team'}</span>
          </div>

          {/* Title */}
          <h3 className="bc-title">{title}</h3>

          {/* Excerpt */}
          {shortDesc && <p className="bc-excerpt">{shortDesc}</p>}

          {/* Read Article button */}
          <div className="bc-footer">
            <a
              href={url}
              className="bc-read-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Read Article</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12,5 19,12 12,19" />
              </svg>
            </a>
          </div>
        </div>

        <style jsx="true">{`
          /* ── Rotating border wrapper ── */
          .bc-card-wrap {
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            height: 100%;
          }

          /* Full 360° conic-gradient spinning disk */
          .bc-card-wrap::before {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(0deg);
            /* Full perimeter — color travels all the way around */
            background: conic-gradient(
              from 0deg,
              #00d4ff 0deg,
              #0077ff 60deg,
              #0044cc 120deg,
              #00aaff 180deg,
              #00d4ff 240deg,
              #0077ff 300deg,
              #00d4ff 360deg
            );
            opacity: 0;
            transition: opacity 0.35s ease;
            z-index: 0;
          }

          /* Inner mask — covers the center, leaving only a ~2px glowing ring */
          .bc-card-wrap::after {
            content: '';
            position: absolute;
            inset: 2px;
            background: var(--card-bg);
            border-radius: 14px;
            z-index: 0;
          }

          /* Show + spin on hover */
          .bc-card-wrap:hover::before {
            opacity: 1;
            animation: bc-spin 3s linear infinite;
          }

          @keyframes bc-spin {
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }

          /* ── Card ── */
          .bc-card {
            position: relative;
            z-index: 1;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 14px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100%;
            transition: transform 0.28s cubic-bezier(0.16,1,0.3,1),
                        box-shadow 0.28s cubic-bezier(0.16,1,0.3,1),
                        border-color 0.18s ease;
            will-change: transform;
          }
          .bc-card-wrap:hover .bc-card {
            transform: translateY(-4px);
            box-shadow: 0 20px 50px rgba(0,100,255,0.22);
            border-color: transparent;
          }

          /* ── Image ── */
          .bc-img-wrap {
            position: relative;
            overflow: hidden;
            aspect-ratio: 16 / 9;
            background: var(--bg-secondary);
            flex-shrink: 0;
          }
          .bc-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
          }
          .bc-card-wrap:hover .bc-img {
            transform: scale(1.06);
          }

          /* Category badge on image */
          .bc-cat-badge {
            position: absolute;
            top: 10px;
            left: 0;
            background: var(--primary-blue);
            color: #fff;
            font-size: 0.63rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 0.28rem 0.75rem 0.28rem 0.65rem;
            border-radius: 0 9999px 9999px 0;
            white-space: nowrap;
            max-width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            box-shadow: 0 2px 6px rgba(11,116,255,0.35);
            z-index: 2;
          }

          /* ── Body ── */
          .bc-body {
            padding: 1rem 1.1rem 1.1rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            flex-grow: 1;
          }

          /* Meta */
          .bc-meta {
            display: flex;
            align-items: center;
            gap: 0.35rem;
            font-size: 0.71rem;
            font-weight: 500;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }
          .bc-dot { color: var(--border-input); }

          /* Title */
          .bc-title {
            font-size: 0.98rem;
            font-weight: 700;
            color: var(--text-heading);
            line-height: 1.38;
            letter-spacing: -0.02em;
            margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            transition: color 0.15s ease;
          }
          .bc-card-wrap:hover .bc-title {
            color: var(--primary-blue);
          }

          /* Excerpt */
          .bc-excerpt {
            font-size: 0.8rem;
            color: var(--text-paragraph);
            line-height: 1.55;
            margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* ── Read Article footer ── */
          .bc-footer {
            margin-top: auto;
            padding-top: 0.75rem;
            border-top: 1px solid var(--border-default);
          }
          .bc-read-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.76rem;
            font-weight: 700;
            color: var(--primary-blue);
            text-decoration: none;
            letter-spacing: 0.03em;
            padding: 0.38rem 0.85rem;
            border-radius: 9999px;
            background: rgba(11,116,255,0.08);
            border: 1px solid rgba(11,116,255,0.2);
            transition: background 0.18s ease, color 0.18s ease,
                        border-color 0.18s ease, transform 0.18s ease,
                        box-shadow 0.18s ease;
          }
          .bc-read-btn:hover {
            background: var(--primary-blue);
            color: #fff;
            border-color: var(--primary-blue);
            transform: translateX(2px);
            box-shadow: 0 4px 14px rgba(11,116,255,0.35);
          }
          .bc-read-btn svg {
            flex-shrink: 0;
            transition: transform 0.18s ease;
          }
          .bc-read-btn:hover svg {
            transform: translateX(3px);
          }
        `}</style>
      </article>
    </div>
  );
}
