import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { normalizeBlog } from '../utils/getBlogFields';

// OwnChat Organization ID — scopes API to OwnChat's own published blogs
const OWNCHAT_ORG_ID = '6642fb25c319d086a687e9d8';

// API base
const API_BASE = 'https://api-blog.owncart.shop/blog';

export function useBlogData(page = 1, limit = 9) {
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: page,
    totalPages: 1,
    limit: limit,
    totalCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // POST with orgId — this is the exact call ownchat.app makes internally
      const response = await axios.post(
        `${API_BASE}/get-blog-for-user?page=${page}&limit=${limit}`,
        { orgId: OWNCHAT_ORG_ID }
      );

      const dataPayload = response?.data?.data || {};
      const rawBlogs = dataPayload.blog || [];
      const rawPagination = dataPayload.pagination || {};

      const normalizedBlogs = rawBlogs.map((item, idx) => normalizeBlog(item, idx));
      const totalCount = Number(rawPagination.totalCount || normalizedBlogs.length || 0);
      const limitVal = Number(rawPagination.limit || limit);
      const calculatedTotalPages = Math.max(1, Math.ceil(totalCount / limitVal));

      setBlogs(normalizedBlogs);
      setPagination({
        currentPage: page,
        totalPages: calculatedTotalPages,
        limit: limitVal,
        totalCount: totalCount
      });
    } catch (err) {
      console.error('Failed to fetch blog data:', err);
      setError('We encountered an error while communicating with our servers. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return {
    blogs,
    pagination,
    loading,
    error,
    refetch: fetchBlogs
  };
}
