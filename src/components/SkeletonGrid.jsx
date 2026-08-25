import React from 'react'
import SkeletonCard from './SkeletonCard'

const SkeletonGrid = ({ count = 10 }) => {

    return (
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}

        </div>
    )
}

export default SkeletonGrid