import React from 'react';
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';

export default function ErrorState({
  title = "Connection Error",
  message = "We encountered an issue communicating with the OwnChat blog API server. Please verify your internet connection or check back shortly.",
  onRetry
}) {
  return (
    <section className="section-padding" style={{ padding: '6rem 0' }}>
      <div className="container">
        <div style={{
          maxWidth: '620px',
          margin: '0 auto',
          textAlign: 'center',
          padding: '4rem 2.5rem',
          background: 'var(--card-bg)',
          border: '1px solid #FEE2E2',
          borderRadius: 'var(--card-radius)',
          boxShadow: '0 10px 30px rgba(239, 68, 68, 0.08)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Top accent border */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent-error)' }} />

          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: '#FEF2F2',
            color: 'var(--accent-error)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.75rem auto',
            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.15)'
          }}>
            <AlertCircle size={40} />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-heading)', marginBottom: '0.85rem' }}>
            {title}
          </h2>

          <p style={{ fontSize: '1.02rem', color: 'var(--text-paragraph)', lineHeight: '1.6', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem auto' }}>
            {message}
          </p>

          {onRetry && (
            <button
              onClick={onRetry}
              className="btn btn-primary"
              style={{
                padding: '0.8rem 2rem',
                background: 'var(--accent-error)',
                boxShadow: '0 4px 14px rgba(239, 68, 68, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#DC2626'}
              onMouseOut={(e) => e.currentTarget.style.background = 'var(--accent-error)'}
            >
              <RefreshCw size={18} />
              <span>Retry Synchronization</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
