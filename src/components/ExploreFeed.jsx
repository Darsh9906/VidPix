import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loader from './Loader'
import ErrorState from './ErrorState'
import ResultCard from './ResultCard'

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
        photos,
        videos,
        gifs,
        loading,
        error
    } = useSelector((state) => state.home)


    useEffect(() => {

        const fetchHomeData = async () => {

            try {

                dispatch(setLoading())

                const [photoData, videoData, gifData] =
                    await Promise.all([
                        fetchRandomPhotos(10),
                        fetchRandomVideos(10),
                        fetchRandomGif()
                    ])


                const photos = photoData.map((item) => ({
                    id: item.id,
                    type: 'photo',
                    title: item.alt_description || item.description || 'Photo',
                    thumbnail: item.urls.thumb,
                    src: item.urls.full,
                    url: item.links.html
                }))


                const videos = videoData.videos.map((item) => ({
                    id: item.id,
                    type: 'video',
                    title: item.user?.name || 'Video',
                    thumbnail: item.image,
                    src: item.video_files?.[0]?.link,
                    url: item.url
                }))


                const gifs = gifData.data.map((item) => ({
                    id: item.id,
                    type: 'gif',
                    title: item.title || 'GIF',
                    thumbnail: item.images?.downsized?.url,
                    src: item.images?.original?.url || item.url,
                    url: item.url
                }))


                dispatch(
                    setHomeData({
                        photos,
                        videos,
                        gifs
                    })
                )

            } catch (error) {

                console.error(error)

            }

        }

        fetchHomeData()

    }, [dispatch])


    if (loading) {

        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader />
            </div>
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

        </section>
    )
}

export default ExploreFeed