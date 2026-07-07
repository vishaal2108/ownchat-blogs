import React from 'react';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { stripHtml } from '../utils/stripHtml';

export default function BlogCard({ blog }) {
  if (!blog) return null;

  const {
    title,
    slug,
    category,
    content,
    featuredImage,
    authorName,
    createdAt
  } = blog;

  const shortDesc = stripHtml(content, 140);
  const formattedDate = formatDate(createdAt);

  return (
    <article
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--card-radius)',
        boxShadow: 'var(--card-shadow)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'var(--transition-normal)',
        cursor: 'pointer',
        height: '100%'
      }}
      className="blog-card"
      onClick={() => window.location.href = `#blog/${slug}`}
    >
      {/* Featured Image Container at top */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '230px', background: 'var(--bg-secondary)', borderRadius: '24px 24px 0 0' }}>
        <img
          src={featuredImage}
          alt={title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="card-img"
          onError={(e) => {
            e.target.src = 'https://api-blog.owncart.shop/uploads/images/HYpA8aaItM-whatsapp-business-pricing.png';
          }}
        />
      </div>

      {/* Card Content Area - Exactly matching screenshot layout */}
      <div style={{ padding: '1.75rem 1.75rem 2rem 1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        
        {/* 1. Category Pill Badge */}
        <div style={{ marginBottom: '1rem' }}>
          <span className="badge" style={{ boxShadow: '0 4px 12px rgba(0, 102, 255, 0.25)' }}>
            {category}
          </span>
        </div>

        {/* 2. Metadata: Date & Author row */}
        <div style={{ color: 'var(--date-text)', fontSize: '0.88rem', fontWeight: '500', marginBottom: '0.75rem' }}>
          <span>{formattedDate}</span>
          <span style={{ margin: '0 0.5rem', color: 'var(--border-input)' }}>•</span>
          <span>By {authorName || 'Poornima'}</span>
        </div>

        {/* 3. Title (2-line clamp) */}
        <h3 style={{
          fontSize: '1.28rem',
          fontWeight: '700',
          color: 'var(--text-heading)',
          lineHeight: '1.38',
          marginBottom: '0.85rem',
          transition: 'color var(--transition-fast)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minHeight: '3.5rem'
        }} className="card-title">
          {title}
        </h3>

        {/* 4. Short Excerpt (3-line clamp) */}
        <p style={{
          fontSize: '0.94rem',
          color: 'var(--text-paragraph)',
          lineHeight: '1.6',
          marginBottom: '1.75rem',
          flexGrow: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {shortDesc}
        </p>

        {/* 5. Read More Link aligned left */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              color: 'var(--primary-blue)',
              fontWeight: '600',
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'var(--transition-fast)'
            }}
            className="read-more-link"
          >
            <span>Read More</span>
            <ArrowRight size={17} className="arrow-icon" style={{ transition: 'transform var(--transition-fast)' }} />
          </span>
        </div>

      </div>

      <style jsx="true">{`
        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--card-hover-shadow);
          border-color: rgba(11, 116, 255, 0.4) !important;
        }

        .blog-card:hover .card-img {
          transform: scale(1.06);
        }

        .blog-card:hover .card-title {
          color: var(--primary-blue) !important;
        }

        .blog-card:hover .arrow-icon {
          transform: translateX(5px);
        }
      `}</style>
    </article>
  );
}
