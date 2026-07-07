/**
 * Normalizes blog object from API to ensure consistent UI rendering
 * handles both standard fields and nested/variation properties gracefully.
 */

// Official high-quality OwnChat blog images from https://ownchat.app/
const OFFICIAL_OWNCHAT_IMAGES = [
  'https://api-blog.owncart.shop/uploads/images/HYpA8aaItM-whatsapp-business-pricing.png',
  'https://api-blog.owncart.shop/uploads/images/HTxOHY745B-whatsapp-usecase.png',
  'https://api-blog.owncart.shop/uploads/images/9s19hyOddh-green-tick.png',
  'https://api-blog.owncart.shop/uploads/images/Xq-ww787BX-Meta Pricing Feature Image.png',
  'https://api-blog.owncart.shop/uploads/images/7nHGApJt6r-image - 2025-04-23T145117.981.png',
  'https://api-blog.owncart.shop/uploads/images/yxSBiZsf8q-image - 2025-04-23T171345.310.png',
  'https://api-blog.owncart.shop/uploads/images/FF1rsSHNB7-image - 2025-10-27T150738.592.png',
  'https://api-blog.owncart.shop/uploads/images/JhOyj0pvc9-image - 2025-04-23T144931.169.png'
];

export function normalizeBlog(blog, index = 0) {
  if (!blog || typeof blog !== 'object') {
    return {
      id: `fallback-${index}`,
      title: 'Untitled Article',
      slug: `untitled-${index}`,
      category: 'General',
      content: '',
      featuredImage: OFFICIAL_OWNCHAT_IMAGES[index % OFFICIAL_OWNCHAT_IMAGES.length],
      authorName: 'OwnChat Team',
      createdAt: null,
      raw: {}
    };
  }

  // 1. Title
  const title = blog.title || 'Untitled Article';

  // 2. Slug
  const slug = blog.slug || blog.seoName || blog._id || `article-${index}`;

  // 3. Category
  let category = 'General';
  if (typeof blog.category === 'string' && blog.category.trim()) {
    category = blog.category.trim();
  } else if (Array.isArray(blog.category) && blog.category.length > 0) {
    const firstCat = blog.category[0];
    category = (firstCat?.name || firstCat || 'General').toString().trim();
  } else if (blog.category && typeof blog.category === 'object') {
    category = (blog.category.name || 'General').toString().trim();
  }

  // 4. Content — API uses 'description' (full HTML) and 'shortDescription' (plain text)
  const content = blog.shortDescription || blog.content || blog.description || blog.body || '';

  // 5. Featured Image — API uses featureImage.path (relative URL)
  let featuredImage = OFFICIAL_OWNCHAT_IMAGES[index % OFFICIAL_OWNCHAT_IMAGES.length];
  if (blog.featureImage && typeof blog.featureImage === 'object' && blog.featureImage.path) {
    // Primary: featureImage.path from API
    const rawPath = blog.featureImage.path.trim();
    featuredImage = rawPath.startsWith('http')
      ? rawPath
      : `https://api-blog.owncart.shop/${rawPath}`;
  } else if (blog.seo?.ogImage?.path) {
    // Secondary: seo.ogImage.path
    const rawPath = blog.seo.ogImage.path.trim();
    featuredImage = rawPath.startsWith('http')
      ? rawPath
      : `https://api-blog.owncart.shop/${rawPath}`;
  } else if (typeof blog.featuredImage === 'string' && blog.featuredImage.trim()) {
    featuredImage = blog.featuredImage;
  } else if (blog.featuredImage && typeof blog.featuredImage === 'object' && blog.featuredImage.url) {
    featuredImage = blog.featuredImage.url;
  } else if (typeof blog.image === 'string' && blog.image.trim()) {
    featuredImage = blog.image;
  }

  // 6. Author Name — API doesn't have explicit author, uses belongsTo/createdBy
  let authorName = 'OwnChat Team';
  if (blog.author && typeof blog.author === 'object' && blog.author.name) {
    authorName = blog.author.name;
  } else if (typeof blog.author === 'string' && blog.author.trim()) {
    authorName = blog.author;
  } else if (blog.authorName) {
    authorName = blog.authorName;
  } else if (blog.createdBy && typeof blog.createdBy === 'object') {
    authorName = blog.createdBy.name || blog.createdBy.email || 'OwnChat Team';
  }

  // 7. Created At
  const createdAt = blog.createdAt || blog.date || blog.publishedAt || null;

  return {
    id: blog._id || blog.id || slug || `blog-${index}`,
    title,
    slug,
    category,
    content,
    featuredImage,
    authorName,
    createdAt,
    raw: blog
  };
}
