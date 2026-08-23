import axios from 'axios';

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export const fetchPhoto = async (query, page = 1, per_page = 20) => {
  const response = await axios.get(
    'https://api.unsplash.com/search/photos',
    {
      params: {
        query,
        page,
        per_page,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_KEY}`,
      },
    }
  );

  return response.data;
};

export const fetchVideo = async (
  query,
  page = 1,
  per_page = 20
) => {
  const response = await axios.get(
    'https://api.pexels.com/videos/search',
    {
      params: {
        query,
        page,
        per_page,
      },
      headers: {
        Authorization: PEXELS_KEY,
      },
    }
  );

  return response.data;
};

export const fetchGif = async (
  query,
  page = 1,
  limit = 20
) => {
  const response = await axios.get(
    'https://api.giphy.com/v1/gifs/search',
    {
      params: {
        api_key: GIPHY_KEY,
        q: query,
        limit,
        offset: (page - 1) * limit,
      },
    }
  );

  return response.data;
};

export const fetchRandomPhotos = async (count = 9) => {
  const response = await axios.get(
    'https://api.unsplash.com/photos/random',
    {
      params: {
        count,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_KEY}`,
      },
    }
  );

  return response.data;
};

export const fetchRandomVideos = async (per_page = 8) => {
  const response = await axios.get(
    'https://api.pexels.com/videos/popular',
    {
      params: {
        per_page,
      },
      headers: {
        Authorization: PEXELS_KEY,
      },
    }
  );

  return response.data;
};

export const fetchRandomGif = async () => {
  const response = await axios.get(
    'https://api.giphy.com/v1/gifs/trending',
    {
      params: {
        api_key: GIPHY_KEY,
        limit: 8,
      },
    }
  );

  return response.data;
};