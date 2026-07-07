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

        /* Modern 3D category chips */
        .category-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.15rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          
          /* 3D Solid Base */
          background: #1e222d; 
          color: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.05);
          
          /* 3D Effect: Top highlight + thick bottom shadow for depth */
          box-shadow: 
            inset 0 2px 0 rgba(255, 255, 255, 0.1),
            inset 0 -2px 0 rgba(0, 0, 0, 0.3),
            0 4px 0 rgba(0, 0, 0, 0.6),
            0 5px 10px rgba(0, 0, 0, 0.4);
            
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          white-space: nowrap;
          transform: translateY(0);
        }
        
        .category-chip:hover {
          background: #252a36;
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 
            inset 0 2px 0 rgba(255, 255, 255, 0.15),
            inset 0 -2px 0 rgba(0, 0, 0, 0.3),
            0 5px 0 rgba(0, 0, 0, 0.6),
            0 8px 15px rgba(0, 0, 0, 0.5);
        }
        
        /* Pressed state when clicking */
        .category-chip:active {
          transform: translateY(3px) !important;
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.4),
            0 1px 0 rgba(0, 0, 0, 0.6) !important;
        }

        .category-chip--active {
          background: var(--primary-blue) !important;
          border-color: transparent !important;
          color: #fff !important;
          /* Blue 3D button for active */
          box-shadow: 
            inset 0 2px 0 rgba(255, 255, 255, 0.3),
            inset 0 -2px 0 rgba(0, 0, 0, 0.2),
            0 4px 0 #0050b3,
            0 5px 15px rgba(11, 116, 255, 0.4) !important;
        }
        
        .category-chip--active:hover {
          box-shadow: 
            inset 0 2px 0 rgba(255, 255, 255, 0.4),
            inset 0 -2px 0 rgba(0, 0, 0, 0.2),
            0 5px 0 #0050b3,
            0 8px 20px rgba(11, 116, 255, 0.5) !important;
        }

        .category-chip--active:active {
          transform: translateY(3px) !important;
          box-shadow: 
            inset 0 2px 5px rgba(0, 0, 0, 0.3),
            0 1px 0 #0050b3 !important;
        }

        .chip-icon {
          font-size: 0.95rem;
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
