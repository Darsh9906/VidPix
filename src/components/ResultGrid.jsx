import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchPhoto,
  fetchVideo,
  fetchGif,
} from '../api/mediaApi';

import {
  setResults,
  setError,
  setLoading,
} from '../redux/features/searchSlice';

import ErrorState from './ErrorState';
import MediaGrid from './MediaGrid';

const ResultGrid = () => {
  const dispatch = useDispatch();

  const {
    query,
    activeTab,
    results,
    loading,
    error,
  } = useSelector((state) => state.search);

 useEffect(() => {
  console.log("SEARCH EFFECT RUNNING");
  console.log("QUERY:", query);
  console.log("ACTIVE TAB:", activeTab);

  if (!query) return;

  const getData = async () => {
    try {
      dispatch(setLoading());

      let data = [];

      if (activeTab === 'photos') {
        const response = await fetchPhoto(query);

        console.log("UNSPLASH RESPONSE:", response);
        console.log("UNSPLASH RESULTS:", response.results);

        data = (response.results || [])
          .filter((item) => item.urls?.regular)
          .map((item) => ({
            id: item.id,
            type: 'photo',
            title: item.alt_description || item.description || 'Photo',
            thumbnail: item.urls?.small,
            src: item.urls?.regular,
            url: item.links?.html,
          }));

        console.log("MAPPED PHOTO DATA:", data);
      }

      dispatch(setResults(data));

    } catch (err) {
      console.error("SEARCH ERROR:", err);
      dispatch(setError(err.message));
    }
  };

  getData();

}, [query, activeTab, dispatch]);

  if (loading) {
    return (
      <section className="px-5 py-8 sm:px-8">
        <div className="mb-7">
          <div className="h-9 w-52 animate-pulse rounded bg-zinc-800" />
          <div className="mt-3 h-5 w-48 animate-pulse rounded bg-zinc-900" />
        </div>

        <MediaGrid loading />
      </section>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center px-5 py-12">
        <ErrorState />
      </div>
    );
  }

  return (
    <section className="px-5 py-8 sm:px-8">
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-white">
          {activeTab === 'photos' && 'Photo Results'}
          {activeTab === 'videos' && 'Video Results'}
          {activeTab === 'gif' && 'GIF Results'}
        </h1>

        <p className="mt-1 text-zinc-500">
          Results for "{query}"
        </p>
      </div>

      <MediaGrid items={results} />
    </section>
  );
};

export default ResultGrid;