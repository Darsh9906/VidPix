import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Loader from './Loader';
import ErrorState from './ErrorState';
import MediaGrid from './MediaGrid';

import {
  fetchPhoto,
  fetchVideo,
  fetchGif,
} from '../api/mediaApi';

const SearchResults = () => {
  const query = useSelector((state) => state.search.query);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query?.trim()) {
      setResults([]);
      return;
    }

    const searchMedia = async () => {
      try {
        setLoading(true);
        setError(false);

        const [photoData, videoData, gifData] =
          await Promise.all([
            fetchPhoto(query),
            fetchVideo(query),
            fetchGif(query),
          ]);

        const photos = photoData.results.map((item) => ({
          id: item.id,
          type: 'photo',
          title: item.alt_description || item.description || 'Photo',
          thumbnail: item.urls.thumb,
          src: item.urls.full,
          url: item.links.html,
        }));

        const videos = videoData.videos.map((item) => ({
          id: item.id,
          type: 'video',
          title: item.user?.name || 'Video',
          thumbnail: item.image,
          src: item.video_files?.[0]?.link,
          url: item.url,
        }));

        const gifs = gifData.data.map((item) => ({
          id: item.id,
          type: 'gif',
          title: item.title || 'GIF',
          thumbnail: item.images?.downsized?.url,
          src: item.images?.original?.url,
          url: item.url,
        }));

        setResults([
          ...photos,
          ...videos,
          ...gifs,
        ]);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    searchMedia();
  }, [query]);

  if (!query?.trim()) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <section className="px-5 py-8 sm:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Search results
        </h1>

        <p className="mt-1 text-zinc-500">
          Results for "{query}"
        </p>
      </div>

      <MediaGrid items={results} />
    </section>
  );
};

export default SearchResults;