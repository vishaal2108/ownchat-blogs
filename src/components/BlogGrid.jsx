import React from 'react';
import BlogCard from './BlogCard';
import { Sparkles, BookOpen } from 'lucide-react';

export default function BlogGrid({ blogs = [], selectedCategory = 'All Articles' }) {
  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className="section-padding" style={{ paddingTop: '1.5rem' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <BookOpen size={20} style={{ color: 'var(--primary-blue)' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {selectedCategory === 'All Articles' ? 'Knowledge Archive' : `${selectedCategory} Insights`}
              </span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-heading)', letterSpacing: '-0.03em' }}>
              {selectedCategory === 'All Articles' ? 'Latest Publications' : `${selectedCategory} Articles`}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
              Showing {blogs.length} {blogs.length === 1 ? 'article' : 'articles'}
            </span>
          </div>
        </div>

        {/* Responsive 3-Column Grid */}
        <div className="blog-grid-container">
          {blogs.map((blog) => (
            <div key={blog.id} className="animate-fade-in">
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>

      </div>

      <style jsx="true">{`
        .blog-grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.25rem;
        }

        @media (max-width: 1024px) {
          .blog-grid-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.75rem;
          }
        }

        @media (max-width: 640px) {
          .blog-grid-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
