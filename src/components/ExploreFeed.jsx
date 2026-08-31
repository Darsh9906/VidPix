import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'

import ErrorState from './ErrorState'
import ResultCard from './ResultCard'
import SkeletonGrid from './SkeletonGrid'

import {
    fetchRandomGif,
    fetchRandomPhotos,
    fetchRandomVideos
} from '../api/mediaApi'

import {
    setHomeData,
    setLoading
} from '../redux/features/homeSlice'


const ExploreFeed = () => {

    const dispatch = useDispatch()

    const {
        photos = [],
        videos = [],
        gifs = [],
        loading,
        error
    } = useSelector((state) => state.home)

    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)


    useEffect(() => {

        const fetchHomeData = async () => {

            try {

                dispatch(setLoading())

                const [
                    photoData,
                    videoData,
                    gifData
                ] = await Promise.all([
                    fetchRandomPhotos(1, 10),
                    fetchRandomVideos(1, 10),
                    fetchRandomGif(0, 10)
                ])


                const formattedPhotos = photoData.map((item) => ({
                    id: item.id,
                    type: 'photo',
                    title:
                        item.alt_description ||
                        item.description ||
                        'Photo',
                    thumbnail: item.urls.thumb,
                    src: item.urls.full,
                    url: item.links.html
                }))


                const formattedVideos = videoData.videos.map((item) => ({
                    id: item.id,
                    type: 'video',
                    title: item.user?.name || 'Video',
                    thumbnail: item.image,
                    src: item.video_files?.[0]?.link,
                    url: item.url
                }))


                const formattedGifs = gifData.data.map((item) => ({
                    id: item.id,
                    type: 'gif',
                    title: item.title || 'GIF',
                    thumbnail: item.images?.downsized?.url,
                    src:
                        item.images?.original?.url ||
                        item.images?.downsized?.url,
                    url: item.url
                }))


                dispatch(
                    setHomeData({
                        photos: formattedPhotos,
                        videos: formattedVideos,
                        gifs: formattedGifs
                    })
                )

                setPage(1)

            } catch (error) {

                console.error('Failed to load explore feed:', error)

            }

        }

        fetchHomeData()

    }, [dispatch])


    const loadMore = async () => {

        if (loadingMore) return

        try {

            setLoadingMore(true)

            const nextPage = page + 1

            const [
                photoData,
                videoData,
                gifData
            ] = await Promise.all([
                fetchRandomPhotos(nextPage, 10),
                fetchRandomVideos(nextPage, 10),
                fetchRandomGif((nextPage - 1) * 10, 10)
            ])


            const newPhotos = photoData.map((item) => ({
                id: item.id,
                type: 'photo',
                title:
                    item.alt_description ||
                    item.description ||
                    'Photo',
                thumbnail: item.urls.thumb,
                src: item.urls.full,
                url: item.links.html
            }))


            const newVideos = videoData.videos.map((item) => ({
                id: item.id,
                type: 'video',
                title: item.user?.name || 'Video',
                thumbnail: item.image,
                src: item.video_files?.[0]?.link,
                url: item.url
            }))


            const newGifs = gifData.data.map((item) => ({
                id: item.id,
                type: 'gif',
                title: item.title || 'GIF',
                thumbnail: item.images?.downsized?.url,
                src:
                    item.images?.original?.url ||
                    item.images?.downsized?.url,
                url: item.url
            }))


            dispatch(
                setHomeData({
                    photos: [...photos, ...newPhotos],
                    videos: [...videos, ...newVideos],
                    gifs: [...gifs, ...newGifs]
                })
            )


            setPage(nextPage)

        } catch (error) {

            console.error('Failed to load more media:', error)

        } finally {

            setLoadingMore(false)

        }

    }


    if (loading) {

        return (
            <section className="w-full px-6 pb-12">

                <div className="mb-7">

                    <h1 className="text-3xl font-bold text-white">
                        🔥 Trending Now
                    </h1>

                </div>

                <SkeletonGrid count={10} />

            </section>
        )

    }


    if (error) {

        return (
            <div className="flex justify-center py-20">
                <ErrorState />
            </div>
        )

    }


    const media = [
        ...photos,
        ...videos,
        ...gifs
    ]


    return (
        <section className="w-full px-6 pb-12">

            <div className="mb-7">

                <h1 className="text-3xl font-bold text-white">
                    🔥 Trending Now
                </h1>

            </div>


            <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

                {media.map((item) => (

                    <ResultCard
                        key={`${item.type}-${item.id}`}
                        item={item}
                    />

                ))}

            </div>


            <div className="flex justify-center pt-10">

                <button
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                    {loadingMore && (
                        <Loader2
                            size={18}
                            className="animate-spin"
                        />
                    )}

                    {loadingMore
                        ? 'Loading...'
                        : 'Load More'
                    }

                </button>

            </div>

        </section>
    )
}


export default ExploreFeed