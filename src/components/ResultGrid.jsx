import React, { useEffect } from 'react'
import { fetchPhoto, fetchGif, fetchVideo } from '../api/mediaApi'
import {
    setResults,
    setError,
    setLoading
} from '../redux/features/searchSlice'
import { useDispatch, useSelector } from 'react-redux'
import ResultCard from './ResultCard'
import Loader from './Loader'
import ErrorState from './ErrorState'

const ResultGrid = () => {

    const dispatch = useDispatch()

    const {
        query,
        activeTab,
        results,
        loading,
        error
    } = useSelector((store) => store.search)

    useEffect(() => {

        if (!query) return

        const getData = async () => {

            try {

                dispatch(setLoading())

                let data = []

                if (activeTab === 'photos') {

                    const response = await fetchPhoto(query)

                    data = response.results.map((item) => ({
                        id: item.id,
                        type: 'photo',
                        title: item.alt_description || item.description || 'Photo',
                        thumbnail: item.urls.thumb,
                        src: item.urls.full,
                        url: item.links.html
                    }))
                }

                if (activeTab === 'videos') {

                    const response = await fetchVideo(query)

                    data = response.videos.map((item) => ({
                        id: item.id,
                        type: 'video',
                        title: item.user?.name || 'Video',
                        thumbnail: item.image,
                        src: item.video_files?.[0]?.link,
                        url: item.url
                    }))
                }

                if (activeTab === 'gif') {

                    const response = await fetchGif(query)

                    data = response.data.map((item) => ({
                        id: item.id,
                        type: 'gif',
                        title: item.title || 'GIF',
                        thumbnail: item.images?.downsized?.url,
                        src: item.images?.original?.url,
                        url: item.url
                    }))
                }

                dispatch(setResults(data))

            } catch (err) {

                console.error(err)

                dispatch(setError(err.message))
            }
        }

        getData()

    }, [query, activeTab, dispatch])


    if (error) {
        return (
            <div className="flex justify-center py-20">
                <ErrorState />
            </div>
        )
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader />
            </div>
        )
    }


    return (
        <section className="w-full px-6 pb-12">

            <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

                {results.map((item) => (
                    <ResultCard
                        key={`${item.type}-${item.id}`}
                        item={item}
                    />
                ))}

            </div>

        </section>
    )
}

export default ResultGrid