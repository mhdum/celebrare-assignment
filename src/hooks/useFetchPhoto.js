import { useState, useEffect } from 'react';

export const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://picsum.photos/v2/list?limit=30');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch photos (Status: ${response.status})`);
        }
        
        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        setError(err.message || 'Something went wrong while fetching photos.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return { photos, loading, error };
};