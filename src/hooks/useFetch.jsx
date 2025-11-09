// /client/src/hooks/useFetch.jsx

import { useState, useEffect, useCallback } from 'react';
import api from '../services/api.jsx';

/**
 * Reusable hook for fetching data from the backend.
 */
const useFetch = (url, { method = 'GET', body = null, initialData = null, skip = false } = {}) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async () => {
    if (skip) return;

    setLoading(true);
    setError(null);

    try {
      const config = { method: method.toLowerCase(), url: url, data: body };
      const response = await api(config);
      
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response ? err.response.data : { message: err.message });
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, method, body, skip]);

  useEffect(() => {
    if (!skip) {
      executeFetch();
    }
  }, [executeFetch, skip]);

  return { data, loading, error, refetch: executeFetch };
};

export default useFetch;