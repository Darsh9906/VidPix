import React from 'react'
import { Bookmark } from 'lucide-react'
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
        <div className="group relative w-full overflow-hidden rounded-2xl bg-zinc-900">

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
                        className="block aspect-[4/5] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                )}

                {item.type === 'video' && (
                    <video
                        src={item.src}
                        poster={item.thumbnail}
                        muted
                        loop
                        autoPlay
                        playsInline
                        className="block aspect-[4/5] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                )}

                {item.type === 'gif' && (
                    <img
                        src={item.src || item.thumbnail}
                        alt={item.title || 'GIF'}
                        loading="lazy"
                        className="block aspect-[4/5] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4">

                    <h2 className="line-clamp-2 text-sm font-semibold capitalize text-white sm:text-base">
                        {item.title || 'Untitled'}
                    </h2>

                </div>

            </a>

            <button
                onClick={addToCollection}
                aria-label="Save to collection"
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-green-600 active:scale-95 cursor-pointer"
            >
                <Bookmark
                    size={18}
                    strokeWidth={2.2}
                />
            </button>

        </div>
    )
}

export default ResultCard