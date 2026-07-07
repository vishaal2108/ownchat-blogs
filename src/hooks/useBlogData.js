import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { normalizeBlog } from '../utils/getBlogFields';

// OwnChat Organization ID — scopes API to OwnChat's own published blogs
const OWNCHAT_ORG_ID = '6642fb25c319d086a687e9d8';
const API_BASE = 'https://api-blog.owncart.shop/blog';

export function useBlogData() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all blogs in one shot (limit=50 covers all 44 OwnChat blogs)
      const response = await axios.post(
        `${API_BASE}/get-blog-for-user?page=1&limit=50`,
        { orgId: OWNCHAT_ORG_ID }
      );

      const rawBlogs = response?.data?.data?.blog || [];
      // Preserve raw tags array for display on cards
      const normalizedBlogs = rawBlogs.map((item, idx) => ({
        ...normalizeBlog(item, idx),
        tags: Array.isArray(item.tag) ? item.tag.map(t => t.name).filter(Boolean) : []
      }));

      setBlogs(normalizedBlogs);
    } catch (err) {
      console.error('Failed to fetch blog data:', err);
      setError('We encountered an error loading articles. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return { blogs, loading, error, refetch: fetchBlogs };
}
