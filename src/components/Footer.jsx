import React, { useState } from 'react';
import { MessageSquare, Send, Globe, Share2, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{
      background: 'var(--bg-footer)',
      color: 'var(--text-white)',
      paddingTop: '5rem',
      paddingBottom: '3rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container">
        
        {/* Top Newsletter CTA Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(11, 116, 255, 0.15) 0%, rgba(51, 140, 255, 0.08) 100%)',
          border: '1px solid rgba(11, 116, 255, 0.3)',
          borderRadius: '24px',
          padding: '3rem',
          marginBottom: '5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem'
        }} className="newsletter-box">
          <div style={{ maxWidth: '540px' }}>
            <span className="badge" style={{ background: 'rgba(11, 116, 255, 0.25)', color: '#63A9FF', marginBottom: '1rem', display: 'inline-block' }}>
              ⚡ Stay Ahead of the Curve
            </span>
            <h3 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--text-white)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              Get the latest AI & messaging insights in your inbox
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
              Join 15,000+ enterprise leaders and developers subscribing to our weekly newsletter. No spam, unsubscribe anytime.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: '420px' }}>
            {subscribed ? (
              <div style={{
                padding: '1.25rem',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid var(--accent-success)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#4ADE80'
              }}>
                <CheckCircle2 size={24} style={{ flexShrink: 0 }} />
                <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>You're on the list! Check your inbox for confirmation.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  placeholder="Enter your work email..."
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flexGrow: 1,
                    minWidth: '220px',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'var(--text-white)',
                    fontSize: '0.95rem'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    padding: '0.85rem 1.5rem',
                    borderRadius: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 14px rgba(11, 116, 255, 0.3)'
                  }}
                >
                  <span>Subscribe</span>
                  <Send size={16} />
                </button>
              </form>
            )}
            <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '0.6rem' }}>
              By subscribing you agree to our Privacy Policy and Terms of Service.
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="footer-links-grid" style={{ marginBottom: '4rem' }}>
          
          {/* Brand Info Column */}
          <div style={{ maxWidth: '300px' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
              <img
                src="https://ownchat.app/assets/images/ownchat-logo.svg"
                alt="OwnChat Logo"
                style={{ height: '36px', width: 'auto' }}
              />
            </a>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.65', marginBottom: '1.5rem' }}>
              The next-generation unified customer messaging platform powered by AI. Engineered for speed, security, and enterprise scale.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <a href="#twitter" style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-muted)', transition: 'var(--transition-fast)' }} onMouseOver={e => { e.currentTarget.style.color = '#FFF'; e.currentTarget.style.background = 'var(--primary-blue)'; }} onMouseOut={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'; }} aria-label="Globe">
                <Globe size={18} />
              </a>
              <a href="#github" style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-muted)', transition: 'var(--transition-fast)' }} onMouseOver={e => { e.currentTarget.style.color = '#FFF'; e.currentTarget.style.background = 'var(--primary-blue)'; }} onMouseOut={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'; }} aria-label="Share">
                <Share2 size={18} />
              </a>
              <a href="#linkedin" style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.06)', color: 'var(--text-muted)', transition: 'var(--transition-fast)' }} onMouseOver={e => { e.currentTarget.style.color = '#FFF'; e.currentTarget.style.background = 'var(--primary-blue)'; }} onMouseOut={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'; }} aria-label="Community">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li><a href="#features" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Unified Inbox</a></li>
              <li><a href="#ai" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>AI Copilot</a></li>
              <li><a href="#automation" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Workflow Automation</a></li>
              <li><a href="#analytics" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Real-Time Analytics</a></li>
              <li><a href="#pricing" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
              Resources
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li><a href="#blog" style={{ color: '#63A9FF', fontWeight: '600', fontSize: '0.92rem' }}>Blog & Insights</a></li>
              <li><a href="#docs" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Documentation</a></li>
              <li><a href="#api" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>API Reference</a></li>
              <li><a href="#guides" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Community Guides</a></li>
              <li><a href="#status" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>System Status</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li><a href="#about" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>About Us</a></li>
              <li><a href="#careers" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Careers <span style={{ padding: '0.15rem 0.4rem', borderRadius: '4px', background: 'var(--primary-blue)', fontSize: '0.7rem', color: '#FFF', marginLeft: '0.3rem' }}>We're hiring</span></a></li>
              <li><a href="#press" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Press Kit</a></li>
              <li><a href="#contact" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Contact Sales</a></li>
              <li><a href="#security" style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }} onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Security & SOC 2</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Row */}
        <div style={{
          paddingTop: '2.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} OwnChat Inc. All rights reserved. Engineered for visual excellence.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="#terms" onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Terms of Service</a>
            <a href="#privacy" onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Privacy Policy</a>
            <a href="#cookies" onMouseOver={e => e.target.style.color = '#FFF'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Cookie Preferences</a>
          </div>
        </div>

      </div>

      <style jsx="true">{`
        .footer-links-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
        }
        @media (max-width: 1024px) {
          .footer-links-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
          .newsletter-box { padding: 2rem !important; }
        }
        @media (max-width: 640px) {
          .footer-links-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .newsletter-box { padding: 1.5rem !important; }
        }
      `}</style>
    </footer>
  );
}
