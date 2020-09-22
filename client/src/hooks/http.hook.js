import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, {
          method,
          body,
          headers
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        setLoading(false);

        return data;
      } catch (e) {
        setError(e.message);
        setLoading(false);
        throw e;
      }
    },
    []
  );

  const clearError = () => setError(null);

  return { loading, request, error, clearError };
};
