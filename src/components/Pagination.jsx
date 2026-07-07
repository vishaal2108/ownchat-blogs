import React from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalCount = 0
}) {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage && onPageChange) {
      onPageChange(page);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  // Generate page numbers array with ellipses
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <nav aria-label="Blog Pagination" style={{ padding: '3.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentPage <= 1}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.65rem 1.2rem',
            borderRadius: '12px',
            fontSize: '0.92rem',
            fontWeight: '600',
            border: '1px solid var(--border-default)',
            background: currentPage <= 1 ? 'var(--bg-secondary)' : 'var(--bg-main)',
            color: currentPage <= 1 ? 'var(--text-muted)' : 'var(--text-heading)',
            cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
            transition: 'var(--transition-fast)',
            boxShadow: currentPage <= 1 ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}
          onMouseOver={(e) => {
            if (currentPage > 1) {
              e.currentTarget.style.borderColor = 'var(--primary-blue)';
              e.currentTarget.style.color = 'var(--primary-blue)';
              e.currentTarget.style.background = 'var(--bg-soft-blue)';
            }
          }}
          onMouseOut={(e) => {
            if (currentPage > 1) {
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.color = 'var(--text-heading)';
              e.currentTarget.style.background = 'var(--bg-main)';
            }
          }}
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        {/* Page Number Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', margin: '0 0.5rem' }}>
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} style={{ padding: '0 0.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                  ...
                </span>
              );
            }

            const isCurrent = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: isCurrent ? '700' : '600',
                  fontSize: '0.95rem',
                  background: isCurrent ? 'var(--primary-blue)' : 'var(--bg-main)',
                  color: isCurrent ? 'var(--text-white)' : 'var(--text-secondary)',
                  border: isCurrent ? 'none' : '1px solid var(--border-default)',
                  boxShadow: isCurrent ? '0 4px 12px rgba(11, 116, 255, 0.3)' : 'none',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                aria-current={isCurrent ? 'page' : undefined}
                onMouseOver={(e) => {
                  if (!isCurrent) {
                    e.currentTarget.style.borderColor = 'var(--primary-blue)';
                    e.currentTarget.style.color = 'var(--primary-blue)';
                    e.currentTarget.style.background = 'var(--bg-soft-blue)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isCurrent) {
                    e.currentTarget.style.borderColor = 'var(--border-default)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'var(--bg-main)';
                  }
                }}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.65rem 1.2rem',
            borderRadius: '12px',
            fontSize: '0.92rem',
            fontWeight: '600',
            border: '1px solid var(--border-default)',
            background: currentPage >= totalPages ? 'var(--bg-secondary)' : 'var(--bg-main)',
            color: currentPage >= totalPages ? 'var(--text-muted)' : 'var(--text-heading)',
            cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
            transition: 'var(--transition-fast)',
            boxShadow: currentPage >= totalPages ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.05)'
          }}
          onMouseOver={(e) => {
            if (currentPage < totalPages) {
              e.currentTarget.style.borderColor = 'var(--primary-blue)';
              e.currentTarget.style.color = 'var(--primary-blue)';
              e.currentTarget.style.background = 'var(--bg-soft-blue)';
            }
          }}
          onMouseOut={(e) => {
            if (currentPage < totalPages) {
              e.currentTarget.style.borderColor = 'var(--border-default)';
              e.currentTarget.style.color = 'var(--text-heading)';
              e.currentTarget.style.background = 'var(--bg-main)';
            }
          }}
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>

      </div>

      {/* Summary Label */}
      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>
        Page <span style={{ color: 'var(--text-heading)', fontWeight: '700' }}>{currentPage}</span> of <span style={{ color: 'var(--text-heading)', fontWeight: '700' }}>{totalPages}</span> {totalCount > 0 && `(${totalCount} total publications)`}
      </div>

    </nav>
  );
}
