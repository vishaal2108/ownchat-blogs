import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import BlogHero from './components/BlogHero';
import FeaturedBlog from './components/FeaturedBlog';
import BlogGrid from './components/BlogGrid';
import SkeletonLoader from './components/SkeletonLoader';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import Footer from './components/Footer';
import { useBlogData } from './hooks/useBlogData';

const COMMON_FILTERS = [
  'All Articles',
  'WhatsApp API',
  'WhatsApp Automation',
  'WhatsApp Marketing',
  'WhatsApp Commerce',
  'Customer Support',
  'Integrations',
  'Restaurant',
  'Healthcare',
  'Updates'
];

const FILTER_MAP = {
  'All Articles': null,
  'WhatsApp API': ['whatsapp api', 'whatsapp business api'],
  'WhatsApp Automation': ['whatsapp automation', 'whatsapp automation for restaurants'],
  'WhatsApp Marketing': ['whatsapp marketing', 'whatsapp marketing for restaurants', 'whatsapp marketing strategy'],
  'WhatsApp Commerce': ['whatsapp commerce', 'shopify whatsapp integration', 'shopify whatsapp marketing'],
  'Customer Support': ['customer support', 'whatsapp flow builder', 'whatsapp flow'],
  'Integrations': ['petpooja integrations', 'instagram automation', 'whatsapp bookings & automation', 'appointment scheduling'],
  'Restaurant': ['whatsapp marketing for restaurants', 'whatsapp automation for restaurants', 'restaurant marketing automation'],
  'Healthcare': ['healthcare automation'],
  'Updates': ['whatsapp updates', 'whatsapp business pricing', 'features']
};

const ITEMS_PER_PAGE = 8;

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { blogs, loading, error, refetch } = useBlogData();

  // All blogs matching the active filter + search
  const filteredBlogs = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];

    return blogs.filter((blog) => {
      if (selectedFilter !== 'All Articles') {
        const targetNames = FILTER_MAP[selectedFilter] || [];
        const blogCat = (blog.category || '').toLowerCase().trim();
        const blogTags = (blog.tags || []).map(t => t.toLowerCase());
        const matchesCat = targetNames.some(t => blogCat.includes(t));
        const matchesTag = targetNames.some(t => blogTags.some(tag => tag.includes(t)));
        if (!matchesCat && !matchesTag) return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = (blog.title || '').toLowerCase().includes(q);
        const inCat = (blog.category || '').toLowerCase().includes(q);
        const inTags = (blog.tags || []).some(t => t.toLowerCase().includes(q));
        const inContent = (blog.content || '').toLowerCase().includes(q);
        if (!inTitle && !inCat && !inTags && !inContent) return false;
      }

      return true;
    });
  }, [blogs, selectedFilter, searchQuery]);

  // Pagination math
  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE));

  // Featured only on page 1, All Articles, no search
  const showFeatured = currentPage === 1 && selectedFilter === 'All Articles' && searchQuery.trim() === '' && filteredBlogs.length > 0;
  const featuredBlog = showFeatured ? filteredBlogs[0] : null;

  // For page 1 with featured: skip index 0 (featured), take next ITEMS_PER_PAGE
  // For all other cases: slice normally
  const pageBlogs = useMemo(() => {
    if (showFeatured) {
      const rest = filteredBlogs.slice(1);
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      return rest.slice(start, start + ITEMS_PER_PAGE);
    }
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, currentPage, showFeatured]);

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to grid top smoothly
    const el = document.getElementById('blog-grid-top');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-main)' }}>
      <Navbar />

      <BlogHero
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedFilter}
        onSelectCategory={handleSelectFilter}
        categories={COMMON_FILTERS}
        totalBlogs={filteredBlogs.length}
        loading={loading}
      />

      <main style={{ flexGrow: 1, position: 'relative' }}>
        {loading ? (
          <SkeletonLoader count={6} showFeatured={true} />
        ) : error ? (
          <ErrorState title="Connection Error" message={error} onRetry={refetch} />
        ) : filteredBlogs.length === 0 ? (
          <EmptyState
            title={searchQuery || selectedFilter !== 'All Articles' ? 'No Matching Articles' : 'No Articles Available'}
            message={
              searchQuery || selectedFilter !== 'All Articles'
                ? `No articles found for "${searchQuery || selectedFilter}". Try another filter or clear search.`
                : 'No articles are published yet.'
            }
            onReset={() => {
              setSearchQuery('');
              setSelectedFilter('All Articles');
              setCurrentPage(1);
            }}
          />
        ) : (
          <>
            {showFeatured && featuredBlog && (
              <FeaturedBlog blog={featuredBlog} />
            )}

            {/* Anchor for scroll-to-top on page change */}
            <div id="blog-grid-top" />

            {pageBlogs.length > 0 && (
              <BlogGrid
                blogs={pageBlogs}
                selectedCategory={selectedFilter}
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={filteredBlogs.length}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
