import React from 'react';
import { formatDate } from '../utils/formatDate';
import { stripHtml } from '../utils/stripHtml';

export default function BlogCard({ blog }) {
  if (!blog) return null;

  const { title, slug, category, content, featuredImage, authorName, createdAt, tags = [] } = blog;
  const shortDesc = stripHtml(content, 90);
  const formattedDate = formatDate(createdAt);
  // Show max 3 tags
  const visibleTags = (tags || []).slice(0, 3);

  return (
    <article
      className="bc-card"
      onClick={() => window.open(`https://ownchat.app/blog/${slug}`, '_blank')}
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
        {/* Category badge pinned on image */}
        <span className="bc-cat-badge">{category}</span>
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

        {/* Tags */}
        {visibleTags.length > 0 && (
          <div className="bc-tags">
            {visibleTags.map((tag, i) => (
              <span key={i} className="bc-tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      <style jsx="true">{`
        .bc-card {
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
        .bc-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(11,116,255,0.18);
          border-color: rgba(11,116,255,0.4);
        }

        /* Image */
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
        .bc-card:hover .bc-img {
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

        /* Body */
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
        .bc-dot {
          color: var(--border-input);
        }

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
        .bc-card:hover .bc-title {
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

        /* Tags row */
        .bc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-top: auto;
          padding-top: 0.6rem;
        }
        .bc-tag {
          font-size: 0.67rem;
          font-weight: 600;
          color: var(--primary-blue);
          background: rgba(11,116,255,0.1);
          border: 1px solid rgba(11,116,255,0.2);
          border-radius: 9999px;
          padding: 0.2rem 0.55rem;
          letter-spacing: 0.02em;
          transition: background 0.15s ease, color 0.15s ease;
          white-space: nowrap;
        }
        .bc-card:hover .bc-tag {
          background: rgba(11,116,255,0.18);
        }
      `}</style>
    </article>
  );
}
