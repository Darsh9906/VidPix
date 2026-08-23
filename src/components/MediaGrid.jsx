import React from 'react';
import ResultCard from './ResultCard';

const MediaGrid = ({ items = [], loading = false }) => {
  if (loading) {
    return (
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="mb-5 break-inside-avoid overflow-hidden rounded-2xl"
          >
            <div
              className={`
                w-full
                animate-pulse
                rounded-2xl
                bg-zinc-800
                ${
                  index % 3 === 0
                    ? 'h-[420px]'
                    : index % 3 === 1
                    ? 'h-[320px]'
                    : 'h-[500px]'
                }
              `}
            />
          </div>
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-zinc-500">
          No media found.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
      {items.map((item) => (
        <div
          key={`${item.type}-${item.id}`}
          className="mb-5 break-inside-avoid"
        >
          <ResultCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;