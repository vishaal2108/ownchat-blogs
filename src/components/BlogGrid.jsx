import React from 'react';
import BlogCard from './BlogCard';

// Generates page numbers with "..." collapse when there are many pages
function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = [];
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, '...', total);
  } else if (current >= total - 3) {
    pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, '...', current - 1, current, current + 1, '...', total);
  }
  return pages;
}

export default function BlogGrid({
  blogs = [],
  selectedCategory = 'All Articles',
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  onPageChange
}) {
  if (!blogs || blogs.length === 0) return null;

  const isFiltered = selectedCategory !== 'All Articles';
  const sectionTitle = isFiltered ? selectedCategory : 'Latest Articles';
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <section style={{ paddingBottom: '4rem' }}>
      <div className="container">

        {/* Section header */}
        <div className="bg-header">
          <div className="bg-header__left">
            <div className="bg-header__accent" />
            <div>
              {isFiltered && <p className="bg-header__eyebrow">Filtered by</p>}
              <h2 className="bg-header__title">{sectionTitle}</h2>
            </div>
          </div>
          <div className="bg-header__count">
            {totalCount} {totalCount === 1 ? 'Article' : 'Articles'}
          </div>
        </div>

        {/* 4-column card grid */}
        <div className="bg-grid">
          {blogs.map((blog) => (
            <div key={blog.id} className="animate-fade-in" style={{ height: '100%' }}>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>

        {/* ─── Pagination Bar ─── */}
        {totalPages > 1 && (
          <div className="pg-bar">

            {/* Previous button */}
            <button
              className={`pg-btn pg-prev ${currentPage === 1 ? 'pg-disabled' : ''}`}
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,18 9,12 15,6" />
              </svg>
              <span>Previous</span>
            </button>

            {/* Page number buttons */}
            <div className="pg-numbers">
              {pageNumbers.map((pg, idx) =>
                pg === '...' ? (
                  <span key={`dot-${idx}`} className="pg-dots">···</span>
                ) : (
                  <button
                    key={pg}
                    className={`pg-num ${pg === currentPage ? 'pg-active' : ''}`}
                    onClick={() => pg !== currentPage && onPageChange(pg)}
                    aria-label={`Go to page ${pg}`}
                    aria-current={pg === currentPage ? 'page' : undefined}
                  >
                    {pg}
                  </button>
                )
              )}
            </div>

            {/* Next button */}
            <button
              className={`pg-btn pg-next ${currentPage === totalPages ? 'pg-disabled' : ''}`}
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <span>Next</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </button>

          </div>
        )}

      </div>

      <style jsx="true">{`
        /* ── Section header ── */
        .bg-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 1.75rem;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1rem;
        }
        .bg-header__left {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }
        .bg-header__accent {
          width: 3px;
          height: 44px;
          border-radius: 9999px;
          background: var(--primary-blue);
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(11,116,255,0.45);
        }
        .bg-header__eyebrow {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--primary-blue);
          margin: 0 0 0.2rem 0;
        }
        .bg-header__title {
          font-size: clamp(1.3rem, 2vw, 1.75rem);
          font-weight: 800;
          color: var(--text-heading);
          letter-spacing: -0.03em;
          margin: 0;
          line-height: 1.2;
        }
        .bg-header__count {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          border: 1px solid var(--border-default);
          background: var(--bg-secondary);
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── 4-column grid ── */
        .bg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 3rem;
        }
        @media (max-width: 1200px) {
          .bg-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 860px) {
          .bg-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        }
        @media (max-width: 540px) {
          .bg-grid { grid-template-columns: 1fr; gap: 0.9rem; }
        }

        /* ── Pagination bar ── */
        .pg-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border-default);
        }

        /* Prev / Next buttons */
        .pg-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.1rem;
          border-radius: 10px;
          border: 1px solid var(--border-default);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          font-size: 0.83rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
          user-select: none;
        }
        .pg-btn:not(.pg-disabled):hover {
          background: var(--primary-blue);
          border-color: var(--primary-blue);
          color: #fff;
          transform: translateY(-1px);
        }
        .pg-disabled {
          opacity: 0.35;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Numbered page buttons */
        .pg-numbers {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .pg-num {
          min-width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid var(--border-default);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
          user-select: none;
        }
        .pg-num:hover:not(.pg-active) {
          background: rgba(11,116,255,0.12);
          border-color: var(--primary-blue);
          color: var(--primary-blue);
          transform: translateY(-1px);
        }
        .pg-active {
          background: var(--primary-blue);
          border-color: var(--primary-blue);
          color: #fff;
          box-shadow: 0 4px 12px rgba(11,116,255,0.35);
          cursor: default;
          pointer-events: none;
        }

        /* Ellipsis dots */
        .pg-dots {
          font-size: 0.9rem;
          color: var(--text-muted);
          padding: 0 0.2rem;
          user-select: none;
          letter-spacing: 0.05em;
        }

        @media (max-width: 480px) {
          .pg-btn span { display: none; }
          .pg-btn { padding: 0.55rem 0.75rem; }
        }
      `}</style>
    </section>
  );
}
