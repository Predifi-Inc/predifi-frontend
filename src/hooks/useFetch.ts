import { useState, useEffect } from 'react';

const useFetch = ({ keyword }: { keyword?: string }) => {
  const [gifUrl, setGifUrl] = useState('');

  useEffect(() => {
    const fetchGif = async () => {
      if (!keyword) return;
      
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${keyword.split(' ').join('')}&limit=1`
        );
        const data = await response.json();
        setGifUrl(data.data[0]?.images?.downsized_medium?.url || '');
      } catch (error) {
        console.error('Error fetching GIF:', error);
      }
    };

    fetchGif();
  }, [keyword]);

  return gifUrl;
};

export default useFetch; 