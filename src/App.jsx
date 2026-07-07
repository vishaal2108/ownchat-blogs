import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import BlogHero from './components/BlogHero';
import FeaturedBlog from './components/FeaturedBlog';
import BlogGrid from './components/BlogGrid';
import Pagination from './components/Pagination';
import SkeletonLoader from './components/SkeletonLoader';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import Footer from './components/Footer';
import { useBlogData } from './hooks/useBlogData';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch blogs dynamically using reusable custom hook
  const {
    blogs,
    pagination,
    loading,
    error,
    refetch
  } = useBlogData(currentPage, 9);

  // Dynamically derive available categories from API blog data
  const availableCategories = useMemo(() => {
    const cats = new Set(['All Articles']);
    if (blogs && Array.isArray(blogs)) {
      blogs.forEach(b => {
        if (b.category && typeof b.category === 'string' && b.category.trim() !== '') {
          cats.add(b.category.trim());
        }
      });
    }
    return Array.from(cats);
  }, [blogs]);

  // Client-side filtering for search bar & category chips
  const filteredBlogs = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];

    return blogs.filter((blog) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'All Articles') {
        const cat = (blog.category || '').toLowerCase().trim();
        const targetCat = selectedCategory.toLowerCase().trim();
        if (!cat.includes(targetCat) && cat !== targetCat) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = (blog.title || '').toLowerCase().includes(query);
        const excerptMatch = (blog.content || '').toLowerCase().includes(query);
        const authorMatch = (blog.authorName || '').toLowerCase().includes(query);
        const categoryMatch = (blog.category || '').toLowerCase().includes(query);
        if (!titleMatch && !excerptMatch && !authorMatch && !categoryMatch) {
          return false;
        }
      }

      return true;
    });
  }, [blogs, selectedCategory, searchQuery]);

  // Handle category chip selection
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  // Handle search input change
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  // Determine layout split between Featured Blog & Grid
  const showFeaturedSection = currentPage === 1 && searchQuery.trim() === '' && filteredBlogs.length > 0;
  const featuredArticle = showFeaturedSection ? filteredBlogs[0] : null;
  const gridArticles = showFeaturedSection ? filteredBlogs.slice(1) : filteredBlogs;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-main)' }}>
      {/* Sleek SaaS Header */}
      <Navbar />

      {/* Hero Section */}
      <BlogHero
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        categories={availableCategories}
        totalBlogs={filteredBlogs.length}
        loading={loading}
      />

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, position: 'relative' }}>
        {loading ? (
          /* 1. Loading State: Beautiful Shimmer Skeletons */
          <SkeletonLoader count={6} showFeatured={currentPage === 1 && searchQuery === ''} />
        ) : error ? (
          /* 2. Error State: Professional connection error with Retry button */
          <ErrorState
            title="Synchronization Error"
            message={error}
            onRetry={refetch}
          />
        ) : filteredBlogs.length === 0 ? (
          /* 3. Empty State: When API returns 0 blogs or filters match nothing */
          <EmptyState
            title={searchQuery || selectedCategory !== 'All Articles' ? 'No Matching Articles' : 'No Publications Available Yet'}
            message={
              searchQuery || selectedCategory !== 'All Articles'
                ? `We couldn't find any articles matching "${searchQuery || selectedCategory}". Try adjusting your keyword or reset topic filters.`
                : 'The OwnChat intelligence database currently has no published articles for this tenant.'
            }
            onReset={() => {
              setSearchQuery('');
              setSelectedCategory('All Articles');
              refetch();
            }}
          />
        ) : (
          /* 4. Success State: Render Featured Blog + 3-Column Responsive Grid */
          <>
            {showFeaturedSection && featuredArticle && (
              <FeaturedBlog blog={featuredArticle} />
            )}

            {gridArticles.length > 0 && (
              <BlogGrid
                blogs={gridArticles}
                selectedCategory={selectedCategory}
              />
            )}

            {/* Pagination Controls */}
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalCount={filteredBlogs.length}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
