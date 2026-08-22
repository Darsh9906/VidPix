import React from 'react'
import { Bookmark, Play } from 'lucide-react'
import { useDispatch } from 'react-redux'
import {
  addCollection,
  addedToast
} from '../redux/features/collectionSlice'

const ResultCard = ({ item }) => {
  const dispatch = useDispatch()

  const addToCollection = (e) => {
    e.preventDefault()
    e.stopPropagation()

    dispatch(addCollection(item))
    dispatch(addedToast())
  }

  return (
    <article className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl bg-zinc-900">

      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {item.type === 'photo' && (
          <img
            src={item.src}
            alt={item.title || 'Photo'}
            loading="lazy"
            className="block w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}

        {item.type === 'video' && (
          <div className="relative">
            <video
              src={item.src}
              poster={item.thumbnail}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              className="block w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />

            <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md">
              <Play size={14} fill="currentColor" />
            </div>
          </div>
        )}

        {item.type === 'gif' && (
          <img
            src={item.src || item.thumbnail}
            alt={item.title || 'GIF'}
            loading="lazy"
            className="block w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent px-3 pb-3 pt-14 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="truncate text-sm font-medium text-white">
            {item.title || 'Untitled'}
          </p>
        </div>
      </a>

      <button
        type="button"
        onClick={addToCollection}
        aria-label="Save to collection"
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all duration-200 hover:bg-green-600 hover:scale-105 active:scale-95"
      >
        <Bookmark size={18} strokeWidth={2.3} />
      </button>

    </article>
  )
}

export default ResultCard