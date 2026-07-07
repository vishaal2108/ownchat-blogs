import React from 'react';
import { Search, Sparkles, X, Layers, TrendingUp } from 'lucide-react';

const DEFAULT_CATEGORIES = [
  'All Articles',
  'WhatsApp Automation',
  'WhatsApp Marketing',
  'WhatsApp Business Platform',
  'Product Updates'
];

export default function BlogHero({
  searchQuery = '',
  onSearchChange,
  selectedCategory = 'All Articles',
  onSelectCategory,
  categories = DEFAULT_CATEGORIES,
  totalBlogs = 0,
  loading = false
}) {
  return (
    <section style={{
      position: 'relative',
      background: 'var(--bg-main)',
      color: 'var(--text-white)',
      padding: '5rem 0 5.5rem 0',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-default)'
    }}>
      {/* Decorative Glowing Blur Orbs for Premium SaaS Dark Mode */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '700px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(11, 116, 255, 0.25) 0%, rgba(0, 0, 0, 0) 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '-10%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(0, 102, 255, 0.18) 0%, rgba(0, 0, 0, 0) 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(11, 116, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      {/* Subtle Grid Pattern Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.4,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Top Pill Badge displaying Total Blog Count */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1.1rem', background: 'rgba(11, 116, 255, 0.15)', backdropFilter: 'blur(12px)', borderRadius: '9999px', border: '1px solid rgba(11, 116, 255, 0.35)', marginBottom: '1.75rem', boxShadow: '0 4px 20px rgba(11, 116, 255, 0.15)' }}>
            <Sparkles size={16} style={{ color: '#63A9FF' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#63A9FF', letterSpacing: '0.01em' }}>
              {loading ? 'Synchronizing Knowledge Hub...' : `${totalBlogs} Curated Articles & WhatsApp Insights`}
            </span>
          </div>

          {/* Hero Main Heading */}
          <h1 style={{
            fontSize: 'clamp(2.6rem, 5vw, 4rem)',
            fontWeight: '800',
            lineHeight: '1.15',
            color: 'var(--text-white)',
            marginBottom: '1.25rem',
            letterSpacing: '-0.035em'
          }}>
            OwnChat <span style={{ background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Knowledge Hub</span> & Blog
          </h1>

          {/* Hero Subtitle */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-paragraph)',
            maxWidth: '680px',
            margin: '0 auto 2.5rem auto',
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            Explore proven conversational strategies, WhatsApp automation guides, and Shopify integration insights to scale your customer engagement 24/7.
          </p>

          {/* Real-time Search Input Box */}
          <div style={{ maxWidth: '560px', margin: '0 auto 3rem auto', position: 'relative' }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(13, 18, 31, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-default)',
              borderRadius: '16px',
              padding: '0.4rem 0.5rem 0.4rem 1.25rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              transition: 'border-color var(--transition-fast)'
            }} className="search-box">
              <Search size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search WhatsApp workflows, Shopify automation, guides..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem',
                  color: 'var(--text-white)',
                  fontSize: '0.98rem',
                  background: 'transparent'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange && onSearchChange('')}
                  style={{
                    padding: '0.4rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px'
                  }}
                  title="Clear search"
                >
                  <X size={18} />
                </button>
              )}
              <button
                className="btn btn-primary"
                style={{ padding: '0.65rem 1.4rem', borderRadius: '12px', fontSize: '0.9rem' }}
                onClick={(e) => e.preventDefault()}
              >
                Search
              </button>
            </div>
          </div>

          {/* Interactive Category Filter Chips */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            {(categories || DEFAULT_CATEGORIES).map((cat) => {
              const isSelected = selectedCategory === cat || (cat === 'All Articles' && (!selectedCategory || selectedCategory === 'All Articles'));
              const catIcons = {
                'All Articles': '⚡',
                'WhatsApp API': '🔗',
                'WhatsApp Automation': '🤖',
                'WhatsApp Marketing': '📣',
                'WhatsApp Commerce': '🛒',
                'Customer Support': '💬',
                'Integrations': '🔌',
                'Restaurant': '🍽️',
                'Healthcare': '🏥',
                'Updates': '🚀',
              };
              const icon = catIcons[cat] || '📄';
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory && onSelectCategory(cat)}
                  className={`category-chip ${isSelected ? 'category-chip--active' : ''}`}
                >
                  <span className="chip-icon">{icon}</span>
                  <span className="chip-label">{cat}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      <style jsx="true">{`
        .search-box:focus-within {
          border-color: var(--primary-blue) !important;
          box-shadow: 0 0 0 3px rgba(11, 116, 255, 0.25), 0 10px 30px rgba(0, 0, 0, 0.5) !important;
        }

        /* Modern category chips */
        .category-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.42rem;
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          background: rgba(13, 18, 31, 0.65);
          color: var(--text-secondary);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          transition: all 0.22s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }
        .category-chip::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(11,116,255,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.22s ease;
          border-radius: inherit;
        }
        .category-chip:hover::before { opacity: 1; }
        .category-chip:hover {
          background: rgba(11,116,255,0.15);
          border-color: rgba(11,116,255,0.45);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(11,116,255,0.2);
        }
        .category-chip--active {
          background: var(--primary-blue) !important;
          border-color: var(--primary-blue) !important;
          color: #fff !important;
          box-shadow: 0 4px 18px rgba(11,116,255,0.45),
                      0 0 0 3px rgba(11,116,255,0.18) !important;
          transform: translateY(-1px);
        }
        .category-chip--active::before { opacity: 0; }
        .chip-icon {
          font-size: 0.85rem;
          line-height: 1;
          flex-shrink: 0;
        }
        .chip-label {
          line-height: 1;
        }
      `}</style>
    </section>
  );
}
