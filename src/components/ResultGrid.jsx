import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'

import {
    fetchPhoto,
    fetchVideo,
    fetchGif
} from '../api/mediaApi'

import {
    setResults,
    setError,
    setLoading
} from '../redux/features/searchSlice'

import ResultCard from './ResultCard'
import SkeletonGrid from './SkeletonGrid'
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


    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)


    // =========================
    // INITIAL SEARCH
    // =========================

    useEffect(() => {

        if (!query?.trim()) {
            return
        }


        const getData = async () => {

            try {

                dispatch(setLoading())

                setPage(1)
                setHasMore(true)


                let data = []
                let response


                // PHOTOS

                if (activeTab === 'photos') {

                    response = await fetchPhoto(
                        query,
                        1,
                        20
                    )


                    data = response.results.map((item) => ({

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


                    if (
                        response.total_pages <= 1 ||
                        response.results.length < 20
                    ) {
                        setHasMore(false)
                    }

                }


                // VIDEOS

                if (activeTab === 'videos') {

                    response = await fetchVideo(
                        query,
                        1,
                        20
                    )


                    data = response.videos.map((item) => ({

                        id: item.id,
                        type: 'video',
                        title:
                            item.user?.name ||
                            'Video',
                        thumbnail: item.image,
                        src:
                            item.video_files?.[0]?.link,
                        url: item.url

                    }))


                    if (
                        !response.next_page ||
                        response.videos.length < 20
                    ) {
                        setHasMore(false)
                    }

                }


                // GIFS

                if (activeTab === 'gif') {

                    response = await fetchGif(
                        query,
                        1,
                        20
                    )


                    data = response.data.map((item) => ({

                        id: item.id,
                        type: 'gif',
                        title:
                            item.title ||
                            'GIF',
                        thumbnail:
                            item.images?.downsized?.url,
                        src:
                            item.images?.original?.url ||
                            item.images?.downsized?.url,
                        url: item.url

                    }))


                    if (
                        !response.pagination?.total_count ||
                        response.data.length < 20
                    ) {
                        setHasMore(false)
                    }

                }


                dispatch(setResults(data))

            } catch (err) {

                console.error(err)

                dispatch(
                    setError(err.message)
                )

            }

        }


        getData()

    }, [
        query,
        activeTab,
        dispatch
    ])


    // =========================
    // LOAD MORE
    // =========================

    const loadMore = async () => {

        if (loadingMore || !hasMore) {
            return
        }


        try {

            setLoadingMore(true)


            const nextPage = page + 1

            let newData = []
            let response


            // PHOTOS

            if (activeTab === 'photos') {

                response = await fetchPhoto(
                    query,
                    nextPage,
                    20
                )


                newData = response.results.map((item) => ({

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


                if (
                    response.results.length < 20 ||
                    nextPage >= response.total_pages
                ) {
                    setHasMore(false)
                }

            }


            // VIDEOS

            if (activeTab === 'videos') {

                response = await fetchVideo(
                    query,
                    nextPage,
                    20
                )


                newData = response.videos.map((item) => ({

                    id: item.id,
                    type: 'video',
                    title:
                        item.user?.name ||
                        'Video',
                    thumbnail: item.image,
                    src:
                        item.video_files?.[0]?.link,
                    url: item.url

                }))


                if (
                    response.videos.length < 20 ||
                    !response.next_page
                ) {
                    setHasMore(false)
                }

            }


            // GIFS

            if (activeTab === 'gif') {

                response = await fetchGif(
                    query,
                    nextPage,
                    20
                )


                newData = response.data.map((item) => ({

                    id: item.id,
                    type: 'gif',
                    title:
                        item.title ||
                        'GIF',
                    thumbnail:
                        item.images?.downsized?.url,
                    src:
                        item.images?.original?.url ||
                        item.images?.downsized?.url,
                    url: item.url

                }))


                if (
                    response.data.length < 20
                ) {
                    setHasMore(false)
                }

            }


            dispatch(
                setResults([
                    ...results,
                    ...newData
                ])
            )


            setPage(nextPage)

        } catch (err) {

            console.error(
                'Failed to load more:',
                err
            )

        } finally {

            setLoadingMore(false)

        }

    }


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <SkeletonGrid count={10} />
        )

    }


    // =========================
    // ERROR
    // =========================

    if (error) {

        return (
            <div className="flex justify-center py-20">
                <ErrorState />
            </div>
        )

    }


    // =========================
    // RESULTS
    // =========================

    if (!results || results.length === 0) {

        return (
            <div className="flex min-h-[300px] items-center justify-center">

                <p className="text-zinc-500">
                    No media found.
                </p>

            </div>
        )

    }


    return (

        <div>

            <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-5 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

                {results.map((item) => (

                    <ResultCard
                        key={`${item.type}-${item.id}`}
                        item={item}
                    />

                ))}

            </div>


            {hasMore && (

                <div className="flex justify-center py-10">

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

            )}

        </div>

    )

}


export default ResultGrid