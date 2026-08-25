import React from 'react'

const SkeletonCard = () => {

    return (
        <div className="relative w-full overflow-hidden rounded-2xl bg-zinc-900">

            <div className="aspect-[4/5] w-full animate-pulse bg-zinc-800" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4">

                <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-700" />

                <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-zinc-800" />

            </div>

            <div className="absolute right-3 top-3 h-10 w-10 animate-pulse rounded-full bg-zinc-700/80" />

        </div>
    )
}

export default SkeletonCard