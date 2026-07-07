import React from 'react';
import { formatDate } from '../utils/formatDate';
import { stripHtml } from '../utils/stripHtml';

function estimateReadTime(text) {
  if (!text) return '5 min read';
  const words = text.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export default function FeaturedBlog({ blog }) {
  if (!blog) return null;

  const { title, slug, category, content, featuredImage, authorName, createdAt } = blog;
  const shortDesc = stripHtml(content, 240);
  const formattedDate = formatDate(createdAt);
  const readTime = estimateReadTime(content);

  return (
    <section className="ef-section section-padding" style={{ paddingBottom: '2.5rem' }}>
      <div className="container">

        {/* Section eyebrow — Billboard / Entrepreneur style */}
        <div className="ef-eyebrow">
          <div className="ef-eyebrow__line" />
          <span className="ef-eyebrow__label">Featured Story</span>
          <div className="ef-eyebrow__line" />
        </div>

        {/* Featured card — full-bleed image hero */}
        <article
          className="ef-card"
          onClick={() => window.location.href = `https://ownchat.app/blog/${slug}`}
          style={{ cursor: 'pointer' }}
        >
          {/* Left: Full image panel */}
          <div className="ef-card__image-panel">
            <img
              src={featuredImage}
              alt={title}
              loading="lazy"
              className="ef-card__img"
              onError={(e) => {
                e.target.src = 'https://api-blog.owncart.shop/uploads/images/9s19hyOddh-green-tick.png';
              }}
            />
            {/* Gradient overlay for depth */}
            <div className="ef-card__overlay" />
            {/* Category badge on image */}
            <div className="ef-card__badge-wrap">
              <span className="ef-card__badge">★ Featured · {category}</span>
            </div>
          </div>

          {/* Right: Content panel */}
          <div className="ef-card__content">
            {/* Meta */}
            <div className="ef-card__meta">
              <span>{formattedDate}</span>
              <span className="ef-card__dot">·</span>
              <span>{readTime}</span>
            </div>

            {/* Headline — large, tight, editorial */}
            <h2 className="ef-card__title">{title}</h2>

            {/* Divider */}
            <div className="ef-card__divider" />

            {/* Excerpt */}
            <p className="ef-card__excerpt">{shortDesc}</p>

            {/* Author row + CTA */}
            <div className="ef-card__footer">
              <div className="ef-card__author">
                <div className="ef-card__avatar">{(authorName || 'O')[0].toUpperCase()}</div>
                <div>
                  <div className="ef-card__author-name">{authorName || 'OwnChat Team'}</div>
                  <div className="ef-card__author-role">Content Writer</div>
                </div>
              </div>

              <a
                href={`https://ownchat.app/blog/${slug}`}
                className="ef-card__cta"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Read Full Story</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12,5 19,12 12,19"/>
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>

      <style jsx="true">{`
        /* Eyebrow label — Billboard-style horizontal rule with text */
        .ef-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .ef-eyebrow__line {
          flex: 1;
          height: 1px;
          background: var(--border-default);
        }
        .ef-eyebrow__label {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--primary-blue);
          white-space: nowrap;
        }

        /* Featured card */
        .ef-card {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          min-height: 440px;
          border-radius: 20px;
          overflow: hidden;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.45);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.2s ease;
          will-change: transform;
        }

        .ef-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(11, 116, 255, 0.22);
          border-color: rgba(11, 116, 255, 0.45);
        }

        /* ── Image panel ── */
        .ef-card__image-panel {
          position: relative;
          overflow: hidden;
          background: var(--bg-secondary);
        }

        .ef-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ef-card:hover .ef-card__img {
          transform: scale(1.05);
        }

        .ef-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(6, 9, 17, 0.25) 0%,
            rgba(11, 116, 255, 0.08) 100%
          );
          pointer-events: none;
        }

        /* Category badge pinned to top-left of image */
        .ef-card__badge-wrap {
          position: absolute;
          top: 20px;
          left: 0;
          z-index: 2;
        }

        .ef-card__badge {
          display: inline-block;
          background: var(--primary-blue);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.38rem 1rem 0.38rem 0.85rem;
          border-radius: 0 9999px 9999px 0;
          box-shadow: 0 4px 16px rgba(11, 116, 255, 0.45);
        }

        /* ── Content panel ── */
        .ef-card__content {
          padding: 2.5rem 2.75rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1rem;
        }

        .ef-card__meta {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .ef-card__dot {
          color: var(--border-input);
          font-size: 1.1rem;
          line-height: 1;
        }

        /* Big editorial headline */
        .ef-card__title {
          font-size: clamp(1.55rem, 2.2vw, 2.1rem);
          font-weight: 800;
          color: var(--text-heading);
          line-height: 1.28;
          letter-spacing: -0.03em;
          margin: 0;
          transition: color 0.15s ease;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ef-card:hover .ef-card__title {
          color: var(--primary-blue);
        }

        /* Short decorative divider — Entrepreneur style */
        .ef-card__divider {
          width: 40px;
          height: 3px;
          border-radius: 9999px;
          background: var(--primary-blue);
          flex-shrink: 0;
        }

        .ef-card__excerpt {
          font-size: 0.97rem;
          color: var(--text-paragraph);
          line-height: 1.65;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Footer: author + CTA button */
        .ef-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-default);
          margin-top: auto;
        }

        .ef-card__author {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .ef-card__avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-blue) 0%, #338CFF 100%);
          color: #fff;
          font-size: 0.82rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 0 2px rgba(11, 116, 255, 0.25);
        }

        .ef-card__author-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-secondary);
          line-height: 1.2;
        }

        .ef-card__author-role {
          font-size: 0.73rem;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        /* Read Full Story CTA */
        .ef-card__cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.3rem;
          background: var(--primary-blue);
          color: #fff;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease, gap 0.15s ease;
          box-shadow: 0 4px 14px rgba(11, 116, 255, 0.35);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .ef-card__cta:hover {
          background: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(11, 116, 255, 0.5);
          gap: 0.75rem;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .ef-card {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .ef-card__image-panel {
            aspect-ratio: 16 / 9;
            min-height: 240px;
          }
          .ef-card__content {
            padding: 2rem 2.25rem;
          }
        }

        @media (max-width: 640px) {
          .ef-card__content {
            padding: 1.5rem 1.5rem;
          }
          .ef-card__footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
