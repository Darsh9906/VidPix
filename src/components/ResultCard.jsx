import React, { useState } from 'react';
import { Bookmark, Play } from 'lucide-react';
import { useDispatch } from 'react-redux';

import {
  addCollection,
  addedToast,
} from '../redux/features/collectionSlice';

const ResultCard = ({ item }) => {
  const dispatch = useDispatch();

  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  const addToCollection = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(addCollection(item));
    dispatch(addedToast());
  };

  const handleLoad = () => {
    setMediaLoaded(true);
  };

  const handleError = () => {
    setMediaError(true);
    setMediaLoaded(true);
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-zinc-900">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block"
      >
        {!mediaLoaded && !mediaError && (
          <div className="absolute inset-0 z-0 min-h-[280px] animate-pulse bg-zinc-800" />
        )}

        {mediaError ? (
          <div className="flex min-h-[280px] w-full items-center justify-center bg-zinc-900">
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-400">
                Unable to load media
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Try opening the source
              </p>
            </div>
          </div>
        ) : (
          <>
            {item.type === 'photo' && (
              <img
                src={item.src || item.thumbnail}
                alt={item.title || 'Photo'}
                loading="lazy"
                onLoad={handleLoad}
                onError={handleError}
                className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            )}

            {item.type === 'video' && (
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title || 'Video'}
                  loading="lazy"
                  onLoad={handleLoad}
                  onError={handleError}
                  className="block h-auto min-h-[280px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md">
                    <Play
                      size={20}
                      fill="white"
                      className="ml-0.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {item.type === 'gif' && (
              <img
                src={item.src || item.thumbnail}
                alt={item.title || 'GIF'}
                loading="lazy"
                onLoad={handleLoad}
                onError={handleError}
                className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">
              <h2 className="line-clamp-2 text-sm font-medium capitalize text-white sm:text-base">
                {item.title || 'Untitled'}
              </h2>
            </div>
          </>
        )}
      </a>

      <button
        type="button"
        onClick={addToCollection}
        aria-label="Save to collection"
        className="
          absolute
          right-3
          top-3
          z-20
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-black/60
          text-white
          backdrop-blur-md
          transition
          duration-200
          hover:scale-105
          hover:bg-green-600
          active:scale-95
        "
      >
        <Bookmark
          size={18}
          strokeWidth={2.2}
        />
      </button>
    </article>
  );
};

export default ResultCard;