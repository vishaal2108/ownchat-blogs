import React from 'react';
import { RefreshCw, Search, FileText } from 'lucide-react';

export default function EmptyState({
  title = "No Publications Found",
  message = "We couldn't find any blog articles matching your criteria or our live API database is currently being synchronized by our editorial team.",
  onReset
}) {
  return (
    <section className="section-padding" style={{ padding: '6rem 0' }}>
      <div className="container">
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          textAlign: 'center',
          padding: '4rem 2.5rem',
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--card-radius)',
          boxShadow: 'var(--card-shadow)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle top gradient accent bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary-gradient)' }} />

          {/* Clean SaaS Illustration */}
          <div style={{
            width: '96px',
            height: '96px',
            borderRadius: '24px',
            background: 'var(--bg-soft-blue)',
            color: 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem auto',
            boxShadow: '0 12px 30px rgba(11, 116, 255, 0.12)',
            position: 'relative'
          }}>
            <FileText size={44} strokeWidth={1.5} />
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              right: '-6px',
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: 'var(--primary-blue)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(11, 116, 255, 0.3)'
            }}>
              <Search size={18} />
            </div>
          </div>

          <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            {title}
          </h2>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-paragraph)', lineHeight: '1.65', marginBottom: '2.5rem', maxWidth: '520px', margin: '0 auto 2.5rem auto' }}>
            {message}
          </p>

          {/* Call to action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {onReset && (
              <button
                onClick={onReset}
                className="btn btn-secondary"
                style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <RefreshCw size={18} />
                <span>Reset Filters & Refresh</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
