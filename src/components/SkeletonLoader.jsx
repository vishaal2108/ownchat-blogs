import React from 'react';

export default function SkeletonLoader({ count = 6, showFeatured = true }) {
  return (
    <div className="section-padding" style={{ paddingTop: '2rem' }}>
      <div className="container">
        
        {/* Featured Card Skeleton */}
        {showFeatured && (
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ width: '180px', height: '28px', borderRadius: '8px', marginBottom: '1.5rem' }} className="skeleton-shimmer" />
            <div style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--card-radius)',
              boxShadow: 'var(--card-shadow)',
              overflow: 'hidden'
            }}>
              <div className="featured-skeleton-grid">
                <div style={{ minHeight: '340px' }} className="skeleton-shimmer" />
                <div style={{ padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%' }} className="skeleton-shimmer" />
                    <div style={{ width: '120px', height: '16px', borderRadius: '4px' }} className="skeleton-shimmer" />
                    <div style={{ width: '80px', height: '16px', borderRadius: '4px' }} className="skeleton-shimmer" />
                  </div>
                  <div style={{ width: '90%', height: '36px', borderRadius: '8px' }} className="skeleton-shimmer" />
                  <div style={{ width: '70%', height: '36px', borderRadius: '8px' }} className="skeleton-shimmer" />
                  <div style={{ width: '100%', height: '16px', borderRadius: '4px', marginTop: '0.5rem' }} className="skeleton-shimmer" />
                  <div style={{ width: '95%', height: '16px', borderRadius: '4px' }} className="skeleton-shimmer" />
                  <div style={{ width: '80%', height: '16px', borderRadius: '4px' }} className="skeleton-shimmer" />
                  <div style={{ width: '160px', height: '44px', borderRadius: '12px', marginTop: '1rem' }} className="skeleton-shimmer" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Header Skeleton */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ width: '140px', height: '16px', borderRadius: '4px', marginBottom: '0.5rem' }} className="skeleton-shimmer" />
            <div style={{ width: '240px', height: '32px', borderRadius: '8px' }} className="skeleton-shimmer" />
          </div>
          <div style={{ width: '120px', height: '36px', borderRadius: '12px' }} className="skeleton-shimmer" />
        </div>

        {/* Grid Skeletons */}
        <div className="grid-skeleton">
          {Array.from({ length: count }).map((_, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--card-radius)',
                boxShadow: 'var(--card-shadow)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '420px'
              }}
            >
              <div style={{ height: '200px', width: '100%' }} className="skeleton-shimmer" />
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%' }} className="skeleton-shimmer" />
                  <div style={{ width: '90px', height: '14px', borderRadius: '4px' }} className="skeleton-shimmer" />
                  <div style={{ width: '70px', height: '14px', borderRadius: '4px' }} className="skeleton-shimmer" />
                </div>
                <div style={{ width: '95%', height: '22px', borderRadius: '6px' }} className="skeleton-shimmer" />
                <div style={{ width: '75%', height: '22px', borderRadius: '6px' }} className="skeleton-shimmer" />
                <div style={{ width: '100%', height: '14px', borderRadius: '4px', marginTop: '0.5rem' }} className="skeleton-shimmer" />
                <div style={{ width: '85%', height: '14px', borderRadius: '4px' }} className="skeleton-shimmer" />
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ width: '80px', height: '16px', borderRadius: '4px' }} className="skeleton-shimmer" />
                  <div style={{ width: '50px', height: '16px', borderRadius: '4px' }} className="skeleton-shimmer" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx="true">{`
        .featured-skeleton-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
        }
        .grid-skeleton {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.25rem;
        }
        @media (max-width: 1024px) {
          .featured-skeleton-grid { grid-template-columns: 1fr; }
          .grid-skeleton { grid-template-columns: repeat(2, 1fr); gap: 1.75rem; }
        }
        @media (max-width: 640px) {
          .grid-skeleton { grid-template-columns: 1fr; gap: 1.5rem; }
        }
      `}</style>
    </div >
  );
}
