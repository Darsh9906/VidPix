import React from 'react'

const MediaSkeleton = ({ height = 280 }) => {
  return (
    <div
      className="mb-4 break-inside-avoid overflow-hidden rounded-xl bg-zinc-900"
    >
      <div
        style={{ height: `${height}px` }}
        className="w-full animate-pulse bg-zinc-800"
      />
    </div>
  )
}

export default MediaSkeleton