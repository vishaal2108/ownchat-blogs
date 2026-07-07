import React, { useState } from 'react';
import { MessageSquare, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300" style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-default)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
        
        {/* Brand Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://ownchat.app/assets/images/ownchat-logo.svg"
            alt="OwnChat Logo"
            style={{ height: '34px', width: 'auto' }}
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
          <a href="#features" style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-secondary)' }} onMouseOver={e => e.target.style.color = 'var(--primary-blue)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>
            Features
          </a>
          <a href="#solutions" style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-secondary)' }} onMouseOver={e => e.target.style.color = 'var(--primary-blue)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>
            Solutions
          </a>
          <a href="#pricing" style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-secondary)' }} onMouseOver={e => e.target.style.color = 'var(--primary-blue)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>
            Pricing
          </a>
          <a href="#blog" style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--primary-blue)', position: 'relative' }}>
            Blog
            <span style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '2px', background: 'var(--primary-blue)', borderRadius: '2px' }}></span>
          </a>
          <a href="#docs" style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-secondary)' }} onMouseOver={e => e.target.style.color = 'var(--primary-blue)'} onMouseOut={e => e.target.style.color = 'var(--text-secondary)'}>
            Docs
          </a>
        </nav>

        {/* CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="hidden-mobile">
          <button style={{ padding: '0.6rem 1.25rem', fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-heading)' }}>
            Log in
          </button>
          <a href="#trial" className="btn btn-primary btn-sm" style={{ padding: '0.65rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Start Free Trial</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: 'none', padding: '0.5rem', color: 'var(--text-heading)' }}
          className="mobile-only-btn"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div style={{
          padding: '1.5rem',
          background: 'var(--bg-main)',
          borderBottom: '1px solid var(--border-default)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <a href="#features" style={{ fontWeight: '500', color: 'var(--text-heading)' }} onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#solutions" style={{ fontWeight: '500', color: 'var(--text-heading)' }} onClick={() => setMobileMenuOpen(false)}>Solutions</a>
          <a href="#pricing" style={{ fontWeight: '500', color: 'var(--text-heading)' }} onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="#blog" style={{ fontWeight: '600', color: 'var(--primary-blue)' }} onClick={() => setMobileMenuOpen(false)}>Blog</a>
          <a href="#docs" style={{ fontWeight: '500', color: 'var(--text-heading)' }} onClick={() => setMobileMenuOpen(false)}>Docs</a>
          <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)', margin: '0.5rem 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button className="btn btn-secondary" style={{ width: '100%' }}>Log in</button>
            <button className="btn btn-primary" style={{ width: '100%' }}>Start Free Trial</button>
          </div>
        </div>
      )}

      <style jsx="true">{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-only-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
