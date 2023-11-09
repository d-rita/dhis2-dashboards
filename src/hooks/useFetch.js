import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (response.ok) {
          const res = await response.json();
          setData(res);
          setLoading(false);
          setError(null);
        } else {
          throw new Error(response.statusText || response.status);
        }
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  

  return { error, loading, data };
};
