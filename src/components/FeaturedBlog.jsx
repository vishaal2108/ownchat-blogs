import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { formatDate } from '../utils/formatDate';
import { stripHtml } from '../utils/stripHtml';

export default function FeaturedBlog({ blog }) {
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

  const shortDesc = stripHtml(content, 260);
  const formattedDate = formatDate(createdAt);

  return (
    <section className="section-padding" style={{ paddingBottom: '3rem' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(11, 116, 255, 0.2)', color: 'var(--primary-blue)', display: 'flex' }}>
            <Star size={18} weight="fill" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
            Featured Article
          </h2>
        </div>

        {/* Featured Card - Sleek SaaS Dark Theme */}
        <article
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--card-radius)',
            boxShadow: 'var(--card-shadow)',
            overflow: 'hidden',
            transition: 'var(--transition-normal)',
            cursor: 'pointer'
          }}
          className="featured-card-wrapper"
          onClick={() => window.location.href = `#blog/${slug}`}
        >
          <div className="featured-grid">
            {/* Image Container with Zoom Effect */}
            <div className="img-container" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-secondary)', minHeight: '360px' }}>
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
                className="featured-img"
                onError={(e) => {
                  e.target.src = 'https://api-blog.owncart.shop/uploads/images/Xq-ww787BX-Meta Pricing Feature Image.png';
                }}
              />
            </div>

            {/* Content Container */}
            <div style={{ padding: '3rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="featured-content">
              
              {/* 1. Category Pill Badge */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span className="badge" style={{ boxShadow: '0 4px 16px rgba(0, 102, 255, 0.35)', background: 'var(--primary-blue)', color: '#FFFFFF', padding: '0.45rem 1.1rem', fontSize: '0.8rem' }}>
                  ★ Featured • {category}
                </span>
              </div>
              
              {/* 2. Metadata row */}
              <div style={{ color: 'var(--date-text)', fontSize: '0.92rem', fontWeight: '500', marginBottom: '1rem' }}>
                <span>{formattedDate}</span>
                <span style={{ margin: '0 0.5rem', color: 'var(--border-input)' }}>•</span>
                <span>By {authorName || 'Poornima'}</span>
              </div>

              {/* 3. Title */}
              <h3 style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.3rem)',
                fontWeight: '800',
                color: 'var(--text-heading)',
                lineHeight: '1.3',
                marginBottom: '1.25rem',
                letterSpacing: '-0.025em',
                transition: 'color var(--transition-fast)'
              }} className="featured-title">
                {title}
              </h3>

              {/* 4. Excerpt Description */}
              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-paragraph)',
                lineHeight: '1.65',
                marginBottom: '2.25rem'
              }}>
                {shortDesc}
              </p>

              {/* 5. Read More Button */}
              <div>
                <a
                  href={`#blog/${slug}`}
                  className="btn btn-primary"
                  style={{
                    padding: '0.85rem 1.85rem',
                    borderRadius: '14px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    boxShadow: '0 6px 20px rgba(11, 116, 255, 0.35)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <span>Read Full Article</span>
                  <ArrowRight size={18} />
                </a>
              </div>

            </div>
          </div>
        </article>
      </div>

      <style jsx="true">{`
        .featured-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          min-height: 460px;
        }

        .featured-card-wrapper:hover {
          transform: translateY(-6px);
          box-shadow: var(--card-hover-shadow);
          border-color: rgba(11, 116, 255, 0.4) !important;
        }

        .featured-card-wrapper:hover .featured-img {
          transform: scale(1.05);
        }

        .featured-card-wrapper:hover .featured-title {
          color: var(--primary-blue) !important;
        }

        @media (max-width: 1024px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
          .featured-content {
            padding: 2.25rem !important;
          }
        }

        @media (max-width: 640px) {
          .featured-content {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
